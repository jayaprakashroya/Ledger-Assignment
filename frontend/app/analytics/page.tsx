'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import NavBar from '../../components/NavBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { libraryApi } from '../../lib/api';

const COLORS = ['#06b6d4', '#8b5cf6', '#fb7185', '#f59e0b', '#10b981', '#ef4444'];

// Helper function to render markdown-style text with proper formatting
function renderInsights(text: string) {
  return text.split('\n\n').map((section, idx) => (
    <div key={idx} className="mb-4">
      {section.split('\n').map((line, lineIdx) => {
        // Replace **text** with bold formatting
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={lineIdx} className="mb-1 leading-relaxed">
            {parts.map((part, partIdx) =>
              partIdx % 2 === 1 ? (
                <strong key={partIdx} className="font-semibold text-white">
                  {part}
                </strong>
              ) : (
                <span key={partIdx}>{part}</span>
              )
            )}
          </div>
        );
      })}
    </div>
  ));
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const a = await libraryApi.getAnalytics();
        setAnalytics(a);
        const i = await libraryApi.getInsights();
        setInsights(i);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="container py-10">
          <div className="card">Loading analytics…</div>
        </main>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="container py-10">
          <div className="card">No analytics available.</div>
        </main>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="container py-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card lg:col-span-2">
              <h3 className="text-lg font-semibold">Releases by Year</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={analytics.releasesByYear}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold">Top Genres</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={analytics.genres} dataKey="count" nameKey="name" innerRadius={50} outerRadius={80} label>
                      {analytics.genres.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card lg:col-span-2">
              <h3 className="text-lg font-semibold">Ratings Distribution</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={analytics.ratings}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold">Track Count Distribution</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={analytics.trackCounts}>
                    <XAxis dataKey="bucket" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#fb7185" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card lg:col-span-3">
              <h3 className="text-xl font-semibold mb-4">🎵 AI-Generated Insights</h3>
              <div className="text-slate-300 space-y-3">
                {renderInsights(insights)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
