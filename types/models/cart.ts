import Product from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export default interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Function to initialize an empty cart
export const createEmptyCart = (): Cart => {
  return {
    items: [],
    totalItems: 0,

    totalPrice: 0,
  };
};
