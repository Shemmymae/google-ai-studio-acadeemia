
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const FeaturesPage = () => {
  return (
    <DashboardLayout title="Frontend CMS - Features">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Features Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Manage the features displayed on the frontend website here.</p>
      </div>
    </DashboardLayout>
  );
};

export default FeaturesPage;
