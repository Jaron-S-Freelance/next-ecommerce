import Product from "@/types/models/product";
import productsData from "../data/products.json";

const products: Product[] = productsData as Product[];

export const getProducts = (): Product[] => {
  return products;
};
