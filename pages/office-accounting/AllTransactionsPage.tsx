import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const AllTransactionsPage = () => {
  return (
    <DashboardLayout title="Office Accounting - All Transactions">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">All Transactions</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. A list of all office accounting transactions will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AllTransactionsPage;
