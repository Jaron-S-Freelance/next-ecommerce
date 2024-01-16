import Cart from "@/types/models/cart";

const cart: Cart = require("../data/cart.json");

export const getCart = (): Cart => {
  return cart;
};
