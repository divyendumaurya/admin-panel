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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId, 10), // ensure categoryId is an integer
      images: ["https://placeimg.com/640/480/any"]
    };

    console.log("Sending product data:", productData); // Debugging: log the data being sent

    dispatch(createProduct(productData))
      .then(() => {
        navigate('/user/products');
      })
      .catch((error) => {
        console.error("Error creating product:", error); // Debugging: log any errors
      });
  };

  return (
    <>
      
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹2999"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select category</option>
                  <option value="1">Colour</option>
                  <option value="2">Electronics</option>
                  <option value="3">Shoes </option>
                  <option value="5">Miscellaneous</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
