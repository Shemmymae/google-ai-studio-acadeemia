
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Link, useParams } from 'react-router-dom';

const ICONS = {
    info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

const enquiryDetails = {
    status: 'Partially Closed',
    enquiryDate: '2024-05-21',
    lastFollowUpDate: '13.Aug.2025',
    nextFollowUpDate: '14.Aug.2025',
    name: 'op rathore',
    gender: 'Male',
    classApplyingFor: 'Nine',
    fatherName: 'ms rathore',
    motherName: 'radha rathore',
    mobileNo: '9718394085',
    email: 'N/A',
    noOfChild: 2,
    enquiryReference: 'Google Ads',
    responseType: 'Very Good',
    enquiryResponse: 'N/A',
    note: 'N/A',
    previousSchool: 'N/A',
    assigned: 'Nicholas Fletcher',
    createdBy: 'Nicholas Fletcher'
};

const followUpData = [
    { id: 1, followUpDate: '16.May.2025', nextFollowUpDate: '17.May.2025', response: 'need to call', note: '', status: 'Active' },
    { id: 2, followUpDate: '21.May.2025', nextFollowUpDate: '23.May.2025', response: 'need to call', note: '', status: 'Closed' },
    { id: 3, followUpDate: '24.May.2025', nextFollowUpDate: '24.May.2025', response: '', note: '', status: 'Active' },
    { id: 4, followUpDate: '06.Jun.2025', nextFollowUpDate: '03.Jun.2025', response: 'ytrytrhd dfhghfghd dgh gfh gfhfghfgh fghgfhgfh', note: 'hgdrtyvgfh rty5345435453454354543', status: 'Partially Closed' },
    { id: 5, followUpDate: '10.Jun.2025', nextFollowUpDate: '12.Jun.2025', response: 'need to call', note: '', status: 'Active' },
    { id: 6, followUpDate: '23.Jun.2025', nextFollowUpDate: '25.Jun.2025', response: 'need to call', note: '', status: 'Partially Closed' },
    { id: 7, followUpDate: '24.Jun.2025', nextFollowUpDate: '26.Jun.2025', response: 'need to call', note: '', status: 'Active' },
    { id: 8, followUpDate: '06.Jul.2025', nextFollowUpDate: '11.Jul.2025', response: 'need to call', note: '', status: 'Partially Closed' },
    { id: 9, followUpDate: '10.Aug.2025', nextFollowUpDate: '12.Aug.2025', response: 'need to call', note: '', status: 'Active' },
    { id: 10, followUpDate: '13.Aug.2025', nextFollowUpDate: '14.Aug.2025', response: 'to admit', note: '', status: 'Partially Closed' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        'Active': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-green-200',
        'Closed': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 border-red-200',
        'Partially Closed': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400 border-orange-200',
    };
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-md border ${statusClasses[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {status}
        </span>
    );
};


const AdmissionEnquiryDetailsPage = () => {
    const { enquiryId } = useParams();

    return (
        <DashboardLayout title="Admission Enquiry">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Enquiry Details */}
                <div className="lg:col-span-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="flex items-center text-lg font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b border-primary">{ICONS.info} Enquiry Details</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-text-secondary dark:text-gray-400">Status</span>
                            <StatusBadge status={enquiryDetails.status} />
                        </div>
                        {Object.entries(enquiryDetails).filter(([key]) => key !== 'status').map(([key, value]) => {
                            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                            return (
                                <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700/50">
                                    <span className="font-semibold text-text-secondary dark:text-gray-400">{label}</span>
                                    <span className="text-text-primary dark:text-gray-200 text-right">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Follow-up Management */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Add Follow Up Form */}
                    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="flex items-center text-lg font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b border-primary">{ICONS.add} Add Follow Up</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="followUpDate" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Follow Up Date <span className="text-primary">*</span></label>
                                    <input type="date" id="followUpDate" defaultValue="2025-09-07" className="form-input mt-1 w-full" />
                                </div>
                                <div>
                                    <label htmlFor="nextFollowUpDate" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Next Follow Up Date <span className="text-primary">*</span></label>
                                    <input type="date" id="nextFollowUpDate" className="form-input mt-1 w-full" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="response" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Response</label>
                                <textarea id="response" rows={3} className="form-input mt-1 w-full"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Status <span className="text-primary">*</span></label>
                                    <select id="status" className="form-input mt-1 w-full"><option>Select</option></select>
                                </div>
                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Note</label>
                                    <textarea id="note" rows={1} className="form-input mt-1 w-full"></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">{ICONS.save} Save</button>
                            </div>
                        </form>
                    </div>
                    {/* Follow Up List */}
                    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="flex items-center text-lg font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b border-primary">{ICONS.list} Follow Up List</h3>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 dark:bg-gray-700/50">
                                    <tr>
                                        {['SI', 'Follow Up Date', 'Next Follow Up Date', 'Response', 'Note', 'Status', 'Action'].map(head => (
                                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {followUpData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="p-3 text-sm">{index + 1}</td>
                                            <td className="p-3 text-sm">{item.followUpDate}</td>
                                            <td className="p-3 text-sm">{item.nextFollowUpDate}</td>
                                            <td className="p-3 text-sm">{item.response}</td>
                                            <td className="p-3 text-sm">{item.note}</td>
                                            <td className="p-3"><StatusBadge status={item.status} /></td>
                                            <td className="p-3">
                                                 <button className="p-1 rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 transition-opacity" aria-label="Delete">{ICONS.delete}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="flex justify-between items-center mt-4 text-sm text-text-secondary dark:text-gray-400">
                            <p>Showing 1 to 10 of 10 entries</p>
                            <div className="flex items-center space-x-1">
                                <button className="px-2 py-1 border rounded-md" disabled>&lt;</button>
                                <button className="px-2 py-1 border rounded-md bg-primary text-white">1</button>
                                <button className="px-2 py-1 border rounded-md" disabled>&gt;</button>
                            </div>
                         </div>
                    </div>
                </div>
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
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(var(--dark-mode-filter, 0));
                }
                html.dark { --dark-mode-filter: 1; }
            `}</style>
        </DashboardLayout>
    );
};

export default AdmissionEnquiryDetailsPage;
