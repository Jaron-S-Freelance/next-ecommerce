"use client";

import React, { useEffect, useState } from "react";

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
            className={`btn btn-circle btn-sm glass bg-${color} ring-${color} ${
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

export default ColorSelector;
