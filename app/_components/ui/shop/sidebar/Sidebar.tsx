import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AvailabilityCheckboxes from "./AvailabilityCheckboxes";
import RangeSlider from "./RangeSlider";
import ColorSelector, { ColorType } from "../../../global/ColorSelector";
import Filter from "@/types/models/filter";
import Category from "@/types/models/category";
import Tags from "./Tags";
import { getTags } from "@/app/_mocks/handlers/tagsHandler";
import { IoFilterOutline } from "react-icons/io5";

interface SidebarProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  category: Category;
}

const Sidebar = ({ filter, setFilter, category }: SidebarProps) => {
  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start">
          {/* Page content here */}
          <label
            htmlFor="sidebar-drawer"
            className="btn btn-outline btn-sm drawer-button md:hidden"
          >
            <IoFilterOutline />
            Filters
          </label>
        </div>
        <div className="drawer-side md:w-4">
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SidebarDrawer
            filter={filter}
            setFilter={setFilter}
            category={category}
          />
          <div className="w-px bg-gray-700 hidden sm:block mx-6" />
        </div>
      </div>
    </>
  );
};

const SidebarDrawer = ({ filter, setFilter, category }: SidebarProps) => {
  const [colors, setColors] = useState<ColorType[]>(filter.colors);
  const [subCategories, setSubCategories] = useState<string[]>(
    filter.subCategories
  );
  const [priceRange, setPriceRange] = useState<number[]>(filter.priceRange);
  const [availability, setAvailability] = useState<string[]>(
    filter.availability
  );
  const [tags, setTags] = useState<string[]>(filter.tags);
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
    setTags(selectedTags);
  };
  useEffect(() => {
    const newFilter = {
      ...filter,
      subCategories,
      colors,
      priceRange,
      availability,
      tags,
    };

    if (!deepEqual(filter, newFilter)) {
      console.log("Updating filter due to local state change");
      setFilter(newFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, subCategories, priceRange, availability, tags, filter]);

  function deepEqual(object1: any, object2: any): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !deepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }

  function isObject(object: any) {
    return object != null && typeof object === "object";
  }
  return (
    <div>
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
        max={250}
        initialValues={[0, 250]}
        onChange={handlePriceRangeChange}
      />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Availability */}
      <h3 className="text-lg font-bold mb-4">Availability</h3>
      <AvailabilityCheckboxes onSelectionChange={handleAvailabilityChange} />
      <span className="block h-px bg-gray-700 my-4" />
      {/* Tags */}
      <h3 className="text-lg font-bold mb-4">Tags</h3>
      <Tags tags={getTags()} onSelectionChange={handleTagChange} />
      <span className="block h-px bg-gray-700 my-4" />
    </div>
  );
};

export default Sidebar;
