"use client";

import Layout from "@/app/_components/layout/Layout";
import Carousel from "@/app/_components/ui/home/Carousel";
import CategoryCards from "@/app/_components/ui/home/CategoryCards";
import HomepageProducts from "@/app/_components/ui/home/HomepageProducts";
import carouselData from "@/app/_mocks/data/carousel";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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
        <Carousel carouselItems={carouselData} className="mb-40" />
        <CategoryCards />
        <HomepageProducts />
      </Layout>
    </>
  );
}
