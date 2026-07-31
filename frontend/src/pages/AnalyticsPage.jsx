import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { libraryApi } from '../api';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b267', '#9b5de5'];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [insight, setInsight] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [analyticsResponse, insightResponse] = await Promise.all([libraryApi.getAnalytics(), libraryApi.getInsights()]);
      setAnalytics(analyticsResponse.data);
      setInsight(insightResponse.data);
    };
    loadData();
  }, []);

  if (!user) {
    return <p className="empty-state">Sign in to view analytics and AI insights.</p>;
  }

  if (!analytics) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="panel analytics-panel">
      <h2>Library analytics</h2>
      <p className="insight-box">{insight}</p>
      <div className="stats-grid">
        <div className="stat-card"><strong>{analytics.totalAlbums}</strong><span>Total albums</span></div>
        <div className="stat-card"><strong>{analytics.averageRating}</strong><span>Avg rating</span></div>
        <div className="stat-card"><strong>{analytics.averagePrice}</strong><span>Avg price</span></div>
        <div className="stat-card"><strong>{analytics.topArtist}</strong><span>Top artist</span></div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Genres</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.genres || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4ecdc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Releases by Year</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={analytics.releasesByYear || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#45b7d1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Ratings</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={analytics.ratings || []} dataKey="count" nameKey="name" outerRadius={80} fill="#ff6b6b" label>
                {(analytics.ratings || []).map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Track Count Buckets</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.trackCounts || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#9b5de5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
