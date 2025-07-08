import { Container, Carousel } from 'react-bootstrap';

export default function Testimonials() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Carousel>
        {/* <Carousel.Item>
          <p className="text-center">"Great product! Highly recommend it."</p>
        </Carousel.Item>
        <Carousel.Item>
          <p className="text-center">"Amazing customer service and quality."</p>
        </Carousel.Item> */}
      </Carousel>
    </Container>
  );
}
