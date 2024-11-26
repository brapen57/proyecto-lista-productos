import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <li className="list-group-item">
      <strong>{product.name}</strong>: {product.description}
    </li>
  );
};

export default ProductItem;