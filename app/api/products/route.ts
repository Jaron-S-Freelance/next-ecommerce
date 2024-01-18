import { getProducts } from "@/app/_mocks/handlers/productHandler";

export async function GET() {
  try {
    const data = getProducts();

    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
