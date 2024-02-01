import categoryData from "../data/categories.json";
import Category from "@/types/models/category";

const categories: Category[] = categoryData.categories;

export const getCategories = (): Category[] => {
  return categories;
};
