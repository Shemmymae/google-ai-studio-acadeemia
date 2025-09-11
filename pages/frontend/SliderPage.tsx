
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const SliderPage = () => {
  return (
    <DashboardLayout title="Frontend CMS - Slider">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Slider Management</h2>
        <p className="mt-2 text-text-secondary dark:text-gray-400">Manage the image sliders for the frontend website here.</p>
      </div>
    </DashboardLayout>
  );
};

export default SliderPage;
