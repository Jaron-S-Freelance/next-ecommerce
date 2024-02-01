"use client";

import Layout from "@/app/_components/shared/Layout";
import ProductCategory from "@/app/_components/ui/category/ProductCategory";
import { getCategories } from "@/app/_mocks/handlers/categoryHandler";
import Head from "next/head";
import React from "react";

const category = ({ params }: { params: { id: string } }) => {
  const categoryId = params.id;
  const category = getCategories().find(
    (category) => category.id === categoryId
  );
  console.log(category);
  return (
    <>
      <Head>
        <title>Fusion Design | Category</title>
        <meta name="description" content={""} />
      </Head>

      <Layout>{category && <ProductCategory category={category} />}</Layout>
    </>
  );
};

export default category;
