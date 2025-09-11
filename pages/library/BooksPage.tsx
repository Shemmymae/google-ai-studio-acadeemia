import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const BooksPage = () => {
  return (
    <DashboardLayout title="Library - Books">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Books Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to manage all library books will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default BooksPage;
