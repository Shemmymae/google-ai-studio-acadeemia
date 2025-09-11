import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

// --- ICONS ---
const icons = {
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    actionGrid: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
};

// --- MOCK DATA ---
const transactionData = [
    { id: 1, schoolName: 'Oxford International', planName: 'Premium', paymentType: 'Subscribed', paymentMethod: 'Cash', amount: 450.00, trxId: 'ao015e18', date: '21.Apr.2025' },
    { id: 2, schoolName: 'Icon School & College', planName: 'Premium', paymentType: 'Subscribed', paymentMethod: 'Cash', amount: 450.00, trxId: 'e3ff199a', date: '21.Apr.2025' },
];

const PaymentTypeBadge = ({ type }: { type: string }) => (
    <span className="px-2 py-1 text-xs font-semibold rounded-full inline-block bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
        {type}
    </span>
);

const DateRangePicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const presets = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Year", "Custom Range"];
    const [range, setRange] = useState<{from: Date | undefined, to: Date | undefined}>({ from: new Date(2021, 0, 1), to: new Date(2025, 7, 31) });
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
                value={range?.from && range.to ? `${format(range.from, 'yyyy/MM/dd')} - ${format(range.to, 'yyyy/MM/dd')}` : '2021/01/01 - 2025/08/31'}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)} // delay to allow click on dropdown
                className="w-full cursor-pointer bg-card dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {isOpen && (
                <div className="absolute top-full mt-2 left-0 z-10 bg-card dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg flex flex-col lg:flex-row w-max">
                    <div className="w-full lg:w-40 border-b lg:border-b-0 lg:border-r dark:border-gray-700 p-2">
                        <ul className="space-y-1">
                            {presets.map(preset => (
                                <li key={preset}>
                                    <button 
                                        onClick={() => handlePresetClick(preset)}
                                        className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-text-primary dark:text-gray-200">
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
                        <div className="mt-4 flex justify-end space-x-2 border-t dark:border-gray-700 pt-2">
                            <button onClick={() => setIsOpen(false)} className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                            <button onClick={() => setIsOpen(false)} className="px-3 py-1 text-sm rounded-md bg-primary text-white hover:bg-primary-hover">Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const TransactionsPage = () => {
  return (
    <DashboardLayout title="Subscription Transactions">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border-t-2 border-primary">
        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Select Ground</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date <span className="text-red-500">*</span></label>
                <DateRangePicker />
            </div>
            <div className="lg:col-start-3 md:text-right">
                <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover">
                    {icons.filter} Filter
                </button>
            </div>
        </div>
      </div>

      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-2 border-primary">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100">Transactions</h3>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.copy}</button>
                    <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.print}</button>
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
                        {['SI', 'School Name', 'Plan Name', 'Payment Type', 'Payment Method', 'Amount', 'Trx ID', 'Date', 'Action'].map(head => (
                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactionData.map((trx, index) => (
                        <tr key={trx.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                            <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{trx.schoolName}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{trx.planName}</td>
                            <td className="p-3 text-sm"><PaymentTypeBadge type={trx.paymentType} /></td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{trx.paymentMethod}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${trx.amount.toFixed(2)}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{trx.trxId}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{trx.date}</td>
                            <td className="p-3">
                                <button className="p-1 rounded-md text-gray-500 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="View transaction details">
                                    {icons.actionGrid}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

         <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span>Showing 1 to {transactionData.length} of {transactionData.length} entries</span>
                <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600">
                    <option>25</option>
                </select>
                <span>rows per page</span>
            </div>
            <div className="flex items-center space-x-1">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
                <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&gt;</button>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;