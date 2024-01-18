import type { NextApiRequest, NextApiResponse } from "next";
import { getCart } from "../../_mocks/handlers/cartHandler";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cart = getCart();
    res.status(200).json(cart);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
