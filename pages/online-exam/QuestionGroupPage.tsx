import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const QuestionGroupPage = () => {
  return (
    <DashboardLayout title="Question Group">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Question Group Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to group questions for exams will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default QuestionGroupPage;
