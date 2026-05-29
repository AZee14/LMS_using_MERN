import { FiTarget, FiEye, FiHeart, FiAward, FiUsers, FiBookOpen, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <div className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
        </div>
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">About Us</span>
            <h1>Empowering the World Through <span className="gradient-text">Education</span></h1>
            <p className="about-hero-text">
              EduVerse is a modern learning management system built to bridge the gap between 
              quality education and accessibility. We believe that everyone deserves access to 
              world-class learning resources.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-values-section" id="about-values">
        <div className="section-container">
          <div className="values-grid">
            <div className="value-card" id="about-mission">
              <div className="value-icon theme-gradient-sky">
                <FiTarget />
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize education by providing an accessible, high-quality learning 
                platform that empowers students and instructors alike. We strive to make 
                learning engaging, affordable, and effective.
              </p>
            </div>
            <div className="value-card" id="about-vision">
              <div className="value-icon theme-gradient-violet">
                <FiEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the world's most trusted learning platform, where knowledge is 
                shared freely, skills are developed practically, and careers are transformed 
                through continuous learning.
              </p>
            </div>
            <div className="value-card" id="about-values-card">
              <div className="value-icon theme-gradient-emerald">
                <FiHeart />
              </div>
              <h3>Our Values</h3>
              <p>
                Excellence, inclusivity, innovation, and community. We're committed to 
                creating a supportive ecosystem where every learner can thrive regardless 
                of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section" id="about-stats">
        <div className="section-container">
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <FiBookOpen className="stat-icon" />
              <h3>500+</h3>
              <p>Courses Available</p>
            </div>
            <div className="about-stat-card">
              <FiUsers className="stat-icon" />
              <h3>10,000+</h3>
              <p>Active Students</p>
            </div>
            <div className="about-stat-card">
              <FiAward className="stat-icon" />
              <h3>100+</h3>
              <p>Expert Instructors</p>
            </div>
            <div className="about-stat-card">
              <FiGlobe className="stat-icon" />
              <h3>50+</h3>
              <p>Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team-section" id="about-team">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2>Meet the <span className="gradient-text">Founders</span></h2>
            <p>A passionate team dedicated to transforming education.</p>
          </div>
          <div className="team-grid">
            <div className="team-card" id="team-member-1">
              <div className="team-avatar theme-gradient-sky">JD</div>
              <h4>John Doe</h4>
              <span className="team-role">CEO & Co-Founder</span>
              <p>10+ years in EdTech, passionate about making education accessible to all.</p>
            </div>
            <div className="team-card" id="team-member-2">
              <div className="team-avatar theme-gradient-violet">JS</div>
              <h4>Jane Smith</h4>
              <span className="team-role">CTO & Co-Founder</span>
              <p>Full-stack developer with expertise in building scalable learning platforms.</p>
            </div>
            <div className="team-card" id="team-member-3">
              <div className="team-avatar theme-gradient-emerald">AK</div>
              <h4>Ali Khan</h4>
              <span className="team-role">Head of Content</span>
              <p>Curriculum designer ensuring every course meets the highest quality standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
