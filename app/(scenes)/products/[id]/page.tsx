"use client";

import Layout from "@/app/_components/shared/Layout";
import ProductDetails from "@/app/_components/ui/products/ProductDetails";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Head from "next/head";

const productDetails = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const product = getProducts().find((product) => product.id === params.id);
  return (
    <>
      <Head>
        <title>Fusion Design | Product</title>
        <meta name="description" content={""} />
      </Head>
      <Layout>{product && <ProductDetails product={product} />}</Layout>
    </>
  );
};

export default productDetails;
