// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     navigate('/');
//   };

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
//           <Link to="/"  className="flex items-center space-x-3 rtl:space-x-reverse">
//             <img src="https://www.svgrepo.com/show/303238/google-drive-logo.svg" className="h-8" alt="Flowbite Logo" />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
//           </Link>
//           <div className="flex items-center space-x-6 rtl:space-x-reverse">
//             <Link to="/" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Home</Link>
//             <Link to="/about" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">About</Link>
//             <Link to="/contact" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Contact</Link>
//             <button
//               onClick={handleLogout}
//               type="button"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { generateConfirm } from "../utils/ConfirmAlert";
import toast from "react-hot-toast";
import DefaultAvatar from "./DefaultAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token"); // Check if 'access_token' exists in local storage

  const handleLogout = () => {
    generateConfirm(
      "Confirm Logout",
      "Do you want to Logout?",
      null,
      async () => {
        try {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/");
        } catch (error) {
          toast.error("Unable to logout");
        }
      }
    );
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/user/products"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://www.svgrepo.com/show/530588/column-chart.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Admin Dashboard
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="/user/products"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <UserProfile />
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
