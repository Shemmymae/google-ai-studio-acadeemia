
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// --- ICONS ---
const icons = {
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    editTitle: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
};

const initialDeactivateReasons = [
    { id: 1, school: 'Icon School & College', reason: 'Samuels' },
    { id: 2, school: 'Icon School & College', reason: 'Graduated' },
    { id: 3, school: 'Icon School & College', reason: 'Pris' },
    { id: 4, school: 'Oxford International', reason: 'fees' },
    { id: 5, school: 'Icon School & College', reason: 'Movie' },
    { id: 6, school: 'Icon School & College', reason: 'Amsalu' },
];
type Reason = typeof initialDeactivateReasons[0];

const EditDeactivateReasonModal = ({ isOpen, onClose, onUpdate, reason }: { isOpen: boolean; onClose: () => void; onUpdate: (reason: Reason) => void; reason: Reason | null }) => {
    const [currentReason, setCurrentReason] = useState(reason?.reason || '');
    const [currentSchool, setCurrentSchool] = useState(reason?.school || '');
    
    useEffect(() => {
        if (reason) {
            setCurrentReason(reason.reason);
            setCurrentSchool(reason.school);
        }
    }, [reason]);

    if (!isOpen || !reason) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ ...reason, school: currentSchool, reason: currentReason });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                 <div className="p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 flex items-center">{icons.editTitle} Edit Deactivate Reason</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-8 space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="schoolEdit" className="text-sm font-medium text-text-secondary dark:text-gray-300">
                                School <span className="text-primary">*</span>
                            </label>
                            <select id="schoolEdit" value={currentSchool} onChange={(e) => setCurrentSchool(e.target.value)} className="form-input w-full">
                                <option>Icon School & College</option>
                                <option>Oxford International</option>
                            </select>
                        </div>
                         <div className="space-y-1">
                            <label htmlFor="reasonEdit" className="text-sm font-medium text-text-secondary dark:text-gray-300">
                                Reason <span className="text-primary">*</span>
                            </label>
                            <input id="reasonEdit" value={currentReason} onChange={(e) => setCurrentReason(e.target.value)} className="form-input w-full" required />
                        </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
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

const DeactivateReasonPage = () => {
    const [reasons, setReasons] = useState<Reason[]>(initialDeactivateReasons);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
    const [reasonToDeleteId, setReasonToDeleteId] = useState<number | null>(null);
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

    const handleAddReason = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const school = (form.elements.namedItem('school') as HTMLSelectElement).value;
        const reason = (form.elements.namedItem('reason') as HTMLTextAreaElement).value;

        if(school && reason) {
            const newReason: Reason = {
                id: Date.now(),
                school,
                reason,
            };
            setReasons(prev => [newReason, ...prev]);
            form.reset();
        }
    };
  
    const handleEditClick = (reason: Reason) => {
        setSelectedReason(reason);
        setEditModalOpen(true);
    };
  
    const handleUpdateReason = (updatedReason: Reason) => {
        setReasons(prev => prev.map(r => r.id === updatedReason.id ? updatedReason : r));
        setEditModalOpen(false);
        setSelectedReason(null);
    };

    const handleDeleteRequest = (id: number) => {
        setReasonToDeleteId(id);
        setDeleteModalOpen(true);
    };
  
    const handleConfirmDelete = () => {
        if (reasonToDeleteId !== null) {
            setReasons(prev => prev.filter(r => r.id !== reasonToDeleteId));
        }
        setDeleteModalOpen(false);
        setReasonToDeleteId(null);
    };

    return (
        <DashboardLayout title="Deactivate Reason">
             <EditDeactivateReasonModal 
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdateReason}
                reason={selectedReason}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Reason Form */}
                <div className="lg:col-span-5 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="flex items-center text-lg font-bold text-text-primary dark:text-gray-100 mb-1">
                        {icons.add} Add Deactivate Reason
                    </h3>
                    <div className="border-b-2 border-primary w-16 mb-6"></div>
                    <form className="space-y-6" onSubmit={handleAddReason}>
                        <div className="space-y-1">
                            <label htmlFor="school" className="text-sm font-medium text-text-secondary dark:text-gray-300">
                                School <span className="text-primary">*</span>
                            </label>
                            <select id="school" name="school" className="form-input w-full" disabled={loadingSchools}>
                               <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.name}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="reason" className="text-sm font-medium text-text-secondary dark:text-gray-300">
                                Reason <span className="text-primary">*</span>
                            </label>
                            <textarea id="reason" name="reason" rows={4} className="form-textarea w-full"></textarea>
                        </div>
                        <div className="flex justify-end pt-2">
                             <button type="submit" className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500">
                                {icons.save} Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Reason List Table */}
                <div className="lg:col-span-7 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="flex items-center text-lg font-bold text-text-primary dark:text-gray-100 mb-1">
                        {icons.list} Reason List
                    </h3>
                    <div className="border-b-2 border-primary w-16 mb-6"></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700/50">
                                <tr>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">School</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">Reason</th>
                                    <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reasons.map(item => (
                                    <tr key={item.id} className="border-b dark:border-gray-700">
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{item.school}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{item.reason}</td>
                                        <td className="p-3">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleEditClick(item)} className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600" aria-label="Edit">{icons.edit}</button>
                                                <button onClick={() => handleDeleteRequest(item.id)} className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700" aria-label="Delete">{icons.delete}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
             <style>{`
                .form-input, .form-select, .form-textarea {
                    padding: 0.65rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                 html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea {
                     border-color: #D1D5DB; background-color: #FFFFFF; color: #111827;
                }
                html.dark .form-input, html.dark .form-select, html.dark .form-textarea {
                    border-color: #4B5563; background-color: #374151; color: #F9FAFB;
                }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
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

export default DeactivateReasonPage;
