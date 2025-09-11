
import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getPlans, addPlan, deletePlan, updatePlan, Plan } from '../../db';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title = "Are You Sure?", message = "Do You Want To Delete This Information?" }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title?: string; message?: string }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-gray-700 border-4 border-yellow-400 dark:border-yellow-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mt-5 text-text-primary dark:text-white">{title}</h3>
                    <p className="text-text-secondary dark:text-gray-400 mt-2">{message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                     <button 
                        onClick={onConfirm}
                        className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors"
                    >
                        Yes, Continue
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <p className="text-center text-xs text-text-secondary dark:text-gray-500 mt-6">
                    *Note: This data will be permanently deleted
                </p>
            </div>
        </div>
    );
};


const StatusBadge = ({ status }: { status: string }) => {
    const isChecked = status.toLowerCase() === 'active';
    return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isChecked ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800'}`}>
            <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${isChecked ? 'text-green-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {status}
        </div>
    );
};

const PackageList = ({ plans, onEditPlan, onDeleteRequest }: { plans: Plan[], onEditPlan: (plan: Plan) => void, onDeleteRequest: (id: number) => void }) => {
    
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
                    {['SI', 'Name', 'Price Per Student', 'Discount', 'Period Type', 'Period', 'Status', 'Show Website', 'Action'].map(head => (
                      <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <tr key={plan.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                        <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{plan.name}</td>
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${plan.pricePerStudent.toFixed(2)}</td>
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${plan.discount.toFixed(2)}</td>
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{plan.periodType}</td>
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{plan.periodValue || '-'}</td>
                        <td className="p-3 text-sm"><StatusBadge status={plan.status} /></td>
                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{plan.showOnWebsite ? 'Yes' : 'No'}</td>
                        <td className="p-3">
                            <div className="flex space-x-2">
                            <button onClick={() => onEditPlan(plan)} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit package">{icons.edit}</button>
                            <button onClick={() => onDeleteRequest(plan.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete package">{icons.delete}</button>
                            </div>
                        </td>
                        </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan={9} className="text-center p-8 text-text-secondary dark:text-gray-400">
                            No subscription plans found.
                            <br />
                            Click the 'Add Package' tab to create your first plan.
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span>Showing 1 to {plans.length} of {plans.length} entries</span>
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
        </>
    );
};

const FormField = ({ label, name, type = 'text', required = false, children, className = '' }: { label: string, name: string, type?: string, required?: boolean, children?: React.ReactNode, className?: string }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children || (
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        )}
    </div>
);

const ToggleSwitch = ({ label, enabled, setEnabled }: { label: string, enabled: boolean, setEnabled: (enabled: boolean) => void }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <button
            type="button"
            className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800`}
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled(!enabled)}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);

const AddPackageForm = ({ onPlanSaved, onCancel, planToEdit }: { onPlanSaved: () => void; onCancel: () => void; planToEdit: Plan | null }) => {
    const [name, setName] = useState('');
    const [isRecommended, setIsRecommended] = useState(false);
    const [pricePerStudent, setPricePerStudent] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [periodType, setPeriodType] = useState<Plan['periodType']>('Days');
    const [periodValue, setPeriodValue] = useState(0);
    const [enabledModules, setEnabledModules] = useState<string[]>([]);
    const [showWebsite, setShowWebsite] = useState(true);
    const [status, setStatus] = useState(true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (planToEdit) {
            setName(planToEdit.name || '');
            setIsRecommended(planToEdit.isRecommended || false);
            setPricePerStudent(planToEdit.pricePerStudent || 0);
            setDiscount(planToEdit.discount || 0);
            setPeriodType(planToEdit.periodType || 'Days');
            setPeriodValue(planToEdit.periodValue || 0);
            setEnabledModules(planToEdit.features || []);
            setShowWebsite(planToEdit.showOnWebsite ?? true);
            setStatus(planToEdit.status === 'Active');
        } else {
            // Reset form for 'add' mode
            setName('');
            setIsRecommended(false);
            setPricePerStudent(0);
            setDiscount(0);
            setPeriodType('Days');
            setPeriodValue(0);
            setEnabledModules([]);
            setShowWebsite(true);
            setStatus(true);
        }
    }, [planToEdit]);


    const modules = [
        "Alumni", "Annual Calendar", "Attachments Book", "Attendance", "Behaviour Records", "Bulk Sms And Email", 
        "Calendar To Do List", "Card Management", "CBSE Examination", "Chat", "Certificate", "Custom Domain", 
        "Download Center", "Events", "Examination", "Fees Collection", "Homework", "Hostel", "Human Resource", 
        "Inventory", "Lesson Plan", "Library", "Live Class", "Multi Branch", "Multi Class", "Office Accounting", 
        "Online Admission", "Online Course", "Online Exam", "Qr Code Attendance", "Quick Fees", "Reception", 
        "Student Accounting", "Student CV", "Thermal Print", "Transport", "Two Factor Authenticator", "Website"
    ];
    
    const handleModuleChange = (moduleName: string, isChecked: boolean) => {
        setEnabledModules(prev =>
            isChecked ? [...prev, moduleName] : prev.filter(m => m !== moduleName)
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        
        const planData: Omit<Plan, 'id'> = {
            name,
            pricePerStudent,
            isRecommended,
            discount,
            periodType,
            periodValue,
            features: enabledModules,
            showOnWebsite: showWebsite,
            status: status ? 'Active' : 'Inactive',
        };

        try {
            if (planToEdit) {
                await updatePlan(planToEdit.id, planData);
            } else {
                await addPlan(planData);
            }
            onPlanSaved();
        } catch (err: any) {
            setError(err.message || `Failed to ${planToEdit ? 'update' : 'save'} the plan.`);
        } finally {
            setSaving(false);
        }
    };


    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="Name" name="name" required className="md:col-span-2 lg:col-span-3">
                    <div className="relative">
                         <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                         <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <input id="recommended" name="recommended" type="checkbox" checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="recommended" className="ml-2 text-sm text-gray-600 dark:text-gray-400">Recommended</label>
                         </div>
                    </div>
                </FormField>
                <FormField label="Price Per Student" name="pricePerStudent" type="number" required>
                     <div className="relative">
                         <input type="number" step="0.01" id="pricePerStudent" name="pricePerStudent" value={pricePerStudent} onChange={e => setPricePerStudent(Number(e.target.value))} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                     </div>
                </FormField>
                <FormField label="Discount" name="discount" type="number">
                     <input type="number" step="0.01" id="discount" name="discount" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                </FormField>
                <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <FormField label="Subscription Period" name="subscriptionPeriod" required>
                        <select id="subscriptionPeriod" name="subscriptionPeriod" value={periodType} onChange={e => setPeriodType(e.target.value as Plan['periodType'])} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option>Select</option>
                            <option>Days</option>
                            <option>Monthly</option>
                            <option>Yearly</option>
                            <option>Lifetime</option>
                        </select>
                    </FormField>
                    <input type="number" name="periodValue" placeholder="Enter Day / Month / Year." value={periodValue} onChange={e => setPeriodValue(Number(e.target.value))} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
                </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-200">Module Enabled?</h3>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {modules.map(module => (
                        <div key={module} className="relative flex items-start">
                            <div className="flex items-center h-5">
                                <input id={module} name={module} type="checkbox" checked={enabledModules.includes(module)} onChange={e => handleModuleChange(module, e.target.checked)} className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor={module} className="font-medium text-gray-700 dark:text-gray-300">{module}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ToggleSwitch label="Show Website" enabled={showWebsite} setEnabled={setShowWebsite} />
                 <ToggleSwitch label="Status" enabled={status} setEnabled={setStatus} />
            </div>

            <div className="pt-6 border-t dark:border-gray-700 flex justify-end gap-4">
                 <button type="button" onClick={onCancel} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                    Cancel
                </button>
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50">
                    {icons.save} {saving ? 'Saving...' : (planToEdit ? 'Update Package' : 'Save Package')}
                </button>
            </div>
        </form>
    );
};


const PlanPage = () => {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [planIdToDelete, setPlanIdToDelete] = useState<number | null>(null);

    const fetchPlans = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPlans();
            setPlans(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch plans.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(view === 'list') {
            fetchPlans();
        }
    }, [view, fetchPlans]);

    const handlePlanSaved = () => {
        setEditingPlan(null);
        setView('list');
    };
    
    const handleEditPlan = (plan: Plan) => {
        setEditingPlan(plan);
        setView('add');
    };

    const handleDeleteRequest = (id: number) => {
        setPlanIdToDelete(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (planIdToDelete !== null) {
            setError(null);
            try {
                await deletePlan(planIdToDelete);
                fetchPlans(); // Refresh the list
            } catch (err: any) {
                setError(err.message || 'Failed to delete plan.');
            }
        }
        setModalOpen(false);
        setPlanIdToDelete(null);
    };

    const TabButton = ({ label, icon, currentView, targetView }: { label: string, icon: React.ReactNode, currentView: string, targetView: 'list' | 'add' }) => {
        const isActive = currentView === targetView;
        return (
            <button
                onClick={() => {
                    if(targetView === 'add') setEditingPlan(null); // Clear editing state when clicking Add tab
                    setView(targetView);
                }}
                className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary bg-primary/5 dark:bg-primary/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
            >
                {icon}
                {label}
            </button>
        );
    };

    const renderContent = () => {
        if (view === 'add') {
            return <AddPackageForm onPlanSaved={handlePlanSaved} onCancel={() => { setEditingPlan(null); setView('list'); }} planToEdit={editingPlan} />;
        }

        if (loading) {
            return <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading Plans...</div>;
        }

        if (error) {
            return <div className="text-center py-8 text-red-500">Error: {error}</div>;
        }
        
        return <PackageList plans={plans} onDeleteRequest={handleDeleteRequest} onEditPlan={handleEditPlan} />;
    }

    return (
        <DashboardLayout title="Subscription">
             <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton label="Package List" icon={icons.list} currentView={view} targetView="list" />
                        <TabButton label={editingPlan ? "Edit Package" : "Add Package"} icon={editingPlan ? icons.edit : icons.add} currentView={view} targetView="add" />
                    </nav>
                </div>
                {renderContent()}
            </div>
        </DashboardLayout>
    );
};

export default PlanPage;
