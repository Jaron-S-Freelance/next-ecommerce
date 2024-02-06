"use client";

import { ReactNode, useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import Product from "@/types/models/product";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
