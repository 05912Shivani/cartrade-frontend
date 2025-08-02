import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const SellCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '',
    price: '',
    location: '',
    image: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [carList, setCarList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCars = localStorage.getItem('submittedCars');
    if (storedCars) {
      setCarList(JSON.parse(storedCars));
    }
  }, []);

  // Save to localStorage whenever carList changes
  useEffect(() => {
    localStorage.setItem('submittedCars', JSON.stringify(carList));
  }, [carList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCarList((prev) => [...prev, formData]);
    setSubmitted(true);
    setFormData({
      name: '',
      brand: '',
      year: '',
      price: '',
      location: '',
      image: '',
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleDelete = (index) => {
    const updatedList = carList.filter((_, i) => i !== index);
    setCarList(updatedList);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Sell Your Car</h2>

      {submitted && <Alert variant="success">Car listing submitted successfully!</Alert>}

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Car Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Swift VXI"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Maruti"
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="year" className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2021"
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Expected Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 450000"
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="location" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Delhi"
                required
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Car Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste direct image URL here"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit Listing
        </Button>
      </Form>

      {/* Car List Preview */}
      <div className="mt-5">
        <h4>Your Submitted Cars</h4>
        <Row>
          {carList.map((car, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={car.image || 'https://source.unsplash.com/400x250/?car'}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{car.name} - {car.brand}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {car.year}<br />
                    <strong>Price:</strong> ₹{parseInt(car.price).toLocaleString()}<br />
                    <strong>Location:</strong> {car.location}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default SellCar;
