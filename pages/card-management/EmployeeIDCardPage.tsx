import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const EmployeeIDCardPage = () => {
  return (
    <DashboardLayout title="Employee ID Card">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Employee ID Card</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to generate and manage Employee ID cards will be here.</p>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeIDCardPage;
