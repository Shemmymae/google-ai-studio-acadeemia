

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { getRoles, addRole, updateRole, Role, getSchools, School, syncDefaultRolesForAllSchools } from '../../db';
import { useAuth } from '../../App';

// --- ICONS ---
const ICONS = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    permission: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const EditRoleModal = ({ isOpen, onClose, onUpdate, role }: { isOpen: boolean; onClose: () => void; onUpdate: (role: Role) => void; role: Role | null; }) => {
    const [name, setName] = useState(role?.name || '');

    useEffect(() => {
        if (role) {
            setName(role.name);
        }
    }, [role]);

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
    const [roleData, setRoleData] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

    const { profile } = useAuth();
    const isSuperAdmin = profile?.role === 'Super Admin';
    const [syncing, setSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');

    const fetchRoles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRoles();
            setRoleData(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch roles.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleUpdateRole = async (updatedRole: Role) => {
        setError(null);
        try {
            await updateRole(updatedRole.id, { name: updatedRole.name });
            await fetchRoles();
            setIsEditModalOpen(false);
            setRoleToEdit(null);
        } catch (err: any) {
            setError(err.message || 'Failed to update role.');
        }
    };
    
    const handleAddRole = async (name: string, school_id?: number) => {
        setError(null);
        try {
            await addRole({ name, school_id });
            await fetchRoles();
            setActiveTab('list');
        } catch (err: any) {
            setError(err.message || 'Failed to add role.');
        }
    };

    const handleEditClick = (role: Role) => {
        if (role.is_system_role) {
            alert("System roles cannot be edited.");
            return;
        }
        setRoleToEdit(role);
        setIsEditModalOpen(true);
    };

    const handleSyncRoles = async () => {
        if (!window.confirm('This will check all schools and create any missing default roles. Continue?')) {
            return;
        }
        setSyncing(true);
        setSyncMessage('');
        setError(null);
        try {
            const result = await syncDefaultRolesForAllSchools();
            setSyncMessage(`${result.created} missing default roles were created successfully.`);
            await fetchRoles(); // Refresh the list
        } catch (err: any) {
            setError(err.message || 'Failed to sync roles.');
        } finally {
            setSyncing(false);
            setTimeout(() => setSyncMessage(''), 5000); // Clear message after 5s
        }
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
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700/50">
                        <tr>
                            <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">SI</th>
                            {isSuperAdmin && <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">School</th>}
                            <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Role Name</th>
                            <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Type</th>
                            <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {roleData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                {isSuperAdmin && <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.schools?.name || 'N/A'}</td>}
                                <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{item.name}</td>
                                <td className="p-3 text-sm">
                                    {item.is_system_role ? (
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                            System
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            Custom
                                        </span>
                                    )}
                                </td>
                                <td className="p-3">
                                    <div className="flex space-x-2 items-center">
                                        <button onClick={() => handleEditClick(item)} disabled={item.is_system_role} className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Edit">{ICONS.edit}</button>
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
        </div>
    );

    const CreateRoleForm = () => {
        const [name, setName] = useState('');
        const [selectedSchool, setSelectedSchool] = useState('');
        const [schools, setSchools] = useState<School[]>([]);
        const [loadingSchools, setLoadingSchools] = useState(isSuperAdmin);

        useEffect(() => {
            if (isSuperAdmin) {
                getSchools().then(data => {
                    setSchools(data);
                    setLoadingSchools(false);
                });
            }
        }, [isSuperAdmin]);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            handleAddRole(name, isSuperAdmin ? parseInt(selectedSchool) : undefined);
            setName('');
            setSelectedSchool('');
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                 {isSuperAdmin && (
                    <div className="space-y-1">
                        <label htmlFor="school_id" className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-primary">*</span></label>
                        <select id="school_id" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className="form-input" required disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select a school'}</option>
                            {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                 )}
                 <div className="space-y-1">
                    <label htmlFor="role_name" className="text-sm text-text-secondary dark:text-gray-300">Role Name <span className="text-primary">*</span></label>
                    <input type="text" id="role_name" value={name} onChange={e => setName(e.target.value)} className="form-input w-full" required />
                </div>
                <div className="pt-6 flex justify-center">
                    <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                        {ICONS.save} Save
                    </button>
                </div>
            </form>
        );
    };

    return (
        <DashboardLayout title="Roles">
             <EditRoleModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateRole}
                role={roleToEdit}
            />
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <nav className="flex space-x-6 -mb-px">
                        <TabButton label="Role List" tabName="list" />
                        <TabButton label="Create Role" tabName="add" />
                    </nav>
                    {isSuperAdmin && activeTab === 'list' && (
                        <button
                            onClick={handleSyncRoles}
                            disabled={syncing}
                            className="flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-70 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${syncing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653 8.956 8.956 0 01-6.653 2.93m0 0V20m0-8a8.956 8.956 0 016.653-2.93A8.956 8.956 0 0120 12m0 0h-5m-5 0a8.956 8.956 0 01-2.93-6.653A8.956 8.956 0 0112 4m0 0v5m-5 0H4" /></svg>
                            {syncing ? 'Syncing...' : 'Sync Default Roles'}
                        </button>
                    )}
                </div>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
                {syncMessage && <div className="bg-blue-100 text-blue-700 p-3 rounded-md mb-4">{syncMessage}</div>}
                {loading ? <div className="text-center py-8">Loading roles...</div> : (activeTab === 'list' ? <RoleList /> : <CreateRoleForm />)}
            </div>
             <style>{`
                .form-input {
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border: 1px solid;
                    background-color: transparent;
                    width: 100%;
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