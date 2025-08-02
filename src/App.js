// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetail from './pages/CarDetail';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Cart from './pages/Cart';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SellCar from './pages/SellCar';
// import ServicesPage from './pages/ServicesPage';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/car/:id" element={<CarDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/sell-car" element={<SellCar />} />
//         <Route path="/services" element={<ServicesPage />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SellCar from './pages/SellCar';
import ServicesPage from './pages/ServicesPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sell-car" element={<SellCar />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
