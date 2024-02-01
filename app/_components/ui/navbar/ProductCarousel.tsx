import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "@/types/models/product";
import ProductCard from "../home/ProductCard";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2500 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 2500, min: 1750 },
      items: 6,
    },
    laptop: {
      breakpoint: { max: 1750, min: 1500 },
      items: 4,
    },
    small_laptop: {
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
      infinite
      containerClass="carousel-container "
      itemClass="carousel-item-padding-40-px"
    >
      {products.map((product) => (
        <div key={product.id} className="flex justify-center">
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

export default ProductCarousel;
