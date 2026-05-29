import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiPlusCircle } from 'react-icons/fi';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Web Development', price: 0, image: ''
  });

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Design', 'Business', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) { toast.error('Title and description are required'); return; }
    setLoading(true);
    try {
      await createCourse({ ...formData, price: Number(formData.price) });
      toast.success('Course created successfully!');
      navigate('/instructor/manage-courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout" id="create-course-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1><FiPlusCircle /> Create <span className="gradient-text">Course</span></h1>
          <p>Fill in the details to create a new course.</p>
        </div>
        <div className="form-card" id="create-course-form-card">
          <form onSubmit={handleSubmit} className="dashboard-form" id="create-course-form">
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input type="text" id="title" name="title" placeholder="e.g. Complete React Developer Course" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="5" placeholder="Describe what students will learn..." value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input type="number" id="price" name="price" min="0" value={formData.price} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL (optional)</label>
              <input type="url" id="image" name="image" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading} id="btn-create-course">
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
