
import React, { useState, useEffect } from 'react';
import LandingLayout from '../components/LandingLayout';
import { getPlans, Plan, createSchoolAndSubscription, SchoolSubscriptionData, getPublicCurrencies, Currency } from '../db';
import { Link, useNavigate } from 'react-router-dom';


// --- Subscription Modal Component ---
const SubscriptionModal = ({ plan, studentCount, onClose, selectedCurrency, exchangeRates, symbol }: { 
    plan: Plan; 
    studentCount: number; 
    onClose: () => void;
    selectedCurrency: string;
    exchangeRates: { [key: string]: number } | null;
    symbol: string;
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const startDate = new Date();
    const expiryDate = new Date();

    if (plan.periodType === 'Days') {
        expiryDate.setDate(startDate.getDate() + plan.periodValue);
    } else if (plan.periodType === 'Monthly') {
        expiryDate.setMonth(startDate.getMonth() + plan.periodValue);
    } else if (plan.periodType === 'Termly') {
        expiryDate.setMonth(startDate.getMonth() + (plan.periodValue * 4));
    } else if (plan.periodType === 'Yearly') {
        expiryDate.setFullYear(startDate.getFullYear() + plan.periodValue);
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    };
    
    const rate = exchangeRates?.[selectedCurrency] ?? 1;
    const totalCost = ((plan.pricePerStudent * studentCount) - plan.discount) * rate;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        
        const password = formData.get('admin_password') as string;
        const confirmPassword = formData.get('retype_password') as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        
        const schoolLogoFile = formData.get('school_logo') as File | null;
        
        const subscriptionData: SchoolSubscriptionData = {
            plan: plan,
            studentCount: studentCount,
            adminEmail: formData.get('contact_email') as string,
            adminPassword: password,
            adminName: formData.get('admin_name') as string,
            schoolName: formData.get('school_name') as string,
            schoolAddress: formData.get('school_address') as string,
            contactNumber: formData.get('contact_number') as string,
            schoolLogoFile: schoolLogoFile && schoolLogoFile.size > 0 ? schoolLogoFile : null,
        };

        try {
            await createSchoolAndSubscription(subscriptionData);

            if (totalCost <= 0) {
                navigate('/subscription-success', { state: { planName: plan.name, studentCount, totalCost } });
            } else {
                alert('Registration successful! Redirecting to payment...');
                // In a real app, navigate to a payment page
                onClose();
            }
        } catch (err: any) {
            console.error("Subscription Error:", err);
            setError(err.message || 'An unexpected error occurred during signup.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100">School Subscription</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl">&times;</button>
                </div>
                <div className="p-8">
                    <form onSubmit={handleFormSubmit}>
                        {/* Plan Summary */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Plan Summary</h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                <div className="flex justify-between"><span className="text-text-secondary dark:text-gray-400">Plan Name</span><span className="font-semibold text-text-primary dark:text-gray-200">{plan.name}</span></div>
                                <div className="flex justify-between"><span className="text-text-secondary dark:text-gray-400">Number of Students</span><span className="font-semibold text-text-primary dark:text-gray-200">{studentCount}</span></div>
                                <div className="flex justify-between"><span className="text-text-secondary dark:text-gray-400">Start Date</span><span className="font-semibold text-text-primary dark:text-gray-200">{formatDate(startDate)}</span></div>
                                <div className="flex justify-between"><span className="text-text-secondary dark:text-gray-400">Expiry Date</span><span className="font-semibold text-text-primary dark:text-gray-200">{plan.periodType === 'Lifetime' ? 'Lifetime' : formatDate(expiryDate)}</span></div>
                                <div className="col-span-2 border-t dark:border-gray-700 my-2"></div>
                                <div className="col-span-2 flex justify-between text-base">
                                    <span className="text-text-secondary dark:text-gray-400">Total Cost</span>
                                    <span className="font-bold text-lg text-primary">{totalCost > 0 ? `${symbol}${totalCost.toFixed(2)}` : 'Free'}</span>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/50 p-3 rounded-md mb-6 text-center">{error}</p>}

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="School Name" name="school_name" required />
                            <InputField label="Admin Name" name="admin_name" required />
                            <InputField label="School Address" name="school_address" required />
                            <SelectField label="Gender" name="gender" required>
                                <option>Select a gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </SelectField>
                            <FileField label="School Logo" name="school_logo" />
                            <InputField label="Contact Number" name="contact_number" type="tel" required />
                            <div className="md:col-span-2">
                                <TextareaField label="Message" name="message" rows={4} />
                            </div>
                            <InputField label="Contact Email" name="contact_email" type="email" required />
                            <InputField label="Admin Login Username" name="admin_username" required />
                            <InputField label="Admin Login Password" name="admin_password" type="password" required />
                            <InputField label="Retype Password" name="retype_password" type="password" required />
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                             <div className="flex items-center">
                                <input type="checkbox" id="terms" name="terms" required className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="terms" className="ml-2 text-sm text-text-secondary dark:text-gray-400">I agree to <a href="/#/terms-of-service" target="_blank" className="text-primary hover:underline">Terms & Conditions</a>.</label>
                            </div>
                            <button type="submit" disabled={loading} className="w-full sm:w-auto bg-text-primary hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-70">
                                {loading ? 'Processing...' : (totalCost <= 0 ? 'Register' : 'Register & Payment')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Form Field Components ---
const InputField = ({ label, name, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input type={type} id={name} name={name} required={required} className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
);
const SelectField = ({ label, name, required = false, children }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <select id={name} name={name} required={required} className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {children}
        </select>
    </div>
);
const FileField = ({ label, name }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">{label}</label>
        <input type="file" id={name} name={name} className="w-full text-sm text-text-secondary dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
    </div>
);
const TextareaField = ({ label, name, rows = 3 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">{label}</label>
        <textarea id={name} name={name} rows={rows} className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
);


// Hero Component
const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

// Icons for feature list
const CheckIcon = ({ className = 'text-green-500' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon = ({ className = 'text-red-400' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const UserIcon = ({ className = '' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
    </svg>
);

// Master list of all possible features.
const masterFeaturesList = [
    "Alumni", "Annual Calendar", "Attachments Book", "Attendance", "Behaviour Records", "Bulk Sms And Email", 
    "Calendar To Do List", "Card Management", "CBSE Examination", "Chat", "Certificate", "Custom Domain", 
    "Download Center", "Events", "Examination", "Fees Collection", "Homework", "Hostel", "Human Resource", 
    "Inventory", "Lesson Plan", "Library", "Live Class", "Multi Branch", "Multi Class", "Office Accounting", 
    "Online Admission", "Online Course", "Online Exam", "Qr Code Attendance", "Quick Fees", "Reception", 
    "Student Accounting", "Student CV", "Thermal Print", "Transport", "Two Factor Authenticator", "Website"
];


// Plan Card Component
const PlanCard = ({ plan, onChoosePlan, billingPeriod, selectedCurrency, exchangeRates, symbol }: { 
    plan: Plan; 
    onChoosePlan: (plan: Plan, studentCount: number) => void;
    billingPeriod: 'monthly' | 'termly' | 'yearly';
    selectedCurrency: string;
    exchangeRates: { [key: string]: number } | null;
    symbol: string;
}) => {
    const [studentCount, setStudentCount] = useState('');
    const [error, setError] = useState('');
    const isRecommended = plan.isRecommended;
    
    const cardClasses = isRecommended
        ? 'bg-text-primary dark:bg-blue-900 text-white border-primary shadow-2xl'
        : 'bg-card dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg';

    const textSecondaryClasses = isRecommended ? 'text-gray-300' : 'text-text-secondary dark:text-gray-400';
    const textPrimaryClasses = isRecommended ? 'text-white' : 'text-text-primary dark:text-gray-100';
    const buttonClasses = isRecommended
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-white dark:text-gray-800 text-white';

    const checkIconClass = isRecommended ? 'text-blue-400' : 'text-green-500';
    const crossIconClass = isRecommended ? 'text-gray-500' : 'text-red-400';
    const userIconClass = isRecommended ? 'text-blue-400' : 'text-primary';
    
    const calculateDisplayPrice = () => {
        const rate = exchangeRates?.[selectedCurrency] ?? 1;

        if (plan.periodType === 'Lifetime' || plan.pricePerStudent === 0) {
            return {
                price: (plan.pricePerStudent - plan.discount) * rate,
                periodText: plan.periodType === 'Lifetime' ? 'Lifetime' : 'Free'
            };
        }

        let monthlyPriceUSD = 0;
        let monthsInPeriod = 1;
        switch (plan.periodType) {
            case 'Monthly':
                monthsInPeriod = plan.periodValue;
                break;
            case 'Termly':
                monthsInPeriod = plan.periodValue * 4;
                break;
            case 'Yearly':
                monthsInPeriod = plan.periodValue * 12;
                break;
            case 'Days':
                monthsInPeriod = plan.periodValue / 30;
                break;
        }

        if (monthsInPeriod > 0) {
           monthlyPriceUSD = (plan.pricePerStudent - plan.discount) / monthsInPeriod;
        }
        
        const monthlyPriceConverted = monthlyPriceUSD * rate;

        let displayPrice = 0;
        let periodText = '';
        switch (billingPeriod) {
            case 'monthly':
                displayPrice = monthlyPriceConverted;
                periodText = `per student / month`;
                break;
            case 'termly':
                displayPrice = monthlyPriceConverted * 4; // A term is 4 months
                periodText = `per student / term`;
                break;
            case 'yearly':
                displayPrice = monthlyPriceConverted * 12;
                periodText = `per student / year`;
                break;
        }
        return { price: displayPrice, periodText };
    };

    const { price: displayPrice, periodText } = calculateDisplayPrice();

    const handleChoosePlanClick = () => {
        const count = parseInt(studentCount, 10);
        if (isNaN(count) || count <= 0) {
            setError('Please enter a valid number of students.');
            return;
        }
        setError('');
        onChoosePlan(plan, count);
    };

    return (
        <div className={`relative border rounded-xl p-8 flex flex-col h-full transition-transform duration-300 hover:scale-105 ${cardClasses}`}>
            {isRecommended && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                </div>
            )}
            <h3 className={`text-2xl font-bold mb-2 ${textPrimaryClasses}`}>{plan.name}</h3>
            <div className={`flex items-baseline gap-2 mb-1 ${textPrimaryClasses}`}>
                <span className="text-4xl font-extrabold">{symbol}{displayPrice.toFixed(2)}</span>
            </div>
            <p className={`-mt-1 mb-6 font-medium ${textSecondaryClasses}`}>{periodText}</p>

            <div className="mb-4">
                <label htmlFor={`student-count-${plan.id}`} className={`block text-sm font-semibold mb-2 ${textPrimaryClasses}`}>
                    Number of Students*
                </label>
                <input
                    type="number"
                    id={`student-count-${plan.id}`}
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white border-gray-400 text-text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {error && <p className="text-red-400 dark:text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <ul className="space-y-4 mb-8">
                <li className={`flex items-center ${textSecondaryClasses}`}><UserIcon className={userIconClass} /> Unlimited Parents</li>
                <li className={`flex items-center ${textSecondaryClasses}`}><UserIcon className={userIconClass} /> Unlimited Staff</li>
                <li className={`flex items-center ${textSecondaryClasses}`}><UserIcon className={userIconClass} /> Unlimited Teachers</li>
            </ul>

            <div className={`border-t ${isRecommended ? 'border-gray-600' : 'border-gray-200 dark:border-gray-700'} my-6`}></div>

            <ul className="space-y-3 flex-grow">
                {masterFeaturesList.map(feature => (
                    <li key={feature} className={`flex items-center ${textSecondaryClasses}`}>
                        {plan.features?.includes(feature) ? (
                            <CheckIcon className={checkIconClass} />
                        ) : (
                            <CrossIcon className={crossIconClass} />
                        )}
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button onClick={handleChoosePlanClick} className={`w-full mt-8 inline-block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${buttonClasses}`}>
                Choose Plan
            </button>
        </div>
    );
};

const PricingPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'termly' | 'yearly'>('termly');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [studentCount, setStudentCount] = useState(0);

    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);

    useEffect(() => {
        const fetchPricingData = async () => {
            setLoading(true);
            setLoadingCurrencies(true);
            setError(null);
            try {
                // Fetch plans
                const allPlans = await getPlans();
                const activePlans = allPlans.filter(p => p.status === 'Active' && p.showOnWebsite);
                setPlans(activePlans);

                // Fetch currencies
                const currencyData = await getPublicCurrencies();
                let availableCurrencies = currencyData && currencyData.length > 0
                    ? [...currencyData]
                    : [{ id: 0, school_id: null, name: 'US Dollar', code: 'USD', symbol: '$' }];

                // Ensure KES is always an option for demonstration/regional purposes
                if (!availableCurrencies.some(c => c.code === 'KES')) {
                    availableCurrencies.push({ id: 999, school_id: null, name: 'Kenyan Shilling', code: 'KES', symbol: 'KSh' });
                }
                setCurrencies(availableCurrencies);
                
                // Fetch exchange rates
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (!response.ok) throw new Error("Could not fetch live currency rates.");
                const ratesData = await response.json();
                setExchangeRates(ratesData.rates);

            } catch (err: any) {
                const newError = err.message || "Failed to load pricing data.";
                setError(prev => prev ? `${prev} ${newError}` : newError);
                console.error("Failed to fetch live currency rates, using fallback rates.", err);
                // Provide a more robust fallback if the API fails
                setExchangeRates({ 
                    'USD': 1,
                    'KES': 130.00, // Approximate fallback rate
                    'EUR': 0.92,   // Approximate fallback rate
                    'GBP': 0.79    // Approximate fallback rate
                });
            } finally {
                setLoading(false);
                setLoadingCurrencies(false);
            }
        };
        fetchPricingData();
    }, []);
    
    const handleChoosePlan = (plan: Plan, count: number) => {
        setSelectedPlan(plan);
        setStudentCount(count);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
        setStudentCount(0);
    };
    
    const currentCurrency = currencies.find(c => c.code === selectedCurrency);
    const symbol = currentCurrency?.symbol || '$';

    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-text-secondary dark:text-gray-400 py-20">Loading plans...</div>;
        }
        if (error && plans.length === 0) {
            return <div className="text-center text-red-500 py-20">Error: {error}</div>;
        }
        if (plans.length === 0) {
            return <div className="text-center text-text-secondary dark:text-gray-400 py-20">No active plans available at the moment.</div>;
        }
        
        return (
             <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(plans.length, 4)} gap-8`}>
                {plans.map(plan => (
                    <PlanCard 
                        key={plan.id} 
                        plan={plan} 
                        onChoosePlan={handleChoosePlan} 
                        billingPeriod={billingPeriod}
                        selectedCurrency={selectedCurrency}
                        exchangeRates={exchangeRates}
                        symbol={symbol}
                    />
                ))}
            </div>
        );
    }

    return (
        <LandingLayout>
            {isModalOpen && selectedPlan && 
                <SubscriptionModal 
                    plan={selectedPlan} 
                    studentCount={studentCount} 
                    onClose={handleCloseModal}
                    selectedCurrency={selectedCurrency}
                    exchangeRates={exchangeRates}
                    symbol={symbol}
                />
            }
            <PageHero 
                title="Transparent Pricing for Schools of All Sizes"
                subtitle="Choose the perfect plan that fits your school's needs and budget. All plans are backed by our world-class support."
            />
            
            <section className="py-24 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                     {error && plans.length > 0 && (
                        <div className="text-center text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-md mb-8 max-w-3xl mx-auto">
                           {error}
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-center items-center mb-12 gap-4 md:gap-8">
                        {/* Billing Period Toggle */}
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex space-x-1">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${billingPeriod === 'monthly' ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('termly')}
                                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${billingPeriod === 'termly' ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Termly
                            </button>
                             <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${billingPeriod === 'yearly' ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Yearly
                            </button>
                        </div>
                         {/* Currency Selector */}
                        <div>
                             <label htmlFor="currency-select" className="sr-only">Select Currency</label>
                             <select 
                                id="currency-select"
                                value={selectedCurrency}
                                onChange={e => setSelectedCurrency(e.target.value)}
                                disabled={loadingCurrencies}
                                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-primary dark:text-gray-200"
                            >
                                {loadingCurrencies ? <option>Loading...</option> : currencies.map(c => (
                                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                   {renderContent()}
                </div>
            </section>
        </LandingLayout>
    );
}

export default PricingPage;
