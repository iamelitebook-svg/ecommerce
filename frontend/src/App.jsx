import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import RegisterScreen from './screens/RegisterScreen';

// Temporary placeholder screen layouts until we build full modules
// const HomeScreen = () => <div style={{ padding: '40px' }}><h2>Welcome to Store Catalog listings...</h2></div>;
// const CartScreen = () => <div style={{ padding: '40px' }}><h2>Your active shopping cart workspace...</h2></div>;
// const LoginScreen = () => <div style={{ padding: '40px' }}><h2>Account signature authentication window...</h2></div>;

function App() {
  return (
    <Router> 
      <Header />
      <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/admin/dashboard" element={<AdminDashboardScreen/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;