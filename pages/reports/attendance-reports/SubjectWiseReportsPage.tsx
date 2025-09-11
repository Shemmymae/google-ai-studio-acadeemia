import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const SubjectWiseReportsPage = () => {
  return (
    <DashboardLayout title="Reports - Subject Wise Reports">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Subject Wise Attendance Reports</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Attendance reports categorized by subject will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SubjectWiseReportsPage;