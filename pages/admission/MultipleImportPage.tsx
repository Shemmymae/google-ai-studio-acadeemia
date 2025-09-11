import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

const ICONS = {
    download: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
    import: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
};

const FormField = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="space-y-1">
        <label className="text-sm text-text-secondary dark:text-gray-300">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        {children}
    </div>
);


const MultipleImportPage = () => {
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


    const instructions = [
        "Download the first sample file.",
        "Open the downloaded .csv file and carefully fill the details of the student.",
        "The date you are trying to enter the 'Birthday' and 'AdmissionDate' column make sure the date format is y-m-d (2025-09-07).",
        "Do not import the duplicate 'Roll Number' And 'Register No'.",
        "For student 'Gender' use Male, Female value.",
        "If enable Automatically Generate login details, leave the 'username' and 'password' columns blank.",
        "The Category name comes from another table, so for the 'Category' enter Category ID (can be found on the Category page).",
        "If a parent is existing / If you want to use the same parent information for multiple students only enter the 'GuardianUsername' and leave other columns blank.",
    ];

    return (
        <DashboardLayout title="Multiple Import">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 pb-4 border-b dark:border-gray-700">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">Instructions :</h3>
                        <ol className="list-decimal list-inside mt-2 text-sm text-text-secondary dark:text-gray-400 space-y-1">
                           {instructions.map((inst, i) => <li key={i}>{inst}</li>)}
                        </ol>
                    </div>
                    <a href="#" className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                        {ICONS.download} Download Sample Import File
                    </a>
                </div>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FormField label="School" required>
                            <select className="form-input" disabled={loadingSchools}>
                                <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                                {schools.map(school => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                        <FormField label="Class" required>
                             <select className="form-input" disabled><option>First Select The School</option></select>
                        </FormField>
                        <FormField label="Section" required>
                            <select className="form-input" disabled><option>Select Class First</option></select>
                        </FormField>
                    </div>

                    <FormField label="Select CSV File" required>
                         <div className="mt-1 flex justify-center items-center h-40 px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-primary dark:hover:border-primary-hover transition-colors">
                            <div className="space-y-1 text-center">
                                {ICONS.upload}
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-card dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                        <span>Drag and drop a file here or click</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </FormField>

                     <div className="pt-6 border-t dark:border-gray-700 flex justify-center">
                        <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                            {ICONS.import} Import
                        </button>
                    </div>
                </form>

            </div>
             <style>{`
                .form-input {
                    padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid;
                    background-color: transparent; width: 100%;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
                html.dark .form-input { border-color: #4B5563; background-color: #1F2937; color: #F9FAFB; }
                html:not(.dark) .form-input { border-color: #D1D5DB; color: #111827; }
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

export default MultipleImportPage;