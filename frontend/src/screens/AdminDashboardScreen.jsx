import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboardScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State Fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching orders dashboard.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const submitProductHandler = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      // Config mapping to safely pass your Admin Bearer Token to the backend route guard
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post('/api/products', {
        name,
        price: Number(price),
        image,
        description,
        countInStock: Number(countInStock)
      }, config);

      setFormSuccess(`Product "${name}" successfully added to the catalog database grid!`);
      // Flush form inputs
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      setCountInStock('');
    } catch (err) {
      setFormError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  if (!userInfo.isAdmin) {
    return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}><h2>Access Denied. Admins Only.</h2></div>;
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><h3>Loading Admin Panel Data...</h3></div>;
  if (error) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}><h3>Error: {error}</h3></div>;

  const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const pendingDeliveries = orders.filter(order => !order.isDelivered).length;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', color: '#111827' }}>Admin Management Dashboard</h2>

      {/* Analytics Summary Overview Grid */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '220px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Total Revenue</h4>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>${totalSales.toFixed(2)}</span>
        </div>
        <div style={{ flex: '1', minWidth: '220px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Total Orders Placed</h4>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{orders.length}</span>
        </div>
        <div style={{ flex: '1', minWidth: '220px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Pending Deliveries</h4>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>{pendingDeliveries}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap-reverse', marginTop: '20px' }}>

        {/* Left Subsection Container: Live Incoming Table List */}
        <div style={{ flex: '2 1 600px' }}>
          <h3 style={{ marginBottom: '15px', color: '#1f2937' }}>Recent Orders</h3>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '15px' }}>ORDER ID</th>
                  <th style={{ padding: '15px' }}>TOTAL</th>
                  <th style={{ padding: '15px' }}>PAID STATUS</th>
                  <th style={{ padding: '15px' }}>DELIVERY STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '15px', fontFamily: 'monospace', fontSize: '13px' }}>{order._id}</td>
                    <td style={{ padding: '15px', fontWeight: '600' }}>${order.totalPrice?.toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: order.isPaid ? '#d1fae5' : '#fee2e2', color: order.isPaid ? '#065f46' : '#991b1b' }}>
                        {order.isPaid ? 'PAID' : 'PENDING'}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: order.isDelivered ? '#d1fae5' : '#fef3c7', color: order.isDelivered ? '#065f46' : '#92400e' }}>
                        {order.isDelivered ? 'DELIVERED' : 'PROCESSING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Subsection Container: Product Form Manager Module Card */}
        <div style={{ flex: '1 1 350px' }}>
          <h3 style={{ marginBottom: '15px', color: '#1f2937' }}>Add New Product</h3>
          <form onSubmit={submitProductHandler} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>

            {formError && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>{formError}</div>}
            {formSuccess && <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>{formSuccess}</div>}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>Image URL</label>
              <input type="text" placeholder="https://unsplash.com..." value={image} onChange={(e) => setImage(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>Item Description</label>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
              Upload Product 🚀
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardScreen;