import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getClients, getInvoices, getExpenses, Client, Invoice, Expense } from '../db';

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// --- Sub-components for the new Accounting Module ---

// 1. StatCard for the Dashboard
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-text-primary dark:text-gray-100">{value}</p>
        </div>
        <div className="bg-primary/10 text-primary p-4 rounded-full">
            {icon}
        </div>
    </div>
);

// 2. Accounting Dashboard Component
const AccountingDashboard = () => {
    const [stats, setStats] = useState({ mrr: 0, activeSubs: 0, totalExpenses: 0, netProfit: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStats = async () => {
        setLoading(true);
        const [clients, expenses] = await Promise.all([getClients(), getExpenses()]);
        
        const mrr = clients
            .filter(c => c.status === 'Active')
            .reduce((sum, client) => sum + client.monthlyValue, 0);

        const activeSubs = clients.filter(c => c.status === 'Active').length;
        
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const netProfit = mrr - totalExpenses;

        setStats({ mrr, activeSubs, totalExpenses, netProfit });
        setLoading(false);
      };
      fetchStats();
    }, []);

    const icons = {
        revenue: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
        subscriptions: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" /></svg>,
        expenses: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5-2.5a2.5 2.5 0 113.536 3.536L6.5 21.5 2 22l.5-4.5 15.5-15.5a2.5 2.5 0 113.536 3.536L15 14.5" /></svg>,
        profit: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-6">This Month's Financial Overview</h2>
            {loading ? (
                 <div className="text-center py-8 dark:text-gray-400">Loading financial overview...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Monthly Recurring Revenue" value={formatCurrency(stats.mrr)} icon={icons.revenue} />
                    <StatCard title="Active Subscriptions" value={stats.activeSubs.toString()} icon={icons.subscriptions} />
                    <StatCard title="Total Expenses" value={formatCurrency(stats.totalExpenses)} icon={icons.expenses} />
                    <StatCard title="Net Profit" value={formatCurrency(stats.netProfit)} icon={icons.profit} />
                </div>
            )}
        </div>
    );
};

// 3. Clients & Subscriptions Component
const ClientsList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const clientData = await getClients();
            setClients(clientData);
            setLoading(false);
        };
        fetchClients();
    }, []);

    const statusColors: { [key: string]: string } = { Active: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', Canceled: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' };
    const planColors: { [key: string]: string } = { Starter: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400', Professional: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400', Enterprise: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400' };

    return (
        <div>
            <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-6">Clients & Subscriptions</h2>
            {loading ? (
                 <div className="text-center py-8 dark:text-gray-400">Loading clients...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead><tr className="bg-gray-100 dark:bg-gray-700"><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">School Name</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Plan</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Status</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">MRR</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Join Date</th></tr></thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-text-primary dark:text-gray-100">{client.schoolName}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${planColors[client.plan]}`}>{client.plan}</span></td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[client.status]}`}>{client.status}</span></td>
                                <td className="p-4 text-text-secondary dark:text-gray-400">{formatCurrency(client.monthlyValue)}</td>
                                <td className="p-4 text-text-secondary dark:text-gray-400">{client.joinDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

// 4. Invoices Component
const InvoicesList = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            const invoiceData = await getInvoices();
            setInvoices(invoiceData);
            setLoading(false);
        };
        fetchInvoices();
    }, []);
    
    const statusColors: { [key: string]: string } = { Paid: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', Due: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400', Overdue: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' };

    return (
         <div>
            <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-6">Invoice Management</h2>
            {loading ? (
                <div className="text-center py-8 dark:text-gray-400">Loading invoices...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead><tr className="bg-gray-100 dark:bg-gray-700"><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Invoice ID</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Client</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Amount</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Due Date</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Status</th></tr></thead>
                    <tbody>
                        {invoices.map(invoice => (
                             <tr key={invoice.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-mono text-sm text-text-secondary dark:text-gray-400">{invoice.invoiceId}</td>
                                <td className="p-4 font-medium text-text-primary dark:text-gray-100">{invoice.clientName}</td>
                                <td className="p-4 text-text-secondary dark:text-gray-400">{formatCurrency(invoice.amount)}</td>
                                <td className="p-4 text-text-secondary dark:text-gray-400">{invoice.dueDate}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}>{invoice.status}</span></td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

// 5. Expenses Component
const ExpensesList = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            const expenseData = await getExpenses();
            setExpenses(expenseData);
            setLoading(false);
        };
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-6">Company Expenses</h2>
            {loading ? (
                <div className="text-center py-8 dark:text-gray-400">Loading expenses...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                     <thead><tr className="bg-gray-100 dark:bg-gray-700"><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Category</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Description</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Date</th><th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Amount</th></tr></thead>
                     <tbody>
                        {expenses.map(expense => (
                            <tr key={expense.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 text-text-secondary dark:text-gray-400">{expense.category}</td>
                                <td className="p-4 text-text-primary dark:text-gray-100">{expense.description}</td>
                                <td className="p-4 text-text-secondary dark:text-gray-400">{expense.date}</td>
                                <td className="p-4 font-medium text-text-primary dark:text-gray-100">{formatCurrency(expense.amount)}</td>
                            </tr>
                        ))}
                     </tbody>
                </table>
            </div>
            )}
        </div>
    );
};


// --- Main Accounting Page Component ---
const AccountingPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    
    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return <AccountingDashboard />;
            case 'clients':
                return <ClientsList />;
            case 'invoices':
                return <InvoicesList />;
            case 'expenses':
                return <ExpensesList />;
            default:
                return <AccountingDashboard />;
        }
    };
    
    const TabButton = ({ name, label }: {name: string, label: string}) => {
        const isActive = activeTab === name;
        return (
            <button
                onClick={() => setActiveTab(name)}
                className={`px-4 py-2 font-medium text-sm rounded-md transition-colors duration-200 ${isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
                {label}
            </button>
        );
    };

    return (
        <DashboardLayout title="Company Accounting">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md">
                <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2">
                        <TabButton name="dashboard" label="Dashboard" />
                        <TabButton name="clients" label="Clients & Subscriptions" />
                        <TabButton name="invoices" label="Invoices" />
                        <TabButton name="expenses" label="Expenses" />
                    </nav>
                </div>
                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AccountingPage;