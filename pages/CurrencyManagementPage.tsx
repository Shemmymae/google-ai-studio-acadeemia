

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getCurrencies, addCurrency, deleteCurrency, Currency } from '../db';

// Icons
const ICONS = {
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const AddCurrencyForm = ({ onCurrencyAdded }: { onCurrencyAdded: () => void }) => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newCurrency = {
            name: formData.get('name') as string,
            code: formData.get('code') as string,
            symbol: formData.get('symbol') as string,
        };
        try {
            if (newCurrency.name && newCurrency.code && newCurrency.symbol) {
                await addCurrency(newCurrency);
                onCurrencyAdded();
                form.reset();
            }
        } catch (err: any) {
            setError(err.message || 'Failed to add currency.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Add New Currency</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                 {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Name <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Code <span className="text-red-500">*</span></label>
                    <input type="text" id="code" name="code" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Symbol <span className="text-red-500">*</span></label>
                    <input type="text" id="symbol" name="symbol" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-primary focus:border-primary" />
                </div>
                <div className="flex justify-end pt-2">
                    <button type="submit" disabled={saving} className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition-colors">
                        {ICONS.save} {saving ? 'Saving...' : 'Add Currency'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const CurrencyList = ({ currencies, onCurrencyDeleted }: { currencies: Currency[], onCurrencyDeleted: (id: number) => void }) => {
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">#</th>
                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Currency Name</th>
                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Code</th>
                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Symbol</th>
                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center p-8 text-text-secondary dark:text-gray-400">
                                No currencies found. Add one to get started!
                            </td>
                        </tr>
                    ) : (
                        currencies.map((currency, index) => (
                            <tr key={currency.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{currency.name}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{currency.code}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{currency.symbol}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => onCurrencyDeleted(currency.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


const CurrencyManagementPage = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrencies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCurrencies();
            setCurrencies(data);
        } catch(err: any) {
            setError(err.message || 'Failed to fetch currencies.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrencies();
    }, [fetchCurrencies]);

    const handleCurrencyDeleted = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this currency?')) {
            setError(null);
            try {
                await deleteCurrency(id);
                fetchCurrencies(); // Re-fetch the list to show the update
            } catch (err: any) {
                setError(err.message || 'Failed to delete currency.');
            }
        }
    };
    
    return (
        <DashboardLayout title="Currency Management">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                         {loading ? (
                            <div className="text-center py-8 text-gray-500">Loading currencies...</div>
                        ) : (
                            <CurrencyList currencies={currencies} onCurrencyDeleted={handleCurrencyDeleted} />
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <AddCurrencyForm onCurrencyAdded={fetchCurrencies} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CurrencyManagementPage;