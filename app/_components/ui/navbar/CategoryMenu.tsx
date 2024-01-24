import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const CategoryMenu = () => {
  const categories = [
    {
      name: "Home Decor",
      imageUrl: "/images/categories/decor.png",
      url: "/category/home-decor",
      subCategories: [
        { name: "Contemporary", url: "/category/contemporary" },
        { name: "Vintage", url: "/category/vintage" },
        { name: "Minimalist", url: "/category/minimalist" },
      ],
    },
    {
      name: "Wall Art",
      imageUrl: "/images/categories/wall-art.png",
      url: "/category/wall-art",
      subCategories: [
        { name: "Paintings", url: "/category/paintings" },
        { name: "Posters", url: "/category/posters" },
        { name: "Wall Decals", url: "/category/wall-decals" },
      ],
    },
    {
      name: "Cushions & Throws",
      imageUrl: "/images/categories/cushions-throws.png",
      url: "/category/cushions-throws",
      subCategories: [
        { name: "Throw Pillows", url: "/category/throw-pillows" },
        { name: "Blankets", url: "/category/blankets" },
        { name: "Floor Cushions", url: "/category/floor-cushions" },
      ],
    },
    {
      name: "Planters",
      imageUrl: "/images/categories/planters.png",
      url: "/category/planters",
      subCategories: [
        { name: "Indoor Planters", url: "/category/indoor-planters" },
        { name: "Outdoor Planters", url: "/category/outdoor-planters" },
        { name: "Hanging Planters", url: "/category/hanging-planters" },
      ],
    },
    {
      name: "Tableware",
      imageUrl: "/images/categories/tableware.png",
      url: "/category/tableware",
      subCategories: [
        { name: "Dinnerware", url: "/category/dinnerware" },
        { name: "Glassware", url: "/category/glassware" },
        { name: "Cutlery", url: "/category/cutlery" },
      ],
    },
  ];

  return (
    <div className="">
      <div className="flex justify-center gap-8 mx-8">
        {categories.map((category) => {
          return (
            <div
              key={`categoryMenu-${category.name}`}
              className="flex flex-col"
            >
              <CategoryImage
                categoryName={category.name}
                imageUrl={category.imageUrl}
                width={192}
                height={192}
              />
              <div className="p-2 py-4">
                <Link
                  href={category.url}
                  className="font-semibold text-lg my-2"
                >
                  {category.name}
                </Link>
                <ul className="my-2 text-slate-400">
                  {category.subCategories.map((subCategory) => (
                    <li key={`categoryMenu-${subCategory.name}`}>
                      <Link href={subCategory.url}>{subCategory.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
const CategoryImage = ({
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
    </div>
  );
};

export default CategoryMenu;
