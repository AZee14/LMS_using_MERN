import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiLogIn, FiShield, FiKey } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bootstrapEmail, setBootstrapEmail] = useState('');
  const [bootstrapSecret, setBootstrapSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [bootstrapLoading, setBootstrapLoading] = useState(false);
  const { login, bootstrapAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success(`Welcome back, ${data.name}!`);
      switch (data.role) {
        case 'admin': navigate('/admin/dashboard'); break;
        case 'instructor': navigate('/instructor/dashboard'); break;
        default: navigate('/student/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBootstrapAdmin = async (e) => {
    e.preventDefault();

    if (!bootstrapEmail || !bootstrapSecret) {
      toast.error('Please fill both admin access fields');
      return;
    }

    setBootstrapLoading(true);
    try {
      const data = await bootstrapAdmin(bootstrapEmail, bootstrapSecret);
      toast.success(`Admin access granted for ${data.name}`);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enable admin access');
    } finally {
      setBootstrapLoading(false);
    }
  };

  return (
    <div className="auth-page" id="login-page">
      <div className="hero-bg-shapes"><div className="hero-shape shape-1"></div><div className="hero-shape shape-2"></div></div>
      <div className="auth-card" id="login-card">
        <div className="auth-header">
          <div className="auth-icon"><FiLogIn /></div>
          <h2>Welcome Back</h2>
          <p>Login to continue your learning journey</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="form-group">
            <label htmlFor="email"><FiMail /> Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password"><FiLock /> Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading} id="btn-login">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div className="admin-bootstrap-panel">
          <div className="admin-bootstrap-header">
            <FiShield />
            <div>
              <h3>Admin Demo Access</h3>
              <p>Promote an existing account to admin for local showcasing.</p>
            </div>
          </div>
          <form onSubmit={handleBootstrapAdmin} className="admin-bootstrap-form">
            <div className="form-group">
              <label htmlFor="bootstrap-email"><FiMail /> Account Email</label>
              <input
                type="email"
                id="bootstrap-email"
                placeholder="Enter an existing user email"
                value={bootstrapEmail}
                onChange={(e) => setBootstrapEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bootstrap-secret"><FiKey /> Bootstrap Secret</label>
              <input
                type="password"
                id="bootstrap-secret"
                placeholder="Enter ADMIN_BOOTSTRAP_SECRET"
                value={bootstrapSecret}
                onChange={(e) => setBootstrapSecret(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-secondary btn-full" disabled={bootstrapLoading}>
              {bootstrapLoading ? 'Enabling...' : 'Enable Admin Access'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
