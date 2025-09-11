
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// --- ICONS ---
const ICONS = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    check: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
};

const postalData = [
    { id: 1, school: 'Icon School & College', type: 'Dispatch', sender: 'Letter Dispatched', receiver: 'Ahead Shuxratbek(py..)', date: '27.Feb.2024', confidential: false },
    { id: 2, school: 'Icon School & College', type: 'Dispatch', sender: 'Setif', receiver: 'dfgad', date: '15.Mar.2024', confidential: false },
    { id: 3, school: 'Icon School & College', type: 'Dispatch', sender: 'Admin', receiver: 'Secretary', date: '28.Apr.2024', confidential: false },
    { id: 4, school: 'Icon School & College', type: 'Dispatch', sender: 'Akash Sing', receiver: 'Dilip Yadav', date: '05.Aug.2024', confidential: true },
    { id: 5, school: 'Oxford International', type: 'Receive', sender: 'test', receiver: '3636', date: '05.Nov.2024', confidential: true },
];

const PostalRecordPage = () => {
    const [activeTab, setActiveTab] = useState('list');

    const TabButton = ({ label, tabName }: { label: string; tabName: string }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`flex items-center px-1 py-2 font-semibold text-sm transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover border-b-2 border-transparent'
                    }`}
            >
                {tabName === 'list' ? ICONS.list : ICONS.add}
                {label}
            </button>
        );
    };

    const PostalRecordList = () => (
        <div>
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
                            {['SI', 'School', 'Type', 'Sender Title', 'Receiver Title', 'Date', 'Confidential', 'Action'].map(head => (
                                <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {postalData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.type}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{item.sender}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.receiver}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.date}</td>
                                <td className="p-3">{item.confidential ? ICONS.check : 'No'}</td>
                                <td className="p-3">
                                    <div className="flex space-x-2">
                                        <button className="p-1 rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 transition-opacity" aria-label="Edit">{ICONS.edit}</button>
                                        <button className="p-1 rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 transition-opacity" aria-label="Delete">{ICONS.delete}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <p>Showing 1 to {postalData.length} of {postalData.length} entries</p>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                    <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                </div>
            </div>
        </div>
    );
    
    const AddPostalRecordForm = () => {
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
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label htmlFor="school" className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                        <select id="school" className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="type" className="text-sm text-text-secondary dark:text-gray-300">Type <span className="text-primary">*</span></label>
                        <select id="type" className="form-input w-full"><option>Select</option><option>Dispatch</option><option>Receive</option></select>
                    </div>
                     <div className="space-y-1">
                        <label htmlFor="ref_no" className="text-sm text-text-secondary dark:text-gray-300">Reference No <span className="text-primary">*</span></label>
                        <input type="text" id="ref_no" className="form-input w-full" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="sender_title" className="text-sm text-text-secondary dark:text-gray-300">Sender Title <span className="text-primary">*</span></label>
                        <input type="text" id="sender_title" className="form-input w-full" />
                    </div>
                     <div className="space-y-1">
                        <label htmlFor="receiver_title" className="text-sm text-text-secondary dark:text-gray-300">Receiver Title <span className="text-primary">*</span></label>
                        <input type="text" id="receiver_title" className="form-input w-full" />
                    </div>
                    <div className="space-y-1 md:col-span-2 lg:col-span-3">
                        <label htmlFor="address" className="text-sm text-text-secondary dark:text-gray-300">Address <span className="text-primary">*</span></label>
                        <textarea id="address" rows={3} className="form-input w-full"></textarea>
                    </div>
                    <div className="space-y-1 md:col-span-2 lg:col-span-3">
                        <label htmlFor="note" className="text-sm text-text-secondary dark:text-gray-300">Note</label>
                        <textarea id="note" rows={3} className="form-input w-full"></textarea>
                    </div>
                     <div className="space-y-1">
                        <label htmlFor="date" className="text-sm text-text-secondary dark:text-gray-300">Date <span className="text-primary">*</span></label>
                        <input type="date" id="date" defaultValue="2025-09-07" className="form-input w-full" />
                    </div>
                     <div className="space-y-1">
                        <label htmlFor="document" className="text-sm text-text-secondary dark:text-gray-300">Document File</label>
                        <input type="file" id="document" className="form-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary dark:file:bg-primary/20 dark:file:text-primary-hover hover:file:bg-primary/20"/>
                    </div>
                     <div className="space-y-2 pt-4">
                        <label htmlFor="confidential" className="text-sm text-text-secondary dark:text-gray-300">Confidential</label>
                        <label htmlFor="confidential-toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" id="confidential-toggle" className="sr-only" />
                                <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="pt-6 border-t dark:border-gray-700 flex justify-center">
                    <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                        {ICONS.save} Save
                    </button>
                </div>
            </form>
        );
    }
    return (
        <DashboardLayout title="Postal Record">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Postal Record List" tabName="list" />
                        <TabButton label="Add Postal Record" tabName="add" />
                    </nav>
                </div>
                {activeTab === 'list' ? <PostalRecordList /> : <AddPostalRecordForm />}
            </div>
            <style>{`
                .form-input {
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border: 1px solid;
                    background-color: transparent;
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
                /* Custom toggle switch style */
                input:checked ~ .dot {
                    transform: translateX(100%);
                    background-color: #fff;
                }
                input:checked ~ .block {
                    background-color: #5D5FEF;
                }
                /* Styling for date picker indicator */
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(var(--dark-mode-filter, 0));
                }
                html.dark {
                    --dark-mode-filter: 1;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default PostalRecordPage;
