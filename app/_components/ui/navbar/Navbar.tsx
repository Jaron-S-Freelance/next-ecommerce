import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
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
        <NavbarLinks />
      </div>
      <div className="navbar-end">
        {/* Search */}
        <SearchButton />
        {/* Cart */}
        <Cart />
        {/* Profile */}
        <Profile />
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
          <a>Item 1</a>
        </li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};

const NavbarLinks = () => {
  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} className="flex items-center gap-1">
            Shop
            <IoChevronDownOutline size={"14px"} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Wall Art</a>
            </li>
            <li>
              <a>Home Decor</a>
            </li>
            <li>
              <a>Cushions & Throws</a>
            </li>
            <li>
              <a>Planters</a>
            </li>
            <li>
              <a>Tableware</a>
            </li>
          </ul>
        </div>
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
  );
};

export default Navbar;
