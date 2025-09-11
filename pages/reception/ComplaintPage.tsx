
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const ICONS = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const complaintData = [
    { id: 1, school: 'Icon School & College', type: 'Hostel', name: 'sfgfgf', mobile: '53565656', date: '02.Jul.2024', solutionDate: '', assignTo: 'Jose McKinley', status: 'Pending' },
    { id: 2, school: 'Icon School & College', type: 'Fees', name: 'Flat fire', mobile: '3213', date: '31.Jul.2024', solutionDate: '03.Mar.2025', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 3, school: 'Icon School & College', type: 'Fees', name: '32', mobile: '32', date: '31.Jul.2024', solutionDate: '03.Mar.2025', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 4, school: 'Icon School & College', type: 'Teacher', name: 'You', mobile: '12345678', date: '01.Aug.2024', solutionDate: '', assignTo: 'Nicholas Fletcher', status: 'Pending' },
    { id: 5, school: 'Icon School & College', type: 'Hostel', name: 'Complainant Name', mobile: '8656543245', date: '23.Oct.2024', solutionDate: '', assignTo: 'Jose McKinley', status: 'Pending' },
    { id: 6, school: 'Oxford International', type: 'Fees', name: 'cn', mobile: '5754754', date: '25.Oct.2024', solutionDate: '08.Mar.2025', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 7, school: 'Icon School & College', type: 'Fees', name: 'on', mobile: '5754754', date: '05.Nov.2024', solutionDate: '03.Mar.2025', assignTo: 'Summer Simpson', status: 'Pending' },
    { id: 8, school: 'Icon School & College', type: 'Hostel', name: 'sathyaने इंटरनेट पर লরেম ইপসাম অনুচ্ছেদের অনেক', mobile: '9438843245', date: '04.Dec.2024', solutionDate: '', assignTo: 'Jose McKinley', status: 'Pending' },
    { id: 9, school: 'Icon School & College', type: 'Facilities', name: 'gf', mobile: '93865243', date: '02.Mar.2025', solutionDate: '', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 10, school: 'Icon School & College', type: 'Fees', name: 'regardingীfghfgh', mobile: '89768545465', date: '02.Mar.2025', solutionDate: '25.Feb.2025', assignTo: 'Shannon Ellis', status: 'Pending' },
    { id: 11, school: 'Icon School & College', type: 'Facilities', name: 'regardingীfghfgh', mobile: '89768545465', date: '02.Mar.2025', solutionDate: '', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 12, school: 'Icon School & College', type: 'Management', name: 'dfdsfds', mobile: '675657567', date: '02.Mar.2025', solutionDate: '08.Mar.2025', assignTo: 'Bhavini Guhathakurta', status: 'Pending' },
    { id: 13, school: 'Icon School & College', type: 'Hostel', name: 'Sfg', mobile: '256', date: '05.Apr.2025', solutionDate: '', assignTo: 'Jose McKinley', status: 'Pending' },
    { id: 14, school: 'Icon School & College', type: 'Fees', name: 'Fee date change', mobile: '8979876554', date: '29.Apr.2025', solutionDate: '', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 15, school: 'Oxford International', type: 'Fees', name: '5274554', mobile: '9879876558', date: '30.Jun.2025', solutionDate: '08.Mar.2025', assignTo: 'Jennifer Adams', status: 'Pending' },
    { id: 16, school: 'Icon School & College', type: 'Facilities', name: 'Test complaint', mobile: '9876543210', date: '10.Aug.2025', solutionDate: '', assignTo: 'Summer Simpson', status: 'Pending' },
];

const StatusBadge = ({ status }: { status: string }) => {
    return (
        <span className="px-2 py-1 text-xs font-semibold rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
            {status}
        </span>
    );
};

const ComplaintPage = () => {
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

    const ComplaintList = () => (
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
                            {['SI', 'School', 'Complaint Type', 'Complainant Name', 'Mobile No', 'Date', 'Date Of Solution', 'Assign To', 'Action'].map(head => (
                                <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {complaintData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.type}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{item.name}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.mobile}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.date}</td>
                                <td className="p-3 text-sm">{item.solutionDate ? item.solutionDate : <StatusBadge status={item.status} />}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.assignTo}</td>
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
                <p>Showing 1 to {complaintData.length} of {complaintData.length} entries</p>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                    <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                </div>
            </div>
        </div>
    );

    const AddComplaintForm = () => (
         <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <label htmlFor="school" className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                    <select id="school" className="form-input w-full"><option>Select</option></select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="type" className="text-sm text-text-secondary dark:text-gray-300">Type <span className="text-primary">*</span></label>
                    <select id="type" className="form-input w-full" disabled><option>First Select The School</option></select>
                </div>
                 <div className="space-y-1">
                    <label htmlFor="assign_to" className="text-sm text-text-secondary dark:text-gray-300">Assign To <span className="text-primary">*</span></label>
                    <select id="assign_to" className="form-input w-full" disabled><option>First Select The School</option></select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="complainant_name" className="text-sm text-text-secondary dark:text-gray-300">Complainant Name <span className="text-primary">*</span></label>
                    <input type="text" id="complainant_name" className="form-input w-full" />
                </div>
                 <div className="space-y-1">
                    <label htmlFor="complainant_mobile" className="text-sm text-text-secondary dark:text-gray-300">Complainant Mobile No</label>
                    <input type="tel" id="complainant_mobile" className="form-input w-full" />
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
            </div>
            <div className="pt-6 border-t dark:border-gray-700 flex justify-center">
                <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                    {ICONS.save} Save
                </button>
            </div>
        </form>
    );

    return (
        <DashboardLayout title="Complaint">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Complaint List" tabName="list" />
                        <TabButton label="Add Complaint" tabName="add" />
                    </nav>
                </div>
                {activeTab === 'list' ? <ComplaintList /> : <AddComplaintForm />}
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

export default ComplaintPage;