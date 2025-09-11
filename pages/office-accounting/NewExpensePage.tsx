import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const NewExpensePage = () => {
  return (
    <DashboardLayout title="Office Accounting - New Expense">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">New Expense</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to add a new expense will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default NewExpensePage;
