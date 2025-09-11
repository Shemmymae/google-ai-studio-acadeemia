import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

// --- ICONS ---
const icons = {
    approve: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    view: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
};

// --- MOCK DATA ---
const pendingRequestsData = [
    { id: 1, refNo: 423617, schoolName: 'BRADFORD', plan: 'Free Trial', price: 0, admin: 'Albert', contact: '077643494-6', status: 'Approved', paymentStatus: 'Paid', applyDate: '29.Aug.2025 02:08 PM' },
    { id: 2, refNo: 513825, schoolName: 'Omeel School', plan: 'Free Trial', price: 0, admin: 'Moses', contact: '254798665174', status: 'Approved', paymentStatus: 'Paid', applyDate: '23.Aug.2025 08:08 PM' },
    { id: 3, refNo: 601577, schoolName: 'gibraltal', plan: 'Gold', price: 150, admin: 'Mr segun', contact: '08026185374', status: 'Pending', paymentStatus: 'Unpaid', applyDate: '22.Aug.2025 10:07 PM' },
    // ... adding more sample data
    { id: 4, refNo: 963659, schoolName: 'int', plan: 'Silver', price: 70, admin: 'int', contact: '08026185374', status: 'Approved', paymentStatus: 'Paid', applyDate: '15.Aug.2025 12:08 AM' },
    { id: 5, refNo: 918638, schoolName: '43w', plan: 'Free Trial', price: 0, admin: 'dfr', contact: '999999999999', status: 'Approved', paymentStatus: 'Paid', applyDate: '13.Aug.2025 07:08 PM' },
    { id: 6, refNo: 234991, schoolName: 'test', plan: 'Gold', price: 150, admin: 'Akhtar', contact: '0922165174', status: 'Approved', paymentStatus: 'Offline Payments', applyDate: '11.Aug.2025 02:08 PM' },
    { id: 7, refNo: 816897, schoolName: 'test', plan: 'Silver', price: 70, admin: 'test', contact: '5355', status: 'Approved', paymentStatus: 'Paid', applyDate: '12.Aug.2025 09:08 PM' },
];

const StatusBadge = ({ status }: { status: 'Approved' | 'Pending' }) => {
    const colorClasses = {
        'Approved': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
        'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full inline-block ${colorClasses[status]}`}>{status}</span>;
};

const PaymentStatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    if (status === 'Paid') colorClass = 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400';
    if (status === 'Unpaid') colorClass = 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
    if (status === 'Offline Payments') colorClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full inline-block ${colorClass}`}>{status}</span>;
};

const DateRangePicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const presets = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Year", "Custom Range"];
    const [range, setRange] = useState<{from: Date | undefined, to: Date | undefined}>({ from: new Date(2025, 7, 31), to: new Date(2025, 7, 31) });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePresetClick = (preset: string) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        let from: Date | undefined;
        let to: Date | undefined = new Date(today);

        switch (preset) {
            case "Today":
                from = new Date(today);
                break;
            case "Yesterday":
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                from = yesterday;
                to = yesterday;
                break;
            case "Last 7 Days":
                const last7 = new Date(today);
                last7.setDate(today.getDate() - 6);
                from = last7;
                break;
            case "Last 30 Days":
                 const last30 = new Date(today);
                last30.setDate(today.getDate() - 29);
                from = last30;
                break;
            case "This Month":
                from = new Date(today.getFullYear(), today.getMonth(), 1);
                to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case "Last Year":
                from = new Date(today.getFullYear() - 1, 0, 1);
                to = new Date(today.getFullYear() - 1, 11, 31);
                break;
            default:
                from = undefined;
                to = undefined;
        }
        setRange({ from, to });
    };

    let footer = <p className="text-sm p-2 text-text-secondary dark:text-gray-400">Please pick the first day.</p>;
    if (range?.from && !range.to) {
        footer = <p className="text-sm p-2 text-text-secondary dark:text-gray-400">Please pick the last day.</p>;
    } else if (range?.from && range.to) {
        footer = <p className="text-sm p-2 text-text-secondary dark:text-gray-400">Selected from {format(range.from, 'PPP')} to {format(range.to, 'PPP')}</p>;
    }
    
    return (
        <div className="relative">
            <input 
                type="text" 
                readOnly 
                value={range?.from && range.to ? `${format(range.from, 'yyyy/MM/dd')} - ${format(range.to, 'yyyy/MM/dd')}` : '2025/08/31 - 2025/08/31'}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="w-full md:w-80 cursor-pointer bg-card dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {isOpen && (
                <div className="absolute top-full mt-2 left-0 z-10 bg-card dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg flex flex-col lg:flex-row">
                    <div className="w-full lg:w-40 border-b lg:border-b-0 lg:border-r dark:border-gray-700 p-2">
                        <ul className="space-y-1">
                            {presets.map(preset => (
                                <li key={preset}>
                                    <button 
                                        onClick={() => handlePresetClick(preset)}
                                        className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {preset}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4">
                       <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={setRange as any}
                            numberOfMonths={isMobile ? 1 : 2}
                            footer={footer}
                            classNames={{
                                root: 'bg-card dark:bg-gray-800 text-text-primary dark:text-gray-200',
                                month: 'space-y-4',
                                caption: 'flex justify-center pt-1.5 relative items-center',
                                caption_label: 'text-sm font-medium',
                                nav: 'space-x-1 flex items-center',
                                nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                nav_button_previous: 'absolute left-1.5',
                                nav_button_next: 'absolute right-1.5',
                                table: 'w-full border-collapse space-y-1',
                                head_row: 'flex',
                                head_cell: 'text-gray-700 rounded-md w-9 font-normal text-[0.8rem] dark:text-gray-400',
                                row: 'flex w-full mt-2',
                                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-primary/10 transition-colors',
                                day_selected: 'bg-primary text-white hover:bg-primary/90 focus:bg-primary/90',
                                day_today: 'bg-gray-100 dark:bg-gray-700',
                                day_outside: 'text-gray-400 opacity-50',
                                day_disabled: 'text-gray-400 opacity-50',
                                day_range_middle: 'aria-selected:bg-primary/10 aria-selected:text-current',
                                day_hidden: 'invisible',
                            }}
                        />
                        <div className="flex justify-end pt-2 border-t dark:border-gray-700 mt-2">
                             <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover">Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const PendingRequestPage = () => {
    return (
        <DashboardLayout title="Pending Requests">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Ground</label>
                        <select className="w-full bg-card dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Select</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                        <DateRangePicker />
                    </div>
                    <div className="md:text-right">
                        <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover">
                            {icons.filter} Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100">School List</h3>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                {['SI', 'Reference No', 'School Name', 'Plan Name', 'Price', 'Admin Name', 'Contact Number', 'Status', 'Payment Status', 'Apply Date', 'Action'].map(head => (
                                    <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequestsData.map((req, index) => (
                                <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.refNo}</td>
                                    <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{req.schoolName}</td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.plan}</td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${req.price.toFixed(2)}</td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.admin}</td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.contact}</td>
                                    <td className="p-3 text-sm"><StatusBadge status={req.status as 'Approved' | 'Pending'} /></td>
                                    <td className="p-3 text-sm"><PaymentStatusBadge status={req.paymentStatus} /></td>
                                    <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.applyDate}</td>
                                    <td className="p-3">
                                        <div className="flex space-x-2">
                                            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors" aria-label="View request">{icons.view}</button>
                                            <button className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors" aria-label="Approve request">{icons.approve}</button>
                                            <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete request">{icons.delete}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                 <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span>Showing 1 to {pendingRequestsData.length} of {pendingRequestsData.length} entries</span>
                        <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600">
                            <option>25</option>
                        </select>
                        <span>rows per page</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
                        <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">2</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PendingRequestPage;