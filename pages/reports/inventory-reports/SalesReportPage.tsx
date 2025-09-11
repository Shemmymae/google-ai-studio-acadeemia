import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const SalesReportPage = () => {
  return (
    <DashboardLayout title="Reports - Sales Report">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Sales Report</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. A report on inventory sales will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SalesReportPage;