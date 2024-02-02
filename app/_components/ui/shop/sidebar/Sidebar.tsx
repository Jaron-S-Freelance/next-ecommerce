import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AvailabilityCheckboxes from "./AvailabilityCheckboxes";
import RangeSlider from "./RangeSlider";
import ColorSelector, { ColorType } from "../../../global/ColorSelector";
import Filter from "@/types/models/filter";
import Category from "@/types/models/category";
import Tags from "./Tags";

interface SidebarProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  category: Category;
  tags: string[];
}

const Sidebar = ({ filter, setFilter, category, tags }: SidebarProps) => {
  const [colors, setColors] = useState<ColorType[]>(filter.colors);
  const [subCategories, setSubCategories] = useState<string[]>(
    filter.subCategories
  );
  const [priceRange, setPriceRange] = useState<number[]>(filter.priceRange);
  const [availability, setAvailability] = useState<string[]>(
    filter.availability
  );
  const colorOptions: ColorType[] = ["blue", "pink", "yellow", "green"];

  const handleSubCategoryChange = (name: string) => {
    setSubCategories((currentSubCategories) => {
      return currentSubCategories.includes(name)
        ? currentSubCategories.filter((c) => c !== name)
        : [...currentSubCategories, name];
    });
  };

  const handlePriceRangeChange = (selectedPriceRange: number[]) => {
    setPriceRange(selectedPriceRange);
  };

  const handleAvailabilityChange = (selectedAvailability: string[]) => {
    setAvailability(selectedAvailability);
  };

  const handleTagChange = (selectedTags: string[]) => {
    setSubCategories(selectedTags);
  };

  // Update filter whenever it changes
  useEffect(() => {
    const newFilter = {
      ...filter,
      subCategories: subCategories,
      colors: colors,
      priceRange: priceRange,
      availability: availability,
    };
    setFilter(newFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, subCategories, priceRange, availability]);

  // Update local state on filter change
  useEffect(() => {
    setColors(filter.colors);
    setSubCategories(filter.subCategories);
    setPriceRange(filter.priceRange);
    setAvailability(filter.availability);
  }, [filter]);

  return (
    <div className="w-64">
      {/* Collection */}
      <h3 className="text-lg font-bold mb-4">Collection</h3>
      <ul className="flex flex-col gap-1">
        {category.subCategories.map((subCategory) => (
          <li
            className={`text-gray-400 hover:text-gray-300 hover:underline hover:cursor-pointer ${
              subCategories.includes(subCategory.name) &&
              "text-gray-300 hover:text-gray-400 underline"
            }`}
            key={`filter-${subCategory.name}`}
            onClick={() => handleSubCategoryChange(subCategory.name)}
          >
            {subCategory.name}
          </li>
        ))}
      </ul>
      <span className="block h-px bg-gray-700 my-4" />
      {/* Color */}
      <h3 className="text-lg font-bold mb-4">Color</h3>
      <ColorSelector
        options={colorOptions}
        selectedColors={colors}
        setSelectedColors={setColors}
        isClearable
      />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Price */}
      <h3 className="text-lg font-bold mb-4">Price</h3>
      <RangeSlider
        min={0}
        max={500}
        initialValues={[0, 500]}
        onChange={handlePriceRangeChange}
      />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Availability */}
      <h3 className="text-lg font-bold mb-4">Availability</h3>
      <AvailabilityCheckboxes onSelectionChange={handleAvailabilityChange} />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Tags */}
      <h3 className="text-lg font-bold mb-4">Tags</h3>
      <Tags tags={tags} onSelectionChange={handleTagChange} />
      <span className="block h-px bg-gray-700 my-4" />
    </div>
  );
};

export default Sidebar;
