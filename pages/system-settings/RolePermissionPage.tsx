

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const ICONS = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    permission: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const initialRoleData = [
    { id: 1, name: 'Admin', isSystemRole: true },
    { id: 2, name: 'Teacher', isSystemRole: true },
    { id: 3, name: 'Accountant', isSystemRole: true },
    { id: 4, name: 'Librarian', isSystemRole: true },
    { id: 5, name: 'Receptionist', isSystemRole: true },
];

type Role = typeof initialRoleData[0];

const EditRoleModal = ({ isOpen, onClose, onUpdate, role }: { isOpen: boolean; onClose: () => void; onUpdate: (role: Role) => void; role: Role | null; }) => {
    const [name, setName] = useState(role?.name || '');

    if (!isOpen || !role) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ ...role, name });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Edit Role</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <label htmlFor="role_name_edit" className="text-sm font-medium text-text-secondary dark:text-gray-300">Role Name <span className="text-primary">*</span></label>
                        <input type="text" id="role_name_edit" value={name} onChange={(e) => setName(e.target.value)} className="form-input w-full mt-1" required />
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                            {ICONS.save} Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const RolePermissionPage = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [roleData, setRoleData] = useState(initialRoleData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

    const handleUpdateRole = (updatedRole: Role) => {
        setRoleData(prev => prev.map(role => role.id === updatedRole.id ? updatedRole : role));
        setIsEditModalOpen(false);
        setRoleToEdit(null);
    };
    
    const handleEditClick = (role: Role) => {
        setRoleToEdit(role);
        setIsEditModalOpen(true);
    };

    const TabButton = ({ label, tabName }: { label: string; tabName: string }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`flex items-center px-1 py-2 font-semibold text-sm transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover border-b-2 border-transparent'
                    }`}
            >
                {tabName === 'list' ? ICONS.list : ICONS.add}
                {label}
            </button>
        );
    };

    const RoleList = () => (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <select className="px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-900 dark:border-gray-600 text-sm">
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <span className="text-sm text-text-secondary dark:text-gray-400">rows per page</span>
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
                            {['SI', 'Role Name', 'System Role', 'Action'].map(head => (
                                <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {roleData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{item.name}</td>
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.isSystemRole ? 'Yes' : 'No'}</td>
                                <td className="p-3">
                                    <div className="flex space-x-2 items-center">
                                        <button onClick={() => handleEditClick(item)} className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 transition-opacity" aria-label="Edit">{ICONS.edit}</button>
                                        <Link to={`/system-settings/role-permission/${item.id}`} state={{ roleName: item.name }} className="flex items-center px-3 py-1.5 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80 transition-opacity">
                                            {ICONS.permission}
                                            Permission
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                    <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                </div>
            </div>
        </div>
    );

    const CreateRoleForm = () => (
        <form className="space-y-6 max-w-lg mx-auto">
             <div className="space-y-1">
                <label htmlFor="role_name" className="text-sm text-text-secondary dark:text-gray-300">Role Name <span className="text-primary">*</span></label>
                <input type="text" id="role_name" className="form-input w-full" />
            </div>
            <div className="pt-6 flex justify-center">
                <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                    {ICONS.save} Save
                </button>
            </div>
        </form>
    );

    return (
        <DashboardLayout title="Roles">
             <EditRoleModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateRole}
                role={roleToEdit}
            />
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Role List" tabName="list" />
                        <TabButton label="Create Role" tabName="add" />
                    </nav>
                </div>
                {activeTab === 'list' ? <RoleList /> : <CreateRoleForm />}
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

export default RolePermissionPage;