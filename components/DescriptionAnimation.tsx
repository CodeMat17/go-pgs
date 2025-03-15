"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

interface DescriptionAnimationProps {
  desc: string[];
}

const DescriptionAnimation: React.FC<DescriptionAnimationProps> = ({
  desc,
}) => {
  // Ensure sequence includes text with delay (4000ms)
  const sequence = desc.flatMap((text) => [text, 4000]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='h-[75px] mb-8'>
      <TypeAnimation
        sequence={sequence}
        wrapper='span'
        speed={50}
        repeat={Infinity}
        className='text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 [text-shadow:_0px_2px_4px_rgba(0,0,0,25)]'
      />
    </motion.div>
  );
};

export default DescriptionAnimation;
