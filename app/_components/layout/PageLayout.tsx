import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../ui/navbar/Cart/Cart";

type LayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Cart />
      <Footer />
    </div>
  );
};

export default PageLayout;
