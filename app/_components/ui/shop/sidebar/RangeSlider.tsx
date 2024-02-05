import React, { useState, useEffect, useRef } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  initialValues: number[];
  onChange: (values: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  initialValues,
  onChange,
}) => {
  const [values, setValues] = useState(initialValues);
  const sliderRef = useRef<HTMLDivElement>(null); // Ref for the slider's container for size calculations

  useEffect(() => {
    if (!arraysEqual(values, initialValues)) {
      onChange(values);
    }
  }, [values, onChange, initialValues]);

  const arraysEqual = (a: number[], b: number[]) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const handleDragStart = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const moveHandler = (moveEvent: MouseEvent) => {
      handleDragMove(index, moveEvent);
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    event.preventDefault(); // Prevent text selection during drag
  };

  const handleDragMove = (index: number, event: MouseEvent) => {
    if (!sliderRef.current) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();
    const newPercentage = Math.max(
      0,
      Math.min((event.clientX - left) / width, 1)
    );
    const newValue = min + newPercentage * (max - min);

    setValues((currentValues) => {
      const newValues = [...currentValues];
      newValues[index] = newValue;

      // Prevent the range values from crossing over each other
      if (newValues.length > 1) {
        if (index === 0 && newValues[0] > newValues[1]) {
          newValues[0] = newValues[1];
        } else if (index === 1 && newValues[1] < newValues[0]) {
          newValues[1] = newValues[0];
        }
      }

      return newValues;
    });
  };

  const calculatePercentage = (value: number) =>
    ((value - min) / (max - min)) * 100;

  return (
    <div className="flex m-auto items-center justify-center px-2">
      <div ref={sliderRef} className="relative w-full">
        <div className="flex items-center h-2 bg-gray-200 rounded-full">
          {values.map((value, index) => (
            <React.Fragment key={index}>
              {index === 1 && (
                <div
                  className="absolute h-2 bg-primary rounded-full"
                  style={{
                    left: `${calculatePercentage(values[0])}%`,
                    width: `${
                      calculatePercentage(value) -
                      calculatePercentage(values[0])
                    }%`,
                  }}
                ></div>
              )}
              <div
                className="absolute h-4 w-4 bg-white rounded-full shadow border border-gray-300 cursor-pointer z-10"
                style={{
                  left: `calc(${calculatePercentage(value)}% - 0.5rem)`,
                }}
                onMouseDown={(event) => handleDragStart(index, event)}
              ></div>
            </React.Fragment>
          ))}
        </div>
        <div className="text-md mt-4">
          <label className="">Price:</label>
          {" $"}
          {values[0].toFixed(0)} -{" $"}
          {values.length > 1 ? values[1].toFixed(0) : max.toFixed(0)}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
