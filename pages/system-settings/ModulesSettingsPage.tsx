
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const ModulesSettingsPage = () => {
  return (
    <DashboardLayout title="System Settings - Modules">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Modules Settings</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Enable or disable application modules here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ModulesSettingsPage;
