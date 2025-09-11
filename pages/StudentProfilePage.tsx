


import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// Mock data, in a real app this would be fetched based on studentId from URL params
const studentData = {
    id: 1,
    name: 'Gajendra Brahmbhatt',
    role: 'Student / General',
    photoUrl: 'https://i.pravatar.cc/150?img=4',
    backgroundUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=2070',
    guardian: 'Binoya Naik',
    dob: '01.Feb.2000',
    class: 'Six (A)',
    phone: '+91 25 62062220',
    email: 'gajendra@goyal.com',
    address: '72, Aundh, Trichy - 297337'
};

// --- ICONS ---
const icons = {
    guardian: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    dob: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    class: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    phone: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    email: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    address: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    basicDetails: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    fees: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 0h-2" /></svg>,
    promotion: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    book: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    exam: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    parent: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>,
    sibling: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" /></svg>,
    documents: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    authentication: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    collectFees: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 0h-2" /></svg>,
};

const DetailItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3">
        <span className="group flex items-center justify-center h-8 w-8 bg-white/20 dark:bg-black/20 rounded-sm transform rotate-45 transition-transform duration-300 hover:rotate-0">
            <span className="transform -rotate-45 transition-transform duration-300 group-hover:rotate-0 text-white">{icon}</span>
        </span>
        <span className="font-medium text-gray-100">{text}</span>
    </div>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const ProfileSection = ({ title, icon, actionButton, children }: { title: string, icon: React.ReactNode, actionButton?: React.ReactNode, children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 flex justify-between items-center"
                aria-expanded={isOpen}
            >
                <h3 className="flex items-center gap-2 font-bold text-text-primary dark:text-gray-100">
                    {icon} {title}
                </h3>
                <div className="flex items-center gap-4 text-text-secondary dark:text-gray-300">
                    {actionButton}
                    <ChevronDownIcon isOpen={isOpen} />
                </div>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                     <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        {children || <p className="text-gray-500 dark:text-gray-400 text-sm">No information available for this section.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AuthenticationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    if (!isOpen) return null;

    const EyeOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
    const EyeClosedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .527-1.663 1.49-3.16 2.68-4.32m.878-1.02A13.937 13.937 0 0112 5c4.478 0 8.268 2.943 9.542 7a13.937 13.937 0 01-1.543 3.351m-4.221-4.221a3 3 0 11-4.242-4.242M1 1l22 22" /></svg>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 text-text-primary dark:text-gray-200 rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-red-500/30 flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <h2 className="text-lg font-bold">Authentication</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        <div className="relative">
                            <label htmlFor="password-auth" className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Password <span className="text-red-500">*</span></label>
                            <input
                                id="password-auth"
                                type={showPassword ? 'text' : 'password'}
                                className="form-input pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-text-secondary dark:text-gray-400"
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                            </button>
                        </div>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary" />
                            <span className="text-sm text-text-secondary dark:text-gray-400">Login Authentication Deactivate</span>
                        </label>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Close</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-700 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const StudentProfilePage = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    // const { studentId } = useParams(); // Use this to fetch specific student data
    return (
        <DashboardLayout title="Student Profile">
            <AuthenticationModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <div className="bg-card dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div 
                    className="relative bg-cover bg-center rounded-lg overflow-hidden" 
                    style={{ backgroundImage: `url('${studentData.backgroundUrl}')` }}
                >
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: `
                                linear-gradient(120deg, rgba(93, 95, 239, 0.7) 48%, rgba(67, 56, 202, 0.8) 55%),
                                radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)
                            `,
                            backgroundSize: 'cover, 4px 4px'
                        }}
                    ></div>
                    
                    <div className="relative p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0 bg-black/10 dark:bg-white/20 p-2 rounded-md shadow-lg">
                             <img src={studentData.photoUrl} alt={studentData.name} className="h-40 w-40 object-cover rounded-md"/>
                        </div>
                        <div className="text-white text-center md:text-left">
                            <h2 className="text-4xl font-bold">{studentData.name}</h2>
                            <p className="text-gray-200 mt-1">{studentData.role}</p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                                <DetailItem icon={icons.guardian} text={studentData.guardian} />
                                <DetailItem icon={icons.dob} text={studentData.dob} />
                                <DetailItem icon={icons.class} text={studentData.class} />
                                <DetailItem icon={icons.phone} text={studentData.phone} />
                                <DetailItem icon={icons.email} text={studentData.email} />
                                <DetailItem icon={icons.address} text={studentData.address} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-2">
                    <ProfileSection 
                        title="Basic Details" 
                        icon={icons.basicDetails} 
                        actionButton={
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsAuthModalOpen(true); }}
                                className="flex items-center text-xs font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600/50 transition-colors"
                            >
                                {icons.authentication} Authentication
                            </button>
                        }
                    />
                    <ProfileSection 
                        title="Fees" 
                        icon={icons.fees}
                        actionButton={
                            <Link to={`/fees/invoice/${studentData.id}`} onClick={(e) => e.stopPropagation()} className="flex items-center text-xs font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600/50 transition-colors">
                                {icons.collectFees} Collect Fees
                            </Link>
                        }
                    />
                    <ProfileSection title="Promotion History" icon={icons.promotion} />
                    <ProfileSection title="Book Issue" icon={icons.book} />
                    <ProfileSection title="Exam Result" icon={icons.exam} />
                    <ProfileSection title="Parent Information" icon={icons.parent} />
                    <ProfileSection title="Sibling Information" icon={icons.sibling} />
                    <ProfileSection title="Documents" icon={icons.documents} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentProfilePage;