import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const SubjectWiseByMonthPage = () => {
  return (
    <DashboardLayout title="Reports - Subject Wise By Month">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Subject Wise Attendance By Month</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Monthly subject-wise attendance reports will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SubjectWiseByMonthPage;