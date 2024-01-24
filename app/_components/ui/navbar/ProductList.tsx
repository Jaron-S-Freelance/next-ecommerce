import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "@/types/models/product";
import ProductCard from "../home/ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 5,
    },
    laptop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      ssr
      autoPlay
      autoPlaySpeed={3000}
      keyBoardControl={true}
      arrows={false}
      infinite
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
    >
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard
            product={product}
            disableActions
            width="200px"
            height="200px"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductList;
