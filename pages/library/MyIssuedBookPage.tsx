import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const MyIssuedBookPage = () => {
  return (
    <DashboardLayout title="Library - My Issued Book">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">My Issued Books</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. A list of books issued to the current user will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default MyIssuedBookPage;
