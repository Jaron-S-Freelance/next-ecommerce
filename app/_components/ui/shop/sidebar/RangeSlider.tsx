import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value: number) {
  return `$${value}`;
}

interface RangeSliderProps {
  min: number;
  max: number;
  initialValues: number[];
  onChange: (value: number[]) => void;
}

const RangeSlider = ({
  min,
  max,
  initialValues,
  onChange,
}: RangeSliderProps) => {
  const [value, setValue] = useState<number[]>(initialValues);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <>
      <div className="px-2">
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          getAriaValueText={valuetext}
        />
      </div>
      <div className="text-md mt-4">
        <label className="">Price:</label>
        {" $"}
        {value[0].toFixed(0)} -{" $"}
        {value.length > 1 ? value[1].toFixed(0) : max.toFixed(0)}
      </div>
    </>
  );
};

export default RangeSlider;
