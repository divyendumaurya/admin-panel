import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/ProductSlice';
import { Link, useNavigate } from 'react-router-dom';
import ProductDrawer from '../components/ProductDrawer';


const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const navigate = useNavigate();

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
  }, [dispatch]);

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

  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  //   navigate('/');
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      

      <h1>Product List</h1>
      <Link to="/user/create-product">
        <button>Create Product</button>
      </Link>
      
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleOpenDrawer(product)}>View</button>
                  <Link to={`/user/edit-product/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedProduct && <ProductDrawer product={selectedProduct} onClose={handleCloseDrawer} visible={drawerVisible} />}
    </div>
  );
};

export default ProductList;