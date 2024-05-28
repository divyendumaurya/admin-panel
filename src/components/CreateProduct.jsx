// src/components/CreateProduct.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/ProductSlice';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1); // assuming a default category ID
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId, 10), // ensure categoryId is an integer
      images: [image]
    };

    console.log("Sending product data:", productData); // Debugging: log the data being sent

    dispatch(createProduct(productData)).then(() => {
      navigate('/products');
    }).catch((error) => {
      console.error("Error creating product:", error); // Debugging: log any errors
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <label>Category ID:</label>
      <input type="number" value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value, 10))} required />
      <label>Image URL:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
