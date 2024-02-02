import { ColorType } from "@/app/_components/global/ColorSelector";

export interface Filter {
  subCategories: string[];
  colors: ColorType[];
  priceRange: number[];
  availability: string[];
  tags: string[];
}

export default Filter;
