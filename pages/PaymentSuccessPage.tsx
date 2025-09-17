import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { updateSubscriptionStatusByUserId } from '../db';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, password } = location.state || {};
    const [statusMessage, setStatusMessage] = useState('Processing your subscription...');
    const [error, setError] = useState('');

    useEffect(() => {
        const finalizeSubscription = async () => {
            if (!email || !password) {
                setError('Authentication details are missing. Redirecting...');
                setTimeout(() => navigate('/pricing'), 3000);
                return;
            }

            try {
                // 1. Sign in the user
                setStatusMessage('Authenticating your new account...');
                const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw new Error(`Authentication failed: ${signInError.message}`);
                if (!user) throw new Error('Authentication failed, user not found.');

                // 2. Update subscription status to Active
                setStatusMessage('Activating your subscription...');
                await updateSubscriptionStatusByUserId(user.id, 'Active');

                // 3. Redirect to dashboard
                setStatusMessage('Setup complete! Redirecting to your dashboard...');
                setTimeout(() => {
                    navigate('/dashboard', { replace: true });
                }, 2000);

            } catch (err: any) {
                console.error("Finalization error:", err);
                setError(`An error occurred: ${err.message}. Please contact support or try logging in manually.`);
                 setTimeout(() => navigate('/login'), 5000);
            }
        };

        finalizeSubscription();
    }, [email, password, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Payment Successful!</h2>
                 <p className="text-gray-600 dark:text-gray-400 mt-4">{statusMessage}</p>
                 {error && <p className="mt-4 text-red-500 bg-red-50 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
