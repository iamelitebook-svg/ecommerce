import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            // Calls your Express authentication endpoint
            const { data } = await axios.post('/api/users/login', {
                email,
                password
            });

            // Save user session profile and token inside localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            setMessage(`Welcome back, ${data.name}! Login successful.`);
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
            <form onSubmit={submitHandler} style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ marginBottom: '25px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Account Login</h2>

                {error && <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px', border: '1px solid #fee2e2' }}>{error}</div>}
                {message && <div style={{ color: '#16a34a', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px', border: '1px solid #dcfce7' }}>{message}</div>}

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Email Address</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '15px' }}
                    />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '15px' }}
                    />
                </div>

                <button type="submit" style={{
                    width: '100%',
                    backgroundColor: '#1f2937',
                    color: '#fff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '16px',
                    transition: 'background-color 0.2s'
                }}>
                    Sign In
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>
                    New Customer? <Link to="/register" style={{ color: '#1f2937', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginScreen;