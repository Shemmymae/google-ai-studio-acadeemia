import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const ICONS = {
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
};

const studentData = [
    { id: 1, photo: 'https://i.pravatar.cc/150?img=1', name: 'Danelle Solomon', class: 'Six (A)', registerNo: 'RSM-00001', mobile: '+17573552201', guardian: 'Binoga Naik' },
    { id: 2, photo: 'https://i.pravatar.cc/150?img=2', name: 'Angelina Jolie', class: 'Six (A)', registerNo: 'RSM-00002', mobile: '+7142897704', guardian: 'Summer Disan' },
    { id: 3, photo: 'https://i.pravatar.cc/150?img=3', name: 'Mollie Flores', class: 'Six (A)', registerNo: 'RSM-00005', mobile: '+13234255281', guardian: 'Binoga Naik' },
    { id: 4, photo: 'https://i.pravatar.cc/150?img=4', name: 'Gajendra Brahmbhatt', class: 'Six (A)', registerNo: 'RSM-00009', mobile: '+91 25.6200236', guardian: 'Binoga Naik' },
];


const MultiClassStudentPage = () => {
    const [isFiltered, setIsFiltered] = useState(false);
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

    return (
        <DashboardLayout title="Student List">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-1">
                        <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            School <span className="text-primary">*</span>
                        </label>
                        <select id="school" className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="class" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            Class <span className="text-primary">*</span>
                        </label>
                        <select id="class" className="form-input w-full" disabled>
                            <option value="">First Select The School</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="section" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            Section <span className="text-primary">*</span>
                        </label>
                        <select id="section" className="form-input w-full" disabled>
                            <option value="">Select Class First</option>
                        </select>
                    </div>
                    <div className="md:text-right">
                        <button onClick={() => setIsFiltered(true)} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                            {ICONS.filter} Filter
                        </button>
                    </div>
                </div>
            </div>

            {isFiltered && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                     <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                         <div className="flex items-center space-x-1">
                            <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{ICONS.copy}</button>
                            <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{ICONS.print}</button>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                             <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700/50">
                                <tr>
                                    {['Photo', 'Name', 'Class', 'Register No', 'Mobile No', 'Guardian Name', 'Action'].map(head => (
                                        <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                               {studentData.map(student => (
                                   <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                       <td className="p-3"><img src={student.photo} alt={student.name} className="h-10 w-10 rounded-full object-cover"/></td>
                                       <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{student.name}</td>
                                       <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.class}</td>
                                       <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.registerNo}</td>
                                       <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.mobile}</td>
                                       <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.guardian}</td>
                                       <td className="p-3"><button className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.add}</button></td>
                                   </tr>
                               ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                        <p>Showing 1 to {studentData.length} of {studentData.length} entries</p>
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                             <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                        </div>
                    </div>
                </div>
            )}
             <style>{`
                .form-input {
                    padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    background-color: transparent; width: 100%;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input { border-color: #4B5563; background-color: #1F2937; color: #F9FAFB; }
                html:not(.dark) .form-input { border-color: #D1D5DB; color: #111827; }
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

export default MultiClassStudentPage;