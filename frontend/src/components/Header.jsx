import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, ShoppingBag, ShieldCheck, LogOut } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. Read the live authenticated session profile out of local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const logoutHandler = () => {
        // 2. Clear out session credentials and flush state by pushing back home
        localStorage.removeItem('userInfo');
        alert('Logged out successfully.');
        navigate('/');
        window.location.reload();
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 30px',
            backgroundColor: '#1f2937',
            color: '#fff'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
                <ShoppingBag size={24} /> MERN Store
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', textDecoration: 'none' }}>
                    <ShoppingCart size={20} /> Cart
                    {cartItems.length > 0 ? (
                        <span style={{ backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '50%', fontSize: '12px', fontWeight: 'bold' }}>
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                    ) : null}
                </Link>

                {/* 3. DYNAMIC CONDITIONAL RENDER: Admin Dashboard Link (Only visible if isAdmin is true) */}
                {userInfo && userInfo.isAdmin ? (
                    <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b', textDecoration: 'none', fontWeight: '600' }}>
                        <ShieldCheck size={20} /> Admin Panel
                    </Link>
                ) : null}

                {/* 4. DYNAMIC CONDITIONAL RENDER: Profile Information vs Login Button Trigger Links */}
                {userInfo ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#9ca3af', fontWeight: '500' }}>Hi, {userInfo.name}</span>
                        <button
                            onClick={logoutHandler}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', textDecoration: 'none' }}>
                        <User size={20} /> Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;