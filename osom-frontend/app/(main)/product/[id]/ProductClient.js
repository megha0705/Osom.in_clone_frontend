// app/product/[id]/ProductClient.js
"use client";

import { useState, useMemo } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";

export default function ProductClient({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart, setBuyNowItem } = useCart();
  const router = useRouter();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.product_img[0]?.img_url,
    });

    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const item = {
      id: product.id,
      title: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.product_img[0]?.img_url,
    };

    setBuyNowItem(item);
    router.push("/checkout");
  };

  // ✅ Memoized size list from API, fallback to default
  const availableSizes = useMemo(() => {
    if (
      Array.isArray(product.product_specification) &&
      product.product_specification.length > 0
    ) {
      const sizes = product.product_specification
        .map((spec) => spec.product_size)
        .filter((size) => typeof size === "number");

      return [...new Set(sizes)].sort((a, b) => a - b); // remove duplicates & sort
    }

    // fallback to default range if no sizes in API
    return Array.from({ length: 15 }, (_, i) => 34 + i);
  }, [product]);

  return (
    <Container className="py-5 text-white">
      <Row>
        {/* Product Image */}
        <Col md={6}>
          <Image
            src={product.product_img[0]?.img_url || "https://via.placeholder.com/500"}
            alt={product.name}
            width={500}
            height={500}
            className="img-fluid rounded"
          />
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <h2 className="fw-bold text-black">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="mt-3">${product.price}</h4>

          {/* Size Dropdown */}
          <Form.Group className="my-3">
            <Form.Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Size</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center gap-3 my-3">
            <Button variant="dark" onClick={decreaseQuantity}>-</Button>
            <span className="text-dark">{quantity}</span>
            <Button variant="dark" onClick={increaseQuantity}>+</Button>
          </div>

          {/* Action Buttons */}
          <div className="my-4 d-flex gap-3 flex-wrap">
            <Button variant="dark" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="dark" onClick={handleBuyNow}>Buy Now</Button>
            <Button variant="outline-light">Wishlist</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
