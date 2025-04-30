'use client'

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const DescriptionAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='h-[75px] mb-8 max-w-xl'>
      <TypeAnimation
        sequence={[
          "Join a community of scholars pushing boundaries in research and innovation.",
          4000,
          "Engage with visionary researchers shaping the future of emerging technologies and sustainable solutions.",
          4000,
          "Collaborate with pioneering academics transforming ideas into impactful solutions for global challenges.",
          4000,
          "Contribute to groundbreaking discoveries alongside global thinkers driving breakthroughs across disciplines.",
          4000,
        ]}
        wrapper='span'
        speed={50}
        repeat={Infinity}
        className='text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 [text-shadow:_0px_2px_4px_rgba(0,0,0,95)]'
      />
    </motion.div>
  );
};

export default DescriptionAnimation;
