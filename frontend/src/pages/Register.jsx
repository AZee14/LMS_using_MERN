import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Please fill all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const data = await register(name, email, password, role);
      toast.success(`Welcome, ${data.name}!`);
      switch (data.role) {
        case 'instructor': navigate('/instructor/dashboard'); break;
        default: navigate('/student/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="register-page">
      <div className="hero-bg-shapes"><div className="hero-shape shape-1"></div><div className="hero-shape shape-2"></div></div>
      <div className="auth-card" id="register-card">
        <div className="auth-header">
          <div className="auth-icon"><FiUserPlus /></div>
          <h2>Create Account</h2>
          <p>Start your learning journey today</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          <div className="form-group">
            <label htmlFor="name"><FiUser /> Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email"><FiMail /> Email</label>
            <input type="email" id="reg-email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password"><FiLock /> Password</label>
            <input type="password" id="reg-password" placeholder="Create a password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password"><FiLock /> Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>I want to join as:</label>
            <div className="role-selector" id="role-selector">
              <button type="button" className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')} id="role-student">Student</button>
              <button type="button" className={`role-btn ${role === 'instructor' ? 'active' : ''}`} onClick={() => setRole('instructor')} id="role-instructor">Instructor</button>
            </div>
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading} id="btn-register">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
