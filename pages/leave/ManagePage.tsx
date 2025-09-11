
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const ManagePage = () => {
  return (
    <DashboardLayout title="Leave - Manage">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Manage Leave</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to manage all leave requests will be here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ManagePage;
