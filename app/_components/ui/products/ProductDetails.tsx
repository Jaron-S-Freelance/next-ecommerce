import Product from "@/types/models/product";
import Rating from "./Rating";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import ColorSelector, { ColorType } from "../../global/ColorSelector";
import QuantitySelector from "../../global/QuantitySelector";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/providers/Providers";
import AddToCart from "./AddToCart";

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { products } = useGlobalContext();
  const product = products.find((product) => product.id === productId);
  const { title, description, price, imageUrl, rating } =
    product || ({} as Product);
  return (
    product && (
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
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
              alt={""}
              width={392}
              height={392}
            />
          </div>

          <AddToCart product={product} />
        </div>
      </div>
    )
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

export default ProductDetails;
