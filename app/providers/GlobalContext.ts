import CarouselItem from "@/types/models/carouselItem";
import { CartItem } from "@/types/models/cart";
import Category from "@/types/models/category";
import Product from "@/types/models/product";
import { createContext } from "react";

interface ContextProps {
  products: Product[];
  categories: Category[];
  carouselItems: CarouselItem[];
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
  addToCart: (product: Product) => void;
}

export const GlobalContext = createContext<ContextProps>({
  products: [] as Product[],
  categories: [] as Category[],
  carouselItems: [] as CarouselItem[],
  cart: [] as CartItem[],
  setCart: () => {},
  addToCart: () => {},
});
