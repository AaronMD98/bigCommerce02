import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';
import { Hero } from '~/components/hero';
import { ParallaxText } from '~/components/parallax-text';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { LocaleType } from '~/i18n';

import vogue from './../../../public/as-seen-on/vogue.webp';
import businessInsider from './../../../public/as-seen-on/business-insider.webp';
import forbes from './../../../public/as-seen-on/forbes.webp';
import grazia from './../../../public/as-seen-on/grazia.webp';
import quote from './../../../public/as-seen-on/quote.webp';
import watch from './../../../public/as-seen-on/gentlemens_s-watch.webp';

import Image from 'next/image';
import KickstarterSection from '~/components/ui/kickstarter';
import AirbackSection from './../../../components/ui/framer-sections/compression-section';

// Images
import compressionImage from './../../../public/compression-closeup.webp';
import airbackOrganisation from './../../../public/airback-organisation.webp';
import { Button } from '~/components/ui/button';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });
  const [newestProducts, featuredProducts] = await Promise.all([
    getNewestProducts(),
    getFeaturedProducts(),
  ]);

  const images = [watch, quote, grazia, forbes, businessInsider, vogue];

  // console.log('FEATURED', featuredProducts);

  return (
    <>
      <Hero id="hero" />
      <div className="flex flex-col items-center">
        <ParallaxText baseVelocity={1} numberOfChildren={4}>
          {images.map((image, index) => (
            <Image
              src={image}
              alt="image"
              height={100}
              width={300}
              key={index}
              className="flex max-h-[80px] w-full"
              priority
            />
          ))}
        </ParallaxText>
      </div>
      <div className="">
        <NextIntlClientProvider locale={locale} messages={{ Product: messages.Product ?? {} }}>
          <ProductCardCarousel
            products={newestProducts}
            showCart={false}
            showCompare={false}
            showReviews={false}
            title={t('Carousel.newestProducts')}
          />
        </NextIntlClientProvider>
      </div>
      <AirbackSection
        title={'Airback™ Vacuum Compression System'}
        copy={
          'The Airback is fitted with a built-in vacuum system that enables you to maximize your packing space by reducing the volume of your clothes and other packable items. No need to worry about overpacking or squeezing in that extra jacket anymore!'
        }
        image={compressionImage}
        imageAlt="Compression Section"
        // reverse
      />
      <AirbackSection
        title={'Clever Organization'}
        copy={`Got a lot of stuff to pack? No worries! The Airback has all sorts of pockets and compartments so you can keep your things super organized. It's like having a place for everything, so you can easily find what you need and keep your stuff tidy while you're on the go. And hey, if you're the type who loves to bring back tons of souvenirs, this bag's got your back. It can actually expand to give you that extra space when you need it. Pretty cool for those trips when you end up with more than you started with, right?`}
        image={airbackOrganisation}
        imageAlt="Compression Section"
        reverse
      />
      <section className="mb-12 flex w-full flex-col items-center justify-center gap-12 rounded-md border-2 py-12 shadow-md">
        <h1 className="text-2xl font-semibold md:text-4xl">Start Travelling With Comfort Today</h1>
        <Button variant="secondary"> Shop Now</Button>
      </section>
    </>
  );
}

export const runtime = 'edge';
