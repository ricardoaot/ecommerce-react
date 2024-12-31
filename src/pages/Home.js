import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        fetchProducts();
        fetchCartItems();
    }, []);

    // Generic function to fetch data
    const fetchData = (url, setData) => {
        axios.get(url)
            .then((response) => setData(response.data))
            .catch((error) => console.error(`Error fetching data from ${url}:`, error));
    };

    const fetchProducts = () => {
        fetchData(`${BASE_URL}/products`, setProducts);
    };

    const fetchCartItems = () => {
        const userId = 1; // Asumming userId is 1
        fetchData(`${BASE_URL}/carts?userId=${userId}`, setCart);
    };

    const handleAddToCart = (product) => {
        const userId = 1; // Asumming userId is 1
        const quantity = 1; // Asuming quantity is 1

        axios.post(`${BASE_URL}/carts`, {
            userId,
            productId: product.id,
            quantity,
        })
            .then((response) => {
                setCart(response.data);
            })
            .catch((error) => {
                console.error('Failed to add to cart:', error);
            });
    };

    const handleRemoveFromCart = (cartItemId) => {

        axios.delete(`${BASE_URL}/carts/${cartItemId}`)
        .then(() => {
                const newCart = cart.filter(item => item.cartId !== cartItemId);
                setCart(newCart);
            })
            .catch((error) => {
                console.error('Failed to remove from cart:', error);
            });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    };

    const handleProcessOrder = () => {
        const userId = 1; // Asumming userId is 1

        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before processing the order.');
            return;
        }

        axios.post(`${BASE_URL}/orders`, { userId })
        .then((response) => {
                alert('Order processed successfully');
                console.log('Order processed successfully:', response.data);
            })
            .catch((error) => {
                console.error('Failed to process order:', error);
            });
    };

    return (
        <>
            <h1 style={{ marginLeft: '1rem' }}>
                Ecommerce Project</h1>
            <div
                style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginLeft: '2rem' }}>
                <div style={{ flex: 2 }}>
                    <h2>Product List</h2>
                    <ProductList
                        products={products}
                        onAddToCart={handleAddToCart}
                    />
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                    <h2>
                        Cart
                    </h2>
                    <ul style={{ listStyleType: 'none', padding: 0, width: '200px' }}>
                        {cart.map((item, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                    <strong>{item.productName}</strong>
                                    <div>Unit Price: ${Number(item.price).toFixed(2)}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <div>Total: ${(Number(item.price) * item.quantity).toFixed(2)}</div>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.cartId)} style={{ marginLeft: '1rem' }}>X</button>
                            </li>
                        ))}
                        <li style={{ fontWeight: 'bold', marginTop: '1rem' }}>Total: ${calculateTotal().toFixed(2)}</li>
                    </ul>
                    <button onClick={handleProcessOrder} style={{ marginTop: '1rem' }}>Process Order</button>
                </div>
            </div>
        </>
    );
};

export default Home;
