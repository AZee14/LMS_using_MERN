import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, enrollInCourse, checkEnrollment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiDollarSign, FiBookOpen, FiClock, FiCheckCircle, FiArrowLeft, FiList, FiTag } from 'react-icons/fi';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await getCourse(id);
        setCourse(courseRes.data.data);
        if (isAuthenticated && user?.role === 'student') {
          const enrollRes = await checkEnrollment(id);
          setEnrolled(enrollRes.data.enrolled);
        }
      } catch (err) {
        toast.error('Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAuthenticated, user]);

  const handleEnroll = async () => {
    if (!isAuthenticated) { toast.info('Please login to enroll'); navigate('/login'); return; }
    if (user?.role !== 'student') { toast.info('Only students can enroll'); return; }
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      setEnrolled(true);
      toast.success('Successfully enrolled!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="loading-container page-loading"><div className="spinner"></div></div>;
  if (!course) return <div className="empty-state page-loading"><h3>Course not found</h3></div>;

  return (
    <div className="course-detail-page" id="course-detail-page">
      <section className="course-detail-hero" id="course-detail-hero">
        <div className="hero-bg-shapes"><div className="hero-shape shape-1"></div><div className="hero-shape shape-2"></div></div>
        <div className="section-container">
          <button className="btn-back" onClick={() => navigate('/courses')} id="btn-back-courses"><FiArrowLeft /> Back to Courses</button>
          <div className="course-detail-header">
            <div className="course-detail-info">
              <span className="course-category-tag"><FiTag /> {course.category}</span>
              <h1>{course.title}</h1>
              <p className="course-detail-desc">{course.description}</p>
              <div className="course-detail-meta">
                <span><FiUser /> {course.instructor?.name}</span>
                <span><FiBookOpen /> {course.lessons?.length || 0} Lessons</span>
                <span><FiDollarSign /> {course.price === 0 ? 'Free' : `$${course.price}`}</span>
                <span><FiClock /> {new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="course-detail-actions">
                {enrolled ? (
                  <button className="btn-enrolled" disabled id="btn-enrolled"><FiCheckCircle /> Enrolled</button>
                ) : (
                  <button className="btn-primary btn-large" onClick={handleEnroll} disabled={enrolling} id="btn-enroll">
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="course-lessons-section" id="course-lessons">
        <div className="section-container">
          <h2><FiList /> Course Lessons</h2>
          {course.lessons && course.lessons.length > 0 ? (
            <div className="lessons-list">
              {course.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                <div className="lesson-item" key={lesson._id || index} id={`lesson-${index}`}>
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info"><h4>{lesson.title}</h4><p>{lesson.content}</p></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state"><FiBookOpen className="empty-icon" /><h3>No lessons yet</h3><p>The instructor is working on adding lessons.</p></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
