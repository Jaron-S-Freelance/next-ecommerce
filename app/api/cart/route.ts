import { getCart } from "../../_mocks/handlers/cartHandler";

export async function GET() {
  try {
    const data = getCart();

    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
