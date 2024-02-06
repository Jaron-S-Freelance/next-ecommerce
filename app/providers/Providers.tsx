"use client";

import { ReactNode, useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CartItem } from "@/types/models/cart";
import Product from "@/types/models/product";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity?: number) => {
    const itemInCart = cart.find((item) => item.product.id === product.id);
    if (itemInCart) {
      // Map over the cart to update the quantity of the existing item
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: quantity ? item.quantity + quantity : item.quantity + 1,
            }
          : item
      );
      setCart(updatedCart);
    } else {
      // If the item does not exist in the cart, add it as a new entry
      const newItem = { product, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
