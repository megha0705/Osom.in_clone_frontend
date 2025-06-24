// app/product/[id]/page.js
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient"; // 👈 client component
import Image from "next/image";

// Fetch product by ID
async function getProduct(id) {
  const res = await fetch(`http://localhost:8080/product/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
