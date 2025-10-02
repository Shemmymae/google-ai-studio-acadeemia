import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { supabase } from '../../supabase';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  applicationsByStatus: { status: string; count: number }[];
  applicationsByMonth: { month: string; count: number }[];
  averageTimeToHire: number;
  topDepartments: { department: string; applications: number }[];
  interviewsScheduled: number;
  hiredCount: number;
}

const CareersAnalyticsDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data: jobs } = await supabase.from('jobs').select('*');
      const { data: applications } = await supabase.from('applications').select('*');
      const { data: interviews } = await supabase.from('interviews').select('*');

      const totalJobs = jobs?.length || 0;
      const activeJobs = jobs?.filter(j => j.status === 'published').length || 0;
      const totalApplications = applications?.length || 0;
      const interviewsScheduled = interviews?.length || 0;
      const hiredCount = applications?.filter(a => a.status === 'hired').length || 0;

      const applicationsByStatus = [
        { status: 'Applied', count: applications?.filter(a => a.status === 'applied').length || 0 },
        { status: 'Under Review', count: applications?.filter(a => a.status === 'under_review').length || 0 },
        { status: 'Interview', count: applications?.filter(a => a.status === 'interview_scheduled').length || 0 },
        { status: 'Rejected', count: applications?.filter(a => a.status === 'rejected').length || 0 },
        { status: 'Hired', count: hiredCount }
      ];

      const monthsMap: { [key: string]: number } = {};
      applications?.forEach(app => {
        const month = new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthsMap[month] = (monthsMap[month] || 0) + 1;
      });
      const applicationsByMonth = Object.entries(monthsMap).map(([month, count]) => ({ month, count })).slice(-6);

      const departmentsMap: { [key: string]: number } = {};
      await Promise.all(
        (applications || []).map(async (app) => {
          const { data: job } = await supabase.from('jobs').select('department').eq('id', app.job_id).single();
          if (job?.department) {
            departmentsMap[job.department] = (departmentsMap[job.department] || 0) + 1;
          }
        })
      );
      const topDepartments = Object.entries(departmentsMap)
        .map(([department, applications]) => ({ department, applications }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 5);

      const hiredApplications = applications?.filter(a => a.status === 'hired') || [];
      let totalDays = 0;
      hiredApplications.forEach(app => {
        const appliedDate = new Date(app.applied_at);
        const reviewedDate = app.reviewed_at ? new Date(app.reviewed_at) : new Date();
        const days = Math.ceil((reviewedDate.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24));
        totalDays += days;
      });
      const averageTimeToHire = hiredApplications.length > 0 ? Math.round(totalDays / hiredApplications.length) : 0;

      setAnalytics({
        totalJobs,
        activeJobs,
        totalApplications,
        applicationsByStatus,
        applicationsByMonth,
        averageTimeToHire,
        topDepartments,
        interviewsScheduled,
        hiredCount
      });
    } catch (error: any) {
      console.error('Error fetching analytics:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#10B981'];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <p>Failed to load analytics data</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-background dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate('/company/careers')}
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Careers
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hiring Analytics</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track recruitment metrics and hiring performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Jobs</dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalJobs}</dd>
                    <dd className="text-xs text-gray-500 dark:text-gray-400">{analytics.activeJobs} active</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Applications</dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalApplications}</dd>
                    <dd className="text-xs text-gray-500 dark:text-gray-400">Total received</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews</dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.interviewsScheduled}</dd>
                    <dd className="text-xs text-gray-500 dark:text-gray-400">Scheduled</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Hired</dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.hiredCount}</dd>
                    <dd className="text-xs text-gray-500 dark:text-gray-400">Candidates</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Applications by Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.applicationsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.status}: ${entry.count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.applicationsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Applications Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.applicationsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Hiring Departments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topDepartments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#10B981" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hiring Metrics</h3>
              <div className="space-y-6 mt-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Time to Hire</span>
                    <span className="text-2xl font-bold text-primary">{analytics.averageTimeToHire} days</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min((analytics.averageTimeToHire / 60) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Conversion Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      {analytics.totalApplications > 0
                        ? Math.round((analytics.hiredCount / analytics.totalApplications) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${analytics.totalApplications > 0 ? (analytics.hiredCount / analytics.totalApplications) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interview Rate</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {analytics.totalApplications > 0
                        ? Math.round((analytics.interviewsScheduled / analytics.totalApplications) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${analytics.totalApplications > 0 ? (analytics.interviewsScheduled / analytics.totalApplications) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareersAnalyticsDashboardPage;
