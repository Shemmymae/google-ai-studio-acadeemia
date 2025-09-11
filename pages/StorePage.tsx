

import React, { useState, useEffect } from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';
import { getPublicCurrencies, Currency } from '../db';
import { useCart, Addon } from '../components/CartContext';

const addonData: Addon[] = [
  { id: 1, title: 'QR Code Attendance', description: 'Advanced attendance tracking using QR codes for quick and accurate recording. Students and staff can check in/out by scanning QR codes.', price: 30.96, popular: true, type: 'SaaS', features: ['QR code generation for each user', 'Mobile app scanning capability', 'Real-time attendance updates'] },
  { id: 2, title: 'Two-Factor Authentication', description: 'Enhanced security with two-factor authentication for user accounts. Protect sensitive data with an extra layer of security.', price: 23.22, popular: true, type: 'SaaS', features: ['SMS-based verification', 'App-based authentication (Google Authenticator)', 'Backup codes for account recovery'] },
  { id: 3, title: 'Android App', description: 'Mobile access through a dedicated Android application. Native mobile experience for students, teachers, and parents.', price: 30.96, popular: true, type: 'Standalone', features: ['Native Android application', 'Offline data synchronization', 'Push notifications'] },
  { id: 4, title: 'Behaviour Records', description: 'Track and manage student behavior and disciplinary records. Comprehensive behavior management system.', price: 15.48, popular: false, type: 'Standalone', features: ['Incident reporting system', 'Behavior tracking and analytics', 'Parent notification system'] },
  { id: 5, title: 'Biometrics Entry', description: 'Biometric authentication for secure access control. Fingerprint and facial recognition support.', price: 15.48, popular: false, type: 'Standalone', features: ['Fingerprint recognition', 'Facial recognition (optional)', 'Access control integration'] },
  { id: 6, title: 'CBSE Examination', description: 'Specialized module for CBSE examination management. Compliant with CBSE guidelines and requirements.', price: 15.48, popular: false, type: 'Standalone', features: ['CBSE-compliant exam formats', 'Grade calculation as per CBSE', 'Report card generation'] },
  { id: 7, title: 'Google Meet Live Classes', description: 'Google Meet integration for virtual learning. Seamless video conferencing for online classes.', price: 11.61, popular: true, type: 'Standalone', features: ['Google Meet integration', 'Automated meeting creation', 'Class scheduling with Meet links'] },
  { id: 8, title: 'Multi Branch', description: 'Manage multiple branches or campuses from a single system. Centralized management with branch-specific controls.', price: 23.22, popular: false, type: 'Standalone', features: ['Multiple campus management', 'Branch-specific user roles', 'Centralized reporting'] },
  { id: 9, title: 'Online Course', description: 'Complete online course management system. Create, manage, and deliver online courses effectively.', price: 19.35, popular: false, type: 'Standalone', features: ['Course creation tools', 'Video content management', 'Student progress tracking'] },
  { id: 10, title: 'QR Code Attendance', description: 'Quick and accurate attendance tracking using QR codes. Mobile-friendly attendance solution.', price: 15.48, popular: true, type: 'Standalone', features: ['QR code generation', 'Mobile scanning app', 'Real-time updates'] },
  { id: 11, title: 'Quick Fees', description: 'Streamlined fee collection and management system. Simplified fee processing with multiple payment options.', price: 15.48, popular: false, type: 'Standalone', features: ['Quick fee collection interface', 'Multiple payment gateways', 'Fee reminder system'] },
  { id: 12, title: 'Thermal Print', description: 'Support for thermal printing of receipts and documents. Efficient printing solution for schools.', price: 15.48, popular: false, type: 'Standalone', features: ['Receipt printing', 'ID card printing'] },
  { id: 13, title: 'Two-Factor Authenticator', description: 'Enhanced security with two-factor authentication. Protect your data with advanced security.', price: 15.48, popular: false, type: 'Standalone', features: ['SMS verification', 'App-based authentication', 'Backup codes'] },
  { id: 14, title: 'Zoom Live Classes', description: 'Integrate Zoom for seamless virtual classroom experiences. Professional video conferencing for education.', price: 15.48, popular: false, type: 'Standalone', features: ['Zoom integration', 'Automated meeting scheduling', 'Recording capabilities'] },
];

const PageHero = () => (
    <div className="bg-gradient-to-b from-purple-100 to-white dark:from-gray-800/50 dark:to-gray-900 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100">Acadeemia Store</h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">Enhance your school management system with powerful add-ons and extensions.</p>
        </div>
    </div>
);

const AddonCard = ({ addon, selectedCurrency, exchangeRates, symbol, onAddToCart }: {
    addon: Addon;
    selectedCurrency: string;
    exchangeRates: { [key: string]: number } | null;
    symbol: string;
    onAddToCart: (addon: Addon) => void;
}) => {
    const isSaaS = addon.type === 'SaaS';
    const buttonClass = isSaaS
        ? 'bg-primary hover:bg-primary-hover text-white'
        : 'bg-teal-500 hover:bg-teal-600 text-white';

    const convertedPrice = (addon.price * (exchangeRates?.[selectedCurrency] ?? 1));

    return (
        <div className="bg-card dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col relative transition-shadow hover:shadow-lg">
            {addon.popular && <span className="absolute top-0 left-6 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">⭐ Popular</span>}
            <div className="flex justify-between items-start mb-4">
                 <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                 </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isSaaS ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>{addon.type}</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">{addon.title}</h3>
            <p className="text-text-secondary dark:text-gray-400 text-sm mb-4 flex-grow">{addon.description}</p>
            <div className="mb-4">
                <h4 className="font-semibold text-sm text-text-primary dark:text-gray-200 mb-2">Features:</h4>
                <ul className="space-y-1 text-sm text-text-secondary dark:text-gray-400">
                    {addon.features.map(f => <li key={f} className="flex items-center"><svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{f}</li>)}
                    <li className="font-semibold">+2 more features</li>
                </ul>
            </div>
            <div className="mt-auto pt-4 border-t dark:border-gray-700 flex justify-between items-center">
                <p className="text-2xl font-bold text-text-primary dark:text-gray-100">{symbol}{convertedPrice.toFixed(2)}</p>
                <button onClick={() => onAddToCart({ ...addon, price: convertedPrice })} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${buttonClass}`}>+ Add to Cart</button>
            </div>
        </div>
    );
};


const StorePage = () => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, cart } = useCart();

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            setError(null);
            try {
                const currencyData = await getPublicCurrencies();
                if (currencyData && currencyData.length > 0) {
                    setCurrencies(currencyData);
                } else {
                    setCurrencies([{ id: 0, school_id: 0, name: 'US Dollar', code: 'USD', symbol: '$' }]);
                }
            } catch (e) {
                console.error("Failed to load currencies:", e);
                setError("Could not load currencies from the database.");
                setCurrencies([{ id: 0, school_id: 0, name: 'US Dollar', code: 'USD', symbol: '$' }]);
            }
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (!response.ok) throw new Error("API response was not ok.");
                const ratesData = await response.json();
                setExchangeRates(ratesData.rates);
            } catch (e) {
                console.error("Failed to load exchange rates:", e);
                setError((prev) => (prev ? prev + " " : "") + "Could not load live currency rates. Prices are shown in USD.");
                setExchangeRates({ 'USD': 1 });
            } finally {
                setLoading(false);
            }
        };
        fetchStoreData();
    }, []);

    const filteredAddons = addonData
        .filter(addon => {
            if (filter === 'All') return true;
            return addon.type === filter;
        })
        .filter(addon => 
            addon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            addon.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
    const currentCurrency = currencies.find(c => c.code === selectedCurrency);
    const currentRate = exchangeRates ? exchangeRates[selectedCurrency]?.toFixed(2) : '...';
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <LandingLayout>
            <PageHero />
            <div className="bg-background dark:bg-gray-900 sticky top-[73px] z-40 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                             {currencies.map(currency => (
                                <button
                                    key={currency.code}
                                    onClick={() => setSelectedCurrency(currency.code)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${selectedCurrency === currency.code ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-600 dark:text-gray-300'}`}
                                >
                                    {currency.code}
                                </button>
                            ))}
                        </div>
                         {selectedCurrency !== 'USD' && (
                             <span className="text-sm text-text-secondary dark:text-gray-400 hidden lg:block">
                                1 USD = {currentRate} {selectedCurrency}
                             </span>
                        )}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search add-ons..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full md:w-64 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <svg className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === 'All' ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>All Add-ons</button>
                        <button onClick={() => setFilter('SaaS')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${filter === 'SaaS' ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /></svg>SaaS Add-ons</button>
                        <button onClick={() => setFilter('Standalone')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${filter === 'Standalone' ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2-2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>Standalone Add-ons</button>
                        <Link to="/cart" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                            Cart
                            {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    {loading && <div className="text-center py-16 text-text-secondary dark:text-gray-400">Loading Store...</div>}
                    {error && !loading && <div className="text-center py-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/50 rounded-md">{error}</div>}
                    {!loading && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredAddons.map(addon => (
                                    <AddonCard
                                        key={addon.id}
                                        addon={addon}
                                        selectedCurrency={selectedCurrency}
                                        exchangeRates={exchangeRates}
                                        symbol={currentCurrency?.symbol || '$'}
                                        onAddToCart={addToCart}
                                    />
                                ))}
                            </div>
                            {filteredAddons.length === 0 && (
                                <div className="text-center py-16 text-text-secondary dark:text-gray-400">
                                    <h3 className="text-xl font-semibold mb-2">No Add-ons Found</h3>
                                    <p>Your search for "{searchTerm}" did not match any add-ons with the "{filter}" filter.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
};

export default StorePage;