import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const CartScreen = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        // If user is logged in, redirect straight to shipping. Else, send them to login.
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '30px', color: '#111827' }}>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div style={{ padding: '20px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px' }}>
                    Your cart is empty. <Link to="/" style={{ color: '#1d4ed8', fontWeight: '600' }}>Go Back Shopping</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

                    {/* Left Column: Cart Items List */}
                    <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {cartItems.map((item) => (
                            <div key={item.product} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '15px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                border: '1px solid #e5e7eb',
                                gap: '15px',
                                flexWrap: 'wrap'
                            }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />

                                <div style={{ flex: '1 1 200px' }}>
                                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>
                                        {item.name}
                                    </Link>
                                </div>

                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827', minWidth: '80px' }}>
                                    ${item.price}
                                </div>

                                {/* Quantity Selector Dropdown */}
                                <select
                                    value={item.qty}
                                    onChange={(e) => addToCart({ _id: item.product, ...item }, Number(e.target.value) - item.qty)}
                                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* Delete Item Button */}
                                <button
                                    onClick={() => removeFromCart(item.product)}
                                    style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '5px' }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Checkout Summary Box */}
                    <div style={{ flex: '1 1 300px' }}>
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '25px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            border: '1px solid #e5e7eb'
                        }}>
                            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', color: '#111827' }}>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h3>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </div>

                            <button
                                onClick={checkoutHandler}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#1f2937',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '16px'
                                }}
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartScreen;