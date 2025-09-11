

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// Icons
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
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

const SidebarLink = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
        {label}
    </button>
);

const ContentTab = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
            isActive ? 'border-b-2 border-primary text-primary' : 'text-text-secondary dark:text-gray-400 hover:text-primary/80'
        }`}
    >
        {label}
    </button>
);

const WelcomeMessageForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [titleColor, setTitleColor] = useState("#000000");
    const [photo, setPhoto] = useState<File | null>(null);
    const photoPreview = photo ? URL.createObjectURL(photo) : "https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/public/website_images/frontend/welcome_photo.png";

    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <input type="text" defaultValue="Welcome To Education" className="form-input" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Subtitle <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <input type="text" defaultValue="We will give you future" className="form-input" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <textarea 
                        rows={6}
                        defaultValue="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-2 flex items-center gap-4">
                    <img src={photoPreview} alt="Welcome" className="h-16 w-16 object-cover rounded-md" />
                    <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="text-sm text-text-secondary dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Title Text Color</label>
                <div className="md:col-span-2 flex items-center gap-2">
                    <input type="color" value={titleColor} onChange={e => setTitleColor(e.target.value)} className="w-10 h-10 p-1 border-none rounded-md cursor-pointer bg-transparent"/>
                    <input type="text" value={titleColor} onChange={e => setTitleColor(e.target.value)} className="form-input w-28"/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Show Website</label>
                <div className="md:col-span-2">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            <div className="flex justify-center pt-6 border-t dark:border-gray-700">
                <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};


const PageSectionPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const [activeTab, setActiveTab] = useState('Welcome Message');
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

    const sidebarItems = ['Home', 'Teachers', 'Events', 'About Us', 'FAQ', 'Online Admission', 'Gallery', 'News', 'Admit Card', 'Exam Results', 'Certificates', 'Contact Us'];
    const contentTabs = ['Welcome Message', 'Teachers', 'Testimonial', 'Services', 'Statistics', 'Call To Action Section', 'Options'];

    const handleFilter = () => {
        if (selectedSchool) {
            setShowContent(true);
        } else {
            alert('Please select a school to continue.');
        }
    };

    return (
        <DashboardLayout title="Website Page">
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
            
            {showContent && (
                <div className="mt-8 flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <aside className="w-full md:w-1/4 lg:w-1/5 bg-card dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <nav className="space-y-1">
                            {sidebarItems.map(item => (
                                <SidebarLink key={item} label={item} isActive={activeSection === item} onClick={() => setActiveSection(item)} />
                            ))}
                        </nav>
                    </aside>
                    {/* Right Content Area */}
                    <main className="flex-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <div className="border-b dark:border-gray-700 mb-6">
                            <nav className="flex flex-wrap -mb-px">
                                {contentTabs.map(tab => (
                                    <ContentTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                                ))}
                            </nav>
                        </div>
                        
                        {activeTab === 'Welcome Message' && <WelcomeMessageForm />}
                        {/* Other tab content would go here */}
                    </main>
                </div>
            )}
            <style>{`
                .form-input, .form-select, .form-textarea {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border-width: 1px;
                    background-color: var(--background);
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                html.dark .form-input, html.dark .form-select, html.dark .form-textarea {
                    border-color: #4B5563;
                    background-color: #374151;
                    color: white;
                }
                html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea {
                    border-color: #D1D5DB;
                    color: #111827;
                }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
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

export default PageSectionPage;
