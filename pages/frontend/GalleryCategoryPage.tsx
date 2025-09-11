
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const GalleryCategoryPage = () => {
  return (
    <DashboardLayout title="Frontend CMS - Gallery Category">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Gallery Category Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Manage the gallery categories for the frontend website here.</p>
      </div>
    </DashboardLayout>
  );
};

export default GalleryCategoryPage;
