import { FiBookOpen, FiGithub, FiMail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <FiBookOpen className="brand-icon" />
              <span>EduVerse</span>
            </div>
            <p className="footer-description">
              Empowering learners worldwide with cutting-edge courses and expert instructors. 
              Your journey to excellence starts here.
            </p>
          </div>

          <div className="footer-links-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/register">Get Started</Link>
          </div>

          <div className="footer-links-section">
            <h4>Categories</h4>
            <Link to="/courses">Web Development</Link>
            <Link to="/courses">Data Science</Link>
            <Link to="/courses">Machine Learning</Link>
            <Link to="/courses">Design</Link>
          </div>

          <div className="footer-contact-section">
            <h4>Contact</h4>
            <p><FiMail /> info@eduverse.com</p>
            <p><FiMapPin /> 123 Education St, Learning City</p>
            <div className="footer-socials">
              <a href="#" aria-label="GitHub"><FiGithub /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
