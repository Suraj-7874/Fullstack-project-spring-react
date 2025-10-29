import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">Assignment</Link>
        <div className="navbar-nav">
          {!token && <Link className="nav-link" to="/register">Register</Link>}
          {!token && <Link className="nav-link" to="/login">Login</Link>}
          {token && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
        </div>
        <div className="ms-auto">
          {token && (
            <button className="btn btn-outline-danger btn-sm" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('email'); localStorage.removeItem('role'); window.location.href = '/'; }}>Logout</button>
          )}
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
