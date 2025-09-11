

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// --- ICONS ---
const ICONS = {
    reference: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-2 10h2m-2-3h2m-2-3h2m4-3h2" /></svg>,
    response: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    calling: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    visiting: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682m0 0A3.006 3.006 0 0112 13.489M12 13.489c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    complaint: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    editTitle: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
};

// --- MOCK DATA ---
const initialData = {
    Reference: [
        { id: 1, school: 'Icon School & College', name: 'Google Ads' }, { id: 2, school: 'Oxford International', name: 'Google Ads' },
        { id: 3, school: 'Icon School & College', name: 'Facebook Ads' }, { id: 4, school: 'Oxford International', name: 'Facebook Ads' },
        { id: 5, school: 'Icon School & College', name: 'Advertisement' }, { id: 6, school: 'Oxford International', name: 'Advertisement' },
        { id: 7, school: 'Icon School & College', name: 'Teacher' }
    ],
    Response: [
        { id: 1, school: 'Icon School & College', name: 'Very Good' }, { id: 2, school: 'Oxford International', name: 'Very Good' },
        { id: 3, school: 'Icon School & College', name: 'Excellent' }, { id: 4, school: 'Oxford International', name: 'Excellent' },
        { id: 5, school: 'Icon School & College', name: 'Negative' }, { id: 6, school: 'Oxford International', name: 'Negative' },
        { id: 7, school: 'Icon School & College', name: 'Bad' }, { id: 8, school: 'Oxford International', name: 'Bad' },
    ],
    'Calling Purpose': [
        { id: 1, school: 'Icon School & College', name: 'Fees' }, { id: 2, school: 'Oxford International', name: 'Fees' },
        { id: 3, school: 'Icon School & College', name: 'To inquire about the child' }, { id: 4, school: 'Oxford International', name: 'To inquire about the child' },
        { id: 5, school: 'Icon School & College', name: 'Student Health Checkup' }, { id: 6, school: 'Icon School & College', name: 'Electricity Office' },
        { id: 7, school: 'Oxford International', name: 'Electricity Office' },
    ],
    'Visiting Purpose': [
        { id: 1, school: 'Icon School & College', name: 'Seminar' }, { id: 2, school: 'Oxford International', name: 'Seminar' },
        { id: 3, school: 'Icon School & College', name: 'Event' }, { id: 4, school: 'Oxford International', name: 'Event' },
        { id: 5, school: 'Icon School & College', name: 'Sports' }, { id: 6, school: 'Oxford International', name: 'Sports' },
        { id: 7, school: 'Icon School & College', name: 'Government' }, { id: 8, school: 'Oxford International', name: 'Government' },
        { id: 9, school: 'Icon School & College', name: 'General' }, { id: 10, school: 'Oxford International', name: 'General' },
        { id: 11, school: 'Icon School & College', name: 'To meet the child' }, { id: 12, school: 'Oxford International', name: 'To meet the child' },
    ],
    'Complaint Type': [
        { id: 1, school: 'Icon School & College', name: 'Fees' }, { id: 2, school: 'Oxford International', name: 'Fees' },
        { id: 3, school: 'Icon School & College', name: 'Hostel' }, { id: 4, school: 'Oxford International', name: 'Hostel' },
        { id: 5, school: 'Icon School & College', name: 'Facilities' }, { id: 6, school: 'Oxford International', name: 'Facilities' },
        { id: 7, school: 'Icon School & College', name: 'Teacher' }, { id: 8, school: 'Oxford International', name: 'Teacher' },
        { id: 9, school: 'Icon School & College', name: 'Management' }, { id: 10, school: 'Oxford International', name: 'Management' },
        { id: 11, school: 'Icon School & College', name: 'General' }, { id: 12, school: 'Oxford International', name: 'General' },
    ]
};

type ConfigItem = { id: number; school: string; name: string };
type ConfigType = keyof typeof initialData;

const EditModal = ({ isOpen, onClose, onUpdate, item, title }: { isOpen: boolean; onClose: () => void; onUpdate: (item: ConfigItem) => void; item: ConfigItem | null; title: string }) => {
    const [formData, setFormData] = useState<ConfigItem | null>(item);

    useEffect(() => {
        setFormData(item);
    }, [item]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onUpdate(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 flex items-center">{ICONS.editTitle} {title}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8 space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="school" className="text-sm font-medium text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                            <select id="school" name="school" value={formData.school} onChange={handleChange} required className="form-input w-full">
                                <option>Icon School & College</option>
                                <option>Oxford International</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-medium text-text-secondary dark:text-gray-300">Name <span className="text-primary">*</span></label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input w-full" />
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors flex items-center">{ICONS.save} Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- REUSABLE CONFIGURATION SECTION COMPONENT ---
const ConfigSection = ({ title, items, onItemAdded, onEditRequest }: { title: ConfigType; items: ConfigItem[]; onItemAdded: (newItem: Omit<ConfigItem, 'id'>) => void; onEditRequest: (item: ConfigItem, title: ConfigType) => void; }) => {
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


    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const school = (form.elements.namedItem('school') as HTMLSelectElement).value;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        if (school && name) {
            onItemAdded({ school, name });
            form.reset();
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Add Form */}
            <div className="lg:col-span-1 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 border-b dark:border-gray-600 pb-2">Add {title}</h3>
                <form className="space-y-4" onSubmit={handleSave}>
                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">School <span className="text-primary">*</span></label>
                        <select id="school" name="school" required className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.name}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">Name <span className="text-primary">*</span></label>
                        <input type="text" id="name" name="name" required className="form-input w-full" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                            {ICONS.save} Save
                        </button>
                    </div>
                </form>
            </div>
            {/* List Table */}
            <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 border-b dark:border-gray-600 pb-2">{title} List</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700/50 text-xs uppercase text-text-secondary dark:text-gray-400">
                            <tr>
                                <th className="p-2">SI</th>
                                <th className="p-2">School</th>
                                <th className="p-2">Name</th>
                                <th className="p-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                    <td className="p-2 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                    <td className="p-2 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                                    <td className="p-2 text-sm font-medium text-text-primary dark:text-gray-200">{item.name}</td>
                                    <td className="p-2">
                                        <div className="flex justify-center space-x-3">
                                            <button onClick={() => onEditRequest(item, title)} className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.edit}</button>
                                            <button className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.delete}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const ConfigReceptionPage = () => {
    const [activeTab, setActiveTab] = useState<ConfigType>('Reference');
    const [configData, setConfigData] = useState(initialData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ConfigItem | null>(null);
    const [editingTitle, setEditingTitle] = useState('');

    const tabs: { name: ConfigType, icon: React.ReactNode }[] = [
        { name: 'Reference', icon: ICONS.reference },
        { name: 'Response', icon: ICONS.response },
        { name: 'Calling Purpose', icon: ICONS.calling },
        { name: 'Visiting Purpose', icon: ICONS.visiting },
        { name: 'Complaint Type', icon: ICONS.complaint },
    ];

    const TabButton = ({ name, icon }: { name: ConfigType, icon: React.ReactNode }) => {
        const isActive = activeTab === name;
        return (
            <button
                onClick={() => setActiveTab(name)}
                className={`flex items-center px-1 py-2 font-semibold text-sm transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover border-b-2 border-transparent'
                    }`}
            >
                {icon}
                {name}
            </button>
        );
    };
    
    const handleItemAdded = (newItemData: Omit<ConfigItem, 'id'>, listKey: ConfigType) => {
        setConfigData(prevData => ({
            ...prevData,
            [listKey]: [...prevData[listKey], { ...newItemData, id: Date.now() }]
        }));
    };

    const handleEditRequest = (item: ConfigItem, title: ConfigType) => {
        setEditingItem(item);
        setEditingTitle(`Edit ${title}`);
        setIsEditModalOpen(true);
    };

    const handleUpdate = (updatedItem: ConfigItem) => {
        setConfigData(prevData => ({
            ...prevData,
            [activeTab]: prevData[activeTab].map(item =>
                item.id === updatedItem.id ? updatedItem : item
            )
        }));
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    return (
        <DashboardLayout title="Reception - Config Reception">
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdate}
                item={editingItem}
                title={editingTitle}
            />
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex flex-wrap gap-x-6 -mb-px">
                        {tabs.map(tab => (
                            <TabButton key={tab.name} name={tab.name} icon={tab.icon} />
                        ))}
                    </nav>
                </div>
                
                <ConfigSection 
                    title={activeTab} 
                    items={configData[activeTab]}
                    onItemAdded={(newItem) => handleItemAdded(newItem, activeTab)}
                    onEditRequest={handleEditRequest}
                />
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
            `}</style>
        </DashboardLayout>
    );
};

export default ConfigReceptionPage;
