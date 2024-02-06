import Product from "@/types/models/product";
import { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  cart: Product[];
  setCart: (newCart: Product[]) => void;
}

export const GlobalContext = createContext<ContextProps>({
  cart: [],
  setCart: () => {},
});
