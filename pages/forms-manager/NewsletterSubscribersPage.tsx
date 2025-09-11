import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getNewsletterSubscribers, updateNewsletterSubscriber, deleteFormSubmission, NewsletterSubscriber } from '../../db';

// --- ICONS ---
const icons = {
    refresh: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653 8.956 8.956 0 01-6.653 2.93m0 0V20m0-8a8.956 8.956 0 016.653-2.93A8.956 8.956 0 0120 12m0 0h-5m-5 0a8.956 8.956 0 01-2.93-6.653A8.956 8.956 0 0112 4m0 0v5m-5 0H4" /></svg>,
    export: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    search: <svg className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    total: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 13.489a3.006 3.006 0 01-3.111-1.329m3.111 1.329a3.006 3.006 0 012.111 2.818M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    active: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14l-4 6h8l-4-6z" /></svg>,
    unsubscribed: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z" /></svg>,
    chart: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    send: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title = "Are You Sure?", message = "Do You Want To Delete This Information?" }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title?: string; message?: string }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-gray-700 border-4 border-yellow-400 dark:border-yellow-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mt-5 text-text-primary dark:text-white">{title}</h3>
                    <p className="text-text-secondary dark:text-gray-400 mt-2">{message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                     <button 
                        onClick={onConfirm}
                        className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors"
                    >
                        Yes, Continue
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <p className="text-center text-xs text-text-secondary dark:text-gray-500 mt-6">
                    *Note: This data will be permanently deleted
                </p>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode; }) => (
    <div className="bg-card dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
        <div>
            <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-text-primary dark:text-gray-100 mt-1">{value}</p>
        </div>
        <div>{icon}</div>
    </div>
);

const SubscriberDetailsModal = ({ subscriber, onClose, onStatusChange, onDeleteRequest }: { subscriber: NewsletterSubscriber; onClose: () => void; onStatusChange: (sub: NewsletterSubscriber) => void; onDeleteRequest: (id: number) => void; }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Subscriber Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Subscriber Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><strong>Email:</strong></p><p>{subscriber.email}</p>
                            <p><strong>Name:</strong></p><p>{subscriber.name || 'N/A'}</p>
                            <p><strong>Status:</strong></p><p><span className={`px-2 py-1 text-xs rounded-full ${subscriber.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/50 dark:text-yellow-300'}`}>{subscriber.status}</span></p>
                            <p><strong>Source:</strong></p><p><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300">{subscriber.source}</span></p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Subscription Timeline</h3>
                        <div className="text-sm space-y-2">
                           <p><strong>Subscribed:</strong> {new Date(subscriber.created_at).toLocaleString()}</p>
                           <p><strong>Last Updated:</strong> {new Date(subscriber.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Manage Status</h3>
                        <select 
                            value={subscriber.status} 
                            onChange={() => onStatusChange(subscriber)}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="Unsubscribed">Unsubscribed</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-between items-center">
                    <button onClick={() => onDeleteRequest(subscriber.id)} className="text-sm text-red-500 hover:underline">Delete Subscriber</button>
                    <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.send} Send Email</button>
                </div>
            </div>
        </div>
    );
};

const NewsletterSubscribersPage = () => {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriber | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [subscriberIdToDelete, setSubscriberIdToDelete] = useState<number | null>(null);

    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getNewsletterSubscribers();
            setSubscribers(data);
        } catch (err) {
            setError('Failed to fetch subscribers.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);
    
    const handleStatusChange = async (subscriber: NewsletterSubscriber) => {
        const newStatus = subscriber.status === 'Active' ? 'Unsubscribed' : 'Active';
        try {
            await updateNewsletterSubscriber(subscriber.id, { status: newStatus });
            fetchSubscribers();
            if (selectedSubscriber?.id === subscriber.id) {
                setSelectedSubscriber({ ...subscriber, status: newStatus });
            }
        } catch (err) {
             setError('Failed to update status.');
        }
    };
    
    const handleDeleteRequest = (id: number) => {
        setSubscriberIdToDelete(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (subscriberIdToDelete !== null) {
            setError('');
            try {
                await deleteFormSubmission('newsletter_subscribers', subscriberIdToDelete);
                fetchSubscribers();
                if (selectedSubscriber?.id === subscriberIdToDelete) {
                    setSelectedSubscriber(null);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to remove subscriber.');
                console.error(err);
            }
        }
        setModalOpen(false);
        setSubscriberIdToDelete(null);
    };

    const stats = {
        total: subscribers.length,
        active: subscribers.filter(s => s.status === 'Active').length,
        unsubscribed: subscribers.filter(s => s.status === 'Unsubscribed').length,
        thisWeek: subscribers.filter(s => new Date(s.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
    };

    return (
        <DashboardLayout title="Forms Manager">
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            {selectedSubscriber && (
                <SubscriberDetailsModal 
                    subscriber={selectedSubscriber} 
                    onClose={() => setSelectedSubscriber(null)}
                    onStatusChange={handleStatusChange}
                    onDeleteRequest={handleDeleteRequest}
                />
            )}
            <div className="space-y-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                        <button onClick={() => setError('')} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                           <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </button>
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-text-primary dark:text-gray-100">Newsletter Management</h1>
                    <p className="text-text-secondary dark:text-gray-400">Manage newsletter subscriptions and subscribers.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Subscribers" value={stats.total} icon={icons.total} />
                    <StatCard title="Active" value={stats.active} icon={icons.active} />
                    <StatCard title="Unsubscribed" value={stats.unsubscribed} icon={icons.unsubscribed} />
                    <StatCard title="This Week" value={stats.thisWeek} icon={icons.chart} />
                </div>
                
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full md:w-auto">
                            <input type="text" placeholder="Search subscribers..." className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {icons.search}
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={fetchSubscribers} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                {icons.refresh} Refresh
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                {icons.export} Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border-transparent rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-colors">
                                {icons.add} Add Subscriber
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-8">Loading subscribers...</div>
                        ) : subscribers.length === 0 ? (
                            <div className="text-center py-8">No subscribers yet.</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Subscriber</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Status</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Source</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Subscribed</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map(sub => (
                                        <tr key={sub.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                            <td className="p-3">
                                                <p className="font-bold text-text-primary dark:text-gray-100">{sub.email}</p>
                                                <p className="text-sm text-text-secondary dark:text-gray-400">{sub.name}</p>
                                            </td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${sub.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/50 dark:text-yellow-300'}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="p-3"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300">{sub.source}</span></td>
                                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{new Date(sub.created_at).toLocaleDateString()}</td>
                                            <td className="p-3 text-right space-x-2">
                                                 <button onClick={() => setSelectedSubscriber(sub)} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">View</button>
                                                 <button onClick={() => handleStatusChange(sub)} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{sub.status === 'Active' ? 'Unsubscribe' : 'Resubscribe'}</button>
                                                 <button 
                                                    onClick={() => handleDeleteRequest(sub.id)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50"
                                                    aria-label="Delete subscriber"
                                                >
                                                    {icons.delete}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NewsletterSubscribersPage;