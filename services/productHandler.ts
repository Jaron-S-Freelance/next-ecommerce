import Product from "@/types/models/product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/`
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
