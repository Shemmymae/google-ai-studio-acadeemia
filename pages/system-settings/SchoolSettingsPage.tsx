
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// Icons for the page
const SchoolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-text-primary dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SchoolSettingsPage = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoading(true);
            const data = await getSchools();
            setSchools(data);
            setLoading(false);
        };
        fetchSchools();
    }, []);

    return (
        <DashboardLayout title="School Settings">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex items-center pb-4 border-b-2 border-primary mb-6">
                    <SchoolIcon />
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">School List</h2>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-gray-400">
                        <select className="px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <span>rows per page</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 w-full md:w-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading schools...</div>
                    ) : schools.length === 0 ? (
                        <div className="text-center py-8 text-text-secondary dark:text-gray-400">No schools found.</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">Sl</th>
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">School Name</th>
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">Official School Name</th>
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">Email</th>
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">Address</th>
                                    <th className="p-3 font-semibold uppercase text-xs text-text-secondary dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schools.map((school, index) => (
                                    <tr key={school.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{school.name}</td>
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{school.officialName}</td>
                                        <td className="p-3 text-sm text-blue-500 dark:text-blue-400 hover:underline"><a href={`mailto:${school.email}`}>{school.email}</a></td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.address}</td>
                                        <td className="p-3 text-sm">
                                            <Link to={`/system-settings/school-config/${school.id}`} className="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-white font-semibold py-1.5 px-3 rounded-md transition-colors">
                                                <SettingsIcon />
                                                Configuration
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center mt-6">
                    <div className="flex items-center space-x-1 text-sm text-text-secondary dark:text-gray-400">
                        <button className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50" disabled>&lt;</button>
                        <button className="px-3 py-1.5 rounded-md bg-primary text-white font-bold">1</button>
                        <button className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50" disabled>&gt;</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SchoolSettingsPage;
