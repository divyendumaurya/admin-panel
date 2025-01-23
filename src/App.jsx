import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "../src/index.css";
import Signup from "./pages/SignUp";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import TooltipProvider from "./common/Tooltip";
import "react-confirm-alert/src/react-confirm-alert.css";
import CreateCategory from "./components/category/CreateCategory";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TooltipProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="products" element={<ProductList />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              {/* category  */}
              <Route path="create-category" element={<CreateCategory />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </>
  );
};

export default App;
