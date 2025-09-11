



import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardLayout from '../components/DashboardLayout';
import { getSchools, School } from '../db';

// --- ICONS ---
const icons = {
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    view: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
};

interface StudentData {
  id: number;
  photo: string;
  name: string;
  class: string;
  section: string;
  gender: string;
  mobile: string;
  registerNo: string;
  registerDate: string; // This is the admission date
  roll: number;
  age: number;
  guardianName: string;
  guardianMobile: string;
  feesProgress: number;
  // New fields for quick view modal
  dob: string;
  bloodGroup: string;
  religion: string;
  email: string;
  state: string;
  address: string;
}

const mockStudents: StudentData[] = [
  { id: 1, photo: 'https://i.pravatar.cc/150?img=4', name: 'Gajendra Brahmbhatt', class: 'Six', section: 'A', gender: 'Male', mobile: '+91 25 62062220', registerNo: 'RSM-00009', registerDate: '27.Apr.2025', roll: 4, age: 25, guardianName: 'Binoga Naik', guardianMobile: '+19417975797', feesProgress: 0, dob: '01.Feb.2000', bloodGroup: 'A+', religion: 'N/A', email: 'gajendra@goyal.com', state: 'Trichy', address: '72, Aundh, Trichy - 297337' },
  { id: 2, photo: 'https://i.pravatar.cc/150?img=3', name: 'Mollie Flores', class: 'Six', section: 'A', gender: 'Female', mobile: '+13234281802', registerNo: 'RSM-00003', registerDate: '25.Mar.2025', roll: 3, age: 21, guardianName: 'Summer Dixon', guardianMobile: '+19126314346', feesProgress: 26, dob: '15.Jun.2003', bloodGroup: 'O-', religion: 'Christian', email: 'mollie.f@example.com', state: 'California', address: '123 Main St, Los Angeles' },
  { id: 3, photo: 'https://i.pravatar.cc/150?img=2', name: 'Angelina Jolie', class: 'Six', section: 'A', gender: 'Female', mobile: '+17142987846', registerNo: 'RSM-00002', registerDate: '25.Mar.2025', roll: 2, age: 29, guardianName: 'Summer Dixon', guardianMobile: '+19126314346', feesProgress: 0, dob: '04.Jun.1995', bloodGroup: 'B+', religion: 'N/A', email: 'angelina.j@example.com', state: 'California', address: '456 Hollywood Blvd, Hollywood' },
  { id: 4, photo: 'https://i.pravatar.cc/150?img=1', name: 'Danelle Solomon', class: 'Six', section: 'A', gender: 'Male', mobile: '+17573552201', registerNo: 'RSM-00001', registerDate: '25.Mar.2025', roll: 1, age: 16, guardianName: 'Binoga Naik', guardianMobile: '+19417975797', feesProgress: 22, dob: '22.Sep.2008', bloodGroup: 'AB+', religion: 'N/A', email: 'danelle.s@example.com', state: 'Virginia', address: '789 Ocean View, Norfolk' },
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

const QuickViewModal = ({ student, onClose }: { student: StudentData | null; onClose: () => void; }) => {
    if (!student) return null;

    const QuickViewIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const DetailItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
        <>
            <div className="font-semibold p-3 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">{label}</div>
            <div className="p-3 border-b border-r border-gray-200 dark:border-gray-700">{value || 'N/A'}</div>
        </>
    );

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-card dark:bg-gray-800 text-text-primary dark:text-gray-100 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <QuickViewIcon />
                        Quick View
                    </h3>
                    <div className="w-20 h-0.5 bg-primary mt-1"></div>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-center mb-6">
                        <img src={student.photo} alt={student.name} className="w-24 h-24 rounded-lg mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600 shadow-lg"/>
                        <h2 className="text-2xl font-bold">{student.name}</h2>
                        <p className="text-text-secondary dark:text-gray-400 text-sm">Student / General</p>
                    </div>

                    <div className="text-left text-sm border-t border-l border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                        <div className="grid grid-cols-2 sm:grid-cols-4">
                            <DetailItem label="Register No" value={student.registerNo} />
                            <DetailItem label="Roll" value={student.roll} />
                            <DetailItem label="Admission Date" value={student.registerDate} />
                            <DetailItem label="Date Of Birth" value={student.dob} />
                            <DetailItem label="Blood group" value={student.bloodGroup} />
                            <DetailItem label="Religion" value={student.religion} />
                            <DetailItem label="Gender" value={student.gender} />
                            <DetailItem label="Email" value={student.email} />
                            <DetailItem label="Mobile No" value={student.mobile} />
                            <DetailItem label="State" value={student.state} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr,3fr]">
                             <div className="font-semibold p-3 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">Address</div>
                             <div className="p-3 border-b border-r border-gray-200 dark:border-gray-700">{student.address}</div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
                    <button onClick={onClose} className="px-8 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white rounded-md font-semibold transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};


const StudentsPage = () => {
    const [students, setStudents] = useState<StudentData[]>(mockStudents);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [itemToDelete, setItemToDelete] = useState<'single' | 'bulk' | null>(null);
    const [viewingStudent, setViewingStudent] = useState<StudentData | null>(null);
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

    const handleQuickView = (student: StudentData) => {
        setViewingStudent(student);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudents(students.map(s => s.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectOne = (id: number) => {
        setSelectedStudents(prev => 
            prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev, id]
        );
    };
    
    const handleDeleteRequest = (type: 'single' | 'bulk', id?: number) => {
        if (type === 'single' && id) {
            setSelectedStudents([id]);
        }
        setItemToDelete(type);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setStudents(prev => prev.filter(s => !selectedStudents.includes(s.id)));
        setShowDeleteModal(false);
        setSelectedStudents([]);
        setItemToDelete(null);
    };


  return (
    <DashboardLayout title="Student List">
        <ConfirmationModal 
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
        />
        <QuickViewModal student={viewingStudent} onClose={() => setViewingStudent(null)} />
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
                <div className="space-y-1">
                    <label className="text-sm text-text-secondary dark:text-gray-300">Class</label>
                    <select className="form-input w-full"><option>First Select The School</option><option selected>Six</option></select>
                </div>
                <div className="space-y-1">
                    <label className="text-sm text-text-secondary dark:text-gray-300">Section</label>
                    <select className="form-input w-full"><option>Select Class First</option><option selected>A</option></select>
                </div>
                 <div className="md:text-right">
                    <button onClick={() => setIsFiltered(true)} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                        {icons.filter} Filter
                    </button>
                </div>
            </div>
        </div>
        
        {isFiltered && (
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100">Student List</h3>
                     <button 
                        onClick={() => handleDeleteRequest('bulk')} 
                        disabled={selectedStudents.length === 0}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 disabled:bg-red-400 dark:disabled:bg-red-800 disabled:cursor-not-allowed transition-colors"
                    >
                        Bulk Delete
                    </button>
                 </div>
                 <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center space-x-1">
                        <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{icons.copy}</button>
                        <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{icons.print}</button>
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
                                <th className="p-3"><input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === students.length && students.length > 0} className="form-checkbox"/></th>
                                {['Photo', 'Name', 'Class', 'Section', 'Gender', 'Mobile No', 'Register No', 'Roll', 'Age', 'Guardian Name', 'Fees Progress', 'Action'].map(head => (
                                    <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                             {students.map(student => (
                                 <tr key={student.id}>
                                     <td className="p-3"><input type="checkbox" checked={selectedStudents.includes(student.id)} onChange={() => handleSelectOne(student.id)} className="form-checkbox"/></td>
                                     <td className="p-3"><img src={student.photo} alt={student.name} className="h-10 w-10 rounded-full object-cover"/></td>
                                     <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{student.name}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.class}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.section}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.gender}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.mobile}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.registerNo}<br/><span className="text-xs">{student.registerDate}</span></td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.roll}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.age}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{student.guardianName}<br/><span className="text-xs">{student.guardianMobile}</span></td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                                         <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${student.feesProgress}%` }}></div>
                                         </div>
                                         <span className="text-xs">{student.feesProgress}%</span>
                                     </td>
                                     <td className="p-3">
                                         <div className="flex space-x-2">
                                            <button onClick={() => handleQuickView(student)} className="p-1 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:opacity-80">{icons.view}</button>
                                            <Link to={`/student/profile/${student.id}`} className="p-1 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:opacity-80">{icons.edit}</Link>
                                            <button onClick={() => handleDeleteRequest('single', student.id)} className="p-1 rounded-md bg-red-600 text-white hover:opacity-80">{icons.delete}</button>
                                         </div>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                    </table>
                </div>
                 <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                    <p>Showing 1 to {students.length} of {students.length} entries</p>
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 border rounded-md text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                        <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                        <button className="px-3 py-1 border rounded-md text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                    </div>
                </div>
            </div>
        )}
        <style>{`
            .form-input, .form-select, .form-checkbox {
                padding: 0.65rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }
            .form-checkbox { padding: 0.5rem; }
             html:not(.dark) .form-input, html:not(.dark) .form-select {
                 border-color: #D1D5DB; background-color: #FFFFFF; color: #111827;
            }
            html.dark .form-input, html.dark .form-select {
                border-color: #4B5563; background-color: #374151; color: #F9FAFB;
            }
            .form-input:focus, .form-select:focus {
                outline: 2px solid transparent; outline-offset: 2px;
                --tw-ring-color: #5D5FEF;
                box-shadow: 0 0 0 2px var(--tw-ring-color);
                border-color: #5D5FEF;
            }
            .form-checkbox { color: #5D5FEF; }
        `}</style>
    </DashboardLayout>
  );
};

export default StudentsPage;