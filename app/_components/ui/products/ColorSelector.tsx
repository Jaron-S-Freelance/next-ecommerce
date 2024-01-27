"use client";

import React, { useEffect, useState } from "react";

type ColorType = "blue" | "pink" | "yellow";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState<ColorType>("blue");

  const handleButtonClick = (color: ColorType) => {
    setSelectedColor(color);
  };

  const buttonColors: ColorType[] = ["blue", "pink", "yellow"];

  const colorVariants: { blue: string; pink: string; yellow: string } = {
    blue: "bg-primary ring-primary",
    pink: "bg-secondary ring-secondary",
    yellow: "bg-warning ring-warning",
  };

  return (
    <>
      <h3 className="flex py-2">
        <span className="font-semibold">Color:&nbsp;</span>
        <span className="capitalize">{selectedColor}</span>
      </h3>

      <div className="flex space-x-4 mb-2">
        {buttonColors.map((color) => (
          <button
            key={color}
            onClick={() => handleButtonClick(color)}
            className={`safe btn btn-circle btn-sm glass ring-1 ${
              color === selectedColor
                ? "ring-offset-2 ring-offset-[#161b22]"
                : ""
            } ${colorVariants[color]}`}
            aria-label={`Button ${color}`}
          />
        ))}
      </div>
    </>
  );
};

export default ColorSelector;
