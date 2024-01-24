"use client";

import Layout from "@/app/_components/shared/Layout";
import Carousel from "@/app/_components/ui/home/Carousel/Carousel";
import CategoryCards from "@/app/_components/ui/home/CategoryCards";
import FeaturedProducts from "@/app/_components/ui/home/FeaturedProducts";
import carouselData from "@/app/_mocks/data/carousel";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const images = carouselData.map((item) => item.imageUrl);

  useEffect(() => {
    const productData = getProducts();
    setProducts(productData);
  }, []);

  return (
    <>
      <Head>
        <title>Fusion Design | Home</title>
        <meta name="description" content={""} />
      </Head>
      <Layout>
        <Carousel images={images} />
        <CategoryCards />
        <FeaturedProducts />
      </Layout>
    </>
  );
}
