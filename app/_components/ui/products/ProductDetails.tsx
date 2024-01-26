"use client";

import Product from "@/types/models/product";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import { BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

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
  return (
    <div className="flex flex-col items-justify-center">
      <ColorSelector />
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

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState<string>("primary");

  const handleButtonClick = (color: string) => {
    setSelectedColor(color);
  };

  const buttonColors = ["primary", "secondary", "warning"];
  const colorName = (color: string) =>
    color === "primary"
      ? "Blue"
      : color === "secondary"
      ? "Pink"
      : color === "warning"
      ? "Yellow"
      : "";

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  return (
    <>
      <h3 className="flex py-2">
        <span className="font-semibold">Color:&nbsp;</span>
        <span>{colorName(selectedColor)}</span>
      </h3>

      <div className="flex space-x-4 mb-2">
        {buttonColors.map((color) => (
          <button
            key={color}
            onClick={() => handleButtonClick(color)}
            className={`btn btn-circle btn-sm bg-${color} glass rounded-full ring-${color} ${
              selectedColor === color
                ? `ring-1 ring-offset-4 ring-offset-[#161b22]`
                : ""
            }`}
            aria-label={`Button ${color}`}
          />
        ))}
      </div>
    </>
  );
};

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };

  return (
    <div>
      <span className="py-2">Quantity</span>
      <div className="input flex items-center mt-2">
        <button onClick={handleDecrement}>
          <BiMinus />
        </button>
        <input
          value={quantity}
          onChange={handleChange}
          className="text-center bg-transparent w-10"
        ></input>
        <button onClick={handleIncrement} className="">
          <BiPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
