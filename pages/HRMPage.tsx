
import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getStaff, getLeaveRequests, updateLeaveRequestStatus, Staff, LeaveRequest } from '../db';

// --- Sub-components for HRM Page ---

// Staff Card Component
const StaffCard = ({ staff }: { staff: Staff }) => (
    <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
        <img src={staff.photo} alt={staff.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-600"/>
        <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">{staff.name}</h3>
        <p className="text-primary font-semibold">{staff.role}</p>

        <p className="text-sm text-text-secondary dark:text-gray-400">{staff.department}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-left space-y-2">
            <p className="text-sm text-text-secondary dark:text-gray-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {staff.email}
            </p>
            <p className="text-sm text-text-secondary dark:text-gray-400 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {staff.phone}
            </p>
        </div>
    </div>
);


// 1. Staff Directory Component
const StaffDirectory = () => {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            const staff = await getStaff();
            setStaffList(staff);
            setLoading(false);
        };
        fetchStaff();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Staff Directory</h2>
                <div className="flex items-center space-x-4">
                    <input type="text" placeholder="Search staff..." className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"/>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Add Staff Member</button>
                </div>
            </div>
            {loading ? (
                <div className="text-center py-8 dark:text-gray-400">Loading staff...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {staffList.map(staff => <StaffCard key={staff.id} staff={staff} />)}
                </div>
            )}
        </div>
    );
};


// 2. Leave Management Component
const LeaveManagement = () => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaveRequests = useCallback(async () => {
        setLoading(true);
        const requests = await getLeaveRequests();
        setLeaveRequests(requests);
        setLoading(false);
    }, []);
    
    useEffect(() => {
        fetchLeaveRequests();
    }, [fetchLeaveRequests]);
    
    const handleStatusUpdate = async (id: number, status: 'Approved' | 'Rejected') => {
        await updateLeaveRequestStatus(id, status);
        fetchLeaveRequests(); // Refresh list
    };
    
    const statusColors: { [key: string]: string } = { Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400', Approved: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', Rejected: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Leave Requests</h2>
            </div>
             {loading ? (
                <div className="text-center py-8 dark:text-gray-400">Loading leave requests...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-4 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Staff Name</th>
                            <th className="p-4 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Leave Type</th>
                            <th className="p-4 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Dates</th>
                            <th className="p-4 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Status</th>
                            <th className="p-4 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests.map(req => (
                            <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-text-primary dark:text-gray-100">{req.staffName}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{req.leaveType}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{req.startDate} to {req.endDate}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[req.status]}`}>{req.status}</span></td>
                                <td className="p-4 text-center">
                                    {req.status === 'Pending' && (
                                        <div className="flex justify-center space-x-2">
                                            <button onClick={() => handleStatusUpdate(req.id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">Approve</button>
                                            <button onClick={() => handleStatusUpdate(req.id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

// 3. Placeholder for future features
const ComingSoon = ({ featureName }: {featureName: string}) => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-text-primary dark:text-gray-100">{featureName}</h2>
        <p className="text-text-secondary dark:text-gray-400 mt-2">This feature is under construction and will be available soon!</p>
    </div>
);


// --- Main HRM Page Component ---
const HRMPage = () => {
    const [activeTab, setActiveTab] = useState('directory');
    
    const renderContent = () => {
        switch(activeTab) {
            case 'directory':
                return <StaffDirectory />;
            case 'leave':
                return <LeaveManagement />;
            case 'payroll':
                return <ComingSoon featureName="Payroll Management" />;
            case 'recruitment':
                return <ComingSoon featureName="Recruitment Portal" />;
            default:
                return <StaffDirectory />;
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
        <DashboardLayout title="Human Resource Management">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md">
                <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2">
                        <TabButton name="directory" label="Staff Directory" />
                        <TabButton name="leave" label="Leave Management" />
                        <TabButton name="payroll" label="Payroll" />
                        <TabButton name="recruitment" label="Recruitment" />
                    </nav>
                </div>
                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HRMPage;