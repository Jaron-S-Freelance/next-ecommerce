import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const marqueeTexts = [
    "SUMMER SALE DISCOUNT SAVE 20%",
    "USE DISCOUNT CODE FUSION20",
    "FREE SHIPPING FOR ALL ORDERS OVER $100+",
  ];

  // Extend the content by repeating it more times
  const extendedMarqueeTexts = Array.from(
    { length: 3 },
    () => marqueeTexts
  ).flat();

  const marqueeVariants = {
    animate: {
      x: ["0%", "-33%"], // Adjust to move from 0% to -33% for three sets of content
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Adjust the duration to control the speed
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
        {/* Render the extended marquee text for a continuous flow */}
        {extendedMarqueeTexts.map((text, index) => (
          <React.Fragment key={`marquee-text-${index}`}>
            <span>{text}</span>
            <span className="mx-6">-</span>
          </React.Fragment>
        ))}
      </motion.div>
      <div
        className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-base-200 via-base-200/0 z-20"
        style={{
          background:
            "linear-gradient(to right, #191e24 0%, rgba(236, 239, 241, 0) 100%)",
        }}
      ></div>
      <div
        className="absolute top-0 bottom-0 right-0 w-1/3 bg-gradient-to-l from-base-200 via-base-200/0 z-20"
        style={{
          background:
            "linear-gradient(to left, #191e24 0%, rgba(236, 239, 241, 0) 100%)",
        }}
      ></div>
    </div>
  );
};

export default Banner;
