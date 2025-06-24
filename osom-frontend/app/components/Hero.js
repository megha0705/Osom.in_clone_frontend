"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/product/getAll");
        // console.log(res.json());
        const data = await res.json();
        setProducts(data.slice(0, 8)); // Limit to 8 items
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Container fluid className="text-center m-0 p-0">
      <Row className="m-0">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={3} className="p-0">
            <div onClick={() => handleImageClick(product.id)} style={{ cursor: "pointer" }}>
              <Image
                src={product.product_img[0]?.img_url || "https://via.placeholder.com/300"}
                alt={product.name}
                fluid
                className="img-fixed-size"
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
