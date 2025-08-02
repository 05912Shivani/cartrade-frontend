// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About CarTrade</h5>
            <p>
              CarTrade is your trusted destination to explore, buy, and sell used and new cars across India. 
              Compare models, check reviews, and make the right decision.
            </p>
          </Col>
          <Col md={4}>
            <h5>Popular Brands</h5>
            <ul className="list-unstyled">
              <li>Maruti Suzuki</li>
              <li>Hyundai</li>
              <li>Tata</li>
              <li>Mahindra</li>
              <li>Kia</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: support@cartrade.com</p>
            <p>Phone: +91-99999-99999</p>
            <p>Location: Mumbai, India</p>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} CarTrade WebApp. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
