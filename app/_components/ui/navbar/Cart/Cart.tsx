import { getProducts } from "@/app/_mocks/handlers/productHandler";
import Product from "@/types/models/product";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import QuantitySelector from "../../../global/QuantitySelector";

const Cart = () => {
  const products: Product[] = getProducts().slice(8, 16);
  const subtotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <div className="drawer-end overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="menu p-4 overflow-y-auto w-120 bg-base-100 fixed top-0 right-0 h-full">
          {/* Header section */}
          <div className="px-4 border-b border-base-300">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          </div>
          {/* Body */}
          <ul className="menu scrollable-content">
            <ItemList products={products} />
          </ul>
          <Subtotal amount={subtotal} />
          <button className="btn btn-outline m-2">Checkout</button>
          <button className="btn btn-neutral m-2">View Cart</button>
          {/* Close button */}
          <label
            htmlFor="my-drawer-4"
            className="absolute right-2 top-2 hover:cursor-pointer"
          >
            <IoClose size="24px" />
          </label>
        </div>
      </div>
    </div>
  );
};

interface ItemListProps {
  products: Product[];
}

const ItemList = ({ products }: ItemListProps) => {
  return (
    <div className="max-h-[50vh] gap-2">
      {products.map((product) => (
        <CartItem product={product} key={`cart_item-${product.id}`} />
      ))}
    </div>
  );
};

const CartItem = ({ product }: { product: Product }) => {
  return (
    <div className="flex p-2 gap-4 relative">
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={100}
        height={125}
      />
      <div className="flex flex-col justify-between mb-2 w-full">
        <span className="text-md font-bold mr-7">{product.title}</span>
        <div className="flex justify-between items-center">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <QuantitySelector size="sm" />
        </div>
      </div>

      <button className="btn-xxs-circle hover:bg-slate-800 border border-neutral-content absolute right-0 top-2.5 flex items-center justify-center">
        <IoClose size="12px" />
      </button>
    </div>
  );
};

const Subtotal = ({ amount }: { amount: number }) => {
  return (
    <div className="flex justify-between m-4 ">
      <span className="text-xl font-bold">Subtotal</span>
      <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
    </div>
  );
};

export default Cart;
