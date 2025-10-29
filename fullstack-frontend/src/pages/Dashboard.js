import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api/v1';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${token}` },
  });

  const load = async () => {
    try {
      setMessage('');
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load tasks');
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, completed: false });
      setTitle('');
      setDescription('');
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update task');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div>
      <h3>Dashboard</h3>
      {message && <div className="alert alert-danger">{message}</div>}

      <form className="row g-2 mb-4" onSubmit={createTask}>
        <div className="col-md-3">
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
        </div>
        <div className="col-md-5">
          <input className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Add Task</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.completed ? 'Completed' : 'Open'}</td>
              <td>
                <button className="btn btn-sm btn-outline-success me-2" onClick={() => toggleComplete(t)}>
                  {t.completed ? 'Mark Open' : 'Mark Done'}
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => remove(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
