import { getCategories } from "@/app/_mocks/handlers/categoryHandler";
import Category from "@/types/models/category";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CategoryMenu = () => {
  const categories = getCategories();

  return (
    <div className="">
      <div className="flex justify-center gap-8 mx-8">
        {categories.map((category) => {
          return (
            <div
              key={`categoryMenu-${category.name}`}
              className="flex flex-col"
            >
              <CategoryImage category={category} width={192} height={192} />
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
                      <Link href={category.url}>{subCategory.name}</Link>
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
  category: Category;
  width: number;
  height: number;
  className?: string;
}
{
}
const CategoryImage = ({
  category,
  width,
  height,
  className,
}: CategoryCardProps) => {
  const router = useRouter();
  const { name, imageUrl, url } = category;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="overflow-hidden flex justify-center items-end relative rounded-xl hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(url)}
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
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </motion.div>
    </div>
  );
};

export default CategoryMenu;
