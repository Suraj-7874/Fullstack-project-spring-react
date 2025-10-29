import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api/v1';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', role: 'USER' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post(`${API_BASE}/auth/register`, form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);
      window.location.href = '/dashboard';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" value={form.password} onChange={onChange} required minLength={6} />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" className="form-select" value={form.role} onChange={onChange}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}
