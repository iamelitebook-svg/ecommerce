import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const PlaceOrderScreen = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // 1. Retrieve saved data from local storage
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    // 2. Calculate final prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Free shipping for orders over $1000
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // 15% tax rate
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async () => {
        try {
            setError('');

            // 3. Construct the payload matching your backend camelCase order schema
            const orderPayload = {
                userId: userInfo._id,
                orderItems: cartItems,
                shippingAddress,
                paymentMethod: 'PayPal', // Default payment method
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            };

            // 4. Fire the POST request to your backend endpoint
            const { data } = await axios.post('http://localhost:3000/api/orders', orderPayload);

            // 5. If successful, clear out the cart local storage records and show a success page
            localStorage.removeItem('cartItems');
            alert('Order Placed Successfully directly into MongoDB!');
            navigate(`/`); // Redirect home (or to an order details page if preferred)
            window.location.reload(); // Quick state flush
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '30px', color: '#111827' }}>Review Your Order</h2>

            {error && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {/* Left Section: Order Details */}
                <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div>
                        <h3>Shipping Details</h3>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <hr style={{ border: '0', borderTop: '1px solid #e5e7eb' }} />

                    <div>
                        <h3>Order Items</h3>
                        {cartItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                <Link to={`/product/${item.product}`} style={{ color: '#1f2937', fontWeight: '600', textDecoration: 'none', flex: 1, marginLeft: '15px' }}>
                                    {item.name}
                                </Link>
                                <div>{item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Order Financial Summary Card */}
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ margin: '0 0 20px 0' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Items Price:</span><span>${itemsPrice.toFixed(2)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Shipping:</span><span>${shippingPrice.toFixed(2)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Tax (15%):</span><span>${taxPrice.toFixed(2)}</span></div>
                        <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '15px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', marginBottom: '25px' }}><span>Total:</span><span>${totalPrice.toFixed(2)}</span></div>

                        <button onClick={placeOrderHandler} style={{ width: '100%', backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                            Place Order 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;