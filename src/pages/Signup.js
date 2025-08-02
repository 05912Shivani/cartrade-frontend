import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();// Hook for programmatic navigation
  const [form, setForm] = useState({ name: '', email: '', password: '' });// Form data state
  const [error, setError] = useState('');// Error message state

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate email - only allow Gmail addresses
  const validateEmail = (email) => {
    // Allow only Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
    return passwordRegex.test(password);
  };
 // Handle form submission for signup
  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    // Basic field validation
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (name.length < 3) {
      setError('Name must be at least 3 characters');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }
 // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === email)) {
      setError('User already exists with this email');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Create Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gmail Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            placeholder="yourname@gmail.com"
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Only Gmail accounts are allowed.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter strong password"
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Must include 8+ characters, uppercase, lowercase, number, and special character.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
