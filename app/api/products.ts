import type { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../_mocks/handlers/productHandler';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
        const products = getProducts();
        res.status(200).json(products);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
