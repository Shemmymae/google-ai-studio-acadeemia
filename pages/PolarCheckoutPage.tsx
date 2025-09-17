import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const PolarCheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, password, totalCost, currencySymbol, planName, studentCount } = location.state || {};
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!email || !password || totalCost === undefined) {
            // Redirect if state is missing
            navigate('/pricing');
        }
    }, [email, password, totalCost, navigate]);

    const handlePayment = () => {
        setProcessing(true);
        // Simulate payment processing delay
        setTimeout(() => {
            navigate('/payment-success', {
                state: { email, password },
                replace: true
            });
        }, 3000);
    };
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center">
                    <img src="https://polar.sh/static/assets/brand/logo-dark.svg" alt="Polar.sh" className="h-10 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Confirm Your Payment</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">You are paying for the Acadeemia subscription via Polar.sh.</p>
                </div>

                <div className="mt-8 border-t border-b dark:border-gray-700 py-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{planName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Students:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{studentCount}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold">
                        <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                        <span className="text-primary">{currencySymbol}{totalCost?.toFixed(2)}</span>
                    </div>
                </div>

                {processing ? (
                    <div className="mt-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Processing your payment securely with Polar.sh...</p>
                        <p className="text-xs text-gray-500">Please do not close this window.</p>
                    </div>
                ) : (
                    <div className="mt-8">
                        <button
                            onClick={handlePayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                        >
                            Pay Now with Polar.sh
                        </button>
                         <p className="text-xs text-center text-gray-500 mt-4">
                            You will be redirected to complete the payment. This is a simulated process.
                        </p>
                    </div>
                )}
                 <div className="mt-6 text-center">
                    <Link to="/pricing" className="text-sm text-gray-500 hover:underline">Cancel Payment</Link>
                </div>
            </div>
        </div>
    );
};

export default PolarCheckoutPage;
