"use client";

import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import ProductGrid from "../../global/ProductGrid";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";

const HomepageProducts = () => {
  const [selectedFilter, setSelectedFilter] = useState("featured");
  const products: Product[] = getProducts();

  const filteredProducts = products.filter((product) =>
    product.tags?.includes(selectedFilter)
  );

  console.log("filtered: ", selectedFilter, filteredProducts);

  const selectedTagTitle =
    selectedFilter === "featured"
      ? "Featured Products"
      : selectedFilter === "popular"
      ? "Popular Items"
      : selectedFilter === "new_arrival"
      ? "New Arrivals"
      : null;

  return (
    <div className="flex flex-col items-center my-16">
      <h3 className="font-semibold text-md text-center underline underline-offset-2 mb-2">
        TOP PICKS
      </h3>
      <FilterSelector
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <h2 className="text-center font-bold text-5xl m-2 mb-16">
        {selectedTagTitle}
      </h2>
      <ProductGrid products={filteredProducts} size="lg" />
    </div>
  );
};

interface FilterSelectorProps {
  selectedFilter: string;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
}

const FilterSelector = ({
  selectedFilter,
  setSelectedFilter,
}: FilterSelectorProps) => {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex justify-between gap-2">
        <button
          className={`btn rounded-full ${
            selectedFilter === "popular" ? "btn-outline" : "btn-ghost"
          }`}
          onClick={() => setSelectedFilter("popular")}
        >
          Popular Items
        </button>
        <button
          className={`btn rounded-full ${
            selectedFilter === "featured" ? "btn-outline" : "btn-ghost"
          }`}
          onClick={() => setSelectedFilter("featured")}
        >
          Featured Products
        </button>
        <button
          className={`btn rounded-full ${
            selectedFilter === "new_arrival" ? "btn-outline" : "btn-ghost"
          }`}
          onClick={() => setSelectedFilter("new_arrival")}
        >
          New Arrivals
        </button>
      </div>
    </div>
  );
};

export default HomepageProducts;