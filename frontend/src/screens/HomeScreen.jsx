import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Calls the Express server API route directly
                const { data } = await axios.get('http://localhost:3000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Something went wrong fetching products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><h3>Loading store catalog...</h3></div>;
    if (error) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}><h3>Error: {error}</h3></div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '30px', color: '#111827' }}>Latest Products</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px'
            }}>
                {products.map((product) => (
                    <div key={product._id} style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                        />

                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1f2937' }}>{product.name}</h3>
                            </Link>
                            <p style={{ color: '#6b7280', fontSize: '14px', flexGrow: 1, margin: '0 0 15px 0' }}>{product.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>${product.price}</span>
                                <button style={{
                                    backgroundColor: '#1f2937',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;