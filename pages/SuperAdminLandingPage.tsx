
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import DashboardLayout from '../components/DashboardLayout';

const CompanyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" />
  </svg>
);

const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
  </svg>
);

const SuperAdminLandingPage = () => {
    const navigate = useNavigate();
    const { profile } = useAuth();

    const handleNavigation = (view: 'company' | 'school') => {
        sessionStorage.setItem('adminView', view);
        if (view === 'company') {
            navigate('/company-dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <DashboardLayout title="Admin Home">
            <div className="flex flex-col items-center justify-center p-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">Welcome, {profile?.full_name || 'Super Admin'}!</h1>
                    <p className="mt-2 text-lg text-text-secondary dark:text-gray-400">Please select a management area to proceed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Company Management Card */}
                    <div 
                        onClick={() => handleNavigation('company')}
                        className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                    >
                        <CompanyIcon />
                        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-4">Company Management</h2>
                        <p className="text-text-secondary dark:text-gray-400 mt-2 mb-6">
                            Oversee company-wide operations, CRM, subscriptions, and global settings.
                        </p>
                        <button className="mt-auto bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
                            Go to Company Dashboard
                        </button>
                    </div>

                    {/* School Management Card */}
                    <div 
                        onClick={() => handleNavigation('school')}
                        className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-teal-400/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                    >
                        <SchoolIcon />
                        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-4">School Management</h2>
                        <p className="text-text-secondary dark:text-gray-400 mt-2 mb-6">
                            Manage individual schools, students, staff, academics, and school-specific settings.
                        </p>
                        <button className="mt-auto bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            Go to School Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SuperAdminLandingPage;
