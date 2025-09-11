
import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSales, addSale, deleteSale, Sale, getSchools, School } from '../../db';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    create: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};

const SalesList = ({ sales, onSaleDeleted }: { sales: Sale[], onSaleDeleted: () => void }) => {
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this sale record?')) {
            await deleteSale(id);
            onSaleDeleted();
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
                    {['SI', 'School', 'Bill No', 'Role', 'Sale To', 'Pay Via', 'Date', 'Net Payable', 'Paid', 'Due', 'Remarks', 'Action'].map(head => (
                      <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, index) => {
                      const due = sale.netPayable - sale.receivedAmount;
                      return (
                        <tr key={sale.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                          <td className="p-3 text-sm text-text-primary dark:text-gray-200">{sale.school}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{sale.billNo}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{sale.role}</td>
                          <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{sale.saleTo}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{sale.payVia}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{sale.date}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${sale.netPayable.toFixed(2)}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${sale.receivedAmount.toFixed(2)}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${due.toFixed(2)}</td>
                          <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{sale.remarks}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <button onClick={() => handleDelete(sale.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete sale">{icons.delete}</button>
                            </div>
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span>Showing 1 to {sales.length} of {sales.length} entries</span>
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

const FormField = ({ label, name, type = 'text', required = false, placeholder = '', children, defaultValue }: { label: string, name: string, type?: string, required?: boolean, placeholder?: string, children?: React.ReactNode, defaultValue?: string }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children ? (
            <div className="relative">
                {children}
            </div>
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

const BillSummaryField = ({ label, name, placeholder }: { label: string, name: string, placeholder?: string }) => (
    <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input id={name} name={name} type="number" step="0.01" placeholder={placeholder} className="w-1/2 px-3 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
    </div>
);


const AddSalesForm = ({ onSaleAdded }: { onSaleAdded: () => void }) => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newSale: Omit<Sale, 'id' | 'school_id'> = {
            school: formData.get('school') as string,
            role: formData.get('role') as Sale['role'],
            saleTo: formData.get('saleTo') as string,
            billNo: formData.get('billNo') as string,
            date: formData.get('date') as string,
            subTotal: Number(formData.get('subTotal')),
            discount: Number(formData.get('discount')),
            netPayable: Number(formData.get('netPayable')),
            receivedAmount: Number(formData.get('receivedAmount')),
            payVia: formData.get('payVia') as Sale['payVia'],
            remarks: formData.get('remarks') as string,
        };
        await addSale(newSale);
        form.reset();
        onSaleAdded();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="School" name="school" required>
                            <select id="school" name="school" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={loadingSchools}>
                                <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.name}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </FormField>
                        <FormField label="Role" name="role" required>
                            <select id="role" name="role" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option>Select</option>
                                <option>Student</option>
                                <option>Parent</option>
                                <option>Staff</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </FormField>
                        <FormField label="Sale To" name="saleTo" required>
                            <select id="saleTo" name="saleTo" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option>Select</option>
                                {/* Options populated based on role */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </FormField>
                        <FormField label="Bill No" name="billNo" defaultValue="0002" required />
                        <FormField label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                    </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 border-b dark:border-gray-600 pb-2">Bill Summary</h3>
                    <div className="space-y-4">
                        <BillSummaryField label="Sub Total" name="subTotal" placeholder="0.00" />
                        <BillSummaryField label="Discount (-)" name="discount" placeholder="0.00" />
                        <BillSummaryField label="Net Payable" name="netPayable" placeholder="0.00" />
                        <BillSummaryField label="Received Amount" name="receivedAmount" placeholder="Enter Payment Amount"/>
                        <div>
                            <label htmlFor="payVia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pay Via</label>
                            <select id="payVia" name="payVia" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option>Select</option>
                                <option>Cash</option>
                                <option>Card</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
                             <textarea id="remarks" name="remarks" rows={2} placeholder="Write Your Remarks" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition-colors">
                    {icons.create}
                    Create Bill
                </button>
            </div>
        </form>
    );
};

const SalesPage = () => {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSales = useCallback(async () => {
        setLoading(true);
        const data = await getSales();
        setSales(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    const handleSaleAdded = () => {
        fetchSales();
        setView('list');
    };

    const TabButton = ({
        label,
        icon,
        currentView,
        targetView,
    }: {
        label: string;
        icon: React.ReactNode;
        currentView: string;
        targetView: 'list' | 'create';
    }) => {
        const isActive = currentView === targetView;
        return (
            <button
                onClick={() => setView(targetView)}
                className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                    isActive
                        ? 'border-b-2 border-primary text-primary bg-primary/5 dark:bg-primary/10'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
            >
                {icon}
                {label}
            </button>
        );
    };

    return (
        <DashboardLayout title="Inventory">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton label="Sales List" icon={icons.list} currentView={view} targetView="list" />
                        <TabButton label="Add Sales" icon={icons.add} currentView={view} targetView="create" />
                    </nav>
                </div>
                {loading ? (
                    <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading Sales...</div>
                ) : view === 'list' ? (
                    <SalesList sales={sales} onSaleDeleted={fetchSales} />
                ) : (
                    <AddSalesForm onSaleAdded={handleSaleAdded} />
                )}
            </div>
        </DashboardLayout>
    );
};

export default SalesPage;
