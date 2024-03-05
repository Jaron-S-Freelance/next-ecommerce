"use client";

import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import "@/app/styles/navbar.css";
import ProductList from "./ProductCarousel";
import CategoryMenu from "./CategoryMenu";
import { useGlobalContext } from "@/app/providers/Providers";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (dropdown: string | null) =>
    setActiveDropdown(dropdown);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <div className="navbar bg-base-300 relative">
      {/* Logo & Mobile Menu*/}
      <div className="navbar-start">
        <MobileMenu />
        <Link
          className="flex sm:mx-8 text-lg xs:text-xl sm:text-2xl font-semibold items-center"
          href={"/"}
        >
          <Image
            src={"/fusion-logo-white.png"}
            alt={"logo"}
            width={50}
            height={50}
          />
          <span className="block">Fusion Design</span>
        </Link>
      </div>
      {/* Navigation */}
      <div className="navbar-center hidden lg:flex">
        <NavbarLinks
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          activeDropdown={activeDropdown}
        />
      </div>
      <div className="navbar-end">
        <SearchButton />
        <CartButton />
        <Profile />
      </div>
      {/* Dropdowns */}
      <div
        className={`absolute left-0 w-full bg-base-100 shadow z-10 ${
          activeDropdown ? "block" : "hidden"
        }`}
        onMouseEnter={() => handleMouseEnter(activeDropdown)}
        onMouseLeave={handleMouseLeave}
      >
        {activeDropdown === "shop" && <ShopDropdown />}
        {activeDropdown === "popular" && <PopularDropdown />}
        {activeDropdown === "newArrivals" && <NewArrivalsDropdown />}
      </div>
    </div>
  );
};

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, () => setIsSearchOpen(false));

  const variants = {
    closed: { width: "32px" },
    open: { width: "200px" },
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isSearchOpen ? "open" : "closed"}
        variants={variants}
        className="items-center overflow-hidden cursor-pointer mx-3 hidden sm:flex"
        onClick={() => (isSearchOpen ? null : setIsSearchOpen(true))}
      >
        {isSearchOpen && (
          <motion.input
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.2 }}
            type="text"
            placeholder="Search..."
            className="input input-bordered focus:outline-none flex-1 pl-11 font-sans"
            ref={wrapperRef}
          />
        )}
        <CiSearch size="24px" className="absolute translate-x-3" />
      </motion.div>
      <div className="dropdown dropdown-bottom dropdown-end mx-3 sm:hidden">
        <div tabIndex={0} role="button">
          <CiSearch size="24px" />
        </div>
        <div>
          <input
            tabIndex={0}
            placeholder="Search..."
            className="dropdown-content z-[1] p-3 shadow bg-base-100 rounded-box w-52"
          />
        </div>
      </div>
    </>
  );
};

const CartButton = () => {
  const { cart } = useGlobalContext();
  const cartSize = cart
    .map((item) => item.quantity)
    .reduce((acc, current) => acc + current, 0);

  return (
    <label
      htmlFor="my-drawer-4"
      className="btn btn-ghost btn-circle drawer-button"
      tabIndex={0}
      role="button"
    >
      <div className="indicator">
        <CiShoppingCart size="24px" />
        <span className="badge badge-sm indicator-item">{cartSize}</span>
      </div>
    </label>
  );
};

const Profile = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <CiUser size="24px" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

const MobileMenu = () => {
  const router = useRouter();
  const { categories } = useGlobalContext();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
      >
        <li>
          <div tabIndex={1} className="collapse">
            <div className="text-lg flex items-center -mb-2">Shop</div>
            <div className="collapse-content flex flex-col">
              {categories.map((category) => (
                <a
                  key={`mobile-menu-category-${category.id}`}
                  className="hover:cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(category.url);
                  }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </li>

        <li>
          <a className="text-lg text-gray-500">About</a>
        </li>
        <li>
          <a className="text-lg text-gray-500">Contact</a>
        </li>
      </ul>
    </div>
  );
};

interface NavbarLinksProps {
  onHover: (dropdown: string) => void;
  onLeave: () => void;
  activeDropdown: string | null;
}

const NavbarLinks = ({
  onHover,
  onLeave,
  activeDropdown,
}: NavbarLinksProps) => {
  const isActive = (dropdown: string) => activeDropdown === dropdown;
  return (
    <ul className="menu-horizontal px-1 gap-8">
      <li
        onMouseEnter={() => onHover("shop")}
        onMouseLeave={onLeave}
        className="p-6 -m-6"
      >
        <div className="flex items-center gap-1">
          <span
            className={`hover-underline ${
              isActive("shop") ? "active-underline" : ""
            }`}
          >
            Shop
          </span>
          <IoChevronDownOutline size={"14px"} />
        </div>
      </li>
      <li
        onMouseEnter={() => onHover("popular")}
        onMouseLeave={onLeave}
        className="p-6 -m-6"
      >
        <div className="flex items-center gap-1">
          <span
            className={`hover-underline ${
              isActive("popular") ? "active-underline" : ""
            }`}
          >
            Popular
          </span>
        </div>
      </li>
      <li
        onMouseEnter={() => onHover("newArrivals")}
        onMouseLeave={onLeave}
        className="p-6 -m-6"
      >
        <div className="flex items-center gap-1">
          <span
            className={`hover-underline ${
              isActive("newArrivals") ? "active-underline" : ""
            }`}
          >
            New Arrivals
          </span>
        </div>
      </li>
      <li>
        <a>
          <span className="hover-underline">About</span>
        </a>
      </li>
      <li>
        <a>
          <span className="hover-underline">Contact</span>
        </a>
      </li>
    </ul>
  );
};

const ShopDropdown = () => {
  return (
    <div
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-8 px-24 lg:px-36"
      style={{ top: "2.3rem" }}
    >
      <CategoryMenu />
    </div>
  );
};

const PopularDropdown = () => {
  const { products } = useGlobalContext();

  const popularProducts = useMemo(() => {
    return products.filter((product) => product.tags?.includes("popular"));
  }, [products]);

  return (
    <div
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-6 px-24 lg:px-36"
      style={{ top: "2.3rem" }}
    >
      <h3 className="font-semibold text-xl mb-6">Our Most Popular Items</h3>
      <ProductList products={popularProducts} />
    </div>
  );
};

const NewArrivalsDropdown = () => {
  const { products } = useGlobalContext();

  const newProducts = useMemo(() => {
    return products.filter((product) => product.tags?.includes("new_arrival"));
  }, [products]);

  return (
    <div
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-6 px-24 lg:px-36"
      style={{ top: "2.3rem" }}
    >
      <h3 className="font-semibold text-xl mb-6">New Arrivals</h3>
      <ProductList products={newProducts} />
    </div>
  );
};

export default Navbar;
