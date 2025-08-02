import React from 'react';
import { useDispatch, useSelector } from 'react-redux';// Hooks to interact with Redux store
import { addToCart } from '../redux/cartSlice';// Redux action to add car to cart
import { useNavigate } from 'react-router-dom';// Navigation hook from React Router
import { Button } from 'react-bootstrap';

const CarCard = ({ car }) => { // Functional component receiving `car` as a prop
  const dispatch = useDispatch();// Allows dispatching Redux actions
  const navigate = useNavigate();// Hook to navigate between routes
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);// Access the authentication state from Redux store

  const handleAddToCart = () => {
    if (!isAuthenticated) {   // If user is not logged in
      alert('Please login to add cars to your cart.');
      navigate('/login');
      return;
    }
    // Dispatch the car to Redux cart state
dispatch(addToCart({
  ...car,
  msrp: car.msrp || car.price || 0,  // Ensure msrp is set (fallback to price or 0)
}));

    alert('Car added to cart!');
  };

  return (
    <div className="card mb-3 shadow-sm">
      <img src={car.image} alt={car.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{car.make} {car.model}</h5>
        <p className="card-text">{car.description}</p>
        <p className="card-text"><strong>Price:</strong> ₹{car.price || car.msrp}</p>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
