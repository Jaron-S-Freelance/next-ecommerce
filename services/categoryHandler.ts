import Category from "@/types/models/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("There was an error!", error);
    return [];
  }
};
