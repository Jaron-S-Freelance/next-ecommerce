import React from "react";
import CategoryCards from "./CategoryCards";
import HomepageProducts from "./HomepageProducts";
import Carousel from "./Carousel";
import { useGlobalContext } from "@/app/providers/Providers";

const Homepage = () => {
  const { carouselItems } = useGlobalContext();
  return (
    <>
      <Carousel carouselItems={carouselItems} className="mb-40" />
      <CategoryCards />
      <HomepageProducts />
    </>
  );
};

export default Homepage;
