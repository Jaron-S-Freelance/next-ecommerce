import { ColorType } from "@/app/_components/global/ColorSelector";

export default interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  subCategories: string[];
  colors: ColorType[];
  availability: boolean;
  tags: string[];
}

