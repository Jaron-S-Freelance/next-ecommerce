import Head from "next/head";

const productDetails = (params: { id: string }) => {
  const productId = params.id;
  return (
    <>
      <Head>
        <title>Fusion Design | Product</title>
        <meta name="description" content={""} />
      </Head>

      <h2>Product Page</h2>
      <span>Nothing here yet...</span>
    </>
  );
};

export default productDetails;
