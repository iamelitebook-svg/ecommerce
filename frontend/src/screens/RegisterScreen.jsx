import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // 1. Validation Check: Passwords must match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // 2. Call your Express backend registration POST route
            const { data } = await axios.post('http://localhost:3000/api/users/register', {
                name,
                email,
                password,
            });

            setSuccess('Account created successfully! Redirecting...');

            // 3. Automatically store the new user's JWT session information
            localStorage.setItem('userInfo', JSON.stringify(data));

            // 4. Redirect to homepage after a short delay
            setTimeout(() => {
                navigate('/');
                window.location.reload(); // Flush header layout state
            }, 1500);

        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
            <form onSubmit={submitHandler} style={{
                backgroundColor: '#fff', padding: '40px', borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb',
                width: '100%', maxWidth: '400px'
            }}>
                <h2 style={{ marginBottom: '25px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Create Account</h2>

                {error && <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px', border: '1px solid #fee2e2' }}>{error}</div>}
                {success && <div style={{ color: '#16a34a', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px', border: '1px solid #dcfce7' }}>{success}</div>}

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Full Name</label>
                    <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Email Address</label>
                    <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Password</label>
                    <input type="password" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#374151', fontWeight: '500', fontSize: '14px' }}>Confirm Password</label>
                    <input type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ width: '100%', backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                    Register 🚀
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>
                    Already have an account? <Link to="/login" style={{ color: '#1f2937', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterScreen;