// // src/components/ProductDrawer.js
// import React from 'react';
// import { Drawer } from 'antd';

// const ProductDrawer = ({ product, onClose, visible }) => {
//   return (
//     <Drawer
//       title={product.title}
//       placement="right"
//       onClose={onClose}
//       open={visible}
//       width={400}
//     >
//       <p>Name: {product.title}</p>
//       <p>Price: {product.price}</p>
//       <p>Description: {product.description}</p>
//       <p>CategoryId: {product.categoryId}</p>
//       {/* Add more product details here */}
//     </Drawer>
//   );
// };

// export default ProductDrawer;



// src/components/ProductDrawer.js
// import React from 'react';
// import { Drawer } from 'antd';

// const ProductDrawer = ({ product, userId, onClose, visible }) => {
//   return (
//     <Drawer
//       title={product.title}
//       placement="right"
//       onClose={onClose}
//       open={visible}
//       width={400}
//     >
//       <p>Name: {product.title}</p>
//       <p>Price: {product.price}</p>
//       <p>Description: {product.description}</p>
//       <p>CategoryId: {product.categoryId}</p>
//       {/* Add more product details here */}
//       {userId && <p>User ID: {userId}</p>}
//     </Drawer>
//   );
// };

// export default ProductDrawer;



import React from 'react';
import { Drawer } from 'antd';

const ProductDrawer = ({ product,  onClose, visible }) => {
  return (
    <Drawer
      title={
        <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-500">
          {product.title}
        </h2>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      className="bg-white dark:bg-gray-800"
      bodyStyle={{ padding: '1rem' }}
      headerStyle={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-primary-600 dark:text-primary-500 font-medium">Price:</p>
          <p className="text-gray-800 dark:text-gray-300 font-semibold">
            ₹{product.price}
          </p>
        </div>
        <div>
          <p className="text-primary-600 dark:text-primary-500 font-medium mb-2">
            Description:
          </p>
          <p className="text-gray-800 dark:text-gray-300">{product.description}</p>
        </div>
        
      </div>
    </Drawer>
  );
};

export default ProductDrawer;