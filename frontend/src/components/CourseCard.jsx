import { Link } from 'react-router-dom';
import { FiUser, FiDollarSign } from 'react-icons/fi';

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;
  const value = Number.parseInt(expanded, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const CourseCard = ({ course }) => {
  const categoryColors = {
    'Web Development': '#5b8cff',
    'Mobile Development': '#8b7dff',
    'Data Science': '#29d6b0',
    'Machine Learning': '#f9c74f',
    'DevOps': '#fb7185',
    'Design': '#ff6fae',
    'Business': '#2dd4ff',
    'Other': '#64748b',
  };

  const accent = categoryColors[course.category] || '#5b8cff';

  return (
    <div className="course-card" id={`course-card-${course._id}`}>
      <div className="course-card-image">
        {course.image ? (
          <img src={course.image} alt={course.title} />
        ) : (
          <div className="course-card-placeholder" style={{ 
            background: `linear-gradient(135deg, ${hexToRgba(accent, 0.14)}, ${hexToRgba(accent, 0.34)})` 
          }}>
            <span style={{ color: accent }}>
              {course.category || 'Course'}
            </span>
          </div>
        )}
        <span 
          className="course-category-badge"
          style={{ background: `linear-gradient(135deg, ${accent}, ${hexToRgba(accent, 0.88)})` }}
        >
          {course.category}
        </span>
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">
          {course.description?.length > 100 
            ? course.description.substring(0, 100) + '...' 
            : course.description}
        </p>
        <div className="course-card-meta">
          <span className="course-instructor">
            <FiUser /> {course.instructor?.name || 'Unknown'}
          </span>
          <span className="course-price">
            <FiDollarSign /> {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
        </div>
        <Link to={`/courses/${course._id}`} className="btn-view-course" id={`btn-view-${course._id}`}>
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
