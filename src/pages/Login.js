import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();// Used for redirecting after successful login
  const dispatch = useDispatch();// Dispatch Redux actions
  
// Form state for email and password
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Error message state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);  // Function to validate Gmail addresses only

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(password);  // Function to validate strong password

  const handleChange = (e) => {    // Handle form input changes
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {     // Handle login form submission
    e.preventDefault();// Prevent default form behavior
    const { email, password } = form;

    // Check if all fields are filled
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

      // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

     // Validate password strength
    if (!validatePassword(password)) {
      setError('Password must meet the required criteria');
      return;
    }

     // Retrieve users from localStorage and find matching credentials
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
