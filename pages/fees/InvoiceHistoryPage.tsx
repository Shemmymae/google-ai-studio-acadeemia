import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Link, useParams } from 'react-router-dom';

// Icons
const InvoiceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CollectFeesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 0h-2" /></svg>;
const FullyPaidIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

const invoiceData = {
    invoiceTo: {
        name: 'Gajendra Brahmbhatt',
        registerNo: 'RSM-00009',
        address: '72, Aundh, Trichy - 297337',
        class: 'Six (A)',
        fatherName: 'Binoya Naik'
    },
    invoiceDetails: {
        no: '#0008',
        date: '10.Sep.2025',
        status: 'Unpaid'
    },
    academic: {
        name: 'Icon School & College',
        address: 'Chyakunjo, Moylapotha, New York',
        phone: '+158 2045 0412',
        email: 'icon@gmail.com'
    },
    fees: [
        { group: 'Class One Half Yearly', items: [
            { id: 1, type: 'January Month Fees', dueDate: '02.Jan.2025', status: 'Unpaid', amount: 100.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 100.00 },
            { id: 2, type: 'February Month Fees', dueDate: '03.Feb.2025', status: 'Unpaid', amount: 200.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 200.00 },
            { id: 3, type: 'March Month Fees', dueDate: '02.Mar.2025', status: 'Unpaid', amount: 300.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 300.00 },
            { id: 4, type: 'April Month Fees', dueDate: '03.Apr.2025', status: 'Unpaid', amount: 250.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 250.00 },
            { id: 5, type: 'May Month Fees', dueDate: '03.May.2025', status: 'Unpaid', amount: 100.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 100.00 },
            { id: 6, type: 'Jun Month Fees', dueDate: '03.Jun.2025', status: 'Unpaid', amount: 250.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 250.00 },
        ]},
        { group: 'March Exam Fees', items: [
             { id: 7, type: 'Exam Fees', dueDate: '03.Mar.2025', status: 'Unpaid', amount: 150.00, discount: 0.00, fine: 0.00, paid: 0.00, balance: 150.00 },
        ]}
    ],
    summary: {
        grandTotal: 1350.00,
        discount: 0.00,
        paid: 0.00,
        fine: 0.00,
        totalPaid: 0.00,
        balance: 1350.00,
        balanceInWords: 'One Thousand Three Hundred Fifty'
    }
};

const CollectFeesModal = ({ isOpen, onClose, selectedItems }: {
    isOpen: boolean;
    onClose: () => void;
    selectedItems: typeof invoiceData.fees[0]['items'];
}) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-start p-4 pt-16 sm:pt-24"
            onClick={onClose}
        >
            <div 
                className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[80vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-card dark:bg-gray-800 z-10">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-text-primary dark:text-gray-100">
                        <CollectFeesIcon />
                        Collect Fees
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl">&times;</button>
                </div>
                
                <div className="overflow-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700/50 sticky top-0">
                                <tr>
                                    {['Fees Type', 'Date', 'Amount', 'Discount', 'Fine', 'Payment Method', 'Account', 'Remarks'].map(head => (
                                        <th key={head} className="p-3 font-semibold text-text-secondary dark:text-gray-300 whitespace-nowrap">{head} <span className="text-red-500">*</span></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-2 align-top">
                                            <div className="font-semibold text-text-primary dark:text-gray-200">{item.type}</div>
                                            <div className="text-xs text-text-secondary dark:text-gray-400">{item.type.toLowerCase().replace(/ /g, '-')}</div>
                                        </td>
                                        <td className="p-2"><input type="date" defaultValue="2025-09-10" className="form-input" /></td>
                                        <td className="p-2"><input type="number" defaultValue={item.amount.toFixed(2)} className="form-input w-28" /></td>
                                        <td className="p-2"><input type="number" defaultValue="0" className="form-input w-24" /></td>
                                        <td className="p-2"><input type="number" defaultValue={item.fine.toFixed(2)} className="form-input w-24" /></td>
                                        <td className="p-2"><select className="form-input w-32"><option>Cash</option></select></td>
                                        <td className="p-2"><select className="form-input w-32"><option>STB</option></select></td>
                                        <td className="p-2"><textarea rows={1} className="form-input w-40" placeholder="Write Your Remarks"></textarea></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0 sticky bottom-0">
                    <button className="px-6 py-2 bg-gray-700 dark:bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-600 dark:hover:bg-gray-500">Fee Payment</button>
                </div>
            </div>
        </div>
    );
};

// FIX: This component was defined incorrectly, causing a scope issue for the main component.
// It has been refactored to accept state and handlers as props.
const InvoiceSection = ({
    onCollectFees,
    selectedFees,
    allFeeItems,
    onSelectAll,
    onSelectOne,
    studentId
}: {
    onCollectFees: () => void;
    selectedFees: number[];
    allFeeItems: any[];
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectOne: (id: number) => void;
    studentId?: string;
}) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg border dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-4">
                <img src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/public/website_images/frontend/ramom-logo.png" alt="Ramom Logo" className="h-10"/>
                <div>
                    <h2 className="font-bold text-text-primary dark:text-gray-100">Invoice To :</h2>
                    <address className="text-sm text-text-secondary dark:text-gray-400 not-italic mt-1">
                        {invoiceData.invoiceTo.name}<br/>
                        Register No : {invoiceData.invoiceTo.registerNo}<br/>
                        {invoiceData.invoiceTo.address}<br/>
                        Class : {invoiceData.invoiceTo.class}<br/>
                        Father Name : {invoiceData.invoiceTo.fatherName}
                    </address>
                </div>
            </div>

            {/* Right Side */}
            <div className="text-left md:text-right space-y-4">
                <div className="bg-card dark:bg-gray-800 p-4 rounded-md border dark:border-gray-700 inline-block text-left">
                    <p><strong>Invoice No :</strong> {invoiceData.invoiceDetails.no}</p>
                    <p><strong>Date :</strong> {invoiceData.invoiceDetails.date}</p>
                    <p className="flex items-center"><strong>Status :</strong> <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-md bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">{invoiceData.invoiceDetails.status}</span></p>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold text-text-primary dark:text-gray-100">Academic :</h3>
                        <address className="text-sm text-text-secondary dark:text-gray-400 not-italic mt-1">
                        {invoiceData.academic.name}<br/>
                        {invoiceData.academic.address}<br/>
                        {invoiceData.academic.phone}<br/>
                        {invoiceData.academic.email}
                    </address>
                </div>
            </div>
        </div>
        
        {/* Fees Table */}
        <div className="mt-8">
            <button 
                onClick={onCollectFees}
                disabled={selectedFees.length === 0}
                className="flex items-center px-4 py-2 mb-4 bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-md font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <CollectFeesIcon /> Selected Fees Collect
            </button>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 dark:bg-black text-white">
                        <tr>
                            <th className="p-3"><input type="checkbox" className="form-checkbox" onChange={onSelectAll} checked={selectedFees.length === allFeeItems.length && allFeeItems.length > 0}/></th>
                            <th className="p-3 font-semibold">#</th>
                            <th className="p-3 font-semibold">Fees Type</th>
                            <th className="p-3 font-semibold">Due Date</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold text-right">Amount</th>
                            <th className="p-3 font-semibold text-right">Discount</th>
                            <th className="p-3 font-semibold text-right">Fine</th>
                            <th className="p-3 font-semibold text-right">Paid</th>
                            <th className="p-3 font-semibold text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.fees.map(group => (
                            <React.Fragment key={group.group}>
                                <tr className="bg-gray-100 dark:bg-gray-800/50">
                                    <td colSpan={10} className="p-2 font-bold text-text-primary dark:text-gray-200">
                                        {group.group} ⇅ 
                                    </td>
                                </tr>
                                {group.items.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-3"><input type="checkbox" className="form-checkbox" checked={selectedFees.includes(item.id)} onChange={() => onSelectOne(item.id)} /></td>
                                        <td className="p-3 text-text-secondary dark:text-gray-400">{item.id}</td>
                                        <td className="p-3 font-medium text-text-primary dark:text-gray-200">{item.type}</td>
                                        <td className="p-3 text-text-secondary dark:text-gray-400">{item.dueDate}</td>
                                        <td className="p-3"><span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">{item.status}</span></td>
                                        <td className="p-3 text-right text-text-secondary dark:text-gray-400">${item.amount.toFixed(2)}</td>
                                        <td className="p-3 text-right text-text-secondary dark:text-gray-400">${item.discount.toFixed(2)}</td>
                                        <td className="p-3 text-right text-text-secondary dark:text-gray-400">${item.fine.toFixed(2)}</td>
                                        <td className="p-3 text-right text-text-secondary dark:text-gray-400">${item.paid.toFixed(2)}</td>
                                        <td className="p-3 text-right text-text-secondary dark:text-gray-400">${item.balance.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end mt-8">
            <div className="w-full max-w-sm space-y-3 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-800/50 rounded-md"><strong>Grand Total :</strong><strong>${invoiceData.summary.grandTotal.toFixed(2)}</strong></div>
                <div className="flex justify-between p-2"><span>Discount :</span><span>${invoiceData.summary.discount.toFixed(2)}</span></div>
                <div className="flex justify-between p-2"><span>Paid :</span><span>${invoiceData.summary.paid.toFixed(2)}</span></div>
                <div className="flex justify-between p-2"><span>Fine :</span><span>${invoiceData.summary.fine.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2 border-t border-gray-300 dark:border-gray-700"><span>Total Paid (with fine) :</span><span>${invoiceData.summary.totalPaid.toFixed(2)}</span></div>
                <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-800/50 rounded-md"><strong>Balance :</strong><strong>${invoiceData.summary.balance.toFixed(2)}</strong></div>
                <p className="text-center italic mt-2">( {invoiceData.summary.balanceInWords} )</p>
            </div>
        </div>

        {/* Footer Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-md font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"><PrintIcon /> Print</button>
            <Link to={`/student/profile/${studentId}`} className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-md font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"><BackIcon /> Back</Link>
        </div>
    </div>
);

const CollectFeesSection = () => (
    <div className="p-8 rounded-lg border dark:border-gray-700">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Fees Type <span className="text-red-500">*</span></label>
                <select className="form-input w-full"><option>Select</option></select>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Date <span className="text-red-500">*</span></label>
                <input type="date" defaultValue="2025-09-10" className="form-input w-full"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Amount <span className="text-red-500">*</span></label>
                <input type="number" defaultValue="0" className="form-input w-full"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Discount</label>
                <input type="number" defaultValue="0" className="form-input w-full"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Fine</label>
                <input type="number" defaultValue="0" className="form-input w-full"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Payment Method <span className="text-red-500">*</span></label>
                <select className="form-input w-full"><option>Cash</option></select>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Account <span className="text-red-500">*</span></label>
                <select className="form-input w-full"><option>STB</option></select>
            </div>
            <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Remarks</label>
                <textarea rows={3} className="form-input w-full" placeholder="Write Your Remarks"></textarea>
            </div>
             <div className="md:col-span-2 flex items-center">
                 <input type="checkbox" id="guardian-sms" className="form-checkbox"/>
                 <label htmlFor="guardian-sms" className="ml-2 text-sm text-text-secondary dark:text-gray-300">Guardian Confirmation Sms</label>
            </div>
            <div className="md:col-span-2 flex justify-end">
                <button className="px-6 py-2 bg-gray-700 dark:bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-600 dark:hover:bg-gray-500">Fee Payment</button>
            </div>
        </form>
    </div>
);

const FullyPaidSection = () => (
    <div className="p-8 rounded-lg border dark:border-gray-700">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Date <span className="text-red-500">*</span></label>
                <input type="date" defaultValue="2025-09-10" className="form-input w-full"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Amount <span className="text-red-500">*</span></label>
                <input type="number" value="1350.00" readOnly className="form-input w-full bg-gray-100 dark:bg-gray-700/50"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Fine</label>
                <input type="number" value="1065.71" readOnly className="form-input w-full bg-gray-100 dark:bg-gray-700/50"/>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Payment Method <span className="text-red-500">*</span></label>
                <select className="form-input w-full"><option>Select</option></select>
            </div>
             <div className="space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Account <span className="text-red-500">*</span></label>
                <select className="form-input w-full"><option>STB</option></select>
            </div>
             <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-text-secondary dark:text-gray-300">Remarks</label>
                <textarea rows={3} className="form-input w-full" placeholder="Write Your Remarks"></textarea>
            </div>
             <div className="md:col-span-2 flex items-center">
                 <input type="checkbox" id="guardian-sms-paid" className="form-checkbox"/>
                 <label htmlFor="guardian-sms-paid" className="ml-2 text-sm text-text-secondary dark:text-gray-300">Guardian Confirmation Sms</label>
            </div>
            <div className="md:col-span-2 flex justify-end">
                <button className="px-6 py-2 bg-gray-700 dark:bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-600 dark:hover:bg-gray-500">Fee Payment</button>
            </div>
        </form>
    </div>
);

// FIX: This was the main component, which was incorrectly declared twice.
// It is now the single source of truth for this page's state and logic.
const InvoiceHistoryPage = () => {
    const { studentId } = useParams();
    const [activeTab, setActiveTab] = useState<'invoice' | 'collect' | 'paid'>('invoice');
    const [selectedFees, setSelectedFees] = useState<number[]>([]);
    const [isCollectFeesModalOpen, setIsCollectFeesModalOpen] = useState(false);

    const allFeeItems = invoiceData.fees.flatMap(group => group.items);
    const selectedFeeItems = allFeeItems.filter(item => selectedFees.includes(item.id));

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedFees(allFeeItems.map(item => item.id));
        } else {
            setSelectedFees([]);
        }
    };

    const handleSelectOne = (id: number) => {
        setSelectedFees(prev =>
            prev.includes(id) ? prev.filter(feeId => feeId !== id) : [...prev, id]
        );
    };

    const TabButton = ({ label, icon, tabName }: { label: string, icon: React.ReactNode, tabName: 'invoice' | 'collect' | 'paid' }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`flex items-center px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 relative ${
                    isActive ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
                {icon} {label}
                {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></div>}
            </button>
        );
    };

    return (
        <DashboardLayout title="Invoice History">
            <CollectFeesModal 
                isOpen={isCollectFeesModalOpen}
                onClose={() => setIsCollectFeesModalOpen(false)}
                selectedItems={selectedFeeItems}
            />
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
                {/* Header Buttons */}
                <div className="relative flex flex-wrap gap-4 pb-2">
                    <TabButton label="Invoice" icon={<InvoiceIcon />} tabName="invoice" />
                    <TabButton label="Collect Fees" icon={<CollectFeesIcon />} tabName="collect" />
                    <TabButton label="Fully Paid" icon={<FullyPaidIcon />} tabName="paid" />
                </div>
                
                {activeTab === 'invoice' && <InvoiceSection 
                    onCollectFees={() => setIsCollectFeesModalOpen(true)}
                    selectedFees={selectedFees}
                    allFeeItems={allFeeItems}
                    onSelectAll={handleSelectAll}
                    onSelectOne={handleSelectOne}
                    studentId={studentId}
                />}
                {activeTab === 'collect' && <CollectFeesSection />}
                {activeTab === 'paid' && <FullyPaidSection />}

            </div>
             <style>{`
                .form-checkbox {
                    border-radius: 0.25rem;
                    border-color: #9CA3AF;
                    color: #5D5FEF;
                    background-color: transparent;
                }
                html.dark .form-checkbox {
                     border-color: #6B7280;
                     background-color: #374151;
                }
                .form-checkbox:focus {
                     --tw-ring-color: #5D5FEF;
                     box-shadow: 0 0 0 2px var(--tw-ring-color);
                     border-color: #5D5FEF;
                }
                 .form-input {
                    padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    background-color: transparent; transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input { border-color: #4B5563; background-color: #1F2937; color: #F9FAFB; }
                html:not(.dark) .form-input { border-color: #D1D5DB; color: #111827; }
                .form-input:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    --tw-ring-color: #5D5FEF; box-shadow: 0 0 0 2px var(--tw-ring-color); border-color: #5D5FEF;
                }
                input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(var(--dark-mode-filter, 0)); }
                html.dark { --dark-mode-filter: 1; }
            `}</style>
        </DashboardLayout>
    );
};

export default InvoiceHistoryPage;