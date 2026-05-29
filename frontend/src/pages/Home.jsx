import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import { FiAward, FiUsers, FiBookOpen, FiArrowRight, FiStar, FiZap, FiGlobe } from 'react-icons/fi';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FiZap /> Next-Generation Learning Platform
          </div>
          <h1 className="hero-title">
            Master New Skills with
            <span className="gradient-text"> World-Class</span> Courses
          </h1>
          <p className="hero-subtitle">
            Join thousands of learners and unlock your potential with expert-led courses 
            in Web Development, Data Science, Machine Learning, and more.
          </p>
          <div className="hero-cta">
            <Link to="/courses" className="btn-primary" id="hero-cta-browse">
              Browse Courses <FiArrowRight />
            </Link>
            <Link to="/register" className="btn-secondary" id="hero-cta-register">
              Get Started Free
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Courses</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Students</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <strong>100+</strong>
              <span>Instructors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2>Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p>Our platform provides comprehensive tools for a world-class learning experience.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card" id="feature-expert">
              <div className="feature-icon theme-gradient-sky">
                <FiAward />
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of real-world experience and proven track records.</p>
            </div>
            <div className="feature-card" id="feature-community">
              <div className="feature-icon theme-gradient-violet">
                <FiUsers />
              </div>
              <h3>Active Community</h3>
              <p>Connect with fellow learners, share insights, and grow together in a supportive environment.</p>
            </div>
            <div className="feature-card" id="feature-content">
              <div className="feature-icon theme-gradient-emerald">
                <FiBookOpen />
              </div>
              <h3>Rich Content</h3>
              <p>Access structured lessons, practical projects, and curated learning paths across diverse topics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="popular-courses-section" id="popular-courses-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Top Picks</span>
            <h2>Popular <span className="gradient-text">Courses</span></h2>
            <p>Explore our most popular courses loved by thousands of students.</p>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FiBookOpen className="empty-icon" />
              <h3>No courses yet</h3>
              <p>Courses will appear here once instructors start creating them.</p>
            </div>
          )}
          <div className="section-cta">
            <Link to="/courses" className="btn-primary" id="btn-view-all-courses">
              View All Courses <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2>What Our <span className="gradient-text">Students</span> Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card" id="testimonial-1">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="star-filled" />)}
              </div>
              <p>"EduVerse completely transformed my career. The courses are well-structured and the instructors are phenomenal."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <strong>Ahmed Khan</strong>
                  <span>Web Developer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card" id="testimonial-2">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="star-filled" />)}
              </div>
              <p>"The best learning platform I've ever used. The community support and course quality are unmatched."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">S</div>
                <div>
                  <strong>Sarah Ali</strong>
                  <span>Data Scientist</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card" id="testimonial-3">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="star-filled" />)}
              </div>
              <p>"From zero to hero! I went from knowing nothing about programming to landing my dream job in 6 months."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">M</div>
                <div>
                  <strong>Maria Chen</strong>
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <FiGlobe className="cta-icon" />
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of students already learning on EduVerse. It's free to get started!</p>
            <Link to="/register" className="btn-primary btn-large" id="cta-register">
              Create Free Account <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
