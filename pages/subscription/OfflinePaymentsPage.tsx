

import React, { useState, useRef } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const icons = {
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

// --- MOCK DATA ---
const paymentTypesData = [
    { id: 1, name: 'Bank', instructions: 'Here is your bank information. Name of Bank Holder Account Number Bank Address a...' },
    { id: 2, name: 'Mobile Banking', instructions: 'Here is your mobile banking information.' },
];

const AddTypeForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would add logic to save the data.
        // For now, we just show an alert and reset the form.
        alert('New offline payment type saved (demo)!');
        formRef.current?.reset();
    };
    
    return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions</label>
            {/* Placeholder for a rich text editor */}
            <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-t-md bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-500 dark:text-gray-400">
                Arial ▼ 14pt ▼ | B | I | U | S | Color | Align | Link | &lt;/&gt;
            </div>
            <textarea 
                rows={8}
                id="instructions"
                name="instructions"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
        </div>

        <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
            <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                {icons.save} Save
            </button>
        </div>
    </form>
)};

const TypeList = () => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
        <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 mb-6">
            {icons.list} Type List
        </h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        {['SI', 'Name', 'Instructions', 'Action'].map(head => (
                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paymentTypesData.map((type, index) => (
                        <tr key={type.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                            <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{type.name}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400 max-w-md truncate">{type.instructions}</td>
                            <td className="p-3">
                                <div className="flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit type">{icons.edit}</button>
                                    <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete type">{icons.delete}</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const OfflinePaymentsPage = () => {
  const [view, setView] = useState<'list' | 'add'>('list');

  const TabButton = ({
    label,
    icon,
    currentView,
    targetView,
  }: {
    label: string;
    icon: React.ReactNode;
    currentView: string;
    targetView: 'list' | 'add';
  }) => {
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

  return (
    <DashboardLayout title="Offline MOP">
      <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="border-b dark:border-gray-700 mb-6">
          <nav className="flex space-x-2 -mb-px">
            <TabButton label="Type List" icon={icons.list} currentView={view} targetView="list" />
            <TabButton label="Add Type" icon={icons.add} currentView={view} targetView="add" />
          </nav>
        </div>
        {view === 'list' ? <TypeList /> : <AddTypeForm />}
      </div>
    </DashboardLayout>
  );
};

export default OfflinePaymentsPage;