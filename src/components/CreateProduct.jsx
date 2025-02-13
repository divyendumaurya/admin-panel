// src/components/CreateProduct.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createProduct } from "../store/ProductSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { uploadFile } from "../store/FileUploadSlice";
// import IsLoadingHOC from "../HOC/loader/isLoadingHOC";
// import bgImg from "../assets/bg.jpg"

// const CreateProduct = ({ setLoading }) => {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState(1); // assuming a default category ID
//   const [customCategory, setCustomCategory] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     // Validate file type
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file.");
//       e.target.value = ""; // Clear the file input
//       return; // Stop further execution
//     }

//     try {
//       setLoading(true);
//       const result = await dispatch(uploadFile(file)).unwrap();
//       setUploadedImage(result.location); // Save the uploaded image URL
//       setLoading(false);
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       setLoading(false);
//       console.error("File upload error:", error);
//       toast.error("Failed to upload image. Please try again.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const productData = {
//       title,
//       price: parseFloat(price),
//       description,
//       categoryId: customCategory ? customCategory : parseInt(categoryId, 10), // Use customCategory if provided
//       images: uploadedImage ? [uploadedImage] : [],
//     };

//     console.log("Sending product data:", productData); // Debugging: log the data being sent

//     dispatch(createProduct(productData)).then((result) => {
//       if (result.error) {
//         console.error("Error creating product:", result.error); // Debugging: log any errors
//         console.error(result.error.message);
//         toast.error("Failed to create product.");
//       } else {
//         navigate("/user/products");
//         toast.success("Product created successfully!");
//       }
//     });
//   };

//   return (
//     <>

//       <section className="bg-white dark:bg-gray-900">
//         <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
//           <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
//             Add a new product
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Product Name
//                 </label>
//                 <input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                   placeholder="Type product name"
//                   required
//                 />
//               </div>
//               <div className="w-full">
//                 <label
//                   htmlFor="price"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Price
//                 </label>
//                 <input
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   type="number"
//                   name="price"
//                   id="price"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                   placeholder="₹2999"
//                   required
//                 />
//               </div>
//               <div className="w-full">
//                 <label
//                   htmlFor="file"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Upload Image
//                 </label>
//                 <input
//                   type="file"
//                   name="file"
//                   id="file"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                   onChange={handleFileUpload}
//                   accept="image/*"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="category"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Category
//                 </label>
//                 <select
//                   value={categoryId}
//                   onChange={(e) => {
//                     setCategoryId(parseInt(e.target.value, 10));
//                     setCustomCategory("");
//                   }}
//                   id="category"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                 >
//                   <option value="">Select category</option>
//                   <option value="1">Clothes</option>
//                   <option value="2">Electronics</option>
//                   <option value="3">Furniture</option>
//                   <option value="4">Shoes</option>
//                   <option value="5">Miscellaneous</option>
//                 </select>
//                 <div className="mt-4 col-span-2">
//                   <label
//                     htmlFor="customCategory"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Or type your category
//                   </label>
//                   <input
//                     type="number"
//                     id="customCategory"
//                     value={customCategory}
//                     onChange={(e) => {
//                       setCustomCategory(e.target.value);
//                       setCategoryId("");
//                     }}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                     placeholder="Type your category ID"
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="description"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   id="description"
//                   rows="8"
//                   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
//                   placeholder="Your description here"
//                 ></textarea>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
//             >
//               Add product
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default IsLoadingHOC(CreateProduct);

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/ProductSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadFile } from "../store/FileUploadSlice";
import IsLoadingHOC from "../HOC/loader/isLoadingHOC";
import bgImg from "../assets/bg.jpg";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const CreateProduct = ({ setLoading }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [customCategory, setCustomCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: parseFloat(price),
      description,
      categoryId: customCategory ? customCategory : parseInt(categoryId, 10),
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
                  setCustomCategory("");
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select category</option>
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Shoes</option>
                <option value="5">Miscellaneous</option>
              </select>

              <input
                type="text"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  setCategoryId("");
                }}
                className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Or type your custom category ID"
              />
              <span className="text-gray-500 text-sm font-bold opacity-75">
                You'll find the Category Id on HomePage in Category list option
              </span>
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
