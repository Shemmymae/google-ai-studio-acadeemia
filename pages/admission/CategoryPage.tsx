import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const ICONS = {
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

const categoryData = [
    { id: 1, school: 'Icon School & College', categoryId: 1, name: 'General' },
    { id: 2, school: 'Icon School & College', categoryId: 2, name: 'Science' },
    { id: 3, school: 'Icon School & College', categoryId: 3, name: 'Commerce' },
    { id: 4, school: 'Oxford International', categoryId: 6, name: 'General' },
    { id: 5, school: 'Oxford International', categoryId: 7, name: 'Science' },
    { id: 6, school: 'Oxford International', categoryId: 8, name: 'Commerce' },
    { id: 7, school: 'Icon School & College', categoryId: 9, name: 'General1' },
    { id: 8, school: 'Oxford International', categoryId: 10, name: 'General1' },
];

const CategoryPage = () => {
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
        <DashboardLayout title="Student Details">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Add Category Form */}
                <div className="lg:col-span-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                    <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 mb-6">
                        {ICONS.add} Add Category
                    </h3>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                                School <span className="text-primary">*</span>
                            </label>
                            <select id="school" name="school" required className="form-input" disabled={loadingSchools}>
                                <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                                Category Name <span className="text-primary">*</span>
                            </label>
                            <input type="text" id="name" name="name" required className="form-input"/>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                                {ICONS.save} Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Category List Table */}
                <div className="lg:col-span-2 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                     <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 mb-6">
                        {ICONS.list} Category List
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">School</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Id</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Name</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryData.map(item => (
                                    <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.school}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.categoryId}</td>
                                        <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{item.name}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center space-x-2">
                                                <button className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.edit}</button>
                                                <button className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.delete}</button>
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
                .form-input {
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border: 1px solid;
                    background-color: transparent;
                    width: 100%;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input {
                    border-color: #4B5563; 
                    background-color: #1F2937;
                    color: #F9FAFB;
                }
                html:not(.dark) .form-input {
                    border-color: #D1D5DB;
                    color: #111827;
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

export default CategoryPage;