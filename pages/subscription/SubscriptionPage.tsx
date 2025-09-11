import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSubscriptions, Subscription, getSchools, School, Plan, getPlans, addSubscription } from '../../db';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    addSubscription: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const StatusBadge = ({ status }: { status: string }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full inline-block';
    let specificClasses = '';
    switch (status) {
        case 'Active':
            specificClasses = 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400';
            break;
        case 'Pending':
            specificClasses = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400';
            break;
        case 'Expired':
            specificClasses = 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
            break;
        case 'Canceled':
             specificClasses = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            break;
        case 'Not Subscribed':
             specificClasses = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            break;
        default:
            specificClasses = 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
    return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};

const SchoolList = ({ data, onAddSubscription }: { data: (School & { subscription?: Subscription })[], onAddSubscription: (school: School) => void }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Active', 'Pending', 'Expired', 'Canceled', 'Not Subscribed'];

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Lifetime';
        return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '.');
    };
    
    const filteredData = data.filter(item => {
        if (activeFilter === 'All') return true;
        const status = item.subscription?.status || 'Not Subscribed';
        return status === activeFilter;
    });

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg overflow-x-auto">
                    {filters.map(filter => (
                        <button 
                            key={filter} 
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${activeFilter === filter ? 'bg-white dark:bg-gray-600 text-primary shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
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
                    {['SI', 'School Name', 'Plan Name', 'Price', 'Email', 'Mobile No', 'Date', 'Last Upgrade', 'Status', 'Action'].map(head => (
                      <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                      <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{item.name || 'N/A'}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.subscription?.plans?.name || 'No Plan'}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">${item.subscription?.totalPrice?.toFixed(2) || '0.00'}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.email || 'N/A'}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.mobile || 'N/A'}</td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                        {item.subscription ? (
                            <>
                                <div>Start: {formatDate(item.subscription.startDate)}</div>
                                <div>Expiry: {formatDate(item.subscription.expiryDate)}</div>
                            </>
                        ) : 'N/A'}
                      </td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.subscription ? formatDate(item.subscription.created_at) : '-'}</td>
                      <td className="p-3 text-sm"><StatusBadge status={item.subscription?.status || 'Not Subscribed'} /></td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          {item.subscription ? (
                            <>
                              <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit subscription">{icons.edit}</button>
                              <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete subscription">{icons.delete}</button>
                            </>
                          ) : (
                             <button onClick={() => onAddSubscription(item)} className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors" aria-label="Add subscription">{icons.addSubscription}</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span>Showing 1 to {filteredData.length} of {filteredData.length} entries</span>
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

const AddSubscriptionModal = ({ isOpen, onClose, onSave, school, plans }: { isOpen: boolean, onClose: () => void, onSave: (schoolId: number, planId: number, studentCount: number) => void, school: School, plans: Plan[] }) => {
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(plans.length > 0 ? plans[0].id : null);
    const [studentCount, setStudentCount] = useState<number>(0);
    const [error, setError] = useState('');

    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    const totalPrice = selectedPlan ? (selectedPlan.pricePerStudent * studentCount) - selectedPlan.discount : 0;

    useEffect(() => {
        if (!isOpen) {
            setSelectedPlanId(plans.length > 0 ? plans[0].id : null);
            setStudentCount(0);
            setError('');
        }
    }, [isOpen, plans]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!selectedPlanId || studentCount <= 0) {
            setError('Please select a valid plan and enter a positive number of students.');
            return;
        }
        onSave(school.id, selectedPlanId, studentCount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Add Subscription for {school.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8 space-y-6">
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Plan*</label>
                            <select id="plan" value={selectedPlanId ?? ''} onChange={e => setSelectedPlanId(Number(e.target.value))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                {plans.map(plan => (
                                    <option key={plan.id} value={plan.id}>{plan.name} (${plan.pricePerStudent}/student)</option>
                                ))}
                            </select>
                        </div>
                         {selectedPlan && (
                            <div className="text-sm text-text-secondary dark:text-gray-400">
                                Billing Period: {selectedPlan.periodValue} {selectedPlan.periodType}
                            </div>
                         )}
                        <div>
                            <label htmlFor="students" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Students*</label>
                            <input type="number" id="students" value={studentCount} onChange={e => setStudentCount(Number(e.target.value))} min="1" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                         <div className="text-lg font-semibold text-text-primary dark:text-gray-200 text-right">
                           Total Price: ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                         <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                            {icons.save} Save Subscription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const SubscriptionPage = () => {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [schoolsWithSubscriptions, setSchoolsWithSubscriptions] = useState<(School & { subscription?: Subscription })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);


    const fetchAllData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [schoolsData, subscriptionsData, plansData] = await Promise.all([
                getSchools(),
                getSubscriptions(),
                getPlans()
            ]);

            const subscriptionsMap = new Map<number, Subscription>();
            for (const sub of subscriptionsData) {
                subscriptionsMap.set(sub.school_id, sub);
            }
            
            const combinedData = schoolsData.map(school => ({
                ...school,
                subscription: subscriptionsMap.get(school.id)
            }));

            setSchoolsWithSubscriptions(combinedData);
            setPlans(plansData.filter(p => p.status === 'Active'));
        } catch (err) {
            setError('Failed to fetch school and subscription data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (view === 'list') {
            fetchAllData();
        }
    }, [view, fetchAllData]);

    const handleAddSubscriptionClick = (school: School) => {
        setSelectedSchool(school);
        setIsModalOpen(true);
    };

    const handleSaveSubscription = async (schoolId: number, planId: number, studentCount: number) => {
        setLoading(true);
        const plan = plans.find(p => p.id === planId);
        if (!plan) {
            setError('Selected plan not found.');
            setLoading(false);
            return;
        }

        const startDate = new Date();
        const expiryDate = new Date(startDate);

        if (plan.periodType === 'Days') expiryDate.setDate(startDate.getDate() + plan.periodValue);
        else if (plan.periodType === 'Monthly') expiryDate.setMonth(startDate.getMonth() + plan.periodValue);
        else if (plan.periodType === 'Termly') expiryDate.setMonth(startDate.getMonth() + (plan.periodValue * 4));
        else if (plan.periodType === 'Yearly') expiryDate.setFullYear(startDate.getFullYear() + plan.periodValue);
        
        const finalExpiryDate = plan.periodType === 'Lifetime' ? null : expiryDate.toISOString().split('T')[0];
        
        const newSubscriptionData: Omit<Subscription, 'id' | 'created_at' | 'schools' | 'plans'> = {
            school_id: schoolId,
            plan_id: planId,
            startDate: startDate.toISOString().split('T')[0],
            expiryDate: finalExpiryDate,
            status: 'Active',
            studentCount: studentCount,
            totalPrice: studentCount * plan.pricePerStudent - plan.discount
        };

        try {
            const { error: insertError } = await addSubscription(newSubscriptionData);
            if(insertError) throw insertError;

            setIsModalOpen(false);
            setSelectedSchool(null);
            await fetchAllData();
        } catch(err: any) {
            setError(`Failed to save the new subscription: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


  const TabButton = ({ label, icon, currentView, targetView }: { label: string, icon: React.ReactNode, currentView: string, targetView: 'list' | 'add' }) => {
    const isActive = currentView === targetView;
    return (
      <button
        onClick={() => setView(targetView)}
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
            return <div className="p-8 text-center">Add School form is available on the School page.</div>;
        }
        if (loading) {
            return <div className="text-center p-8 text-text-secondary dark:text-gray-400">Loading subscriptions...</div>;
        }
        if (error) {
            return <div className="text-center p-8 text-red-500">{error}</div>;
        }
        return <SchoolList data={schoolsWithSubscriptions} onAddSubscription={handleAddSubscriptionClick} />;
    };

  return (
    <DashboardLayout title="School Subscriptions">
      {isModalOpen && selectedSchool && (
          <AddSubscriptionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              school={selectedSchool}
              plans={plans}
              onSave={handleSaveSubscription}
          />
      )}
      <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="border-b dark:border-gray-700 mb-6">
          <nav className="flex space-x-2 -mb-px">
            <TabButton label="School List" icon={icons.list} currentView={view} targetView="list" />
            <TabButton label="Add School" icon={icons.add} currentView={view} targetView="add" />
          </nav>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;