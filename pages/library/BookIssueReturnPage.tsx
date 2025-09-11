import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const BookIssueReturnPage = () => {
  return (
    <DashboardLayout title="Library - Book Issue/Return">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Book Issue & Return</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality for librarians to issue and process book returns will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default BookIssueReturnPage;
