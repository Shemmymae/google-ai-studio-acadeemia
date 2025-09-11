import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const BalanceSheetPage = () => {
  return (
    <DashboardLayout title="Reports - Balance Sheet">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Balance Sheet</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. The school's balance sheet will be generated here.</p>
      </div>
    </DashboardLayout>
  );
};

export default BalanceSheetPage;