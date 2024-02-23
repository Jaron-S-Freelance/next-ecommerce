import Product from "@/types/models/product";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

interface ProductGridProps {
  products: Product[];
  size?: "sm" | "md" | "lg";
}

const ProductGrid = ({ products, size }: ProductGridProps) => {
  const [limitedProducts, setLimitedProducts] = useState(products.slice(0, 16));
  const width =
    size === "sm"
      ? "150px"
      : size === "md"
      ? "186px"
      : size === "lg"
      ? "250px"
      : "150px";
  const height =
    size === "sm"
      ? "200px"
      : size === "md"
      ? "200px"
      : size === "lg"
      ? "300px"
      : "250px";

  const handleLoadMore = () => {
    const newLength = limitedProducts.length + 8;
    setLimitedProducts(products.slice(0, newLength));
  };

  useEffect(() => {
    setLimitedProducts(products.slice(0, 16));
  }, [products]);

  return (
    <div className="flex flex-col items-center w-screen overflow-auto">
      <div className="flex flex-wrap gap-8 justify-center">
        {limitedProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            height={height}
            width={width}
          />
        ))}
      </div>
      {products.length !== limitedProducts.length && (
        <button
          onClick={handleLoadMore}
          className="btn btn-outline rounded-3xl m-4"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductGrid;
