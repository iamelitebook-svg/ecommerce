import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Pull previous cart data from local storage if it exists, otherwise start clean
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.product === product._id);

            if (existItem) {
                // If item exists, update its quantity metrics
                return prevItems.map((x) =>
                    x.product === product._id ? { ...x, qty: Number(x.qty) + qty } : x
                );
            }
            // Otherwise append the new clean item metadata structure
            return [...prevItems, {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty
            }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x.product !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};