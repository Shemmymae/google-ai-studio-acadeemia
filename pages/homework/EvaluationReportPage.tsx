import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const EvaluationReportPage = () => {
  return (
    <DashboardLayout title="Evaluation Report">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Homework Evaluation Report</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Reports for homework evaluations will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default EvaluationReportPage;
