// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../store/ProductSlice';
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
      navigate('/user/products');
    });
  };

  const handleDelete = () => {
    dispatch(deleteProduct(id)).then(() => {
      navigate('/user/products');
    });
  };

  if (!product) return <p>Product not found</p>;

  return (
    <>
      
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="₹299"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update product
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProduct;
