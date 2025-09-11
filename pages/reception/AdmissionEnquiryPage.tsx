
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const ICONS = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    editTab: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    view: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const initialEnquiryData = [
  { id: 1, school: 'Icon School & College', name: 'vp rathore', mobile: '9718394085', guardian: 'Father: ms rathore\nMother: ratha rathore', reference: 'Google Ads', enquiryDate: '21.May.2024', nextFollowUp: '14.Aug.2025', status: 'Partially Closed' },
  { id: 2, school: 'Icon School & College', name: 'Anuj Pandey', mobile: '09807544371', guardian: 'Father: RM\nMother: Dev', reference: 'Teacher', enquiryDate: '22.May.2024', nextFollowUp: '28.Jul.2025', status: 'Closed' },
  { id: 3, school: 'Icon School & College', name: 'SATYAM KUMAR', mobile: '6392500495', guardian: 'Father: RAM LAL\nMother: KAMLA', reference: 'Google Ads', enquiryDate: '03.Jun.2024', nextFollowUp: '06.Jun.2025', status: 'Missed' },
  // ... more data
];

type Enquiry = typeof initialEnquiryData[0];

const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        'Active': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
        'Closed': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
        'Partially Closed': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400',
        'Missed': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${statusClasses[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
};


const AdmissionEnquiryPage = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
    const [enquiries, setEnquiries] = useState(initialEnquiryData);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    const handleEditClick = (enquiry: Enquiry) => {
        setSelectedEnquiry(enquiry);
        setActiveTab('edit');
    };
    
    const handleUpdate = (updatedData: Partial<Enquiry>) => {
        if (!selectedEnquiry) return;
        
        setEnquiries(prev => 
            prev.map(e => e.id === selectedEnquiry.id ? { ...e, ...updatedData } : e)
        );
        
        alert('Enquiry updated successfully!');
        setSelectedEnquiry(null);
        setActiveTab('list');
    };

    const handleAdd = (newData: Partial<Enquiry>) => {
        const newEnquiry = {
            id: Date.now(),
            school: 'Icon School & College',
            nextFollowUp: '-', 
            status: 'Active',
            ...newData,
        } as Enquiry;
        setEnquiries(prev => [newEnquiry, ...prev]);
        alert('Enquiry added successfully!');
        setActiveTab('list');
    };

    const handleCancel = () => {
        setSelectedEnquiry(null);
        setActiveTab('list');
    };

    const TabButton = ({ label, tabName, icon }: { label: string; tabName: 'list' | 'add'; icon: React.ReactNode }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => {
                    handleCancel(); // Reset state when switching tabs
                    setActiveTab(tabName);
                }}
                className={`flex items-center px-1 py-2 font-semibold text-sm transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover border-b-2 border-transparent'
                    }`}
            >
                {icon}
                {label}
            </button>
        );
    };
    
    return (
        <DashboardLayout title="Admission Enquiry">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Enquiry List" tabName="list" icon={ICONS.list} />
                        <TabButton label="Add Enquiry" tabName="add" icon={ICONS.add} />
                        {activeTab === 'edit' && (
                            <button
                                className={`flex items-center px-1 py-2 font-semibold text-sm border-b-2 border-primary text-primary`}
                            >
                                {ICONS.editTab}
                                Edit Enquiry
                            </button>
                        )}
                    </nav>
                </div>
                
                {activeTab === 'list' && <EnquiryList enquiries={enquiries} onEdit={handleEditClick} />}
                {activeTab === 'add' && <EnquiryForm mode="add" onSubmit={handleAdd} onCancel={handleCancel} />}
                {activeTab === 'edit' && <EnquiryForm mode="edit" initialData={selectedEnquiry} onSubmit={handleUpdate} onCancel={handleCancel} />}
            </div>
            <style>{`
                .form-input {
                    padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    background-color: transparent; transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input { border-color: #4B5563; background-color: #1F2937; color: #F9FAFB; }
                html:not(.dark) .form-input { border-color: #D1D5DB; color: #111827; }
                .form-input:focus {
                    outline: 2px solid transparent; outline-offset: 2px;
                    --tw-ring-color: #5D5FEF; box-shadow: 0 0 0 2px var(--tw-ring-color); border-color: #5D5FEF;
                }
                input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(var(--dark-mode-filter, 0)); }
                html.dark { --dark-mode-filter: 1; }
            `}</style>
        </DashboardLayout>
    );
};

const EnquiryList = ({ enquiries, onEdit }: { enquiries: Enquiry[], onEdit: (enquiry: Enquiry) => void }) => (
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
                {['SI', 'School', 'Name', 'Mobile No', 'Guardian', 'Reference', 'Enquiry Date', 'Next Follow Up Date', 'Status', 'Action'].map(head => (
                  <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {enquiries.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                  <td className="p-3 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                  <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{item.name}</td>
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.mobile}</td>
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400 whitespace-pre-wrap">{item.guardian}</td>
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.reference}</td>
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.enquiryDate}</td>
                  <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.nextFollowUp}</td>
                  <td className="p-3"><StatusBadge status={item.status} /></td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                       <Link to={`/reception/admission-enquiry/${item.id}`} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="View">{ICONS.view}</Link>
                      <button onClick={() => onEdit(item)} className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors" aria-label="Edit">{ICONS.edit}</button>
                      <button className="text-primary hover:text-primary-hover transition-colors" aria-label="Delete">{ICONS.delete}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span>Showing 1 to {enquiries.length} of {enquiries.length} entries</span>
                <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-900 dark:border-gray-600"><option>10</option></select>
                <span>rows per page</span>
            </div>
        </div>
    </div>
);

const EnquiryForm = ({ initialData, onSubmit, onCancel, mode }: { initialData?: Enquiry | null; onSubmit: (data: Partial<Enquiry>) => void; onCancel: () => void; mode: 'add' | 'edit' }) => {
    const [formData, setFormData] = useState({
        school: initialData?.school || 'Icon School & College',
        name: initialData?.name || '',
        mobile: initialData?.mobile || '',
        guardian: initialData?.guardian || 'Father: \nMother: ',
        reference: initialData?.reference || 'Google Ads',
        enquiryDate: initialData?.enquiryDate || new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Simplified form for demonstration */}
                <div className="space-y-1">
                    <label htmlFor="school" className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                    <input type="text" id="school" name="school" value={formData.school} onChange={handleChange} className="form-input w-full" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm text-text-secondary dark:text-gray-300">Name <span className="text-primary">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input w-full" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="mobile" className="text-sm text-text-secondary dark:text-gray-300">Mobile No <span className="text-primary">*</span></label>
                    <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="form-input w-full" />
                </div>
                 <div className="space-y-1 md:col-span-2 lg:col-span-3">
                    <label htmlFor="guardian" className="text-sm text-text-secondary dark:text-gray-300">Guardian Details <span className="text-primary">*</span></label>
                    <textarea id="guardian" name="guardian" rows={2} value={formData.guardian} onChange={handleChange} className="form-input w-full"></textarea>
                </div>
                <div className="space-y-1">
                    <label htmlFor="reference" className="text-sm text-text-secondary dark:text-gray-300">Reference <span className="text-primary">*</span></label>
                    <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} className="form-input w-full" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="enquiryDate" className="text-sm text-text-secondary dark:text-gray-300">Enquiry Date <span className="text-primary">*</span></label>
                    <input type="text" id="enquiryDate" name="enquiryDate" value={formData.enquiryDate} onChange={handleChange} className="form-input w-full" />
                </div>
            </div>
             <div className="pt-6 border-t dark:border-gray-700 flex justify-center gap-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-text-primary dark:text-gray-200 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                    {mode === 'edit' ? <>{ICONS.editTab} Update</> : <>{ICONS.save} Save</>}
                </button>
            </div>
        </form>
    );
};


export default AdmissionEnquiryPage;
