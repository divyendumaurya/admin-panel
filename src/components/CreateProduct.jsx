import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/ProductSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadFile } from "../store/FileUploadSlice";
import IsLoadingHOC from "../HOC/loader/isLoadingHOC";
import bgImg from "../assets/bg.jpg";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { fetchCategories } from "../store/CategorySlice";

const CreateProduct = ({ setLoading }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  // const [customCategory, setCustomCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      e.target.value = "";
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(uploadFile(file)).unwrap();
      setUploadedImage({
        file,
        url: result.location,
      });
      setLoading(false);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      setLoading(false);
      console.error("File upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  //Fetch categories
  useEffect(() => {
    // Fetch categories on mount
    const getCategories = async () => {
      try {
        const response = await dispatch(fetchCategories()).unwrap();
        setCategories(response); // Assuming response is an array of categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId, 10),
      images: uploadedImage ? [uploadedImage.url] : [],
    };

    dispatch(createProduct(productData)).then((result) => {
      if (result.error) {
        console.error("Error creating product:", result.error);
        toast.error("Failed to create product.");
      } else {
        navigate("/user/products");
        toast.success("Product created successfully!");
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Type product name"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  id="price"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="₹2999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  {!uploadedImage ? (
                    <div className="space-y-1 text-center">
                      <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={uploadedImage.url}
                        alt="Uploaded"
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(parseInt(e.target.value, 10));
                  // setCustomCategory("");
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id} - {category.name}
                  </option>
                ))}
              </select>

              {/* <input
                type="text"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  setCategoryId("");
                }}
                className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Or type your custom category ID"
              /> */}
              {/* <span className="text-gray-500 text-sm font-bold opacity-75">
                You'll find the Category Id on HomePage in Category list option
              </span> */}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Your description here"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(CreateProduct);
