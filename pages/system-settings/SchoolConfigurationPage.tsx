import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchoolById, School } from '../../db';

const ICONS = {
    school: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" /></svg>,
    parents: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    liveClass: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    accounting: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 5h.01M12 5h.01M9 5h.01M4 7h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" /></svg>,
    message: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    email: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    reports: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    attendance: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const navItems = [
    { name: 'School Details', icon: ICONS.school },
    { name: 'Student / Parent Panel', icon: ICONS.parents },
    { name: 'Live Class Settings', icon: ICONS.liveClass },
    { name: 'Payment Settings', icon: ICONS.accounting },
    { name: 'Sms Settings', icon: ICONS.message },
    { name: 'Email Settings', icon: ICONS.email },
    { name: 'Accounting Links', icon: ICONS.reports },
    { name: 'Whatsapp Settings', icon: ICONS.message },
    { name: 'Attendance Type', icon: ICONS.attendance },
];

const SettingsSidebar = ({ activeItem, setActiveItem }: { activeItem: string, setActiveItem: (item: string) => void }) => {
    return (
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-card dark:bg-gray-800 rounded-lg p-4">
            <nav className="space-y-1">
                {navItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => setActiveItem(item.name)}
                        className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeItem === item.name ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 pb-2 border-b-2 border-primary inline-block mb-6">{title}</h3>
        <div className="space-y-6">{children}</div>
    </div>
);

const SettingsField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 md:gap-4">
        <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">{label}{React.isValidElement(children) && (children.props as any).required && <span className="text-red-500 ml-1">*</span>}</label>
        <div className="md:col-span-2">{children}</div>
    </div>
);

const SchoolDetailsPanel = ({ school }: { school: School | null }) => {
    // This would contain form fields to edit school details
    if (!school) return null;

    return (
        <SettingsSection title="School Details">
            <form className="space-y-6">
                <SettingsField label="School Name">
                    <input type="text" defaultValue={school.name} className="form-input w-full" />
                </SettingsField>
                <SettingsField label="Official Name">
                    <input type="text" defaultValue={school.officialName} className="form-input w-full" />
                </SettingsField>
                 <SettingsField label="Email">
                    <input type="email" defaultValue={school.email} className="form-input w-full" />
                </SettingsField>
                 <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                    <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                        {ICONS.save} Save
                    </button>
                </div>
            </form>
        </SettingsSection>
    );
};


const SchoolConfigurationPage = () => {
    const { schoolId } = useParams<{ schoolId: string }>();
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState('School Details');

    useEffect(() => {
        if (schoolId) {
            getSchoolById(parseInt(schoolId, 10)).then(data => {
                setSchool(data);
                setLoading(false);
            });
        }
    }, [schoolId]);

    const renderContent = () => {
        if (loading) return <div className="text-center p-8">Loading school configuration...</div>;
        if (!school) return <div className="text-center p-8">School not found.</div>;

        switch (activeItem) {
            case 'School Details':
                return <SchoolDetailsPanel school={school} />;
            case 'Student / Parent Panel':
                 return <SettingsSection title="Student / Parent Panel"><p>Configuration for {activeItem}</p></SettingsSection>;
            // ... other cases for each nav item
            default:
                return <SettingsSection title={activeItem}><p>Configuration for {activeItem}</p></SettingsSection>;
        }
    };

    return (
        <DashboardLayout title={`Configuration: ${school?.name || 'Loading...'}`}>
            <div className="flex flex-col md:flex-row gap-6">
                <SettingsSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
                <main className="flex-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    {renderContent()}
                </main>
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

export default SchoolConfigurationPage;
