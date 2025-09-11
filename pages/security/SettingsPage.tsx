
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const SettingsField = ({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
        <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
);

const SelectInput = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
    <select {...props} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {children}
    </select>
);

const TextareaInput = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        rows={4}
        {...props}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    />
);

const TwoFASettingsPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [schools, setSchools] = useState<School[]>([]);

    // Form state
    const [twoFactorEnabled, setTwoFactorEnabled] = useState('enable');
    const [showRemember, setShowRemember] = useState('yes');
    const [cookieExpiry, setCookieExpiry] = useState('15');
    const [emailInstruction, setEmailInstruction] = useState('A unique code has been sent to your email address. Please check your inbox for the 2FA verification code.');
    const [appInstruction, setAppInstruction] = useState('Download Google Authenticator App in your mobile device.');
    
    useEffect(() => {
        const fetchSchools = async () => {
            const schoolsData = await getSchools();
            setSchools(schoolsData);
        };
        fetchSchools();
    }, []);

    const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedSchool) {
            setShowSettings(true);
        } else {
            alert("Please select a school to filter.");
            setShowSettings(false);
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, save logic would go here
        alert('Settings saved successfully (demo)!');
    };


    return (
        <DashboardLayout title="Two Factor Authentication">
            <div className="space-y-8">
                {/* Select Ground Card */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b dark:border-gray-700">Select Ground</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-3">
                             <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                School <span className="text-red-500">*</span>
                            </label>
                            <SelectInput id="school" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)}>
                                <option value="">Select</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.id}>{school.name}</option>
                                ))}
                            </SelectInput>
                        </div>
                        <div className="md:text-right">
                             <button onClick={handleFilter} className="w-full md:w-auto inline-flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-primary dark:text-gray-200 bg-card dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Card - Conditional */}
                {showSettings && (
                     <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b dark:border-gray-700">Two-Factor Authentication Settings</h3>
                        <form className="space-y-6" onSubmit={handleSave}>
                            <SettingsField label="Two Factor Authentication" required>
                                <SelectInput value={twoFactorEnabled} onChange={e => setTwoFactorEnabled(e.target.value)}>
                                    <option value="enable">Enable</option>
                                    <option value="disable">Disable</option>
                                </SelectInput>
                            </SettingsField>
                             <SettingsField label="2fa Show Remember Browser" required>
                                <SelectInput value={showRemember} onChange={e => setShowRemember(e.target.value)}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </SelectInput>
                            </SettingsField>
                             <SettingsField label="2fa Cookie Expiry" required>
                                <SelectInput value={cookieExpiry} onChange={e => setCookieExpiry(e.target.value)}>
                                    <option value="15">15 Days</option>
                                    <option value="30">30 Days</option>
                                    <option value="60">60 Days</option>
                                    <option value="90">90 Days</option>
                                </SelectInput>
                            </SettingsField>
                            <SettingsField label="Email Instruction">
                                <TextareaInput value={emailInstruction} onChange={e => setEmailInstruction(e.target.value)} />
                            </SettingsField>
                             <SettingsField label="App Instruction">
                                <TextareaInput value={appInstruction} onChange={e => setAppInstruction(e.target.value)} />
                            </SettingsField>

                            <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default TwoFASettingsPage;
