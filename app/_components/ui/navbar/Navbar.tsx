"use client";

import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import "@/app/styles/navbar.css";
import ProductList from "./ProductList";
import { getProducts } from "@/app/_mocks/handlers/productHandler";
import CategoryMenu from "./CategoryMenu";

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
          className="text-2xl mx-8 flex items-center font-semibold"
          href={"/"}
        >
          <Image
            src={"/fusiondesignlogo-simple.png"}
            alt={""}
            width={100}
            height={100}
            className="-mr-4 -mt-4 -mb-6"
          />
          Fusion Design
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
        <Cart />
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
    <motion.div
      initial={false}
      animate={isSearchOpen ? "open" : "closed"}
      variants={variants}
      className="flex items-center overflow-hidden cursor-pointer mx-4"
      onClick={() => (isSearchOpen ? null : setIsSearchOpen(true))}
    >
      {isSearchOpen && (
        <motion.input
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.2 }}
          type="text"
          placeholder="Search..."
          className="input input-bordered flex-1 pl-11 font-sans"
          ref={wrapperRef}
        />
      )}
      <CiSearch size="24px" className="absolute translate-x-3" />
    </motion.div>
  );
};

const Cart = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <CiShoppingCart size="24px" />
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
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
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Shop</a>
        </li>
        <li>
          <a>Popular</a>
        </li>
        <li>
          <a>New Arrivals</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Contact</a>
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
        className="py-6 -my-6"
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
        className="py-6 -my-6"
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
        className="py-6 -my-6"
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
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-4"
      style={{ top: "2.3rem" }}
    >
      <CategoryMenu />
    </div>
  );
};

const PopularDropdown = () => {
  const popularProducts = getProducts().filter((product) =>
    product.tags?.includes("popular")
  );
  return (
    <div
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-8 px-52"
      style={{ top: "2.3rem" }}
    >
      <h3 className="font-semibold text-xl mb-6">Our Most Popular Items</h3>
      <ProductList products={popularProducts} />
    </div>
  );
};

const NewArrivalsDropdown = () => {
  const newProducts = getProducts().filter((product) =>
    product.tags?.includes("new_arrival")
  );
  return (
    <div
      className="absolute left-0 w-full bg-base-300 border-t border-slate-700 shadow z-10 p-8 px-52"
      style={{ top: "2.3rem" }}
    >
      <h3 className="font-semibold text-xl mb-6">New Arrivals</h3>
      <ProductList products={newProducts} />
    </div>
  );
};

export default Navbar;
