
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const StudentAttendancePage = () => {
  return (
    <DashboardLayout title="Attendance - Student">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Student Attendance</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">This page is under construction. Functionality to manage student attendance will be available here.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendancePage;
