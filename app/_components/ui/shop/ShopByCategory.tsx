import Category from "@/types/models/category";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import ProductGrid from "../../global/ProductGrid";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import { CgChevronDown } from "react-icons/cg";
import { IoIosCloseCircle } from "react-icons/io";
import Filter from "@/types/models/filter";
import Sidebar from "./sidebar/Sidebar";

interface ShopByCategoryProps {
  category: Category;
}

const ShopByCategory = ({ category }: ShopByCategoryProps) => {
  const products: Product[] = getProducts();
  const [filter, setFilter] = useState<Filter>({
    subCategories: [],
    colors: [],
    priceRange: [],
    availability: [],
    tags: [],
  });
  const [sort, setSort] = useState<string>("Featured");
  const sortOptions = [
    "Featured",
    "Most popular",
    "Price, low to high",
    "Price, high to low",
  ];

  const applyFilters = (products: Product[]): Product[] => {
    let filteredProducts = products;

    // Filter by subCategories
    if (filter.subCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.subCategories?.some((subCategory) =>
          filter.subCategories.includes(subCategory)
        )
      );
    }

    // Filter by colors
    if (filter.colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.some((color) => filter.colors.includes(color))
      );
    }

    // Filter by priceRange
    if (filter.priceRange.length === 2) {
      const [minPrice, maxPrice] = filter.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Filter by availability
    if (filter.availability.length > 0) {
      const isAvailable = filter.availability.includes("available");
      filteredProducts = filteredProducts.filter(
        (product) => product.availability === isAvailable
      );
    }

    // Filter by tags
    if (filter.tags.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tags.some((tag) => filter.tags.includes(tag))
      );
    }

    // Sorting
    switch (sort) {
      case "Most popular":
        // Assuming 'rating' as a proxy for popularity
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "Price, low to high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price, high to low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // 'Featured' or any other default sorting logic
        // Consider keeping the original order or applying another default sorting criterion
        break;
    }

    return filteredProducts;
  };

  const filteredProducts = useMemo(() => {
    return applyFilters(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filter, sort]);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row p-8 pt-44">
      <div className="flex-1">
        <Sidebar
          filter={filter}
          setFilter={handleFilterChange}
          category={category}
        />
      </div>
      <div className="w-px bg-gray-700 hidden sm:block mx-6" />
      <div className="flex flex-col flex-2 w-full">
        <div className="flex justify-between py-6">
          <ActiveFilters filter={filter} setFilter={setFilter} />
          <Sort
            options={sortOptions}
            selectedOption={sort}
            setSelectedOption={setSort}
          />
        </div>
        <ProductGrid products={filteredProducts} size="md" />
      </div>
    </div>
  );
};

interface ActiveFiltersProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filter, setFilter }) => {
  const removeFilter = (type: keyof Filter, name: string) => {
    const updatedFilters = filter[type]?.filter((item) => item !== name) || [];
    setFilter({ ...filter, [type]: updatedFilters });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filter.subCategories?.map((name) => (
        <FilterChip
          name={name}
          key={`active_filter-${name}`}
          onRemove={() => removeFilter("subCategories", name)}
        />
      ))}
      {filter.colors?.map((name) => (
        <FilterChip
          name={name}
          key={`active_filter-${name}`}
          onRemove={() => removeFilter("colors", name)}
        />
      ))}
      {filter.availability?.map((name) => (
        <FilterChip
          name={name}
          key={`active_filter-${name}`}
          onRemove={() => removeFilter("availability", name)}
        />
      ))}
      {filter.tags?.map((name) => (
        <FilterChip
          name={name}
          key={`active_filter-${name}`}
          onRemove={() => removeFilter("tags", name)}
        />
      ))}
    </div>
  );
};

interface FilterChipProps {
  name: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ name, onRemove }) => {
  return (
    <div className="flex items-center capitalize bg-gray-800 rounded-lg p-1 px-3">
      {name.replaceAll("_", " ")}
      <IoIosCloseCircle
        className="ml-2 hover:cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
};

interface SortProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const Sort = ({ options, selectedOption, setSelectedOption }: SortProps) => {
  // Handle the selection change
  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="flex items-center justify-start mr-7">
      <label htmlFor="sort-dropdown" className="text-nowrap m-2">
        Sort by:
      </label>
      <div className="dropdown dropdown-bottom mr-2">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center m-1 font-semibold"
        >
          {selectedOption} <CgChevronDown className="m-1" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
        >
          {options.map((option, index) => (
            <li key={index} onClick={() => handleChange(option)}>
              <a>{option}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopByCategory;
