import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Save address data into localStorage so our final order placement screen can read it
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
        navigate('/placeorder'); // Move forward to the final review screen
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px' }}>
            <form onSubmit={submitHandler} style={{
                backgroundColor: '#fff', padding: '40px', borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb',
                width: '100%', maxWidth: '450px'
            }}>
                <h2 style={{ marginBottom: '25px', color: '#111827', textAlign: 'center' }}>Shipping Address</h2>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Address</label>
                    <input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>City</label>
                    <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Postal Code</label>
                    <input type="text" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Country</label>
                    <input type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ width: '100%', backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                    Continue to Review
                </button>
            </form>
        </div>
    );
};

export default ShippingScreen;