
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const CustomFieldPage = () => {
  return (
    <DashboardLayout title="System Settings - Custom Fields">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Custom Field</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Create and manage custom data fields here.</p>
      </div>
    </DashboardLayout>
  );
};

export default CustomFieldPage;
