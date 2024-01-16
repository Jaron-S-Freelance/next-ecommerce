import Product from "@/types/models/product";

const products: Product[] = require('../data/products.json');

export const getProducts = (): Product[] => {
    return products;
};
