import Category from "@/types/models/category";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import ProductGrid from "../home/ProductGrid";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import ColorSelector, { ColorType } from "../products/ColorSelector";
import { getTags } from "@/app/_mocks/handlers/tagsHandler";

const ProductCategory = ({ category }: { category: Category }) => {
  const products = getProducts();
  const tags = getTags();
  const [filters, setFilters] = useState<string[]>([category.name]);

  const applyFilters = (products: Product[]) => {
    return products.filter((product) => product.category === category.id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredProducts = useMemo(() => applyFilters(products), [products]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row p-8 pt-44">
      <div className="flex-1">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          category={category}
          tags={tags}
        />
      </div>
      <div className="w-px bg-gray-700 hidden sm:block mx-6" />
      <div className="flex flex-col flex-2">
        {/* <div className="flex flex-between">
          <ActiveFilters />
          <Sort />
        </div> */}

        <ProductGrid products={filteredProducts} size="md" />
      </div>
    </div>
  );
};

interface SidebarProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  category: Category;
  tags: string[];
}

const Sidebar = ({ filters, setFilters, category, tags }: SidebarProps) => {
  const [color, setColor] = useState<ColorType | undefined>();
  const colors: ColorType[] = ["blue", "pink", "yellow", "green"];

  return (
    <div className="w-64">
      {/* Collection */}
      <h3 className="text-lg font-bold mb-4">Collection</h3>
      <ul className="flex flex-col gap-1">
        {category.subCategories.map((subCategory) => (
          <li
            className="text-gray-400 hover:underline hover:cursor-pointer"
            key={`filter-${subCategory.name}`}
          >
            {subCategory.name}
          </li>
        ))}
      </ul>
      <span className="block h-px bg-gray-700 my-4" />
      {/* Color */}
      <h3 className="text-lg font-bold mb-4">Color</h3>
      <ColorSelector
        colors={colors}
        selectedColor={color}
        setSelectedColor={setColor}
      />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Price */}
      <h3 className="text-lg font-bold mb-4">Price</h3>
      <input type="range" min={0} max="100" className="range" />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Availability */}
      <h3 className="text-lg font-bold mb-4">Availability</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input type="radio" name="radio-1" className="radio" />
          <span className="label-text">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <input type="radio" name="radio-1" className="radio" disabled />
          <span className="label-text">Unavailable</span>
        </div>
      </div>

      <span className="block h-px bg-gray-700 my-4" />
      {/* Tags */}
      <h3 className="text-lg font-bold mb-4">Tags</h3>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={`filter-${tag}`}>
            <button className="btn btn-outline btn-sm capitalize text-nowrap">
              {tag.replaceAll("_", " ")}
            </button>
          </li>
        ))}
      </ul>
      <span className="block h-px bg-gray-700 my-4" />
    </div>
  );
};

const ActiveFilters = () => {
  return <div>Filters</div>;
};

const Sort = () => {
  return <div>Sort</div>;
};

export default ProductCategory;
