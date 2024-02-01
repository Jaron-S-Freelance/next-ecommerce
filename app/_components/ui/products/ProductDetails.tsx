import Product from "@/types/models/product";
import Rating from "./Rating";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import ColorSelector, { ColorType } from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { id, title, description, price, imageUrl, rating, category, tags } =
    product;
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row p-8 pt-36 md:gap-12 xl:gap-24">
      <div className="flex-1">
        <Description
          title={title}
          description={description}
          price={price}
          rating={rating}
        />
      </div>
      <div className="w-px bg-gray-700 hidden sm:block" />
      <div className="flex flex-col flex-1">
        <div className="flex justify-center md:justify-start">
          <Image src={imageUrl} alt={""} width={392} height={392} />
        </div>

        <AddToCart />
      </div>
    </div>
  );
};

interface DescriptionProps {
  title: string;
  description: string;
  price: number;
  rating: number;
}

const Description = ({
  title,
  description,
  price,
  rating,
}: DescriptionProps) => {
  return (
    <div>
      <h2 className="font-bold text-3xl">{title}</h2>
      <div className="flex">
        <Rating rating={rating} />
      </div>
      <span className="text-2xl">${price}.00</span>
      <p className="py-4">{description}</p>
    </div>
  );
};

const AddToCart = () => {
  const [color, setColor] = useState<ColorType | undefined>("blue");
  const buttonColors: ColorType[] = ["blue", "pink", "yellow"];
  return (
    <div className="flex flex-col items-justify-center">
      <h3 className="flex py-2">
        <span className="font-semibold">Color:&nbsp;</span>
        <span className="capitalize">{color}</span>
      </h3>
      <ColorSelector
        colors={buttonColors}
        selectedColor={color}
        setSelectedColor={setColor}
      />
      <div>
        <div className="flex items-end gap-5">
          <QuantitySelector />
          <button className="btn btn-outline">
            <FaCartPlus />
            Add to cart
          </button>
        </div>
        <button className="btn btn-wide my-4">
          <IoBagCheckOutline />
          Buy it now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
