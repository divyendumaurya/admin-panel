import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, deleteProduct } from "../store/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import bgImg from "../assets/bg.jpg";
import { generateConfirm } from "../utils/ConfirmAlert";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );
  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(product ? product.price : "");
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
      navigate("/user/products");
    });
  };

  const handleDelete = () => {
    generateConfirm(
      "Confirm Deletion",
      "Are you sure you want to delete this product?",
      null,
      () => {
        dispatch(deleteProduct(id)).then(() => {
          navigate("/user/products");
          toast.success("Product Deleted Successfully");
        });
      }
    );
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Update Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Type product name"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="₹299"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full flex justify-center items-center py-2 px-4 border border-red-600 text-red-600 rounded-md shadow-sm text-sm font-medium hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
