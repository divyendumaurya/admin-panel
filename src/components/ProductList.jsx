import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/ProductSlice";
import { Link } from "react-router-dom";
import ProductDrawer from "../components/ProductDrawer";
import ReactPaginate from "react-paginate";
import { generateConfirm } from "../utils/ConfirmAlert";
import toast from "react-hot-toast";
import { fetchCategories, deleteCategory } from "../store/CategorySlice";
import IsLoadingHOC from "../HOC/loader/isLoadingHOC";
import bgImg from "../assets/bg.jpg";

const ProductList = ({ setLoading }) => {
  const dispatch = useDispatch();
  const { products, loading, error, offset, limit, totalItems } = useSelector(
    (state) => state.products
  );

  //Categories Selector
  const { categories } = useSelector((state) => state.categories);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    categoryId: "",
  });

  const areFiltersEmpty = Object.values(filters).every(
    (value) => !value.trim()
  );
  // Calculate current page from offset and limit
  const currentPage = Math.floor(offset / limit);

  // Calculate total pages - Using 200 as default total items if not set
  const pageCount = Math.ceil((totalItems || 200) / limit);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchProducts({ offset: 0, limit }));
  }, [dispatch, limit]);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //   use Effect to sync loader HOC with RTK loading
  useEffect(() => {
    setLoading(loading); // Sync Redux loading state with the HOC
  }, [loading]);

  const handlePageChange = (selectedPage) => {
    const newOffset = selectedPage.selected * limit;
    dispatch(
      fetchProducts({
        offset: newOffset,
        limit,
        title: filters.title || undefined,
        price_min: filters.priceMin || undefined,
        price_max: filters.priceMax || undefined,
        categoryId: filters.categoryId || undefined,
      })
    );
  };

  const user = (() => {
    const userString = localStorage.getItem("user");
    if (userString === null || userString === "undefined") {
      return null;
    }
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  })();

  useEffect(() => {
    setUserId(user ? user.id : null);
  }, [user]);

  //delete product
  const handleDelete = (id) => {
    generateConfirm(
      "Confirm Deletion",
      "Are you sure you want to delete this product?",
      id,
      async () => {
        try {
          // Execute your delete action
          await dispatch(deleteProduct(id)).unwrap();

          toast.success("Product deleted successfully!");

          // Refresh the product list after successful deletion
          dispatch(fetchProducts({ offset, limit }));
        } catch (error) {
          // Show error toast
          toast.error("Unable to delete the product. Something went wrong.");
          console.error("Error deleting product:", error);
        }
      }
    );
  };

  //Delete category
  const handleDeleteCategory = (id) => {
    generateConfirm(
      "Confirm Category Deletion",
      "Are you sure you want to delete this category?",
      id,
      async () => {
        try {
          await dispatch(deleteCategory(id)).unwrap();
          toast.success("Category deleted successfully!");
          dispatch(fetchCategories()); // Refresh categories list
        } catch (error) {
          toast.error("Unable to delete the category. Something went wrong.");
          console.error("Error deleting category:", error);
        }
      }
    );
  };

  const handleOpenDrawer = (product) => {
    setSelectedProduct(product);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedProduct(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // filters
  const applyFilters = () => {
    const { title, priceMin, priceMax, categoryId } = filters;

    dispatch(
      fetchProducts({
        offset: 0,
        limit,
        title: title || undefined,
        price_min: priceMin || undefined,
        price_max: priceMax || undefined,
        categoryId: categoryId || undefined,
      })
    );
  };

  //Clear all filters
  const clearFilters = () => {
    // Reset all filters to empty strings
    setFilters({
      title: "",
      priceMin: "",
      priceMax: "",
      categoryId: "",
    });

    // Fetch products without any filters
    dispatch(
      fetchProducts({
        offset: 0,
        limit,
      })
    );
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="flex flex-col items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})`, minHeight: "100vh" }}
    >
      {/* Filters Section */}
      <div className="w-2/3 max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow mb-6">
        <h4 className="text-lg font-bold mb-4 text-gray-800">
          Filter Products
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="priceMin"
            placeholder="Min Price"
            value={filters.priceMin}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="categoryId"
            placeholder="Category ID"
            value={filters.categoryId}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={applyFilters}
            disabled={areFiltersEmpty}
            className={`px-4 py-2 rounded-lg ${
              areFiltersEmpty
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg bg-red-500 text-gray-200 hover:bg-red-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Buttons and Category list DropDown  */}

      <div className="w-2/3 max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <Link
            to="/user/create-product"
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Create Product
          </Link>

          <Link
            to="/user/create-category"
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h11M9 21V3m11 8h-3M5 14h14m-2 6H7"
              ></path>
            </svg>
            Create Category
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
              Category List
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2 max-h-96 overflow-y-auto">
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded group"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            categoryId: category.id.toString(),
                          }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <p className="font-medium text-gray-800">
                          {category.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {category.id}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.id);
                        }}
                        className="p-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Product List */}
      <div className="w-2/3 max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Product List
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {products && products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {product.title}
                      </p>
                    </div>
                    <div className="mr-9 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ₹{product.price}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        data-tooltip-id="app-tooltip"
                        data-tooltip-content="View"
                        onClick={() => handleOpenDrawer(product)}
                        className="mr-3 text-gray-400 hover:text-gray-500"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <Link to={`/user/edit-product/${product.id}`}>
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          data-tooltip-id="app-tooltip"
                          data-tooltip-content="Edit"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </Link>
                      <button
                        data-tooltip-id="app-tooltip"
                        data-tooltip-content="Delete"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          className="w-5 h-5"
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
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    No products found
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="pagination-container mt-4 my-10">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={"flex gap-2 mt-4 justify-center items-center"}
          previousLinkClassName={
            "px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          }
          nextLinkClassName={
            "px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200  "
          }
          pageClassName={
            "px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-green-500"
          }
          disabledClassName={"opacity-50 cursor-not-allowed "}
          activeClassName={
            "bg-green-500 hover:bg-green-700 text-white border border-green-500"
          }
        />
      </div>

      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          userId={userId}
          onClose={handleCloseDrawer}
          visible={drawerVisible}
        />
      )}
    </div>
  );
};

export default IsLoadingHOC(ProductList);
