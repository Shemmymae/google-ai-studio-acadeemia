
import React, { useState, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    update: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653 8.956 8.956 0 01-6.653 2.93m0 0V20m0-8a8.956 8.956 0 016.653-2.93A8.956 8.956 0 0120 12m0 0h-5m-5 0a8.956 8.956 0 01-2.93-6.653A8.956 8.956 0 0112 4m0 0v5m-5 0H4" /></svg>,
    install: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
};

// --- MOCK DATA ---
const addonData = [
    { id: 1, name: 'Ramom School Subscription(SaaS)', version: '3.1.5', installed: '21.Apr.2023', lastUpgrade: '21.Apr.2023' },
    { id: 2, name: 'Ramom School QR Code Attendance', version: '2.8.0', installed: '15.May.2023', lastUpgrade: '15.May.2023' },
    { id: 3, name: 'Ramom Two Factor Authentication', version: '1.5.0', installed: '15.Oct.2024', lastUpgrade: '15.Oct.2024' },
];

const AddonList = () => (
    <>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.copy}</button>
                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.print}</button>
            </div>
            <div className="relative">
                <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        {['SI', 'Name', 'Version', 'Installed', 'Last Upgrade', 'Action'].map(head => (
                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {addonData.map((addon, index) => (
                        <tr key={addon.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                            <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{addon.name}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{addon.version}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{addon.installed}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{addon.lastUpgrade}</td>
                            <td className="p-3">
                                <button className="inline-flex items-center justify-center py-1.5 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-primary dark:text-gray-200 bg-card dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {icons.update} Update Check
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span>Showing 1 to {addonData.length} of {addonData.length} entries</span>
                <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600">
                    <option>25</option>
                </select>
                <span>rows per page</span>
            </div>
            <div className="flex items-center space-x-1">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
                <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&gt;</button>
            </div>
        </div>
    </>
);

const FileUpload = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileChange(file);
        } else {
            setFileName(null);
            onFileChange(null);
        }
    };

    const handleClick = () => fileInputRef.current?.click();

    return (
        <div
            onClick={handleClick}
            className="mt-1 flex justify-center items-center h-40 px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-primary dark:hover:border-primary-hover transition-colors"
        >
            <div className="space-y-1 text-center">
                {icons.upload}
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span>{fileName || 'Drag and drop a file here or click'}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">ZIP file</p>
                <input ref={fileInputRef} type="file" className="sr-only" onChange={handleFileChange} accept=".zip,.rar,.7zip" />
            </div>
        </div>
    );
};


const InstallAddonForm = () => {
    const [zipFile, setZipFile] = useState<File | null>(null);

    return (
        <form className="space-y-6 max-w-2xl mx-auto">
            <div>
                <label htmlFor="purchaseCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Addon Purchase Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="purchaseCode"
                    name="purchaseCode"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Zip File <span className="text-red-500">*</span>
                </label>
                <FileUpload onFileChange={setZipFile} />
            </div>

            <div className="pt-4 flex justify-start">
                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover">
                    {icons.install} Install Now
                </button>
            </div>
        </form>
    );
};

const AddonManagerPage = () => {
    const [view, setView] = useState<'list' | 'install'>('list');

    const TabButton = ({
        label,
        icon,
        currentView,
        targetView,
    }: {
        label: string;
        icon: React.ReactNode;
        currentView: string;
        targetView: 'list' | 'install';
    }) => {
        const isActive = currentView === targetView;
        return (
            <button
                onClick={() => setView(targetView)}
                className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${isActive
                    ? 'border-b-2 border-primary text-primary bg-primary/5 dark:bg-primary/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
            >
                {icon}
                {label}
            </button>
        );
    };

    return (
        <DashboardLayout title="Addon Manager">
            <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton label="Addon List" icon={icons.list} currentView={view} targetView="list" />
                        <TabButton label="Install Addon" icon={icons.add} currentView={view} targetView="install" />
                    </nav>
                </div>
                {view === 'list' ? <AddonList /> : <InstallAddonForm />}
            </div>
        </DashboardLayout>
    );
};

export default AddonManagerPage;
