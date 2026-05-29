import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBookOpen, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'instructor': return '/instructor/dashboard';
      case 'student': return '/student/dashboard';
      default: return '/';
    }
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" id="navbar-brand" onClick={() => setMenuOpen(false)}>
          <FiBookOpen className="brand-icon" />
          <span>EduVerse</span>
        </Link>

        <button className="navbar-toggle" id="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`} id="navbar-links">
          <Link to="/" className="nav-link" id="nav-home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" id="nav-about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/courses" className="nav-link" id="nav-courses" onClick={() => setMenuOpen(false)}>Courses</Link>

          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} className="nav-link" id="nav-dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <div className="nav-user-section">
                <span className="nav-user-name" id="nav-user-name">
                  {user?.name}
                  <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
                </span>
                <button className="btn-logout" id="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-section">
              <Link to="/login" className="btn-nav-login" id="nav-login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-nav-register" id="nav-register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
