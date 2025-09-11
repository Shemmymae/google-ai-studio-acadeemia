
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// --- ICONS ---
const icons = {
    filter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>,
    parentList: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
    lock: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
};

const ParentLoginDeactivatePage = () => {
    const [isFiltered, setIsFiltered] = useState(false);
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
        <DashboardLayout title="Deactivate Parent Account">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md text-text-primary dark:text-gray-100">
                <h3 className="text-lg font-bold mb-1">Select Ground</h3>
                <div className="border-b-2 border-red-500 w-16 mb-6"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-text-secondary dark:text-gray-300">School <span className="text-red-500">*</span></label>
                        <select className="form-select w-full" disabled={loadingSchools}>
                           <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-start-4 flex justify-end">
                        <button 
                            onClick={() => setIsFiltered(true)} 
                            className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 border border-gray-400 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {icons.filter} Filter
                        </button>
                    </div>
                </div>
            </div>

            {isFiltered && (
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8 text-text-primary dark:text-gray-100">
                    <h3 className="flex items-center text-lg font-bold mb-1">
                        {icons.parentList}
                        Parents List
                    </h3>
                    <div className="border-b-2 border-red-500 w-16 mb-6"></div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700/50">
                                <tr>
                                    <th className="p-3"><input type="checkbox" className="form-checkbox"/></th>
                                    {['Photo', 'Guardian Name', 'Email', 'Mobile No', 'Action'].map(head => (
                                        <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={11} className="text-center p-8 text-text-secondary dark:text-gray-400">
                                        No data available in table
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                         <button className="flex items-center justify-center px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-sm text-sm font-medium">
                            {icons.lock} Authentication Activate
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ParentLoginDeactivatePage;
