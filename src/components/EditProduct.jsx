// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/ProductSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );
  const [title, setTitle] = useState(product ? product.title : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData: { title, price } })).then(() => {
      navigate('/products');
    });
  };

  if (!product) return <p>Product not found</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Product</h1>
      <label>title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProduct;
