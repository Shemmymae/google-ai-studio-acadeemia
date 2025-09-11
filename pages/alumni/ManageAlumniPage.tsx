
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
);

const AlumniIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682m0 0A3.006 3.006 0 0112 13.489M12 13.489c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" />
    </svg>
);


const ManageAlumniPage = () => {
    const [showAlumniList, setShowAlumniList] = useState(false);
    const [schools, setSchools] = useState<School[]>([]);
    const [loadingSchools, setLoadingSchools] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoadingSchools(true);
            const schoolsData = await getSchools();
            setSchools(schoolsData);
            setLoadingSchools(false);
        };
        fetchSchools();
    }, []);

    const handleFilterClick = () => {
        setShowAlumniList(true);
    };

  return (
    <DashboardLayout title="Alumni">
        <div className="space-y-6">
            {/* Filter Section */}
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-3 mb-6">Select Ground</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            School <span className="text-red-500">*</span>
                        </label>
                        <select className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            Passing Session <span className="text-red-500">*</span>
                        </label>
                        <select className="form-input w-full">
                            <option>2025-2026</option>
                        </select>
                    </div>
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            Class <span className="text-red-500">*</span>
                        </label>
                        <select className="form-input w-full" disabled>
                            <option>First Select The School</option>
                        </select>
                    </div>
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            Section
                        </label>
                        <select className="form-input w-full" disabled>
                            <option>Select Class First</option>
                        </select>
                    </div>
                    <div className="lg:col-span-1">
                        <button 
                            onClick={handleFilterClick}
                            className="w-full flex items-center justify-center bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            <FilterIcon />
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Alumni List Section - Conditionally Rendered */}
            {showAlumniList && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="flex items-center text-xl font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-3 mb-6">
                        <AlumniIcon />
                        Alumni List
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700/50">
                                <tr>
                                    {['#', 'Photo', 'Student Name', 'Register No', 'Class', 'Gender', 'Recent Information', 'Action'].map(head => (
                                        <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={8} className="text-center p-8">
                                        <span className="text-text-secondary dark:text-gray-400">No Information Available</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
        <style>{`
            .form-input {
                padding: 0.65rem 0.75rem;
                border-radius: 0.375rem;
                border: 1px solid;
                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }
            .form-input:disabled {
                opacity: 0.7;
            }
            html:not(.dark) .form-input {
                 border-color: #D1D5DB; /* gray-300 */
                 background-color: #FFFFFF; /* white */
                 color: #111827; /* gray-900 */
            }
             html:not(.dark) .form-input:disabled {
                 background-color: #F3F4F6; /* gray-100 */
            }
            html.dark .form-input {
                border-color: #4B5563; /* gray-600 */
                background-color: #374151; /* gray-700 */
                color: #F9FAFB; /* gray-50 */
            }
            html.dark .form-input:disabled {
                background-color: #4B5563; /* gray-600 */
            }
            .form-input:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-ring-color: #5D5FEF;
                box-shadow: 0 0 0 2px var(--tw-ring-color);
                border-color: #5D5FEF;
            }
        `}</style>
    </DashboardLayout>
  );
};

export default ManageAlumniPage;
