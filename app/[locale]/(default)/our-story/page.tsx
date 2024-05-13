import { getMessages, getTranslations } from 'next-intl/server';
import React from 'react';
import ColumnSection from '~/components/ui/framer-sections/sectionWithColumns';
import { LocaleType } from '~/i18n';
import image from './../../../../public/our-story-airback.png';
import { BcImage } from '~/components/bc-image';
import Image from 'next/image';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function StoryPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });

  return (
    <>
      <section className={`relative h-[500px]`}>
        <Image
          src={image}
          height={600}
          width={1000}
          alt="AirBack Team"
          loading="eager"
          className="absolute h-full w-full object-cover"
        />
        <h1> About Us</h1>
      </section>
      <div className="flex-1 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
        <ColumnSection
          title="Since our inception, Airback™ has been at the forefront of travel technology. We continuously work to improve our products and services, incorporating feedback from our diverse user base to meet the evolving needs of modern travelers. Our commitment to quality and customer satisfaction sets us apart in the travel industry."
          copy=""
          reverse={true}
          // copy="At Airback™, our mission is to revolutionize the way you travel. We provide innovative solutions that enhance your travel experience, focusing on convenience, efficiency, and sustainability. Our flagship product, the Airback™ Vacuum Compression System, embodies this philosophy by allowing travelers to pack smarter and lighter."
          descriptionTwo="At Airback™, our mission is to revolutionize the way you travel. We provide innovative solutions that enhance your travel experience, focusing on convenience, efficiency, and sustainability. Our flagship product, the Airback™ Vacuum Compression System, embodies this philosophy by allowing travelers to pack smarter and lighter."
        />
      </div>
    </>
  );
}
