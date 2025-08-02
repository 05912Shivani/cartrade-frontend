import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Routing tools to navigate and link pages
import { logout } from '../redux/slices/authSlice';// Action to log the user out

const AppNavbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Get login status from Redux
  const user = useSelector(state => state.auth.user);// Get logged-in user details
  const dispatch = useDispatch();// Used to dispatch Redux actions
  const navigate = useNavigate();// Used to redirect programmatically


  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/');// Redirect to homepage
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">{/* Bootstrap dark-themed navbar */}
      <Container>
        <Navbar.Brand as={Link} to="/">🚗 CarTrade</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Saved Cars</Nav.Link>
            <Nav.Link as={Link} to="/sell-car">Sell Car</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link> 

            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user?.name || 'User'}!{/* Show user name or fallback */}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link> 
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
