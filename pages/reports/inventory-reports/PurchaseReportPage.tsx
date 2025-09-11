import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const PurchaseReportPage = () => {
  return (
    <DashboardLayout title="Reports - Purchase Report">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Purchase Report</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. A report on inventory purchases will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseReportPage;