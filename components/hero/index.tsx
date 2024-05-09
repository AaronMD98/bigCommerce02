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
  <Slideshow className="overflow-hidden shadow-md md:rounded-md">
    <SlideshowContent>
      <SlideshowSlide>
        <div className="relative items-center justify-center text-white">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Button asChild variant="primary" className="w-fit">
              <a href="/#">Shop now</a>
            </Button>
          </div>
          <div className="absolute z-10 md:right-10 md:top-10">
            <KickstarterSection />
          </div>
        </div>
      </SlideshowSlide>
      {/* <SlideshowSlide>
        <div className="flex flex-col gap-4 px-12 pb-64 pt-48">
          <h2 className="text-5xl font-black lg:text-6xl">Great Deals</h2>
          <p className="max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <Button asChild className="w-fit">
            <a href="/#">Shop now</a>
          </Button>
        </div>
      </SlideshowSlide>
      <SlideshowSlide>
        <div className="flex flex-col gap-4 px-12 pb-64 pt-48">
          <h2 className="text-5xl font-black lg:text-6xl">Low Prices</h2>
          <p className="max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <Button asChild className="w-fit">
            <a href="/#">Shop now</a>
          </Button>
        </div>
      </SlideshowSlide> */}
    </SlideshowContent>
    {/* <SlideshowControls className="">
      <SlideshowAutoplayControl />
      <SlideshowPreviousIndicator />
      <SlideshowPagination />
      <SlideshowNextIndicator />
    </SlideshowControls> */}
  </Slideshow>
);
