import carouselData from "@/app/_mocks/data/carousel";

export const images: string[] = carouselData.map((item) => item.imageUrl);

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
