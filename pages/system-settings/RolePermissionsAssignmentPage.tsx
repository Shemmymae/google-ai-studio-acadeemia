import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

const ICONS = {
    update: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

const permissionsConfig = [
    { module: 'Dashboard', features: ['Monthly Income Vs Expense Pie Chart', 'Annual Student Fees Summary Chart', 'Employee Count Widget', 'Student Count Widget', 'Parent Count Widget', 'Teacher Count Widget', 'Student Quantity Pie Chart', 'Weekend Attendance Inspection Chart', 'Admission Count Widget', 'Voucher Count Widget', 'Transport Count Widget', 'Hostel Count Widget', 'Student Birthday Wishes Widget', 'Staff Birthday Wishes Widget'] },
    { module: 'Website', features: ['Frontend Setting', 'Frontend Menu', 'Frontend Section', 'Manage Page', 'Frontend Slider', 'Frontend Features', 'Frontend Testimonial', 'Frontend Services', 'Frontend Faq', 'Frontend Gallery', 'Frontend Gallery Category', 'Frontend News'] },
    { module: 'Reception', features: ['Postal Record', 'Call Log', 'Visitor Log', 'Complaint', 'Enquiry', 'Follow Up', 'Config Reception'] },
    { module: 'Inventory', features: ['Product', 'Product Category', 'Product Supplier', 'Product Unit', 'Product Purchase', 'Purchase Payment', 'Product Store', 'Product Sales', 'Sales Payment', 'Product Issue', 'Inventory Report'] },
    { module: 'Student', features: ['Student', 'Multiple Import', 'Student Category', 'Student Id Card', 'Disable Authentication', 'Student Promotion', 'Online Admission', 'Disable Reason'] },
    { module: 'Parents', features: ['Parent', 'Disable Authentication'] },
    { module: 'Employee', features: ['Employee', 'Department', 'Designation', 'Disable Authentication'] },
    { module: 'Card Management', features: ['ID Card Templete', 'Generate Student ID Card', 'Generate Employee ID Card', 'Admit Card Templete', 'Generate Admit card'] },
    { module: 'Certificate', features: ['Certificate Templete', 'Generate Student Certificate', 'Generate Employee Certificate'] },
    { module: 'Human Resource', features: ['Salary Template', 'Salary Assign', 'Salary Payment', 'Salary Summary Report', 'Advance Salary', 'Advance Salary Manage', 'Advance Salary Request', 'Leave Category', 'Leave Request', 'Leave Manage', 'Award', 'Leave Reports'] },
    { module: 'Academic', features: ['Classes', 'Section', 'Assign Class Teacher', 'Subject', 'Subject Class Assign', 'Subject Teacher Assign', 'Class Timetable', 'Teacher Timetable'] },
    { module: 'Live Class', features: ['Live Class', 'Live Class Reports'] },
    { module: 'Attachments Book', features: ['Attachments', 'Attachment Type'] },
    { module: 'Homework', features: ['Homework', 'Homework Evaluate', 'Evaluation Report'] },
    { module: 'Exam Master', features: ['Exam', 'Exam Term', 'Exam Hall', 'Exam Timetable', 'Exam Mark', 'Exam Grade', 'Mark Distribution', 'Report Card', 'Tabulation Sheet', 'Progress Reports', 'Marksheet Template', 'Generate Position'] },
    { module: 'Online Exam', features: ['Online Exam', 'Question Bank', 'Add Questions', 'Question Group', 'Exam Result', 'Position Generate'] },
    { module: 'Hostel', features: ['Hostel', 'Hostel Category', 'Hostel Room', 'Hostel Allocation'] },
    { module: 'Transport', features: ['Transport Route', 'Transport Vehicle', 'Transport Stoppage', 'Transport Assign', 'Transport Allocation', 'Fees setup'] },
    { module: 'Qr Code Attendance', features: ['QR Code Student Attendance', 'QR Code Employee Attendance', 'QR Code Student Report', 'QR Code Employee Report'] },
    { module: 'Attendance', features: ['Student Attendance', 'Employee Attendance', 'Exam Attendance', 'Student Attendance Report', 'Employee Attendance Report', 'Exam Attendance Report'] },
    { module: 'Library', features: ['Book', 'Book Category', 'Book Manage', 'Book Request'] },
    { module: 'Events', features: ['Event', 'Event Type'] },
    { module: 'Bulk Sms And Email', features: ['Sendsmsmail', 'Sendsmsmail Template', 'Sendsmsmail Reports', 'Student Birthday Wishes', 'Staff Birthday Wishes'] },
    { module: 'Student Accounting', features: ['Fees Type', 'Fees Group', 'Fees Fine Setup', 'Fees Allocation', 'Collect Fees', 'Fees Reminder', 'Due Invoice', 'Invoice', 'Fees Reports', 'Fees Revert', 'Offline Payments', 'Offline Payments Type'] },
    { module: 'Office Accounting', features: ['Account', 'Deposit', 'Expense', 'All Transactions', 'Voucher Head', 'Accounting Reports'] },
    { module: 'Custom Domain', features: ['Domain Request'] },
    { module: 'Two Factor Authenticator', features: ['2FA Settings'] },
    { module: 'Settings', features: ['Global Settings', 'Payment Settings', 'Sms Settings', 'Email Settings', 'Translations', 'Backup', 'School Settings', 'Accounting Links', 'Cron Job', 'Custom Field', 'Live Class Config', 'System Update', 'Whatsapp Config', 'System Student Field', 'User Login Log'] },
    { module: 'Alumni', features: ['Manage Alumni', 'Alumni Events'] },
    { module: 'Multi Class', features: ['Multi Class Student'] }
];
const allFeatures = permissionsConfig.flatMap(p => p.features);
const permissionTypes = ['view', 'add', 'edit', 'delete'];

type PermissionState = Record<string, { view: boolean; add: boolean; edit: boolean; delete: boolean }>;

const RolePermissionsAssignmentPage = () => {
    const location = useLocation();
    const { roleName } = location.state || { roleName: 'Role' };
    
    const initialPermissions = useMemo(() => {
        const state: PermissionState = {};
        allFeatures.forEach(feature => {
            state[feature] = { view: false, add: false, edit: false, delete: false };
        });
        return state;
    }, []);

    const [permissions, setPermissions] = useState<PermissionState>(initialPermissions);

    const handlePermissionChange = (feature: string, type: 'view' | 'add' | 'edit' | 'delete', value: boolean) => {
        setPermissions(prev => ({
            ...prev,
            [feature]: { ...prev[feature], [type]: value }
        }));
    };

    const handleMasterCheckboxChange = (type: 'view' | 'add' | 'edit' | 'delete', value: boolean) => {
        const newState = { ...permissions };
        for (const feature in newState) {
            newState[feature][type] = value;
        }
        setPermissions(newState);
    };

    return (
        <DashboardLayout title="Roles">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Role Permission For : <span className="text-primary">{roleName}</span></h2>
                    <Link to="/system-settings/role-permission" className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        &larr; Back to Role List
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider border dark:border-gray-600">Feature</th>
                                {permissionTypes.map(type => (
                                    <th key={type} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider border dark:border-gray-600 text-center">
                                        <label className="flex items-center justify-center">
                                            <input type="checkbox" onChange={e => handleMasterCheckboxChange(type as any, e.target.checked)} className="form-checkbox" />
                                            <span className="ml-2 capitalize">{type}</span>
                                        </label>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {permissionsConfig.map(module => (
                                <React.Fragment key={module.module}>
                                    <tr>
                                        <td colSpan={5} className="p-3 bg-gray-50 dark:bg-gray-700/30 font-bold text-text-primary dark:text-gray-200 border dark:border-gray-600">
                                            {module.module}
                                        </td>
                                    </tr>
                                    {module.features.map(feature => (
                                        <tr key={feature} className="hover:bg-gray-50 dark:hover:bg-gray-700/20">
                                            <td className="p-3 pl-8 text-sm text-text-secondary dark:text-gray-400 border dark:border-gray-600">
                                                <span className="mr-2">&ndash;</span> {feature}
                                            </td>
                                            {permissionTypes.map(type => (
                                                <td key={type} className="p-3 text-center border dark:border-gray-600">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={permissions[feature]?.[type as 'view' | 'add' | 'edit' | 'delete'] || false}
                                                        onChange={(e) => handlePermissionChange(feature, type as any, e.target.checked)}
                                                        className="form-checkbox"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pt-8 mt-6 border-t dark:border-gray-700 flex justify-center">
                    <button type="button" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                        {ICONS.update} Update
                    </button>
                </div>
            </div>
            <style>{`
                .form-checkbox {
                    height: 1.1rem;
                    width: 1.1rem;
                    border-radius: 0.25rem;
                    border-color: #D1D5DB;
                    color: #5D5FEF;
                    transition: all .15s ease-in-out;
                }
                html.dark .form-checkbox {
                     border-color: #4B5563;
                     background-color: #374151;
                }
                .form-checkbox:focus {
                     --tw-ring-color: #5D5FEF;
                     box-shadow: 0 0 0 2px var(--tw-ring-color);
                     border-color: #5D5FEF;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default RolePermissionsAssignmentPage;
