"use client";

import PageLayout from "@/app/_components/layout/PageLayout";
import Homepage from "@/app/_components/ui/home/Homepage";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fusion Design | Home</title>
        <meta name="description" content={""} />
      </Head>
      <PageLayout>
        <Homepage />
      </PageLayout>
    </>
  );
}
