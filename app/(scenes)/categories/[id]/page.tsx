"use client";

import PageLayout from "@/app/_components/layout/PageLayout";
import ShopByCategory from "@/app/_components/ui/shop/ShopByCategory";
import Head from "next/head";
import React from "react";

const category = ({ params }: { params: { id: string } }) => {
  const categoryId = params.id;
  return (
    <>
      <Head>
        <title>Fusion Design | Category</title>
        <meta name="description" content={""} />
      </Head>

      <PageLayout>
        <ShopByCategory categoryId={categoryId} />
      </PageLayout>
    </>
  );
};

export default category;
