// src/Admin.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; 
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [updatingUserId, setUpdatingUserId] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('Unauthorized: No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/admin?token=${token}`);
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleToggleActive = async (userId, isActive) => {
    setUpdatingUserId(userId);
    try {
      await axios.patch('/api/admin', { token, userId, isActive: !isActive });
      setUsers(prevUsers =>
        prevUsers.map(user => (user._id === userId ? { ...user, isActive: !isActive } : user))
      );
    } catch (err) {
      setError('Error toggling user status: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Admin Panel</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      <h2 className="subtitle">Registered Users:</h2>
      <ul className="userList">
        {users.map(user => (
          <li key={user._id} className="userItem">
            <span className="userEmail">{user.email}</span>
            <span className={`userStatus ${user.isActive ? 'active' : 'inactive'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
            <button
              className="toggleButton"
              disabled={updatingUserId === user._id}
              onClick={() => handleToggleActive(user._id, user.isActive)}
            >
              {updatingUserId === user._id ? 'Updating...' : 'Toggle Active'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
