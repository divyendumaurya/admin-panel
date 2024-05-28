// src/components/ProductDrawer.js
import React from 'react';
import { Drawer } from 'antd';

const ProductDrawer = ({ product, onClose, visible }) => {
  return (
    <Drawer
      title={product.title}
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
    >
      <p>Name: {product.title}</p>
      <p>Price: {product.price}</p>
      {/* Add more product details here */}
    </Drawer>
  );
};

export default ProductDrawer;
