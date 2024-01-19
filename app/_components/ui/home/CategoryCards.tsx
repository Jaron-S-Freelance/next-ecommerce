import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface CategoryCardProps {
  imageUrl: string;
}

const CategoryCards = () => {
  const categories = [
    { name: "Home Decor", imageUrl: "/images/categories/decor.png" },
    { name: "Wall Art", imageUrl: "/images/categories/wall-art.png" },
    {
      name: "Cushions & Throws",
      imageUrl: "/images/categories/cushions-throws.png",
    },
    { name: "Planters", imageUrl: "/images/categories/planters.png" },
    { name: "Tableware", imageUrl: "/images/categories/tableware.png" },
  ];
  return (
    <div className="my-16">
      <h3 className="font-semibold text-md text-center underline underline-offset-2">
        SHOP BY CATEGORY
      </h3>
      <h2 className="font-bold text-5xl text-center mt-4">Collections</h2>
      <div className="flex flex-wrap justify-center gap-16 m-8">
        {categories.map((category, index) => {
          // Alternate sizes: larger cards for even indices, smaller for odd
          const isLarge = index % 2 === 0;
          const width = isLarge ? 256 : 196;
          const height = 256;

          return (
            <CategoryCard
              key={index}
              categoryName={category.name}
              imageUrl={category.imageUrl}
              width={width}
              height={height}
            />
          );
        })}
      </div>
    </div>
  );
};

interface CategoryCardProps {
  imageUrl: string;
  categoryName: string;
  width: number;
  height: number;
  className?: string;
}
{
}
const CategoryCard = ({
  imageUrl,
  categoryName,
  width,
  height,
  className,
}: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="overflow-hidden flex justify-center items-end relative rounded-xl hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          transition: {
            type: "spring",
            duration: 0.3,
            damping: 30,
            stiffness: 200,
          },
        }}
        className="w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={categoryName}
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <button className="btn absolute m-4">
        {categoryName}
        <motion.div
          animate={{
            opacity: isHovered ? 100 : 0,
            width: isHovered ? 16 : 0,
            transition: { duration: 0.3 },
          }}
          className="-mr-1"
        >
          <FaArrowRight />
        </motion.div>
      </button>
    </div>
  );
};

export default CategoryCards;
