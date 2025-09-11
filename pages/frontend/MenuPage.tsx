

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// Mock data for the menu list
const menuItemsData = [
    { id: 1, type: 'System Menu', title: 'Home', position: 1, subMenu: null, published: true },
    { id: 2, type: 'System Menu', title: 'Teachers', position: 2, subMenu: null, published: true },
    { id: 3, type: 'System Menu', title: 'Events', position: 3, subMenu: null, published: true },
    { id: 4, type: 'System Menu', title: 'About Us', position: 4, subMenu: null, published: true },
    { id: 5, type: 'System Menu', title: 'FAQ', position: 5, subMenu: null, published: true },
    { id: 6, type: 'System Menu', title: 'Online Admission', position: 6, subMenu: null, published: true },
    { id: 7, type: 'System Menu', title: 'Gallery', position: 7, subMenu: null, published: true },
    { id: 8, type: 'System Menu', title: 'News', position: 8, subMenu: null, published: true },
    { id: 9, type: 'System Menu', title: 'Pages', position: 9, subMenu: [
        { id: 91, title: 'Admit Card' },
        { id: 92, title: 'Exam Results' },
        { id: 93, title: 'Certificates' },
    ], published: true },
    { id: 10, type: 'System Menu', title: 'Contact Us', position: 13, subMenu: null, published: true },
];

// Icons
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

const ToggleSwitch = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (enabled: boolean) => void }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        onClick={() => setEnabled(!enabled)}
    >
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);

const MenuListComponent = () => {
    const [menuItems, setMenuItems] = useState(menuItemsData);

    const handleTogglePublish = (id: number) => {
        setMenuItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, published: !item.published } : item
            )
        );
    };

    return (
        <div className="overflow-x-auto">
             <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center text-sm">
                    <select className="form-select">
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <span className="ml-2 text-text-secondary dark:text-gray-400">rows per page</span>
                </div>
                <div className="relative">
                     <input type="text" placeholder="Search..." className="form-input pl-10" />
                     <svg className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-700/50">
                    <tr>
                        {['SI', 'Menu Type', 'Title', 'Position', 'Sub Menu', 'Publish', 'Action'].map(head => (
                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.type}</td>
                                <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{item.title}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.position}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.subMenu ? '↓' : '-'}</td>
                                <td className="p-3">
                                    <ToggleSwitch enabled={item.published} setEnabled={() => handleTogglePublish(item.id)} />
                                </td>
                                <td className="p-3">
                                    <div className="flex space-x-3">
                                        <button className="text-blue-500 hover:text-blue-700"><EditIcon /></button>
                                        <button className="text-red-500 hover:text-red-700"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                            {item.subMenu && (
                                <tr className="bg-gray-50 dark:bg-gray-700/30">
                                    <td colSpan={7} className="p-3 pl-12">
                                        <ul className="space-y-2">
                                            {item.subMenu.map(sub => (
                                                <li key={sub.id} className="text-sm text-text-secondary dark:text-gray-400 flex items-center">
                                                    <span className="mr-2">&raquo;</span> {sub.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const FormField = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
        <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
);

const AddMenuComponent = () => {
    const [isPublished, setIsPublished] = useState(true);
    const [isNewWindow, setIsNewWindow] = useState(false);
    const [isExternalUrl, setIsExternalUrl] = useState(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Menu saved (demo)!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <FormField label="School" required>
                <select className="form-select w-full" disabled={loadingSchools}>
                    <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                    {schools.map(school => (
                        <option key={school.id} value={school.id}>
                            {school.name}
                        </option>
                    ))}
                </select>
            </FormField>
            <FormField label="Title" required>
                <input type="text" className="form-input w-full" />
            </FormField>
            <FormField label="Position" required>
                <input type="text" className="form-input w-full" />
            </FormField>
            <FormField label="Publish">
                <ToggleSwitch enabled={isPublished} setEnabled={setIsPublished} />
            </FormField>
            <FormField label="Target New Window">
                <ToggleSwitch enabled={isNewWindow} setEnabled={setIsNewWindow} />
            </FormField>
            <FormField label="External Url">
                <ToggleSwitch enabled={isExternalUrl} setEnabled={setIsExternalUrl} />
            </FormField>
             {isExternalUrl && (
                <FormField label="External Link">
                    <input type="url" placeholder="https://example.com" className="form-input w-full" />
                </FormField>
            )}
             <FormField label="Parent Menu">
                <select className="form-select w-full">
                    <option>Select</option>
                    <option value="9">Pages</option>
                </select>
            </FormField>
            <div className="pt-6 border-t dark:border-gray-700 flex justify-start md:pl-1/4">
                 <button type="submit" className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};


const MenuPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showMenuList, setShowMenuList] = useState(false);
    const [activeTab, setActiveTab] = useState('list');
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

    const handleFilter = () => {
        if (selectedSchool) {
            setShowMenuList(true);
        } else {
            alert('Please select a school to continue.');
        }
    };

    return (
        <DashboardLayout title="Frontend CMS- Menu">
             <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                 <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-3">
                        <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                           School <span className="text-primary">*</span>
                        </label>
                        <select id="school" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className="form-select w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:text-right">
                        <button onClick={handleFilter} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                            <FilterIcon/> Filter
                        </button>
                    </div>
                 </div>
            </div>
            
            {showMenuList && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                    <div className="border-b dark:border-gray-700 mb-6">
                        <nav className="flex space-x-2 -mb-px">
                            <button onClick={() => setActiveTab('list')} className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary dark:text-gray-400'}`}>
                                Menu List
                            </button>
                             <button onClick={() => setActiveTab('add')} className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'add' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary dark:text-gray-400'}`}>
                                Add Menu
                            </button>
                        </nav>
                    </div>
                    {activeTab === 'list' ? <MenuListComponent /> : <AddMenuComponent />}
                </div>
            )}
            <style>{`
                .form-input, .form-select {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border-width: 1px;
                    background-color: transparent;
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                html.dark .form-input, html.dark .form-select {
                    border-color: #4B5563;
                    background-color: #374151;
                    color: white;
                }
                html:not(.dark) .form-input, html:not(.dark) .form-select {
                    border-color: #D1D5DB;
                    color: #111827;
                }
                .form-input:focus, .form-select:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    --tw-ring-color: #5D5FEF;
                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                    border-color: #5D5FEF;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default MenuPage;
