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
