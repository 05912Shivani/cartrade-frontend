import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadTrim } from '../redux/slices/carSlice';
import { Spinner, Alert } from 'react-bootstrap';

const CarDetail = () => {
  const { id } = useParams();// Get the `id` from the URL (e.g., "honda_civic")
  const dispatch = useDispatch();// Used to dispatch Redux actions
  const { trim, error, loading } = useSelector((state) => state.car);// Select car data from Redux store

  const [make, model] = id.split('_');// Split the ID into make and model (e.g., "honda", "civic")

  useEffect(() => {
    dispatch(loadTrim({ make, model }));// Load car trim details when component mounts
  }, [make, model, dispatch]);

 const handleImgError = (e) => {
  e.target.src = 'https://picsum.photos/500/300?grayscale&blur';
};


  return (
    <div className="container my-5">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading car details...</p>
        </div>
      )}

      {error && <Alert variant="danger">Error: {error}</Alert>}

      {!loading && !error && (
        <div className="card shadow-lg border-0">
          <div className="row g-0">
            {/* Left: Car Image */}
            <div className="col-md-6">
              <img
                src={trim.image}
                alt={`${make} ${model}`}
                onError={handleImgError}
                className="img-fluid w-100 h-100 rounded-start"
                style={{ objectFit: 'cover', maxHeight: '100%' }}
              />
            </div>

            {/* Right: Car Details */}
            <div className="col-md-6 p-4 d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-3">{make} {model} <span className="text-muted">({trim.trim || 'Standard'})</span></h2>
                <p className="text-muted mb-4">{trim.description || 'No description available.'}</p>

                <h4 className="text-primary">
                  MSRP: {trim.msrp ? `$${trim.msrp.toLocaleString()}` : 'Not Available'}
                </h4>
              </div>

              <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary me-2">
                  ← Back to Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
