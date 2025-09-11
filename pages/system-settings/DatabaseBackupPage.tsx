
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// --- Type Definition ---
interface Backup {
  id: number;
  name: string;
  size: string;
  date: string;
}

// --- SVG Icons ---
const icons = {
  databaseList: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10m16-10v10M4 13h16M4 7h16M4 10h16" /></svg>,
  restore: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653 8.956 8.956 0 01-6.653 2.93m0 0V20m0-8a8.956 8.956 0 016.653-2.93A8.956 8.956 0 0120 12m0 0h-5m-5 0a8.956 8.956 0 01-2.93-6.653A8.956 8.956 0 0112 4m0 0v5m-5 0H4" /></svg>,
  create: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
  copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
  download: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  uploadCloud: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
  upload: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
};

// --- Reusable Components ---
const TabButton = ({ label, icon, isActive, onClick }: { label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${
            isActive
            ? 'border-b-2 border-primary text-primary'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
        }`}
    >
        {icon} {label}
    </button>
);

// --- Main Page Component ---
const DatabaseBackupPage = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'restore'>('list');
    const [backups, setBackups] = useState<Backup[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleCreateBackup = () => {
        const newBackup: Backup = {
            id: backups.length + 1,
            name: `backup-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substring(2, 8)}.sql`,
            size: `${(Math.random() * (50 - 5) + 5).toFixed(2)} MB`,
            date: new Date().toLocaleString(),
        };
        setBackups(prev => [newBackup, ...prev]);
    };

    const handleDeleteBackup = (id: number) => {
        if(window.confirm('Are you sure you want to delete this backup? This action cannot be undone.')){
            setBackups(prev => prev.filter(b => b.id !== id));
        }
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if(file.name.endsWith('.sql')){
                setUploadedFile(file);
            } else {
                alert('Please upload a valid .sql file.');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
             if(file.name.endsWith('.sql')){
                setUploadedFile(file);
            } else {
                alert('Please upload a valid .sql file.');
            }
        }
    };

    const handleUpload = () => {
        if(uploadedFile) {
            alert(`Restoring from ${uploadedFile.name}... (This is a demo)`);
            setUploadedFile(null);
        } else {
            alert('Please select a file to upload first.');
        }
    };
    
    return (
        <DashboardLayout title="Database Backup">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton 
                            label="Database List" 
                            icon={icons.databaseList} 
                            isActive={activeTab === 'list'} 
                            onClick={() => setActiveTab('list')}
                        />
                        <TabButton 
                            label="Restore Database" 
                            icon={icons.restore} 
                            isActive={activeTab === 'restore'} 
                            onClick={() => setActiveTab('restore')}
                        />
                    </nav>
                </div>

                {activeTab === 'list' ? (
                     <div>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                             <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Copy">{icons.copy}</button>
                                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Print">{icons.print}</button>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                                <div className="relative w-full sm:w-auto">
                                    <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <button onClick={handleCreateBackup} className="w-full sm:w-auto inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                                    {icons.create} Create Backup
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        {['#', 'Backup', 'Backup Size', 'Date', 'Action'].map(head => (
                                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {backups.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center p-8 text-text-secondary dark:text-gray-400">No data available in table</td></tr>
                                    ) : (
                                        backups.map((backup, index) => (
                                            <tr key={backup.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                                <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium break-all">{backup.name}</td>
                                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{backup.size}</td>
                                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{backup.date}</td>
                                                <td className="p-3">
                                                    <div className="flex space-x-3">
                                                        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" title="Download">{icons.download}</button>
                                                        <button className="text-green-500 hover:text-green-700 dark:hover:text-green-300 transition-colors" title="Restore">{icons.restore}</button>
                                                        <button onClick={() => handleDeleteBackup(backup.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors" title="Delete">{icons.delete}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                         <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                                <span>Showing 1 to {backups.length} of {backups.length} entries</span>
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
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto py-8 text-center">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-2">File Upload <span className="text-red-500">*</span></h3>
                        <div 
                            onDrop={handleFileDrop} 
                            onDragOver={(e) => e.preventDefault()} 
                            onDragEnter={(e) => e.preventDefault()}
                            className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md"
                        >
                            <div className="space-y-1 text-center">
                                {icons.uploadCloud}
                                {uploadedFile ? (
                                    <p className="text-green-500 font-semibold">{uploadedFile.name}</p>
                                ) : (
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-card dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                            <span>Drag and drop a file here or click</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".sql" />
                                        </label>
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 dark:text-gray-500">Only .sql files are allowed</p>
                            </div>
                        </div>
                        <button onClick={handleUpload} className="mt-8 inline-flex items-center justify-center py-2 px-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-primary dark:text-gray-200 bg-card dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {icons.upload} Upload SQL
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DatabaseBackupPage;
