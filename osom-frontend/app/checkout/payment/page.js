"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Card, Form } from "react-bootstrap";

export default function PaymentPage() {
    // const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stripe, setStripe] = useState(null);
    const [elements, setElements] = useState(null);
    const [card, setCard] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const loadStripe = async () => {
            const script = document.createElement("script");
            script.src = "https://js.stripe.com/v3/";
            script.async = true;
            script.onload = () => {
                const stripeJs = window.Stripe("pk_test_51ROKo2CWCqLDDhXMbb54Z3K7tuheWSOTRcEGMUBq8asjDLNLP7QXEDRd0GGivDfqbCj8Oa2ITnS4j8f0vuYIuIXH00FDdblg6P");
                setStripe(stripeJs);
                const stripeElements = stripeJs.elements();
                const cardElement = stripeElements.create("card");
                setElements(stripeElements);
                setCard(cardElement);
            };
            document.body.appendChild(script);
        };

        loadStripe();
    }, []);

    useEffect(() => {
        if (card) {
            card.mount("#card-element");
        }
    }, [card]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                totalAmount: 10000,
                orderItems: [
                    {
                        productId: 1,
                        quantity: 1,
                    },
                ],
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const res = await fetch("http://localhost:8080/payment/createIntent", requestOptions);

            if (!res.ok) {
                const text = await res.text();
                console.error("Failed to fetch payment intent. Status:", res.status, "Body:", text);
                throw new Error(`Server responded with ${res.status}`);
            }

            // Since response is plain text
            // const clientSecret = await res.text();
            let clientSecret = await res.text();
            clientSecret = clientSecret.replace(/^"|"$/g, ""); // Remove wrapping quotes if any

            console.log("Received client secret:", clientSecret);

            if (!clientSecret || !clientSecret.startsWith("pi_")) {
                console.error("Invalid client_secret received:", clientSecret);
                setErrorMessage("Invalid payment credentials received.");
                return;
            }

            // setClientSecret(clientSecret);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: "Test User",
                    },
                },
            });

            const { error, paymentIntent } = result;

            if (error) {
                console.error("Stripe error:", error);
                setErrorMessage(`Payment error: ${error.message}`);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent);
                router.push("/checkout/confirmation");
            } else {
                console.warn("Unexpected Stripe response:", paymentIntent);
                setErrorMessage("Unexpected payment issue. Please try again.");
            }
        } catch (err) {
            console.error("Exception during payment:", err);
            setErrorMessage(`Unexpected error: ${err.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-5 text-center">Payment</h2>

            <Card className="shadow-sm p-4">
                <Card.Body>
                    <h4 className="mb-3">Credit Card Details</h4>
                    <Form onSubmit={handlePayment}>
                        <div id="card-element" />
                        <Button
                            type="submit"
                            variant="success"
                            className="mt-3 w-100"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Place Order and Pay"}
                        </Button>
                    </Form>
                    {errorMessage && (
                        <div className="mt-3 text-danger">
                            <strong>{errorMessage}</strong>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}
