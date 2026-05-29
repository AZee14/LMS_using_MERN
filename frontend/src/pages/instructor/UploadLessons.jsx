import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCourses, addLesson } from '../../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiUpload, FiPlus, FiList } from 'react-icons/fi';

const UploadLessons = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentLessons, setCurrentLessons] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        const myCourses = res.data.data.filter(c => c.instructor?._id === user?._id);
        setCourses(myCourses);
      } catch (err) {
        toast.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find(c => c._id === selectedCourse);
      setCurrentLessons(course?.lessons || []);
    } else {
      setCurrentLessons([]);
    }
  }, [selectedCourse, courses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) { toast.error('Please select a course'); return; }
    if (!lessonTitle || !lessonContent) { toast.error('Please fill all fields'); return; }
    setSubmitting(true);
    try {
      const res = await addLesson(selectedCourse, { title: lessonTitle, content: lessonContent });
      toast.success('Lesson added successfully!');
      setCurrentLessons(res.data.data.lessons);
      setCourses(prev => prev.map(c => c._id === selectedCourse ? { ...c, lessons: res.data.data.lessons } : c));
      setLessonTitle('');
      setLessonContent('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add lesson');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout" id="upload-lessons-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1><FiUpload /> Upload <span className="gradient-text">Lessons</span></h1>
          <p>Add lessons to your courses.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : (
          <div className="upload-lessons-container">
            <div className="form-card">
              <form onSubmit={handleSubmit} className="dashboard-form" id="upload-lesson-form">
                <div className="form-group">
                  <label htmlFor="course-select">Select Course</label>
                  <select id="course-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
                    <option value="">-- Select a course --</option>
                    {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="lesson-title">Lesson Title</label>
                  <input type="text" id="lesson-title" placeholder="e.g. Introduction to React" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lesson-content">Lesson Content</label>
                  <textarea id="lesson-content" rows="6" placeholder="Write the lesson content here..." value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={submitting} id="btn-add-lesson">
                  <FiPlus /> {submitting ? 'Adding...' : 'Add Lesson'}
                </button>
              </form>
            </div>
            {currentLessons.length > 0 && (
              <div className="form-card">
                <h3><FiList /> Existing Lessons ({currentLessons.length})</h3>
                <div className="lessons-list">
                  {currentLessons.sort((a, b) => a.order - b.order).map((lesson, i) => (
                    <div className="lesson-item" key={lesson._id || i}>
                      <div className="lesson-number">{i + 1}</div>
                      <div className="lesson-info"><h4>{lesson.title}</h4><p>{lesson.content.substring(0, 100)}...</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadLessons;
