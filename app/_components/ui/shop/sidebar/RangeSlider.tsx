import React, { useState, useEffect, useRef, useMemo } from "react";

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

  const arraysEqual = (a: number[], b: number[]) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  useMemo(() => {
    if (!arraysEqual(values, initialValues)) onChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  type DragEvent =
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.TouchEvent<HTMLDivElement>;

  const getEventCoordinates = (event: MouseEvent | TouchEvent | Touch) => {
    if ("touches" in event) return event.touches[0];
    return event;
  };

  const handleDragStart = (index: number, event: DragEvent) => {
    const isTouchEvent = event.type.startsWith("touch");
    const moveEventType = isTouchEvent ? "touchmove" : "mousemove";
    const endEventType = isTouchEvent ? "touchend" : "mouseup";

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      const effectiveEvent = getEventCoordinates(moveEvent);
      handleDragMove(index, effectiveEvent);
    };

    const cleanup = () => {
      document.removeEventListener(moveEventType, moveHandler);
      document.removeEventListener(endEventType, cleanup);
    };

    document.addEventListener(moveEventType, moveHandler, {
      passive: false,
      capture: true,
    });
    document.addEventListener(endEventType, cleanup, {
      passive: false,
      capture: true,
    });

    if (isTouchEvent) {
      event.preventDefault(); // Prevent default for touch events to avoid warnings
    }
  };

  const handleDragMove = (index: number, event: MouseEvent | Touch) => {
    if (!sliderRef.current) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();

    // Define a type guard to check if the event is a MouseEvent
    const isMouseEvent = (event: MouseEvent | Touch): event is MouseEvent => {
      return "clientX" in event;
    };

    // Use the type guard to check the event type and access `clientX` accordingly
    const clientX = isMouseEvent(event) ? event.clientX : event.pageX;

    const newPercentage = Math.max(0, Math.min((clientX - left) / width, 1));
    const newValue = min + newPercentage * (max - min);

    setValues((currentValues) => {
      const newValues = [...currentValues];
      newValues[index] = newValue;

      // Prevent the range values from crossing each other
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
                onTouchStart={(event) => handleDragStart(index, event)}
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
