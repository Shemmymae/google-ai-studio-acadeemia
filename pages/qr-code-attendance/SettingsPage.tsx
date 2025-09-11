import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout title="QR Code Settings">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">QR Code Attendance Settings</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Settings for QR code generation and attendance will be configured here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
