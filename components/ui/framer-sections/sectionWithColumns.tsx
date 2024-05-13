'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '~/lib/utils';

interface ColumnWithImage {
  title: string;
  copy: string;
  image?: any;
  imageAlt?: string;
  reverse?: boolean;
  descriptionTwo?: string;
  titleTwo?: string;
}

export default function ColumnSection({
  title,
  copy,
  image,
  imageAlt = 'Image',
  reverse = false,
  descriptionTwo = '',
  titleTwo = '',
}: ColumnWithImage) {
  const sectionClasses = cn('grid py-12 md:grid-cols-2 gap-4', {
    'md:grid-cols-2': !reverse, // Standard positioning
    'md:grid-cols-2 md:order-1': reverse, // Reversed positioning
  });

  const imageClasses = cn({
    'order-last': reverse, // Reverse position of image if `reverse` is true
  });

  const slideDirectionColOne: number = !reverse ? -50 : 50;
  const slideDirectionColTwo: number = reverse ? -50 : 50;

  return (
    <motion.section
      className={sectionClasses}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={imageClasses}
        initial={{ x: slideDirectionColOne, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {image ? (
          <Image
            src={image}
            loading={'lazy'}
            alt={imageAlt}
            aria-label="informative image AirBack"
            className="rounded-md"
            width={800}
            height={800}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold md:text-4xl">{titleTwo}</h1>
            <p className="opacity-80">{descriptionTwo}</p>
          </div>
        )}
      </motion.div>
      <motion.div
        className="flex items-center px-2 md:px-4"
        initial={{ x: slideDirectionColTwo, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold md:text-4xl">{title}</h1>
          <p className="opacity-80">{copy}</p>
        </div>
      </motion.div>
    </motion.section>
  );
}
