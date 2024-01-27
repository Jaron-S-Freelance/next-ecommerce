"use client";

import React, { useEffect, useState } from "react";

type ColorType = "primary" | "secondary" | "warning";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState<ColorType>("primary");

  const handleButtonClick = (color: ColorType) => {
    setSelectedColor(color);
  };

  const colorName = (color: ColorType) =>
    color === "primary"
      ? "Blue"
      : color === "secondary"
      ? "Pink"
      : color === "warning"
      ? "Yellow"
      : "";

  const buttonColors: ColorType[] = ["primary", "secondary", "warning"];

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
            className={`btn btn-circle btn-sm glass ${
              color === "primary"
                ? "bg-primary ring-primary"
                : color === "secondary"
                ? "bg-secondary ring-secondary"
                : "bg-warning ring-warning"
            } ${
              selectedColor === color
                ? "ring-1 ring-offset-2 ring-offset-[#161b22]"
                : ""
            }`}
            aria-label={`Button ${color}`}
          />
        ))}
      </div>
    </>
  );
};

export default ColorSelector;
