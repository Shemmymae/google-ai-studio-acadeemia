import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const StudentReportsByDatePage = () => {
  return (
    <DashboardLayout title="QR Code - Student Reports By Date">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Student QR Code Attendance Reports</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Reports for student attendance by date will be displayed here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentReportsByDatePage;
