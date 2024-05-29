import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import '../src/index.css';
import Signup from './pages/SignUp';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import About from './pages/About';

const App = () => {
  return (
    <>
      
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<PrivateRoute />}>
            <Route path="products" element={<ProductList />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;