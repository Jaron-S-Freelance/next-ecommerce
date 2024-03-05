"use client";

import PageLayout from "@/app/_components/layout/PageLayout";
import ProductDetails from "@/app/_components/ui/products/ProductDetails";
import Head from "next/head";

const productDetails = ({ params }: { params: { id: string } }) => {
  const productId = params.id;
  return (
    <>
      <Head>
        <title>Fusion Design | Product</title>
        <meta name="description" content={""} />
      </Head>
      <PageLayout>
        <ProductDetails productId={productId} />
      </PageLayout>
    </>
  );
};

export default productDetails;
