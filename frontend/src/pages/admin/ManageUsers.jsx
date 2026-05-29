import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiTrash2, FiSearch, FiUsers } from 'react-icons/fi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = users;
    if (roleFilter !== 'All') result = result.filter(u => u.role === roleFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [search, roleFilter, users]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted');
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="dashboard-layout" id="manage-users-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Manage <span className="gradient-text">Users</span></h1>
          <p>View and manage all platform users.</p>
        </div>
        <div className="filters-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} id="user-search" />
          </div>
          <div className="role-filter-btns">
            {['All', 'student', 'instructor', 'admin'].map(r => (
              <button key={r} className={`category-btn ${roleFilter === r ? 'active' : ''}`} onClick={() => setRoleFilter(r)}>
                {r === 'All' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <p className="results-info">Showing <strong>{filtered.length}</strong> users</p>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : filtered.length > 0 ? (
          <div className="table-container">
            <table className="data-table" id="users-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td><button className="btn-icon btn-delete" onClick={() => handleDelete(u._id)} title="Delete User"><FiTrash2 /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><FiUsers className="empty-icon" /><h3>No users found</h3></div>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
