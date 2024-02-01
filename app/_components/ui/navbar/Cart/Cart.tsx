import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Cart = () => {
  return (
    <div className="drawer-end overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="btn btn-ghost btn-circle drawer-button"
          tabIndex={0}
          role="button"
        >
          <div className="indicator">
            <CiShoppingCart size="24px" />
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        {/* Other content can go here */}
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex flex-col w-80 min-h-full bg-base-200 text-base-content">
          {/* Header section */}
          <div className="px-4 py-8 border-b border-base-300">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
          </div>
          <ul className="menu p-4 overflow-y-auto">
            {/* Your sidebar content here */}
          </ul>
        </div>
        {/* Close button */}
        <label
          htmlFor="my-drawer-4"
          className="btn btn-circle absolute right-0 top-0"
        >
          <IoClose size="24px" />
        </label>
      </div>
    </div>
  );
};

export default Cart;
