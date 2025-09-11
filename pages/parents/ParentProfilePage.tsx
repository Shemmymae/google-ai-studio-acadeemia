
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../App';
import { UserProfile, School, getSchools } from '../../db';

// --- ICONS ---
const icons = {
    user: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    child: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg>,
    authentication: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    relation: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>,
    business: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    income: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
    phone: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    email: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    address: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    facebook: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>,
    twitter: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.023-1.455-.086 2.679 1.729 5.86 2.749 9.24 2.749 8.795 0 13.525-7.564 13.12-14.169.932-.67 1.738-1.501 2.38-2.464z" /></svg>,
    linkedin: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.404 4.422-4.404 4.422 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.522-2.528v-3.341z" /></svg>,
    login: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>,
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

const ProfileSection = ({ title, icon, isOpen, onToggle, children, actionButton }: { title: string, icon: React.ReactNode, isOpen: boolean, onToggle: () => void, children?: React.ReactNode, actionButton?: React.ReactNode }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
        <button
            type="button"
            onClick={onToggle}
            className="w-full p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
            aria-expanded={isOpen}
        >
            <h3 className="flex items-center gap-2 font-bold text-text-primary dark:text-gray-100">
                {icon} {title}
            </h3>
            <div className="flex items-center gap-4">
                {actionButton}
                <ChevronDownIcon isOpen={isOpen} />
            </div>
        </button>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                 <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    </div>
);


const FormField = ({ label, children, colSpan = 'md:col-span-1' }: { label: string; children: React.ReactNode; colSpan?: string; }) => (
    <div className={colSpan}>
        <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">{label}</label>
        {children}
    </div>
);

const BasicDetailsContent = ({ profile }: { profile: UserProfile | null }) => {
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

    return (
        <form className="space-y-8 text-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <h4 className="md:col-span-3 text-base font-semibold text-text-primary dark:text-gray-200 border-b dark:border-gray-600 pb-2">Academic Details</h4>
                 {profile?.role === 'Super Admin' && (
                    <FormField label="School">
                        <select className="form-input" disabled={loadingSchools}>
                            <option>{loadingSchools ? 'Loading...' : 'Select School'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>{school.name}</option>
                            ))}
                        </select>
                    </FormField>
                 )}
                 
                 <h4 className="md:col-span-3 text-base font-semibold text-text-primary dark:text-gray-200 border-b dark:border-gray-600 pb-2">Parents Details</h4>
                 <FormField label="Name"><input type="text" className="form-input" defaultValue="Binoya Naik" /></FormField>
                 <FormField label="Relation"><input type="text" className="form-input" defaultValue="Son" /></FormField>
                 <FormField label="Father Name"><input type="text" className="form-input" defaultValue="N/A" /></FormField>
                 <FormField label="Mother Name"><input type="text" className="form-input" defaultValue="Emma Hawkins" /></FormField>
                 <FormField label="Occupation"><input type="text" className="form-input" defaultValue="Business" /></FormField>
                 <FormField label="Income"><input type="text" className="form-input" defaultValue="20000" /></FormField>
                 <FormField label="Education"><input type="text" className="form-input" defaultValue="Diploma Eng." /></FormField>
                 <FormField label="City"><input type="text" className="form-input" defaultValue="SWALECLIFFE" /></FormField>
                 <FormField label="State"><input type="text" className="form-input" defaultValue="CTS 7YX" /></FormField>
                 <FormField label="Mobile No"><input type="text" className="form-input" defaultValue="+14424575757" /></FormField>
                 <FormField label="Email"><input type="email" className="form-input" defaultValue="parent@ramom.com" /></FormField>
                 <FormField label="Address" colSpan="md:col-span-3"><textarea className="form-input" rows={3} defaultValue="69 Golf Road, SWALECLIFFE CT5 7YX"></textarea></FormField>
                 <FormField label="Profile Picture" colSpan="md:col-span-3"><input type="file" className="form-input" /></FormField>
            </div>
            
             <h4 className="text-base font-semibold text-text-primary dark:text-gray-200 border-b dark:border-gray-600 pb-2">Login Details</h4>
             <FormField label="Username"><input type="text" className="form-input" defaultValue="parent@ramom.com" /></FormField>

            <h4 className="text-base font-semibold text-text-primary dark:text-gray-200 border-b dark:border-gray-600 pb-2">Social Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Facebook"><input type="url" className="form-input" placeholder="eg. https://www.facebook.com/username" /></FormField>
                <FormField label="Twitter"><input type="url" className="form-input" placeholder="eg. https://www.twitter.com/username" /></FormField>
                <FormField label="LinkedIn"><input type="url" className="form-input" placeholder="eg. https://www.linkedin.com/username" /></FormField>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-primary-hover">Update</button>
            </div>
        </form>
    );
};

const ChildsContent = () => {
    const children = [
        { id: 1, photo: 'https://i.pravatar.cc/150?img=1', name: 'Danelle Solomon', class: 'Six', section: 'A' },
        { id: 4, photo: 'https://i.pravatar.cc/150?img=4', name: 'Gajendra Brahmbhatt', class: 'Six', section: 'A' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map(child => (
                <div key={child.id} className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 text-center">
                    <img src={child.photo} alt={child.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-300 dark:border-gray-600"/>
                    <h4 className="font-bold text-text-primary dark:text-gray-100">{child.name}</h4>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Class: {child.class} ({child.section})</p>
                    <Link to="/students" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
                        View Profile
                    </Link>
                </div>
            ))}
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

const ParentProfilePage = () => {
    const { parentId } = useParams();
    const { profile } = useAuth();
    const parentData = {
        name: "Binoya Naik",
        role: "Parent",
        photoUrl: "https://i.pravatar.cc/150?img=5",
        relation: "Son",
        occupation: "Business",
        income: "20000",
        phone: "+14424575757",
        email: "parent@ramom.com",
        address: "69 Golf Road, SWALECLIFFE CT5 7YX",
    };
    
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const handleToggle = (sectionName: string) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
    };

    return (
        <DashboardLayout title="Parents Profile">
             <AuthenticationModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div 
                    className="relative bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974')" }}
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
                        <div className="relative group flex-shrink-0 bg-black/10 dark:bg-white/20 p-2 rounded-md shadow-lg">
                            <div className="relative h-40 w-40 rounded-md overflow-hidden">
                                <img src={parentData.photoUrl} alt={parentData.name} className="h-full w-full object-cover"/>
                                <div 
                                    className="absolute top-0 left-0 w-12 h-36 bg-primary-hover text-white flex flex-col items-center justify-center space-y-4 rounded-tl-md transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
                                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)' }}
                                >
                                    <a href="#" className="hover:opacity-80 transition-opacity">{icons.facebook}</a>
                                    <a href="#" className="hover:opacity-80 transition-opacity">{icons.twitter}</a>
                                    <a href="#" className="hover:opacity-80 transition-opacity">{icons.linkedin}</a>
                                </div>
                            </div>
                        </div>
                        <div className="text-white text-center md:text-left">
                            <h2 className="text-4xl font-bold">{parentData.name}</h2>
                            <p className="text-gray-200 mt-1">{parentData.role}</p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                                <DetailItem icon={icons.relation} text={parentData.relation} />
                                <DetailItem icon={icons.business} text={parentData.occupation} />
                                <DetailItem icon={icons.income} text={parentData.income} />
                                <DetailItem icon={icons.phone} text={parentData.phone} />
                                <DetailItem icon={icons.email} text={parentData.email} />
                                <DetailItem icon={icons.address} text={parentData.address} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <ProfileSection 
                        title="Basic Details" 
                        icon={icons.user}
                        isOpen={openSection === 'Basic Details'}
                        onToggle={() => handleToggle('Basic Details')}
                        actionButton={
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsAuthModalOpen(true); }}
                                className="flex items-center text-xs font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                {icons.authentication} Authentication
                            </button>
                        }
                    >
                       <BasicDetailsContent profile={profile} />
                    </ProfileSection>

                     <ProfileSection 
                        title="Childs" 
                        icon={icons.child}
                        isOpen={openSection === 'Childs'}
                        onToggle={() => handleToggle('Childs')}
                    >
                       <ChildsContent />
                    </ProfileSection>
                </div>
            </div>
             <style>{`
                .form-input, .form-textarea, .form-select {
                    display: block; width: 100%; border-radius: 0.375rem; border-width: 1px; padding: 0.5rem 0.75rem;
                    background-color: var(--card-bg, #FFFFFF); transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                .form-checkbox {
                    border-radius: 0.25rem; border-width: 1px;
                }
                html:not(.dark) .form-input, html:not(.dark) .form-textarea, html:not(.dark) .form-select {
                    border-color: #D1D5DB; color: #111827;
                }
                html.dark .form-input, html.dark .form-textarea, html.dark .form-select {
                    border-color: #4B5563; color: #F9FAFB; background-color: #374151;
                }
                html.dark { --card-bg: #1F2937 }

                .form-input:focus, .form-textarea:focus, .form-select:focus {
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


export default ParentProfilePage;
