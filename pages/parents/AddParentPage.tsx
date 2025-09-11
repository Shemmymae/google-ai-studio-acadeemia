import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const ICONS = {
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    guardian: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    login: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>,
    school: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" /></svg>,
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

const AddParentPage = () => {
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
        <DashboardLayout title="Add Parent">
             <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                <form className="space-y-10">
                     <FormSection title="School Details" icon={ICONS.school}>
                        <FormField label="School" required>
                            <select className="form-input" disabled={loadingSchools}>
                                <option value="">{loadingSchools ? 'Loading...' : 'Select a school'}</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                    </FormSection>
                    <FormSection title="Guardian Details" icon={ICONS.guardian}>
                        <FormField label="Father Name"><input type="text" className="form-input"/></FormField>
                        <FormField label="Mother Name"><input type="text" className="form-input"/></FormField>
                        <FormField label="Occupation"><input type="text" className="form-input"/></FormField>
                        <FormField label="Mobile No" required><input type="tel" className="form-input"/></FormField>
                        <FormField label="Email" required><input type="email" className="form-input"/></FormField>
                        <FormField label="Address" className="lg:col-span-2"><textarea rows={2} className="form-input"></textarea></FormField>
                        <FormField label="Relation" required><input type="text" className="form-input"/></FormField>
                    </FormSection>

                    <FormSection title="Login Details" icon={ICONS.login}>
                       <FormField label="Username" required><input type="text" className="form-input" /></FormField>
                       <FormField label="Password" required><input type="password" className="form-input" /></FormField>
                       <FormField label="Retype Password" required><input type="password" className="form-input" /></FormField>
                    </FormSection>
                    
                    <div className="pt-6 border-t dark:border-gray-700 flex justify-center">
                        <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                            {ICONS.save} Save Parent
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default AddParentPage;