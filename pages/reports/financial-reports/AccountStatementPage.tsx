import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const AccountStatementPage = () => {
  return (
    <DashboardLayout title="Reports - Account Statement">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Account Statement Report</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Financial account statements will be generated here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AccountStatementPage;