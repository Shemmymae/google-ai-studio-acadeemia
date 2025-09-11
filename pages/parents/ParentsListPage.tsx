import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { getSchools, School } from '../../db';

// --- ICONS ---
const icons = {
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
};

const mockParentsData = [
  { id: 1, photo: 'https://i.pravatar.cc/150?img=5', guardianName: 'Binoya Naik', occupation: 'Engineer', email: 'binoga@example.com', mobile: '+19417975797', students: ['Danelle Solomon', 'Gajendra Brahmbhatt'] },
  { id: 2, photo: 'https://i.pravatar.cc/150?img=6', guardianName: 'Summer Dixon', occupation: 'Doctor', email: 'summer@example.com', mobile: '+19126314346', students: ['Angelina Jolie', 'Mollie Flores'] },
];

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


const ParentsListPage = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    const [mockParents, setMockParents] = useState(mockParentsData);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [parentToDeleteId, setParentToDeleteId] = useState<number | null>(null);
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

    const handleDeleteRequest = (id: number) => {
        setParentToDeleteId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if(parentToDeleteId) {
            setMockParents(prev => prev.filter(p => p.id !== parentToDeleteId));
        }
        setDeleteModalOpen(false);
        setParentToDeleteId(null);
    };


    return (
        <DashboardLayout title="Parents List">
            <ConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1">
                        <label className="text-sm text-text-secondary dark:text-gray-300">School <span className="text-red-500">*</span></label>
                         <select className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                        <button onClick={() => setIsFiltered(true)} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                            {icons.filter} Filter
                        </button>
                    </div>
                </div>
            </div>

            {isFiltered && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-text-primary dark:text-gray-100">Parents List</h3>
                        <Link to="/parents/add" className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                            Add Parent
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700/50">
                                    {['Photo', 'Guardian Name', 'Occupation', 'Email', 'Mobile No', 'Students', 'Action'].map(h => 
                                        <th key={h} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">{h}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {mockParents.map(parent => (
                                    <tr key={parent.id} className="border-b dark:border-gray-700">
                                        <td className="p-3"><img src={parent.photo} alt={parent.guardianName} className="h-12 w-12 rounded-full object-cover" /></td>
                                        <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{parent.guardianName}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{parent.occupation}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{parent.email}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{parent.mobile}</td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                                            {parent.students.map(s => <div key={s}>{s}</div>)}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex space-x-2">
                                                <Link to={`/parents/profile/${parent.id}`} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:opacity-80">{icons.edit}</Link>
                                                <button onClick={() => handleDeleteRequest(parent.id)} className="p-2 rounded-md bg-red-600 text-white hover:opacity-80">{icons.delete}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};
export default ParentsListPage;