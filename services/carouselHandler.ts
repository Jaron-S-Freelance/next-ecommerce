import CarouselItem from "@/types/models/carouselItem";

export const getCarouselItems = async (): Promise<CarouselItem[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/carousel-items/`
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
