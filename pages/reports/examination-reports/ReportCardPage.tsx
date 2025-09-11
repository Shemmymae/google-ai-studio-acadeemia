import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const ReportCardPage = () => {
  return (
    <DashboardLayout title="Reports - Report Card">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Report Card Generation</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to generate and view student report cards will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ReportCardPage;