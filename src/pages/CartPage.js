import React, { useState } from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <Cart
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
};

export default CartPage;
