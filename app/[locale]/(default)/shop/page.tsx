import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';
import { getProducts } from '~/client/queries/get-products';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { ProductSheetContent } from '~/components/product-sheet/product-sheet-content';
import { LocaleType } from '~/i18n';
import { NextIntlClientProvider } from 'next-intl';
import { ProductCard } from '~/components/product-card';

interface Props {
  params: {
    locale: LocaleType;
  };
}

async function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });
  const [newestProducts, featuredProducts] = await Promise.all([
    getNewestProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="flex gap-4 py-12">
      {newestProducts.map((product) => {
        return <ProductCard product={product} showCompare={false} />;
      })}
    </div>
  );
}

export default Page;
