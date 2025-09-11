import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const ICONS = {
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    academic: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    student: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14l-4 6h8l-4-6z" /></svg>,
    login: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>,
    guardian: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    transport: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 18h3v-7a2 2 0 00-2-2h-1" /></svg>,
    hostel: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    previousSchool: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    photo: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
};

const FormSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div>
        <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b border-primary">
            {icon} {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {children}
        </div>
    </div>
);

const FormField = ({ label, children, required = false, className = '' }: { label: string, children: React.ReactNode, required?: boolean, className?: string }) => (
    <div className={`space-y-1 ${className}`}>
        <label className="text-sm text-text-secondary dark:text-gray-300">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        {children}
    </div>
);

const PhotoUpload = () => (
    <div className="flex flex-col items-center justify-center h-40 w-40 bg-gray-100 dark:bg-gray-700/50 rounded-md border border-dashed border-gray-300 dark:border-gray-600 text-text-secondary dark:text-gray-400">
        {ICONS.photo}
        <span className="text-sm mt-1">Photo</span>
    </div>
);

const CreateAdmissionPage = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    const [guardianExists, setGuardianExists] = useState(false);
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
        <DashboardLayout title="Create Admission">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-3">
                        <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                            School <span className="text-primary">*</span>
                        </label>
                        <select id="school" className="form-input w-full" disabled={loadingSchools}>
                            <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:text-right">
                        <button onClick={() => setIsFiltered(true)} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                            {ICONS.filter} Filter
                        </button>
                    </div>
                </div>
            </div>

            {isFiltered && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                    <form className="space-y-10">
                        <FormSection title="Academic Details" icon={ICONS.academic}>
                            <FormField label="Academic Year" required><select className="form-input"><option>2025-2026</option></select></FormField>
                            <FormField label="Register No" required><input type="text" value="ISC-0001" readOnly className="form-input bg-gray-100 dark:bg-gray-700/50" /></FormField>
                            <FormField label="Roll"><input type="text" className="form-input" /></FormField>
                            <FormField label="Admission Date" required><input type="date" defaultValue="2025-09-07" className="form-input" /></FormField>
                            <FormField label="Class" required><select className="form-input"><option>Select</option></select></FormField>
                            <FormField label="Section" required><select className="form-input" disabled><option>Select Class First</option></select></FormField>
                            <FormField label="Category" required><select className="form-input"><option>Select</option></select></FormField>
                        </FormSection>

                        <FormSection title="Student Details" icon={ICONS.student}>
                             <FormField label="First Name" required><input type="text" className="form-input" /></FormField>
                             <FormField label="Last Name" required><input type="text" className="form-input" /></FormField>
                             <FormField label="Date of Birth"><input type="date" className="form-input" /></FormField>
                             <FormField label="Gender" required><select className="form-input"><option>Select</option><option>Male</option></select></FormField>
                             <FormField label="Blood group"><select className="form-input"><option>Select</option></select></FormField>
                             <FormField label="Religion"><input type="text" className="form-input" /></FormField>
                             <FormField label="Caste"><input type="text" className="form-input" /></FormField>
                             <FormField label="Mother Tongue"><input type="text" className="form-input" /></FormField>
                             <FormField label="Mobile No"><input type="tel" className="form-input" /></FormField>
                             <FormField label="Email"><input type="email" className="form-input" /></FormField>
                             <FormField label="City"><input type="text" className="form-input" /></FormField>
                             <FormField label="State"><input type="text" className="form-input" /></FormField>
                             <FormField label="Present Address" className="lg:col-span-2"><textarea rows={2} className="form-input"></textarea></FormField>
                             <FormField label="Permanent Address" className="lg:col-span-2"><textarea rows={2} className="form-input"></textarea></FormField>
                             <FormField label="Profile Picture" className="lg:col-span-4"><PhotoUpload /></FormField>
                        </FormSection>
                        
                        <FormSection title="Login Details" icon={ICONS.login}>
                           <FormField label="Username" required><input type="text" className="form-input" /></FormField>
                           <FormField label="Password" required><input type="password" className="form-input" /></FormField>
                           <FormField label="Retype Password" required><input type="password" className="form-input" /></FormField>
                        </FormSection>
                        
                        <FormSection title="Guardian Details" icon={ICONS.guardian}>
                            <FormField label="Guardian Already Exist?" className="lg:col-span-4">
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox"
                                        checked={guardianExists}
                                        onChange={e => setGuardianExists(e.target.checked)}
                                    /> 
                                    <span className="ml-2 text-sm"></span>
                                </label>
                            </FormField>
                            {guardianExists ? (
                                <FormField label="Guardian" required className="lg:col-span-4">
                                    <select className="form-input">
                                        <option>Select</option>
                                        <option>Binoga Naik (Guardian of Danelle Solomon)</option>
                                        <option>Summer Disan (Guardian of Angelina Jolie)</option>
                                    </select>
                                </FormField>
                            ) : (
                                <>
                                    <FormField label="Father Name"><input type="text" className="form-input"/></FormField>
                                    <FormField label="Mother Name"><input type="text" className="form-input"/></FormField>
                                    <FormField label="Occupation"><input type="text" className="form-input"/></FormField>
                                    <FormField label="Income"><input type="text" className="form-input"/></FormField>
                                    <FormField label="Education"><input type="text" className="form-input"/></FormField>
                                    <FormField label="City"><input type="text" className="form-input"/></FormField>
                                    <FormField label="State"><input type="text" className="form-input"/></FormField>
                                    <FormField label="Mobile No" required><input type="tel" className="form-input"/></FormField>
                                    <FormField label="Email" required><input type="email" className="form-input"/></FormField>
                                    <FormField label="Address" className="lg:col-span-2"><textarea rows={2} className="form-input"></textarea></FormField>
                                    <FormField label="Relation" required><input type="text" className="form-input"/></FormField>
                                    <FormField label="Guardian's Picture" className="lg:col-span-4"><PhotoUpload/></FormField>
                                    <FormField label="Username" required><input type="text" className="form-input" /></FormField>
                                    <FormField label="Password" required><input type="password" className="form-input" /></FormField>
                                    <FormField label="Retype Password" required><input type="password" className="form-input" /></FormField>
                                </>
                            )}
                        </FormSection>

                         <FormSection title="Transport Details" icon={ICONS.transport}>
                            <FormField label="Transport Route"><select className="form-input"><option>Select</option></select></FormField>
                            <FormField label="Vehicle No"><select className="form-input" disabled><option>First Select The Route</option></select></FormField>
                            <FormField label="Pickup Point"><select className="form-input" disabled><option>First Select The Route</option></select></FormField>
                            <FormField label="Fees Allocation"><select className="form-input"><option>Select</option></select></FormField>
                             <FormField label="Select Month"><select className="form-input"><option>Select</option></select></FormField>
                        </FormSection>

                        <FormSection title="Hostel Details" icon={ICONS.hostel}>
                            <FormField label="Hostel Name"><select className="form-input"><option>Select</option></select></FormField>
                            <FormField label="Room Name"><select className="form-input" disabled><option>First Select The Hostel</option></select></FormField>
                        </FormSection>
                        
                        <FormSection title="Previous School Details" icon={ICONS.previousSchool}>
                           <FormField label="School Name"><input type="text" className="form-input"/></FormField>
                           <FormField label="Qualification"><input type="text" className="form-input"/></FormField>
                           <FormField label="Remarks" className="lg:col-span-2"><textarea rows={2} className="form-input"></textarea></FormField>
                        </FormSection>

                        <div className="pt-6 border-t dark:border-gray-700 flex justify-center">
                            <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                                {ICONS.save} Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <style>{`
                .form-input, .form-select, .form-textarea, .form-checkbox {
                    padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    background-color: transparent; width: 100%;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                .form-radio, .form-checkbox { color: #5D5FEF; width: auto; }
                .form-file { font-size: 0.875rem; color: #6B7280; }
                html.dark .form-file { color: #9CA3AF; }
                .form-file::file-selector-button { margin-right: 1rem; padding: 0.5rem 1rem; border-radius: 9999px; border-width: 0px; font-size: 0.875rem; font-weight: 600; background-color: rgba(93, 95, 239, 0.1); color: #5D5FEF; cursor: pointer; }
                .form-file::file-selector-button:hover { background-color: rgba(93, 95, 239, 0.2); }
                html.dark .form-input, html.dark .form-select, html.dark .form-textarea, html.dark .form-checkbox { border-color: #4B5563; background-color: #1F2937; color: #F9FAFB; }
                html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea, html:not(.dark) .form-checkbox { border-color: #D1D5DB; color: #111827; }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: 2px solid transparent; outline-offset: 2px;
                    --tw-ring-color: #5D5FEF;
                    box-shadow: 0 0 0 2px var(--tw-ring-color);
                    border-color: #5D5FEF;
                }
                input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(var(--dark-mode-filter, 0)); cursor: pointer; }
                html.dark { --dark-mode-filter: 1; }
            `}</style>
        </DashboardLayout>
    );
};

export default CreateAdmissionPage;