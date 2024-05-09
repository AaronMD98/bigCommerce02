'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import kickstarterLogo from './../../../public/kickstarter.png';

export default function KickstarterSection() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center space-y-4 text-center"
    >
      <motion.div>
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold md:text-2xl"
        >
          Raised £351,261 on Kickstarter
        </motion.h2>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image src={kickstarterLogo} height={100} width={300} alt="Kickstarter Logo" />
      </motion.div>
    </motion.section>
  );
}
