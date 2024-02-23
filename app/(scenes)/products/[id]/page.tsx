"use client";

import PageLayout from "@/app/_components/layout/PageLayout";
import ProductDetails from "@/app/_components/ui/products/ProductDetails";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Head from "next/head";

const productDetails = ({ params }: { params: { id: string } }) => {
  const product = getProducts().find((product) => product.id === params.id);
  return (
    <>
      <Head>
        <title>Fusion Design | Product</title>
        <meta name="description" content={""} />
      </Head>
      <PageLayout>{product && <ProductDetails product={product} />}</PageLayout>
    </>
  );
};

export default productDetails;
