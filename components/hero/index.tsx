import Image from 'next/image';

import { Button } from '@bigcommerce/components/button';
import {
  Slideshow,
  SlideshowAutoplayControl,
  SlideshowContent,
  SlideshowControls,
  SlideshowNextIndicator,
  SlideshowPagination,
  SlideshowPreviousIndicator,
  SlideshowSlide,
} from '@bigcommerce/components/slideshow';

import airback from './../../public/airback-hero.webp';
import KickstarterSection from '../ui/kickstarter';

export const Hero = () => (
  <div className="relative min-h-[1000px] items-center justify-center border text-white">
    <Image
      alt="an assortment of brandless products against a blank background"
      className="absolute -z-10 h-full object-cover object-top"
      fill
      priority
      sizes="(max-width: 1536px) 100vw, 1536px"
      src={airback}
    />
    <div className="flex flex-col gap-4 px-4 pb-[10rem] pt-[20rem] sm:px-12">
      <h2 className="text-5xl font-black lg:text-6xl">25% Off Sale</h2>
      <p className="max-w-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
      <Button asChild variant="primary" className="w-fit">
        <a href="/#">Shop now</a>
      </Button>
    </div>
    <div className="absolute z-10 md:right-10 md:top-10">
      <KickstarterSection />
    </div>
  </div>
);
