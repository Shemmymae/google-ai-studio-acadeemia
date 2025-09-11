import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const OnlineExamPage = () => {
  return (
    <DashboardLayout title="Online Exam">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Online Exam Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to create and manage online exams will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default OnlineExamPage;
