
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const FaqPage = () => {
  return (
    <DashboardLayout title="Frontend CMS - FAQ">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">FAQ Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Manage the Frequently Asked Questions for the frontend website here.</p>
      </div>
    </DashboardLayout>
  );
};

export default FaqPage;
