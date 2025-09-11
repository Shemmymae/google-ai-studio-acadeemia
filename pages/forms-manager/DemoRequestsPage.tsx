import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getDemoRequests, updateDemoRequest, deleteFormSubmission, DemoRequest } from '../../db';
import { supabase } from '../../supabase';

const icons = {
    refresh: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653 8.956 8.956 0 01-6.653 2.93m0 0V20m0-8a8.956 8.956 0 016.653-2.93A8.956 8.956 0 0120 12m0 0h-5m-5 0a8.956 8.956 0 01-2.93-6.653A8.956 8.956 0 0112 4m0 0v5m-5 0H4" /></svg>,
    export: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    search: <svg className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    requests: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    contacted: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    pending: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    chart: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    followUp: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6-6m-6 6l6 6" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

const EmailReplyModal = ({ request, onClose }: { request: DemoRequest; onClose: () => void; }) => {
    const [subject, setSubject] = useState(`Re: Your Acadeemia Demo Request`);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setFeedback(null);

        try {
            const { error } = await supabase.functions.invoke('send-email', {
                body: {
                    to: request.email,
                    subject: subject,
                    html: `<p>Dear ${request.name},</p><p>${message.replace(/\n/g, '<br>')}</p><p>Best regards,<br>The Acadeemia Team</p>`,
                },
            });

            if (error) throw error;
            
            setFeedback({ type: 'success', message: 'Email sent successfully!' });
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err: any) {
            console.error('Full error object:', err);
             // The supabase-js client wraps network errors in a specific way
            if (err.message === 'Failed to fetch') {
              setFeedback({ type: 'error', message: 'Network Error: Could not reach the email service. Please check your internet connection and ensure the Edge Function is deployed correctly.' });
            } else {
              // For errors returned from the function itself (like config errors)
              setFeedback({ type: 'error', message: `An error occurred: ${err.message}` });
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Reply to {request.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                </div>
                <form onSubmit={handleSendEmail}>
                    <div className="p-6 space-y-4">
                        {feedback && (
                            <div className={`p-3 rounded-md text-sm ${feedback.type === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'}`}>
                                {feedback.message}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary dark:text-gray-300">To</label>
                            <input type="email" value={request.email} readOnly className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border-gray-300 dark:border-gray-600" />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-text-secondary dark:text-gray-300">Message</label>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={8} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" disabled={sending} className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-70">{sending ? 'Sending...' : 'Send Email'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
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

const DemoRequestModal = ({ request, onClose, onStatusChange, onDeleteRequest, onReply }: { request: DemoRequest; onClose: () => void; onStatusChange: (req: DemoRequest, newStatus: DemoRequest['status']) => void; onDeleteRequest: (id: number) => void; onReply: (req: DemoRequest) => void; }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Demo Request Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Requester Information</h3>
                        <p><strong>Name:</strong> {request.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${request.email}`} className="text-primary">{request.email}</a></p>
                        {request.phone && <p><strong>Phone:</strong> {request.phone}</p>}
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Institution Details</h3>
                        <p><strong>Institution:</strong> {request.institution}</p>
                        <p><strong>Role:</strong> {request.role}</p>
                        <p><strong>Interested In:</strong> {request.interest}</p>
                    </div>
                    {request.additional_info && (
                        <div>
                            <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Additional Information</h3>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md whitespace-pre-wrap text-sm">{request.additional_info}</div>
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-text-primary dark:text-gray-200 mb-2">Manage Status</h3>
                        <select 
                            value={request.status} 
                            onChange={(e) => onStatusChange(request, e.target.value as DemoRequest['status'])}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-between items-center">
                    <button onClick={() => onDeleteRequest(request.id)} className="text-sm text-red-500 hover:underline">Delete Request</button>
                    <button onClick={() => onReply(request)} className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.followUp} Reply</button>
                </div>
            </div>
        </div>
    );
};

const DemoRequestsPage = () => {
    const [requests, setRequests] = useState<DemoRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [requestIdToDelete, setRequestIdToDelete] = useState<number | null>(null);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getDemoRequests();
            setRequests(data);
        } catch (err) {
            setError('Failed to fetch demo requests.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleStatusChange = async (request: DemoRequest, newStatus: DemoRequest['status']) => {
        try {
            await updateDemoRequest(request.id, { status: newStatus });
            fetchRequests();
            if (selectedRequest?.id === request.id) {
                 setSelectedRequest({ ...request, status: newStatus });
            }
        } catch (err) {
            setError('Failed to update status.');
        }
    };
    
    const handleDeleteRequest = (id: number) => {
        setRequestIdToDelete(id);
        setDeleteModalOpen(true);
        setSelectedRequest(null); // Close details modal if open
    };

    const handleConfirmDelete = async () => {
        if (requestIdToDelete !== null) {
            setError('');
            try {
                await deleteFormSubmission('demo_requests', requestIdToDelete);
                fetchRequests();
            } catch (err: any) {
                const errorMessage = err.message || 'An unknown error occurred.';
                setError(`Failed to delete the demo request: ${errorMessage}`);
                console.error(err);
            }
        }
        setDeleteModalOpen(false);
        setRequestIdToDelete(null);
    };
    
    const handleReply = (request: DemoRequest) => {
        setSelectedRequest(request);
        setReplyModalOpen(true);
    };

    const stats = {
        total: requests.length,
        contacted: requests.filter(r => r.status === 'Contacted').length,
        pending: requests.filter(r => r.status === 'Pending').length,
        thisWeek: requests.filter(r => new Date(r.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
    };

    return (
        <DashboardLayout title="Forms Manager">
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            {isReplyModalOpen && selectedRequest && (
                <EmailReplyModal
                    request={selectedRequest}
                    onClose={() => setReplyModalOpen(false)}
                />
            )}
            {selectedRequest && !isReplyModalOpen && (
                <DemoRequestModal 
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    onStatusChange={handleStatusChange}
                    onDeleteRequest={handleDeleteRequest}
                    onReply={handleReply}
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
                    <h1 className="text-2xl font-bold text-text-primary dark:text-gray-100">Demo Request Management</h1>
                    <p className="text-text-secondary dark:text-gray-400">Manage personalized demo requests from potential clients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Requests" value={stats.total} icon={icons.requests} />
                    <StatCard title="Contacted" value={stats.contacted} icon={icons.contacted} />
                    <StatCard title="Pending" value={stats.pending} icon={icons.pending} />
                    <StatCard title="This Week" value={stats.thisWeek} icon={icons.chart} />
                </div>
                
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full md:w-auto">
                            <input type="text" placeholder="Search requests..." className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            {icons.search}
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={fetchRequests} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                {icons.refresh} Refresh
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                {icons.export} Export CSV
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                         {loading ? (
                            <div className="text-center py-8">Loading requests...</div>
                        ) : requests.length === 0 ? (
                            <div className="text-center py-8">No demo requests yet.</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Requester</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Institution</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Interest</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Date</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Status</th>
                                        <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(req => (
                                        <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                            <td className="p-3">
                                                <p className="font-bold text-text-primary dark:text-gray-100">{req.name}</p>
                                                <p className="text-sm text-text-secondary dark:text-gray-400">{req.email}</p>
                                            </td>
                                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.institution}</td>
                                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{req.interest}</td>
                                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{new Date(req.created_at).toLocaleDateString()}</td>
                                            <td className="p-3 text-sm">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${req.status === 'Contacted' ? 'bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300' : req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/50 dark:text-yellow-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200'}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right space-x-2">
                                                 <button onClick={() => setSelectedRequest(req)} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">View</button>
                                                 <button 
                                                    onClick={() => handleDeleteRequest(req.id)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50"
                                                    aria-label="Delete request"
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

export default DemoRequestsPage;