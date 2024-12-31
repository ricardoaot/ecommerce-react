import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {products.map((product) => (
        <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductList;
