import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import { useTheme } from '../../components/ThemeProvider';
import { supabase } from '../../supabase';

const icons = {
  posts: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  views: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  comments: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  pending: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">{title}</p>
      <p className="text-3xl font-bold text-text-primary dark:text-gray-100">{value}</p>
      {trend && (
        <p className={`text-sm mt-1 ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </div>
    <div className="bg-primary/10 text-primary p-4 rounded-full">
      {icon}
    </div>
  </div>
);

const ViewsChart = ({ data }: { data: any[] }) => {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#fff';
  const tooltipBorder = theme === 'dark' ? '#374151' : '#ddd';

  return (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Blog Views Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="date" tick={{ fill: tickColor }} />
          <YAxis tick={{ fill: tickColor }} />
          <Tooltip cursor={{ stroke: '#5D5FEF', strokeWidth: 1 }} contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} labelStyle={{ color: tickColor }} />
          <Legend wrapperStyle={{ color: tickColor }} />
          <Line type="monotone" dataKey="views" name="Views" stroke="#5D5FEF" strokeWidth={2} dot={{ fill: '#5D5FEF', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CategoryChart = ({ data }: { data: any[] }) => {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#fff';
  const tooltipBorder = theme === 'dark' ? '#374151' : '#ddd';

  return (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Posts by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="category" tick={{ fill: tickColor }} />
          <YAxis tick={{ fill: tickColor }} />
          <Tooltip cursor={{ fill: 'rgba(93, 95, 239, 0.1)' }} contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} labelStyle={{ color: tickColor }} />
          <Legend wrapperStyle={{ color: tickColor }} />
          <Bar dataKey="posts" name="Posts" fill="#5D5FEF" barSize={30} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const BlogManagerDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalComments: 0,
    pendingComments: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*');

      const { data: comments } = await supabase
        .from('blog_comments')
        .select('*');

      const { data: categories } = await supabase
        .from('blog_categories')
        .select('*, blog_post_categories(count)');

      const totalPosts = posts?.length || 0;
      const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
      const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;
      const totalViews = posts?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0;
      const totalComments = comments?.length || 0;
      const pendingComments = comments?.filter(c => c.status === 'pending').length || 0;

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
        totalComments,
        pendingComments,
      });

      const recent = posts
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5) || [];
      setRecentPosts(recent);

      const catData = await Promise.all(
        (categories || []).map(async (cat) => {
          const { count } = await supabase
            .from('blog_post_categories')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);
          return { category: cat.name, posts: count || 0 };
        })
      );
      setCategoryData(catData.filter(c => c.posts > 0).slice(0, 6));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewsData = [
    { date: 'Week 1', views: 850 },
    { date: 'Week 2', views: 1240 },
    { date: 'Week 3', views: 1680 },
    { date: 'Week 4', views: 2130 },
  ];

  if (loading) {
    return (
      <DashboardLayout title="Blog Manager Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Blog Manager Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Posts" value={stats.totalPosts.toString()} icon={icons.posts} trend="12% this month" trendUp={true} />
        <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} icon={icons.views} trend="18% this month" trendUp={true} />
        <StatCard title="Total Comments" value={stats.totalComments.toString()} icon={icons.comments} />
        <StatCard title="Pending Comments" value={stats.pendingComments.toString()} icon={icons.pending} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ViewsChart data={viewsData} />
        <CategoryChart data={categoryData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100">Recent Posts</h3>
            <button
              onClick={() => navigate('/company/blog-manager/posts')}
              className="text-sm text-primary hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary dark:text-gray-200 text-sm mb-1">{post.title}</h4>
                    <p className="text-xs text-text-secondary dark:text-gray-400">
                      {post.author_name} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                    post.status === 'draft' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center mt-2 space-x-4 text-xs text-text-secondary dark:text-gray-400">
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    {post.views_count}
                  </span>
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    {post.comments_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => navigate('/company/blog-manager/posts/new')}
              className="flex items-center justify-between p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Create New Post
              </span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button
              onClick={() => navigate('/company/blog-manager/posts')}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Manage Posts
              </span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button
              onClick={() => navigate('/company/blog-manager/comments')}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Moderate Comments
              </span>
              {stats.pendingComments > 0 && (
                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">{stats.pendingComments}</span>
              )}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button
              onClick={() => navigate('/company/blog-manager/categories')}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Manage Categories & Tags
              </span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogManagerDashboardPage;
