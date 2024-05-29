// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, deleteProduct } from '../store/ProductSlice';
// import { Link } from 'react-router-dom';
// import ProductDrawer from '../components/ProductDrawer';


// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   // const navigate = useNavigate();

//   const user = (() => {
//     const userString = localStorage.getItem('user');
//     if (userString === null || userString === 'undefined') {
//       return null;
//     }
//     try {
//       return JSON.parse(userString);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       return null;
//     }
//   })();

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   const handleOpenDrawer = (product) => {
//     setSelectedProduct(product);
//     setDrawerVisible(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerVisible(false);
//     setSelectedProduct(null);
//   };

  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  // return (
    // <div>
      

    //   <h1>Product List</h1>
    //   <Link to="/user/create-product">
    //     <button>Create Product</button>
    //   </Link>
      
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>title</th>
    //         <th>Price</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products && products.length > 0 ? (
    //         products.map((product) => (
    //           <tr key={product.id}>
    //             <td>{product.title}</td>
    //             <td>{product.price}</td>
    //             <td>
    //               <button onClick={() => handleOpenDrawer(product)}>View</button>
    //               <Link to={`/user/edit-product/${product.id}`}>
    //                 <button>Edit</button>
    //               </Link>
    //               <button onClick={() => handleDelete(product.id)}>Delete</button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="3">No products found</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    //   {selectedProduct && <ProductDrawer product={selectedProduct} onClose={handleCloseDrawer} visible={drawerVisible} />}
    // </div>


    
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/ProductSlice';
import { Link } from 'react-router-dom';
import ProductDrawer from '../components/ProductDrawer';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userId, setUserId] = useState(null); // Add a state variable for userId

  const user = (() => {
    const userString = localStorage.getItem('user');
    if (userString === null || userString === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  })();

  useEffect(() => {
    dispatch(fetchProducts());
    setUserId(user ? user.id : null); // Set the userId when the component mounts
  }, [dispatch, user]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleOpenDrawer = (product) => {
    setSelectedProduct(product);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center">
      <div className="w-2/3 max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Product List</h5>
          <Link to="/user/create-product" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Create Product
          </Link>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {products && products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{product.title}</p>
                    </div>
                    <div className="mr-9 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ₹{product.price}
                    </div>
                    <div className="flex items-center space-x-2 ">
                      <button onClick={() => handleOpenDrawer(product)} className= "mr-3 text-gray-400 hover:text-gray-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <Link to={`/user/edit-product/${product.id}`}>
                        <button className="text-blue-600 hover:text-blue-700 mr-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">No products found</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {selectedProduct && <ProductDrawer product={selectedProduct} userId={userId} onClose={handleCloseDrawer} visible={drawerVisible} />}
    </div>
  );
};

export default ProductList;