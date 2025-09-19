import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../App';
import { supabase } from '../../supabase';
// FIX: Import AuthMfaFactor type directly from auth package to resolve module export error.
import type { AuthMfaFactor } from '@supabase/gotrue-js';

// --- ICONS ---
const icons = {
  copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

type NewFactor = {
    id: string;
    qrCode: string; // This will be a data URI for the SVG
    secret: string;
}

const My2FASetupPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [factors, setFactors] = useState<AuthMfaFactor[]>([]);
    const [newFactor, setNewFactor] = useState<NewFactor | null>(null);
    const [verifyCode, setVerifyCode] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const listFactors = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.mfa.listFactors();
        if (error) {
            setError(error.message);
        } else if (data) {
            setFactors(data.totp);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        listFactors();
    }, [listFactors]);
    
    const handleEnroll = async () => {
        setLoading(true);
        setError('');
        const { data, error } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
        });
        if (error) {
            setError(error.message);
        } else if (data) {
            setNewFactor({
                id: data.id,
                qrCode: data.totp.qr_code,
                secret: data.totp.secret,
            });
        }
        setLoading(false);
    };
    
    const handleVerifyAndEnable = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFactor || !verifyCode) return;
        setLoading(true);
        setError('');

        const { error: challengeError } = await supabase.auth.mfa.challenge({ factorId: newFactor.id });
        if (challengeError) {
            setError(challengeError.message);
            setLoading(false);
            return;
        }

        const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId: newFactor.id,
            code: verifyCode,
        });

        if (verifyError) {
            setError(verifyError.message);
        } else {
            setMessage('2FA enabled successfully!');
            setNewFactor(null);
            setVerifyCode('');
            await listFactors(); // Refresh the list of factors
            setTimeout(() => setMessage(''), 5000);
        }
        setLoading(false);
    };

    const handleUnenroll = async (factorId: string) => {
        if (window.confirm('Are you sure you want to disable 2FA? This will remove the security layer from your account.')) {
            setLoading(true);
            setError('');
            const { error } = await supabase.auth.mfa.unenroll({ factorId });
            if (error) {
                setError(error.message);
            } else {
                setMessage('2FA has been disabled.');
                await listFactors();
                setTimeout(() => setMessage(''), 5000);
            }
            setLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (!newFactor) return;
        navigator.clipboard.writeText(newFactor.secret).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const is2FAEnabled = factors.length > 0;

    return (
        <DashboardLayout title="Two Factor Authentication">
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Alert Box */}
                <div className="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-md flex items-start" role="alert">
                    {icons.info}
                    <div>
                        <p className="font-bold">Information</p>
                        <p className="text-sm">Two-factor authentication (2FA) adds an extra layer of security to your account. When enabled, you'll need both your password and a code from your authenticator app to log in.</p>
                    </div>
                </div>
                
                {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
                {message && <p className="text-green-500 bg-green-100 dark:bg-green-900/50 p-3 rounded-md">{message}</p>}

                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-6 pb-4 border-b dark:border-gray-700">My 2FA Setup</h2>
                    {loading ? (
                        <p>Checking 2FA status...</p>
                    ) : is2FAEnabled ? (
                        <div>
                            <p className="text-lg text-green-600 dark:text-green-400 font-semibold mb-4">Two-Factor Authentication is currently enabled.</p>
                            {factors.map(factor => (
                                <div key={factor.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-text-primary dark:text-gray-200">Authenticator App</p>
                                        <p className="text-sm text-text-secondary dark:text-gray-400">Status: {factor.status}</p>
                                    </div>
                                    <button onClick={() => handleUnenroll(factor.id)} className="px-4 py-2 border border-red-500 text-red-500 rounded-md text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors">
                                        Disable
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : newFactor ? (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Enable Two Factor Authentication (APP)</h3>
                             <ol className="list-decimal list-inside text-sm text-text-secondary dark:text-gray-400 space-y-1">
                                <li>Download an authenticator app like Google Authenticator or Authy.</li>
                                <li>Scan the QR Code below with your authenticator app.</li>
                                <li>Enter the 6-digit verification code generated by the app.</li>
                            </ol>
                            <div className="flex justify-center">
                                <img src={newFactor.qrCode} alt="2FA QR Code" className="w-48 h-48 border dark:border-gray-600 p-2 rounded-md bg-white" />
                            </div>
                            <div className="relative">
                                <p className="text-sm font-medium mb-1">Or enter this key manually:</p>
                                <input type="text" readOnly value={newFactor.secret} className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-md border border-gray-300 dark:border-gray-600 font-mono text-sm" />
                                <button onClick={handleCopy} className="absolute right-2 top-1/2 mt-2 p-2 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    {icons.copy}
                                </button>
                                {copySuccess && <div className="absolute right-10 top-1/2 mt-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md">{copySuccess}</div>}
                            </div>
                            <form onSubmit={handleVerifyAndEnable} className="flex items-end gap-4">
                                <div className="flex-grow">
                                    <label htmlFor="verifyCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verification Code <span className="text-red-500">*</span></label>
                                    <input id="verifyCode" type="text" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} required maxLength={6} placeholder="123456" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary-hover">
                                    Verify & Enable
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p className="mb-4 text-text-secondary dark:text-gray-400">2FA is not enabled for your account.</p>
                             <button onClick={handleEnroll} disabled={loading} className="w-full px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Enable Two Factor Authentication
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default My2FASetupPage;