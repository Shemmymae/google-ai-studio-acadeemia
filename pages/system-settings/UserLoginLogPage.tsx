
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const UserLoginLogPage = () => {
  return (
    <DashboardLayout title="System Settings - User Login Log">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">User Login Log</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">View user login activity and history here.</p>
      </div>
    </DashboardLayout>
  );
};

export default UserLoginLogPage;
