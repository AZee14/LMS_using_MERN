import { useState, useEffect } from 'react';
import { getProfile } from '../../services/api';
import Sidebar from '../../components/Sidebar';
import { FiUser, FiMail, FiCalendar, FiBook, FiShield } from 'react-icons/fi';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="dashboard-layout"><Sidebar /><main className="dashboard-main"><div className="loading-container"><div className="spinner"></div></div></main></div>;

  return (
    <div className="dashboard-layout" id="profile-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>My <span className="gradient-text">Profile</span></h1>
        </div>
        <div className="profile-card" id="profile-card">
          <div className="profile-avatar-large">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <div className="profile-field"><FiUser className="profile-icon" /><div><label>Full Name</label><p>{profile?.name}</p></div></div>
            <div className="profile-field"><FiMail className="profile-icon" /><div><label>Email</label><p>{profile?.email}</p></div></div>
            <div className="profile-field"><FiShield className="profile-icon" /><div><label>Role</label><p className={`role-badge role-${profile?.role}`}>{profile?.role}</p></div></div>
            <div className="profile-field"><FiBook className="profile-icon" /><div><label>Enrolled Courses</label><p>{profile?.enrollmentCount || 0}</p></div></div>
            <div className="profile-field"><FiCalendar className="profile-icon" /><div><label>Member Since</label><p>{new Date(profile?.createdAt).toLocaleDateString()}</p></div></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
