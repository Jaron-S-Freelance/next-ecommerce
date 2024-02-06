import Product from "@/types/models/product";
import Image from "next/image";
import Rating from "../ui/products/Rating";
import ColorSelector, { ColorType } from "./ColorSelector";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { FaCartPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

interface QuickviewModalProps {
  product: Product;
}

const QuickviewModal = ({ product }: QuickviewModalProps) => {
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <dialog className="modal">
        <div className="modal-box scrollable-content">
          <label
            htmlFor="my_modal_7"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <QuickviewContent product={product} />
        </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </dialog>
    </>
  );
};

interface QuickviewContentProps {
  product: Product;
}

const QuickviewContent = ({ product }: QuickviewContentProps) => {
  const { id, title, description, price, imageUrl, rating, category, tags } =
    product;
  return (
    <div className="min-h-screen w-full flex flex-col py-4 px-8">
      <h2 className="font-bold text-3xl mb-4">{title}</h2>
      <Image src={imageUrl} alt={""} width={392} height={392} />
      <AddToCart />
      <Description description={description} price={price} rating={rating} />
    </div>
  );
};

interface DescriptionProps {
  description: string;
  price: number;
  rating: number;
}

const Description = ({ description, price, rating }: DescriptionProps) => {
  return (
    <div>
      <div className="flex">
        <Rating rating={rating} />
      </div>
      <span className="text-2xl">${price}.00</span>
      <p className="py-4">{description}</p>
    </div>
  );
};

const AddToCart = () => {
  const [color, setColor] = useState<ColorType | null>("blue");
  const buttonColors: ColorType[] = ["blue", "pink", "yellow"];
  return (
    <div className="flex flex-col items-justify-center w-full">
      <h3 className="flex py-2">
        <span className="font-semibold">Color:&nbsp;</span>
        <span className="capitalize">{color}</span>
      </h3>
      <ColorSelector
        options={buttonColors}
        selectedColor={color}
        setSelectedColor={setColor}
      />
      <div>
        <div className="flex items-end gap-5">
          <QuantitySelector size="md" />
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

export default QuickviewModal;
