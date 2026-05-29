import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiGrid,
  FiBook,
  FiPlusCircle,
  FiEdit,
  FiUpload,
  FiUsers,
  FiBarChart2,
  FiUser,
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useAuth();

  const studentLinks = [
    { to: '/student/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/student/my-courses', icon: <FiBook />, label: 'My Courses' },
    { to: '/student/profile', icon: <FiUser />, label: 'Profile' },
  ];

  const instructorLinks = [
    { to: '/instructor/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/instructor/create-course', icon: <FiPlusCircle />, label: 'Create Course' },
    { to: '/instructor/manage-courses', icon: <FiEdit />, label: 'Manage Courses' },
    { to: '/instructor/upload-lessons', icon: <FiUpload />, label: 'Upload Lessons' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/admin/manage-users', icon: <FiUsers />, label: 'Manage Users' },
    { to: '/admin/manage-courses', icon: <FiBook />, label: 'Manage Courses' },
    { to: '/admin/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin': return adminLinks;
      case 'instructor': return instructorLinks;
      case 'student': return studentLinks;
      default: return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="sidebar" id="dashboard-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user-info">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4>{user?.name}</h4>
            <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            id={`sidebar-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
