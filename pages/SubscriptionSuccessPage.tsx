import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';

const SubscriptionSuccessPage = () => {
    const { state } = useLocation();
    const { theme } = useTheme();
    const { planName, studentCount, totalCost } = state || { planName: 'Free Trial Plan', studentCount: 'N/A', totalCost: 0 };

    const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
    const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
    const logoSrc = theme === 'light' ? logoLight : logoDark;
    const faviconSrc = theme === 'light' 
        ? 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/favicon-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2Zhdmljb24tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NjkzLCJleHAiOjMzMjkyNzU2NjkzfQ.OcaCZ1p2qrgMlF8DqJ8C1u-At1J-EG_l4UyPEb_xfjQ'
        : 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/favivon-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2Zhdml2b24tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NDUsImV4cCI6MzMyOTI3NTY3NDV9.h-Xy766D1JhNL6M6kljA2mwoDbK6tNYsyBCKfYx6slQ';

    const handlePrint = () => window.print();
    // In a real app, this would trigger a PDF generation service
    const handleDownload = () => alert('Download functionality is not implemented in this demo.');

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    };
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 7); // 7-day free trial

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                     <img src={faviconSrc} alt="Acadeemia Favicon" className="mx-auto h-16 w-16 mb-4 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-8">
                    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-semibold">Reference No</p>
                        <p className="font-bold">468662</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-semibold">Subscription Status</p>
                        <p className="font-bold">Approved</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-semibold">Payment Status</p>
                        <p className="font-bold">Paid</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden" id="invoice-content">
                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-start">
                            <div>
                                <img src={logoSrc} alt="Acadeemia Logo" className="h-12 w-auto mb-4" />
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">INVOICE #33</h1>
                            </div>
                            <div className="text-right">
                                <span className="inline-block border-2 border-green-500 text-green-500 text-2xl font-bold px-4 py-2 rounded-md">PAID</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-12 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                                <p className="font-bold text-gray-700 dark:text-gray-200 mb-2">Invoiced To</p>
                                <p>test</p>
                                <p>test</p>
                                <p>72-80402</p>
                                <p>0700000000</p>
                                <p>test@test.com</p>
                            </div>
                             <div className="md:text-right">
                                <p className="font-bold text-gray-700 dark:text-gray-200 mb-2">Pay To</p>
                                <p>Cambrian School and College</p>
                                <p>2233 Hartway Street Viborg,</p>
                                <p>New York</p>
                                <p>+1605-766-0061</p>
                                <p>ramom@example.com</p>
                            </div>
                        </div>

                         <div className="grid md:grid-cols-2 gap-8 mt-8 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                                <p className="font-bold text-gray-700 dark:text-gray-200 mb-2">Invoice/Payment Date</p>
                                <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="md:text-right">
                                <p className="font-bold text-gray-700 dark:text-gray-200 mb-2">Payment Method</p>
                                <p>Free Trial</p>
                            </div>
                        </div>
                        
                        <div className="mt-12 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Description</th>
                                        <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-gray-700">
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{planName} - Subscription Fee ({studentCount} students) ({formatDate(today)} - {formatDate(expiry)})</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300 text-right">${totalCost.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-8 text-sm text-gray-600 dark:text-gray-400">
                           <div className="w-full max-w-xs space-y-3">
                                <div className="flex justify-between"><span>Sub Total :</span><span>${totalCost.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Discount :</span><span>$0.00</span></div>
                                <div className="flex justify-between border-t dark:border-gray-700 pt-2"><span>Paid :</span><span>${totalCost.toFixed(2)}</span></div>
                                <div className="flex justify-between font-bold text-base text-gray-800 dark:text-gray-100 border-t-2 dark:border-gray-600 pt-2"><span>Total :</span><span>${totalCost.toFixed(2)}</span></div>
                           </div>
                        </div>

                        <div className="mt-12 flex items-center space-x-4">
                            <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Print
                            </button>
                             <button onClick={handleDownload} className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link to="/" className="text-primary hover:underline font-semibold">&laquo; Back To Home</Link>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccessPage;