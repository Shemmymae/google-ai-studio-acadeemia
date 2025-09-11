

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../components/ThemeProvider';

// --- Icons for StatCard ---
const icons = {
  schools: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" /></svg>,
  revenue: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
  newSignups: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
  supportTickets: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
};


// --- Internal Components ---
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-text-primary dark:text-gray-100">{value}</p>
        </div>
        <div className="bg-primary/10 text-primary p-4 rounded-full">
            {icon}
        </div>
    </div>
);

const chartData = [
  { name: 'Jan', signups: 4 },
  { name: 'Feb', signups: 3 },
  { name: 'Mar', signups: 5 },
  { name: 'Apr', signups: 7 },
  { name: 'May', signups: 6 },
  { name: 'Jun', signups: 8 },
  { name: 'Jul', signups: 10 },
];

const NewSignupsChart = () => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
    const tooltipBg = theme === 'dark' ? '#1F2937' : '#fff';
    const tooltipBorder = theme === 'dark' ? '#374151' : '#ddd';

    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">New School Signups (Last 7 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="name" tick={{ fill: tickColor }} />
                    <YAxis tick={{ fill: tickColor }}/>
                    <Tooltip cursor={{fill: 'rgba(93, 95, 239, 0.1)'}} contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} labelStyle={{color: tickColor}} />
                    <Legend wrapperStyle={{ color: tickColor }}/>
                    <Bar dataKey="signups" name="New Signups" fill="#5D5FEF" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


// --- Main Company Dashboard Page Component ---

const CompanyDashboardPage = () => {
  return (
    <DashboardLayout title="Company Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Schools" value="312" icon={icons.schools} />
          <StatCard title="MRR" value="$15,6K" icon={icons.revenue} />
          <StatCard title="New Signups (Month)" value="10" icon={icons.newSignups} />
          <StatCard title="Pending Tickets" value="4" icon={icons.supportTickets} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <NewSignupsChart />
        </div>
        <div className="lg:col-span-2 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Recent Company Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full dark:bg-green-900/50 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary dark:text-gray-200">'Bright Stars Academy' just signed up for the Premium Plan.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">15 mins ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full dark:bg-blue-900/50 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary dark:text-gray-200">New Add-on 'QR Code Attendance' has been purchased by 'Lakeside Prep'.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
            </li>
              <li className="flex items-start space-x-3">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full dark:bg-yellow-900/50 dark:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary dark:text-gray-200">Subscription for 'Oakdale Elementary' is expiring in 7 days.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">5 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboardPage;