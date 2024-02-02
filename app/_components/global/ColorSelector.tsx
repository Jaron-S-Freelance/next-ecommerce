"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type ColorType = "blue" | "pink" | "yellow" | "green";

interface ColorSelectorProps {
  options: ColorType[];
  selectedColor?: ColorType | null;
  setSelectedColor?: Dispatch<SetStateAction<ColorType | null>>;
  selectedColors?: ColorType[];
  setSelectedColors?: Dispatch<SetStateAction<ColorType[]>>;
  isClearable?: boolean;
}

const ColorSelector = ({
  options,
  selectedColor,
  setSelectedColor,
  selectedColors,
  setSelectedColors,
  isClearable,
}: ColorSelectorProps) => {
  const isMultiple = setSelectedColors && selectedColors;
  const isSingle = setSelectedColor && selectedColor;

  const handleButtonClick = (color: ColorType) => {
    // Single selectable
    if (isSingle) {
      if (isClearable && color === selectedColor)
        setSelectedColor(null);
      else setSelectedColor(color);
    }
    // Multiple selectable
    else if (isMultiple) {
      if (isClearable && selectedColors.includes(color)) {
        setSelectedColors(selectedColors.filter((c) => c !== color));
      } else if (!selectedColors.includes(color)) {
        setSelectedColors(selectedColors.concat(color));
      }
    }
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
        {options.map((color) => (
          <button
            key={color}
            onClick={() => handleButtonClick(color)}
            className={`safe btn btn-circle btn-sm glass ring-1 ${
              color === selectedColor || selectedColors?.includes(color)
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
