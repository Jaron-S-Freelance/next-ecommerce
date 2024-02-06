import { useGlobalContext } from "@/app/providers/Providers";
import Product from "@/types/models/product";
import { useState } from "react";
import ColorSelector, { ColorType } from "../../global/ColorSelector";
import QuantitySelector from "../../global/QuantitySelector";
import { FaCartPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

const AddToCart = ({ product }: { product: Product }) => {
  const { addToCart } = useGlobalContext();
  const [color, setColor] = useState<ColorType | null>("blue");
  const buttonColors: ColorType[] = ["blue", "pink", "yellow"];
  return (
    <div className="flex flex-col items-justify-center">
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
          <QuantitySelector />
          <button
            className="btn btn-outline"
            onClick={() => addToCart(product)}
          >
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

export default AddToCart;
