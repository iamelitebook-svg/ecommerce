import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductScreen = () => {
    const { addToCart } = useContext(CartContext)
    const { id } = useParams(); // Grabs the product ID directly from the URL path string
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><h3>Loading details...</h3></div>;
    if (error) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}><h3>Error: {error}</h3></div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1f2937', fontWeight: '600', display: 'inline-block', marginBottom: '20px' }}>
                ← Go Back
            </Link>

            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 500px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px', maxHeight: '500px', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ fontSize: '32px', color: '#111827', margin: 0 }}>{product.name}</h2>
                    <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', width: '100%' }} />
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Price: ${product.price}</h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}><strong>Description:</strong> {product.description}</p>

                    <div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '6px', backgroundColor: '#fff', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span>Status:</span>
                            <span style={{ fontWeight: 'bold', color: product.countInStock > 0 ? 'green' : 'red' }}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <button
                            onClick={()=>addToCart(product,1)}
                            disabled={product.countInStock === 0}
                            style={{
                                width: '100%',
                                backgroundColor: product.countInStock > 0 ? '#1f2937' : '#9ca3af',
                                color: '#fff',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '4px',
                                cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
                                fontWeight: '600',
                                fontSize: '16px'
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;