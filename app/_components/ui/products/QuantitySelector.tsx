"use client";

import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

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
export default QuantitySelector;
