
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const SystemStudentFieldPage = () => {
  return (
    <DashboardLayout title="System Settings - Student Fields">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">System Student Field</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Manage system-defined student fields here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SystemStudentFieldPage;
