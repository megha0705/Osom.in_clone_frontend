"use client";
import { useCart } from "./CartContext";
import { Offcanvas, Button, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function CartOverlay() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  
  const router = useRouter();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <Image src={item.image} alt={item.title} width={60} height={60} />
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1">{item.title}</h6>
                  <div>Size: {item.size}</div>
                  <div className="d-flex align-items-center gap-2 my-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id, item.size)}>
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id, item.size)}>
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-end">
                  <div>${item.price * item.quantity}</div>
                  <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id, item.size)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <div>Subtotal</div>
              <div>${total.toFixed(2)}</div>
            </div>
            <Button className="mt-3 w-100" variant="dark" onClick={handleCheckout}>
              Checkout
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
