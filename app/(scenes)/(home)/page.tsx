"use client";

import PageLayout from "@/app/_components/layout/PageLayout";
import Carousel from "@/app/_components/ui/home/Carousel";
import CategoryCards from "@/app/_components/ui/home/CategoryCards";
import HomepageProducts from "@/app/_components/ui/home/HomepageProducts";
import carouselData from "@/app/_mocks/data/carousel";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fusion Design | Home</title>
        <meta name="description" content={""} />
      </Head>
      <PageLayout>
        <Carousel carouselItems={carouselData} className="mb-40" />
        <CategoryCards />
        <HomepageProducts />
      </PageLayout>
    </>
  );
}
