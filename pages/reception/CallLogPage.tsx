
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
    clock: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const callLogData = [
    { id: 1, school: 'Icon School & College', name: 'Ray', mobile: '023547666', purpose: 'Dispatch', type: 'Electricity Office', date: '02.Feb.2024', startTime: '09:24 AM', endTime: '10:00 AM', followUp: '05.Feb.2024', duration: '00:36:00', note: 'Yes' },
    { id: 2, school: 'Icon School & College', name: 'Anita', mobile: '0243000111', purpose: 'Receive', type: 'Fees', date: '02.Feb.2024', startTime: '09:27 AM', endTime: '09:40 AM', followUp: '06.Feb.2024', duration: '00:13:00', note: 'test' },
    { id: 3, school: 'Icon School & College', name: 'H', mobile: 'B', purpose: 'Dispatch', type: 'Fees', date: '17.Mar.2024', startTime: '11:20 PM', endTime: '11:20 PM', followUp: '-', duration: '00:00:00', note: '' },
    { id: 4, school: 'Icon School & College', name: 'RIYA', mobile: '6387452965', purpose: 'Dispatch', type: 'Fees', date: '30.Mar.2024', startTime: '06:03 PM', endTime: '06:03 PM', followUp: '01.Apr.2024', duration: '00:00:00', note: '' },
    { id: 5, school: 'Icon School & College', name: 'Kelly', mobile: '+1724-965495', purpose: 'Dispatch', type: 'Fees', date: '25.Apr.2024', startTime: '12:33 AM', endTime: '12:33 AM', followUp: '26.Apr.2024', duration: '00:00:00', note: '' },
    { id: 6, school: 'Oxford International', name: 'Yyy', mobile: '+9662-554-81-35', purpose: 'Receive', type: 'Fees', date: '07.Jul.2024', startTime: '12:33 AM', endTime: '12:33 AM', followUp: '07.Jul.2024', duration: '00:00:00', note: 'Ghh' },
    { id: 7, school: 'Icon School & College', name: 'Sathya', mobile: '8025710324', purpose: 'Dispatch', type: 'Fees', date: '06.Dec.2024', startTime: '12:38 PM', endTime: '01:00 PM', followUp: '06.Dec.2024', duration: '00:22:00', note: 'Fees enquiry' },
    { id: 8, school: 'Icon School & College', name: 'd6t6f', mobile: '1', purpose: 'Dispatch', type: 'Fees', date: '14.Feb.2025', startTime: '02:48 PM', endTime: '02:48 PM', followUp: '-', duration: '00:00:00', note: '' },
    { id: 9, school: 'Icon School & College', name: 'Susmita', mobile: '9428564578', purpose: 'Dispatch', type: 'To inquire about the child', date: '23.Feb.2025', startTime: '10:56 PM', endTime: '10:56 PM', followUp: '24.Feb.2025', duration: '00:00:00', note: 'call her' },
    { id: 10, school: 'Icon School & College', name: 'some', mobile: '818108934', purpose: 'Dispatch', type: 'Fees', date: '29.Apr.2025', startTime: '07:30 AM', endTime: '07:30 AM', followUp: '29.Apr.2025', duration: '00:00:00', note: 'calling parents' },
    { id: 11, school: 'Icon School & College', name: 'sdsd', mobile: '213123123', purpose: 'Dispatch', type: 'Fees', date: '27.May.2025', startTime: '08:53 AM', endTime: '08:53 AM', followUp: '-', duration: '00:00:00', note: '23131dflisdjflsdjfls' },
    { id: 12, school: 'Oxford International', name: '88846184', mobile: '68846184', purpose: 'Dispatch', type: 'Fees', date: '30.Jun.2025', startTime: '12:38 PM', endTime: '12:38 PM', followUp: '-', duration: '00:00:00', note: '' },
    { id: 13, school: 'Icon School & College', name: 'dg', mobile: '7896541302', purpose: 'Dispatch', type: 'Electricity Office', date: '06.Jul.2025', startTime: '12:34 PM', endTime: '12:38 PM', followUp: '-', duration: '00:04:00', note: '' },
];


const CallLogPage = () => {
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

    const CallLogList = () => (
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
                            {['SI', 'School', 'Name', 'Mobile No', 'Calling Purpose', 'Call Type', 'Date', 'Start Time', 'End Time', 'Follow Up', 'Duration', 'Note', 'Action'].map(head => (
                                <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {callLogData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{item.name}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.mobile}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.purpose}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.type}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.date}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.startTime}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.endTime}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.followUp}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.duration}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.note}</td>
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
                <p>Showing 1 to {callLogData.length} of {callLogData.length} entries</p>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                    <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                </div>
            </div>
        </div>
    );

    const AddCallLogForm = () => (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <label htmlFor="school" className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                    <select id="school" className="form-input w-full"><option>Select</option></select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="call_type" className="text-sm text-text-secondary dark:text-gray-300">Call Type <span className="text-primary">*</span></label>
                    <select id="call_type" className="form-input w-full"><option>Select</option><option>Dispatch</option><option>Receive</option></select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="calling_purpose" className="text-sm text-text-secondary dark:text-gray-300">Calling Purpose <span className="text-primary">*</span></label>
                    <select id="calling_purpose" className="form-input w-full" disabled><option>First Select The School</option></select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm text-text-secondary dark:text-gray-300">Name <span className="text-primary">*</span></label>
                    <input type="text" id="name" className="form-input w-full" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="mobile_no" className="text-sm text-text-secondary dark:text-gray-300">Mobile No <span className="text-primary">*</span></label>
                    <input type="tel" id="mobile_no" className="form-input w-full" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="date" className="text-sm text-text-secondary dark:text-gray-300">Date <span className="text-primary">*</span></label>
                    <input type="date" id="date" defaultValue="2025-09-07" className="form-input w-full" />
                </div>
                <div className="space-y-1 md:col-span-2">
                     <label htmlFor="time_slot" className="text-sm text-text-secondary dark:text-gray-300">Time Slot <span className="text-primary">*</span></label>
                     <div className="flex items-center gap-4">
                        <div className="relative w-full">
                           <input type="time" defaultValue="12:17" className="form-input w-full pr-8"/>
                           <span className="absolute right-2 top-1/2 -translate-y-1/2">{ICONS.clock}</span>
                        </div>
                         <div className="relative w-full">
                           <input type="time" defaultValue="12:17" className="form-input w-full pr-8"/>
                           <span className="absolute right-2 top-1/2 -translate-y-1/2">{ICONS.clock}</span>
                        </div>
                     </div>
                </div>
                <div className="space-y-1">
                    <label htmlFor="follow_up_date" className="text-sm text-text-secondary dark:text-gray-300">Follow Up Date</label>
                    <input type="date" id="follow_up_date" className="form-input w-full" />
                </div>
                <div className="space-y-1 md:col-span-2 lg:col-span-3">
                    <label htmlFor="note" className="text-sm text-text-secondary dark:text-gray-300">Note</label>
                    <textarea id="note" rows={3} className="form-input w-full"></textarea>
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
        <DashboardLayout title="Call Log">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Call Log List" tabName="list" />
                        <TabButton label="Add Call Log" tabName="add" />
                    </nav>
                </div>
                {activeTab === 'list' ? <CallLogList /> : <AddCallLogForm />}
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
                /* Styling for date/time picker indicator */
                input[type="date"]::-webkit-calendar-picker-indicator,
                input[type="time"]::-webkit-calendar-picker-indicator {
                    filter: invert(var(--dark-mode-filter, 0));
                }
                html.dark {
                    --dark-mode-filter: 1;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default CallLogPage;