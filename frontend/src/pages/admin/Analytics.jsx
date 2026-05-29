import { useState, useEffect } from 'react';
import { getAnalytics } from '../../services/api';
import Sidebar from '../../components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const COLORS = ['#5b8cff', '#8b7dff', '#29d6b0', '#f9c74f', '#fb7185', '#2dd4ff'];
const CHART_TIP_STYLE = {
  backgroundColor: '#0b1424',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: '12px',
  color: '#f8fbff',
  boxShadow: '0 18px 36px rgba(2, 6, 23, 0.28)',
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        setAnalytics(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const roleData = analytics ? [
    { name: 'Students', value: analytics.totalStudents },
    { name: 'Instructors', value: analytics.totalInstructors },
    { name: 'Admins', value: analytics.totalAdmins },
  ] : [];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const registrationData = analytics?.registrationTrend?.map(item => ({
    name: months[item._id.month - 1] + ' ' + item._id.year,
    users: item.count,
  })) || [];

  return (
    <div className="dashboard-layout" id="analytics-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1><FiBarChart2 /> <span className="gradient-text">Analytics</span></h1>
          <p>Platform performance insights and reports.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : (
          <div className="analytics-grid">
            {/* Enrollments Per Course */}
            <div className="chart-card" id="chart-enrollments">
              <h3>Enrollments Per Course</h3>
              {analytics?.enrollmentsPerCourse?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.enrollmentsPerCourse}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#223047" />
                    <XAxis dataKey="courseName" tick={{ fill: '#c5d3e8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#c5d3e8' }} />
                    <Tooltip contentStyle={CHART_TIP_STYLE} />
                    <Bar dataKey="enrollments" fill="#5b8cff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="chart-empty">No enrollment data yet</p>}
            </div>

            {/* User Role Distribution */}
            <div className="chart-card" id="chart-roles">
              <h3>User Role Distribution</h3>
              {roleData.some(d => d.value > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={roleData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={CHART_TIP_STYLE} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="chart-empty">No user data yet</p>}
            </div>

            {/* Registration Trend */}
            <div className="chart-card chart-wide" id="chart-registrations">
              <h3>Registration Trend</h3>
              {registrationData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#223047" />
                    <XAxis dataKey="name" tick={{ fill: '#c5d3e8' }} />
                    <YAxis tick={{ fill: '#c5d3e8' }} />
                    <Tooltip contentStyle={CHART_TIP_STYLE} />
                    <Line type="monotone" dataKey="users" stroke="#8b7dff" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <p className="chart-empty">No registration data yet</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;
