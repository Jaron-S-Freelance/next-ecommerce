export default interface Category {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  subCategories: { name: string; url: string }[];
}
