import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// --- ICONS ---
const ICONS = {
    addDepartment: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    departmentList: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

// Mock Data based on the image
const initialDepartments = [
    { id: 1, branch: 'Icon School & College', name: 'Science' },
    { id: 2, branch: 'Icon School & College', name: 'Commerce' },
    { id: 3, branch: 'Icon School & College', name: 'General' },
    { id: 4, branch: 'Icon School & College', name: 'Arts' },
    { id: 5, branch: 'Oxford International', name: 'General' },
    { id: 6, branch: 'Oxford International', name: 'Libraries' },
    { id: 7, branch: 'Oxford International', name: 'Science' },
    { id: 8, branch: 'Icon School & College', name: 'Finance' },
    { id: 9, branch: 'Oxford International', name: 'Finance' },
    { id: 10, branch: 'Icon School & College', name: 'Library' },
    { id: 11, branch: 'Oxford International', name: 'Library' },
    { id: 12, branch: 'Icon School & College', name: 'Academic' },
    { id: 13, branch: 'Oxford International', name: 'Academic' },
];

type Department = typeof initialDepartments[0];

const DepartmentPage = () => {
    const [departments, setDepartments] = useState<Department[]>(initialDepartments);
    const [schools, setSchools] = useState<School[]>([]);
    const [loadingSchools, setLoadingSchools] = useState(true);

    const [branch, setBranch] = useState('');
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        const fetchSchools = async () => {
            setLoadingSchools(true);
            const schoolsData = await getSchools();
             // Use a defined set of schools from the image to ensure consistency
            const imageSchools = [
                { id: 1, name: 'Icon School & College' },
                { id: 2, name: 'Oxford International' }
            ];
            setSchools(imageSchools as School[]);
            setLoadingSchools(false);
        };
        fetchSchools();
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!branch || !departmentName) {
            alert('Please fill in all required fields.');
            return;
        }

        const newDepartment: Department = {
            id: Date.now(),
            branch,
            name: departmentName
        };

        setDepartments(prev => [...prev, newDepartment]);
        // Reset form
        setBranch('');
        setDepartmentName('');
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDepartments(prev => prev.filter(dept => dept.id !== id));
        }
    };

    return (
        <DashboardLayout title="Employee">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add Department Form */}
                <div className="lg:col-span-5 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b-2 border-red-500">
                        {ICONS.addDepartment} Add Department
                    </h3>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="branch" className="text-sm text-text-secondary dark:text-gray-300">
                                Branch <span className="text-red-500">*</span>
                            </label>
                            <select 
                                id="branch" 
                                value={branch} 
                                onChange={e => setBranch(e.target.value)} 
                                className="form-input w-full" 
                                required
                            >
                                <option value="">Select</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.name}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="departmentName" className="text-sm text-text-secondary dark:text-gray-300">
                                Department Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="departmentName"
                                value={departmentName}
                                onChange={e => setDepartmentName(e.target.value)}
                                className="form-input w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                             <button type="submit" className="inline-flex items-center justify-center py-2 px-6 border border-gray-400 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-card dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                {ICONS.save} Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Department List */}
                <div className="lg:col-span-7 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b-2 border-red-500">
                        {ICONS.departmentList} Department List
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                             <thead className="border-b-2 border-gray-300 dark:border-gray-600">
                                <tr>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Sl</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Branch</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Name</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept, index) => (
                                    <tr key={dept.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{dept.branch}</td>
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{dept.name}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center space-x-2">
                                                 <button className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:opacity-80" aria-label="Edit">{ICONS.edit}</button>
                                                 <button onClick={() => handleDelete(dept.id)} className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700" aria-label="Delete">{ICONS.delete}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
             <style>{`
                .form-input, .form-select {
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border: 1px solid;
                    background-color: transparent;
                    width: 100%;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input, html.dark .form-select {
                    border-color: #4B5563; 
                    background-color: #1F2937;
                    color: #F9FAFB;
                }
                html:not(.dark) .form-input, html:not(.dark) .form-select {
                    border-color: #D1D5DB;
                    color: #111827;
                }
                .form-input:focus, .form-select:focus {
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

export default DepartmentPage;
