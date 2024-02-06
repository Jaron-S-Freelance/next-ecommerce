import { CartItem } from "@/types/models/cart";
import Product from "@/types/models/product";
import { createContext } from "react";

interface ContextProps {
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
  addToCart: (product: Product) => void;
}

export const GlobalContext = createContext<ContextProps>({
  cart: [] as CartItem[],
  setCart: () => {},
  addToCart: () => {},
});
