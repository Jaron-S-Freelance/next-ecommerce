"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type ColorType = "blue" | "pink" | "yellow" | "green";

interface ColorSelectorProps {
  colors: ColorType[];
  selectedColor: ColorType | undefined;
  setSelectedColor: Dispatch<SetStateAction<ColorType | undefined>>;
}

const ColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) => {
  const handleButtonClick = (color: ColorType) => {
    setSelectedColor(color);
  };

  const colorVariants: {
    blue: string;
    pink: string;
    yellow: string;
    green: string;
  } = {
    blue: "bg-primary ring-primary hover:bg-blue-600",
    pink: "bg-secondary ring-secondary hover:bg-pink-600",
    yellow: "bg-warning ring-warning hover:bg-yellow-600",
    green: "bg-accent ring-accent hover:bg-teal-600",
  };

  return (
    <>
      <div className="flex space-x-4 mb-2">
        {colors.map((color) => (
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
