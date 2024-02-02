import React, { useState } from "react";

interface AvailabilityCheckboxesProps {
  onSelectionChange: (selectedValues: string[]) => void; // Callback prop to pass selected values to parent
}

const AvailabilityCheckboxes: React.FC<AvailabilityCheckboxesProps> = ({
  onSelectionChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setSelectedValues((prevValues) => {
      const newValues = prevValues.includes(value)
        ? prevValues.filter((v) => v !== value) // Remove value if it's already selected
        : [...prevValues, value]; // Add value if it's not already selected
      onSelectionChange(newValues); // Pass the new selection to the parent component
      return newValues;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedValues.includes("available")}
          onChange={() => handleChange("available")}
        />
        <span className="label-text">Available</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedValues.includes("unavailable")}
          onChange={() => handleChange("unavailable")}
        />
        <span className="label-text">Unavailable</span>
      </div>
    </div>
  );
};

export default AvailabilityCheckboxes;
