import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const AttendancePage = () => {
  return (
    <DashboardLayout title="QR Code Attendance">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">QR Code Attendance</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. QR code scanning and attendance marking functionality will be here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
