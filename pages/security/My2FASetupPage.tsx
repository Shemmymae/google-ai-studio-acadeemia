
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../App';

// --- ICONS ---
const icons = {
  copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};


const My2FASetupPage = () => {
    const { user } = useAuth();
    const [showSavedBrowsers, setShowSavedBrowsers] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const authKey = "R64XVWUFWKIMVQR3";

    const handleCopy = () => {
        navigator.clipboard.writeText(authKey).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <DashboardLayout title="Two Factor Authentication">
            <div className="space-y-8">
                {/* Alert Box */}
                <div className="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-md flex items-start" role="alert">
                    {icons.info}
                    <div>
                        <p className="font-bold">Information</p>
                        <p className="text-sm">This is a Two Factor Authentication Addon Feature. <a href="#" className="font-semibold underline">Items URL: Here</a></p>
                    </div>
                </div>

                {/* Main 2FA Setup Card */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">My 2FA Setup</h2>
                        <button onClick={() => setShowSavedBrowsers(true)} className="flex items-center text-sm font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors">
                            {icons.save} Saved Login
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* App Authentication */}
                        <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Two Factor Authentication (APP)</h3>
                            <div className="flex justify-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Acadeemia:admin@example.com?secret=R64XVWUFWKIMVQR3&issuer=Acadeemia" alt="QR Code for 2FA" className="w-48 h-48 border dark:border-gray-600 p-2 rounded-md" />
                            </div>
                            <div className="relative">
                                <input type="text" readOnly value={authKey} className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-md border border-gray-300 dark:border-gray-600 font-mono text-sm" />
                                <button onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    {icons.copy}
                                </button>
                                {copySuccess && <div className="absolute right-10 top-1/2 -translate-y-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md">{copySuccess}</div>}
                            </div>
                            <button className="w-full px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Enable Two Factor Authentication
                            </button>
                            <div>
                                <h4 className="font-semibold text-sm mb-2 text-text-primary dark:text-gray-200">Instructions:</h4>
                                <ol className="list-decimal list-inside text-sm text-text-secondary dark:text-gray-400 space-y-1">
                                    <li>Download and install Authenticator App on your mobile. <a href="#" className="text-primary hover:underline">Download URL: Here</a></li>
                                    <li>Scan the QR Code.</li>
                                    <li>Enter the Verification Code.</li>
                                </ol>
                            </div>
                        </div>

                        {/* Email Authentication */}
                        <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Two Factor Authentication (Email)</h3>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                                <input id="email" type="email" value={user?.email || 'superadmin@ramom.com'} readOnly className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-md border border-gray-300 dark:border-gray-600 cursor-not-allowed" />
                            </div>
                            <button className="w-full px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Enable Two Factor Authentication
                            </button>
                        </div>
                    </div>
                </div>

                {/* Saved Browser List */}
                {showSavedBrowsers && (
                    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                         <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Login Saved Browser List</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        {['SI', 'IP Address', 'Browser', 'Platform', 'Login Date Time', 'Action'].map(head => (
                                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={6} className="text-center p-8 text-red-500 font-semibold dark:text-red-400">No Information Available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={() => setShowSavedBrowsers(false)} className="px-6 py-2 border rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default My2FASetupPage;
