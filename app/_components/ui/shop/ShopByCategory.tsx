import Category from "@/types/models/category";
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import ProductGrid from "../../global/ProductGrid";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import { getTags } from "@/app/_mocks/handlers/tagsHandler";
import { CgChevronDown } from "react-icons/cg";
import { IoIosCloseCircle } from "react-icons/io";
import Filter from "@/types/models/filter";
import Sidebar from "./sidebar/Sidebar";

const ShopByCategory = ({ category }: { category: Category }) => {
  const products = getProducts();
  const tags = getTags();
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

  const applyFilters = (products: Product[]) => {
    return products.filter((product) => product.category === category.id);
  };

  const filteredProducts = useMemo(() => {
    return applyFilters(products);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filter, sort]);
  

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row p-8 pt-44">
      <div className="flex-1">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          category={category}
          tags={tags}
        />
      </div>
      <div className="w-px bg-gray-700 hidden sm:block mx-6" />
      <div className="flex flex-col flex-2">
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
