"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CartItem } from "@/types/models/cart";
import Product from "@/types/models/product";
import Category from "@/types/models/category";
import { getCategories } from "../../services/categoryHandler";
import { getProducts } from "../../services/productHandler";
import CarouselItem from "@/types/models/carouselItem";
import { getCarouselItems } from "../../services/carouselHandler";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
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

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    const fetchCarouselItems = async () => {
      const carouselItems = await getCarouselItems();
      setCarouselItems(carouselItems);
    };
    fetchCarouselItems();
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        products,
        categories,
        carouselItems,
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
