"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const DescriptionAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='relative min-h-[120px] sm:min-h-[100px] md:min-h-[80px] w-full max-w-2xl'>
      <TypeAnimation
        sequence={[
          "Join a community of scholars pushing boundaries in research and innovation.",
          4000,
          "Engage with visionary researchers shaping the future of emerging technologies.",
          4000,
          "Collaborate with pioneering academics transforming ideas into impactful solutions.",
          4000,
          "Contribute to groundbreaking discoveries alongside global thinkers and innovators.",
          4000,
        ]}
        wrapper='p'
        speed={50}
        repeat={Infinity}
        className='text-lg sm:text-xl font-medium text-white/90 leading-relaxed tracking-wide
          [text-shadow:_0px_1px_2px_rgba(0,0,0,0.8)] break-words'
        style={{ margin: 0 }}
      />
    </motion.div>
  );
};

export default DescriptionAnimation;
