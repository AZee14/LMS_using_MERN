import { useState, useEffect } from 'react';
import { getMyCourses, updateProgress } from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiBook } from 'react-icons/fi';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await getMyCourses();
      setEnrollments(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (enrollmentId, newProgress) => {
    try {
      await updateProgress(enrollmentId, newProgress);
      setEnrollments((prev) =>
        prev.map((e) => e._id === enrollmentId ? { ...e, progress: newProgress } : e)
      );
      toast.success('Progress updated!');
    } catch (err) {
      toast.error('Failed to update progress');
    }
  };

  return (
    <div className="dashboard-layout" id="my-courses-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>My <span className="gradient-text">Courses</span></h1>
          <p>Track your enrolled courses and learning progress.</p>
        </div>
        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
        ) : enrollments.length > 0 ? (
          <div className="my-courses-grid">
            {enrollments.map((enrollment) => (
              <div className="my-course-card" key={enrollment._id} id={`my-course-${enrollment._id}`}>
                <div className="my-course-header">
                  <h3><Link to={`/courses/${enrollment.course?._id}`}>{enrollment.course?.title}</Link></h3>
                  <span className="course-category-badge">{enrollment.course?.category}</span>
                </div>
                <p className="my-course-instructor">by {enrollment.course?.instructor?.name}</p>
                <div className="progress-section">
                  <div className="progress-bar-container large">
                    <div className="progress-bar" style={{ width: `${enrollment.progress}%` }}></div>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="progress-controls">
                    <input
                      type="range" min="0" max="100" value={enrollment.progress}
                      onChange={(e) => handleProgressUpdate(enrollment._id, parseInt(e.target.value))}
                      className="progress-slider"
                    />
                  </div>
                </div>
                <p className="enrolled-date">Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state"><FiBook className="empty-icon" /><h3>No courses enrolled</h3><p>Start your learning journey today!</p><Link to="/courses" className="btn-primary">Browse Courses</Link></div>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
