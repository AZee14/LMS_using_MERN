import { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Design',
    'Business',
    'Other',
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data.data);
        setFiltered(res.data.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (category !== 'All') {
      result = result.filter((c) => c.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    setFiltered(result);
  }, [search, category, courses]);

  return (
    <div className="course-list-page" id="course-list-page">
      <section className="page-hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
        </div>
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Explore</span>
            <h1>Browse <span className="gradient-text">Courses</span></h1>
            <p>Discover courses tailored to your interests and career goals.</p>
          </div>
        </div>
      </section>

      <section className="course-list-content">
        <div className="section-container">
          {/* Filters */}
          <div className="course-filters" id="course-filters">
            <div className="search-box" id="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="course-search-input"
              />
            </div>
            <div className="category-filters" id="category-filters">
              <FiFilter className="filter-icon" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="results-info">
            <p>Showing <strong>{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="courses-grid">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FiSearch className="empty-icon" />
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseList;
