



import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getPurchases, addPurchase, deletePurchase, Purchase } from '../../db';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    view: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
};

const PurchaseList = ({ purchases, onPurchaseDeleted }: { purchases: Purchase[], onPurchaseDeleted: () => void }) => {
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this purchase record?')) {
            await deletePurchase(id);
            onPurchaseDeleted();
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.copy}</button>
                    <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.print}</button>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    {['SI', 'School', 'Bill No', 'Supplier Name', 'Store', 'Purchase Status', 'Purchase Date', 'Remarks', 'Action'].map(head => (
                      <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase, index) => (
                    <tr key={purchase.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                      <td className="p-3 text-sm text-text-primary dark:text-gray-200">{purchase.school}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{purchase.billNo}</td>
                      <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{purchase.supplier}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{purchase.store}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{purchase.purchaseStatus}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{purchase.date}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{purchase.remarks}</td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors" aria-label="View purchase">{icons.view}</button>
                          <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit purchase">{icons.edit}</button>
                          <button onClick={() => handleDelete(purchase.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete purchase">{icons.delete}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span>Showing 1 to {purchases.length} of {purchases.length} entries</span>
                    <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600">
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <span>rows per page</span>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
                    <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&gt;</button>
                </div>
            </div>
        </>
    );
};

const FormField = ({ label, name, type = 'text', required = false, placeholder = '', children, defaultValue, rows }: { label: string, name: string, type?: string, required?: boolean, placeholder?: string, children?: React.ReactNode, defaultValue?: string, rows?: number }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children ? (
            <div className="relative">
                {children}
            </div>
        ) : type === 'textarea' ? (
             <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                rows={rows || 3}
                defaultValue={defaultValue}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        ) : (
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        )}
    </div>
);


const AddPurchaseForm = ({ onPurchaseAdded }: { onPurchaseAdded: () => void }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newPurchase: Omit<Purchase, 'id' | 'school_id'> = {
            school: formData.get('school') as string,
            supplier: formData.get('supplier') as string,
            store: formData.get('store') as string,
            billNo: formData.get('billNo') as string,
            purchaseStatus: formData.get('purchaseStatus') as Purchase['purchaseStatus'],
            date: formData.get('date') as string,
            remarks: formData.get('remarks') as string,
        };
        await addPurchase(newPurchase);
        form.reset();
        onPurchaseAdded();
    };
    
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="School" name="school" required>
                     <select id="school" name="school" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Select</option>
                        <option>Icon School & College</option>
                        <option>Oxford International</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </FormField>
                <FormField label="Supplier" name="supplier" required>
                     <select id="supplier" name="supplier" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>First Select The School</option>
                        {/* Options would be populated based on school selection */}
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </FormField>
                <FormField label="Store" name="store" required>
                     <select id="store" name="store" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>First Select The School</option>
                        {/* Options would be populated based on school selection */}
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </FormField>
                 <FormField label="Bill No" name="billNo" defaultValue="0005" required />
                <FormField label="Purchase Status" name="purchaseStatus" required>
                    <select id="purchaseStatus" name="purchaseStatus" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Select</option>
                        <option>Ordered</option>
                        <option>Received</option>
                        <option>Pending</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </FormField>
                <FormField label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
            <FormField label="Remarks" name="remarks" type="textarea" rows={4} />

            <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                    {icons.save}
                    Save
                </button>
            </div>
        </form>
    );
};

const PurchasePage = () => {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPurchases = useCallback(async () => {
        setLoading(true);
        const data = await getPurchases();
        setPurchases(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPurchases();
    }, [fetchPurchases]);

    const handlePurchaseAdded = () => {
        fetchPurchases();
        setView('list');
    };

    const TabButton = ({ label, icon, currentView, targetView }: { label: string; icon: React.ReactNode; currentView: string; targetView: 'list' | 'create'; }) => {
        const isActive = currentView === targetView;
        return (
            <button onClick={() => setView(targetView)} className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${isActive ? 'border-b-2 border-primary text-primary bg-primary/5 dark:bg-primary/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                {icon} {label}
            </button>
        );
    };

    return (
        <DashboardLayout title="Inventory">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton label="Purchase List" icon={icons.list} currentView={view} targetView="list" />
                        <TabButton label="Add Purchase" icon={icons.add} currentView={view} targetView="create" />
                    </nav>
                </div>
                 {loading ? (
                    <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading Purchases...</div>
                ) : view === 'list' ? (
                    <PurchaseList purchases={purchases} onPurchaseDeleted={fetchPurchases} />
                ) : (
                    <AddPurchaseForm onPurchaseAdded={handlePurchaseAdded} />
                )}
            </div>
        </DashboardLayout>
    );
};

export default PurchasePage;