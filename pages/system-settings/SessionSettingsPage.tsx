import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Session, getSessions, addSession, updateSession, deleteSession, School, getSchools } from '../../db';
import { useAuth } from '../../App';

// --- ICONS ---
const ICONS = {
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    editTitle: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
};

const StatusBadge = ({ status }: { status: string | null }) => {
    if (!status) return null;
    return (
        <span className="px-2 py-1 text-xs font-semibold rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
            {status}
        </span>
    );
};

const EditSessionModal = ({ isOpen, onClose, onUpdate, session }: { isOpen: boolean; onClose: () => void; onUpdate: (session: Session) => void; session: Session | null }) => {
    const [name, setName] = useState(session?.session || '');

    useEffect(() => {
        setName(session?.session || '');
    }, [session]);
    
    if (!isOpen || !session) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ ...session, session: name });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                 <div className="p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 flex items-center">{ICONS.editTitle} Edit Session</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <label htmlFor="session_edit" className="text-sm font-medium text-text-secondary dark:text-gray-300">Session <span className="text-primary">*</span></label>
                        <input type="text" id="session_edit" value={name} onChange={(e) => setName(e.target.value)} className="form-input w-full mt-1" required />
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                           Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-gray-700 border-4 border-yellow-400 dark:border-yellow-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mt-5 text-text-primary dark:text-white">Are You Sure?</h3>
                    <p className="text-text-secondary dark:text-gray-400 mt-2">Do You Want To Delete This Information?</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                     <button onClick={onConfirm} className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold">Yes, Continue</button>
                    <button onClick={onClose} className="w-full py-3 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white font-semibold">Cancel</button>
                </div>
                <p className="text-center text-xs text-text-secondary dark:text-gray-500 mt-6">*Note: This data will be permanently deleted</p>
            </div>
        </div>
    );
};

const SessionSettingsPage = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [sessionToDeleteId, setSessionToDeleteId] = useState<number | null>(null);
    
    const { profile } = useAuth();
    const isSuperAdmin = profile?.role === 'Super Admin';
    const [schools, setSchools] = useState<School[]>([]);
    const [loadingSchools, setLoadingSchools] = useState(isSuperAdmin);

    useEffect(() => {
        if (isSuperAdmin) {
            const fetchSchools = async () => {
                setLoadingSchools(true);
                const schoolsData = await getSchools();
                setSchools(schoolsData);
                setLoadingSchools(false);
            };
            fetchSchools();
        }
    }, [isSuperAdmin]);


    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSessions();
            setSessions(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch sessions.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const handleAddSession = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const form = e.currentTarget;
        const sessionName = (form.elements.namedItem('session') as HTMLInputElement).value;
        
        let schoolId: number | undefined = undefined;
        if (isSuperAdmin) {
            schoolId = parseInt((form.elements.namedItem('school_id') as HTMLSelectElement).value, 10);
            if (!schoolId) {
                setError("Please select a school.");
                return;
            }
        }

        if(sessionName) {
            try {
                await addSession({ session: sessionName, school_id: schoolId });
                await fetchSessions();
                form.reset();
            } catch (err: any) {
                setError(err.message || 'Failed to add session.');
            }
        }
    };
  
    const handleEditClick = (session: Session) => {
        setSelectedSession(session);
        setEditModalOpen(true);
    };
  
    const handleUpdateSession = async (updatedSession: Session) => {
        if (!selectedSession) return;
        setError(null);
        try {
            await updateSession(selectedSession.id, { session: updatedSession.session });
            await fetchSessions();
            setEditModalOpen(false);
            setSelectedSession(null);
        } catch (err: any) {
            setError(err.message || 'Failed to update session.');
        }
    };

    const handleDeleteRequest = (id: number) => {
        setSessionToDeleteId(id);
        setDeleteModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
        if (sessionToDeleteId !== null) {
            setError(null);
            try {
                await deleteSession(sessionToDeleteId);
                await fetchSessions();
            } catch (err: any) {
                setError(err.message || 'Failed to delete session.');
            }
        }
        setDeleteModalOpen(false);
        setSessionToDeleteId(null);
    };

    return (
        <DashboardLayout title="Session Settings">
            <EditSessionModal 
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdateSession}
                session={selectedSession}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Add Session Form */}
                <div className="lg:col-span-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                    <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b-2 border-primary inline-block">Add Session</h3>
                    <form onSubmit={handleAddSession} className="space-y-6">
                        {isSuperAdmin && (
                            <div>
                                <label htmlFor="school_id" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                                    School <span className="text-primary">*</span>
                                </label>
                                <select id="school_id" name="school_id" required className="form-input" disabled={loadingSchools}>
                                    <option value="">{loadingSchools ? 'Loading schools...' : 'Select a school'}</option>
                                    {schools.map(school => (
                                        <option key={school.id} value={school.id}>{school.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label htmlFor="session" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                                Session <span className="text-primary">*</span>
                            </label>
                            <input type="text" id="session" name="session" required className="form-input"/>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                                {ICONS.save} Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sessions List Table */}
                <div className="lg:col-span-2 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                     <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b-2 border-primary inline-block">Sessions List</h3>
                     {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
                     {loading ? (
                         <p className="text-center py-8 text-text-secondary dark:text-gray-400">Loading sessions...</p>
                     ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Session</th>
                                        {isSuperAdmin && <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">School</th>}
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Status</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Created At</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.length === 0 ? (
                                        <tr>
                                            <td colSpan={isSuperAdmin ? 5 : 4} className="text-center p-8 text-text-secondary dark:text-gray-400">
                                                No sessions found. Add one to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        sessions.map(item => (
                                            <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{item.session}</td>
                                                {isSuperAdmin && <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.schools?.name || 'N/A'}</td>}
                                                <td className="p-3 text-sm"><StatusBadge status={item.status} /></td>
                                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '.')}</td>
                                                <td className="p-3">
                                                    <div className="flex justify-center space-x-2">
                                                        <button onClick={() => handleEditClick(item)} className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.edit}</button>
                                                        <button onClick={() => handleDeleteRequest(item.id)} className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-600 text-primary hover:opacity-80">{ICONS.delete}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                     )}
                </div>
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

export default SessionSettingsPage;
