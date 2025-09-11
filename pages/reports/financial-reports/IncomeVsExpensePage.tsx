import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const IncomeVsExpensePage = () => {
  return (
    <DashboardLayout title="Reports - Income Vs Expense">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Income Vs Expense Report</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. A comparative report of income versus expenses will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default IncomeVsExpensePage;