import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must meet the required criteria');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password');
      return;
    }

    dispatch(login(matchedUser));
    localStorage.setItem('userInfo', JSON.stringify(matchedUser));

    alert('Login successful!');
    navigate('/');
  };

  const password = form.password;

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Login to Your Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Show Password"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
        </Form.Group>

        <div className="mb-3">
          <strong>Password must include:</strong>
          <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
            <li style={{ color: password.length >= 8 ? 'green' : 'red' }}>
              Minimum 8 characters
            </li>
            <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>
              At least one uppercase letter
            </li>
            <li style={{ color: /[a-z]/.test(password) ? 'green' : 'red' }}>
              At least one lowercase letter
            </li>
            <li style={{ color: /\d/.test(password) ? 'green' : 'red' }}>
              At least one number
            </li>
            <li style={{ color: /[@$!%*?#&_]/.test(password) ? 'green' : 'red' }}>
              At least one special character (@$!%*?#&_)
            </li>
          </ul>
        </div>

        <Button variant="success" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
