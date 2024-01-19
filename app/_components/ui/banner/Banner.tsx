import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const marqueeTexts = [
    "SUMMER SALE DISCOUNT SAVE 20%",
    "USE DISCOUNT CODE FUSION20",
    "FREE SHIPPING FOR ALL ORDERS OVER $100+",
  ];

  const marqueeVariants = {
    animate: {
      x: [0, -1000], // Adjust based on the length of your text
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 75,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden bg-base-200 h-10 flex items-center relative">
      <motion.div
        className="whitespace-nowrap text-sm"
        variants={marqueeVariants}
        animate="animate"
      >
        {Array(5)
          .fill(null)
          .map(() => (
            <>
              {marqueeTexts.map((text, index) => (
                <span key={index}>
                  {text} <span className="mx-6">-</span>
                </span>
              ))}
            </>
          ))}
      </motion.div>
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-base-200 via-base-200/0 z-20"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-base-200 via-base-200/0 z-20"></div>
    </div>
  );
};

export default Banner;
