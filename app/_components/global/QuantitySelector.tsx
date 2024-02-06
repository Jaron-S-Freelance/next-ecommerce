"use client";

import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

type Size = "xs" | "sm" | "md" | "lg";

interface QuantitySelectorProps {
  size?: Size;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const QuantitySelector = ({
  size,
  defaultValue,
  onChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(defaultValue || 1);

  useEffect(() => {
    setQuantity(defaultValue || 1);
  }, [defaultValue]);

  const handleIncrement = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newValue);
    if (onChange) onChange(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (onChange) onChange(value);
    setQuantity(isNaN(value) ? 0 : value);
  };

  const getSizeClass = (size: Size | undefined) => {
    const sizeClasses = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    };
    if (size) return sizeClasses[size];
    else return "";
  };

  return (
    <div>
      {size !== "sm" && <span className="py-2 mb-2">Quantity</span>}
      <div className={`input flex items-center ${getSizeClass(size)}`}>
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
export default QuantitySelector;
