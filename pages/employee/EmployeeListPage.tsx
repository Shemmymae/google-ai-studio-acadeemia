
import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const TeacherIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>;
const AccountantIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 5h.01M12 5h.01M9 5h.01M4 7h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" /></svg>;
const LibrarianIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
const ReceptionistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const FileCopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>;
const CsvIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

// --- MOCK DATA ---
const allEmployees = [
    // Admins
    { id: 1, photo: 'https://i.pravatar.cc/150?img=15', branch: 'Icon School & College', staffId: '59f679e', name: 'Nicholas Fletcher', designation: 'Principal', role: 'Admin', department: 'Science', email: 'admin@ramom.com', mobile: '+1954-832-0058' },
    { id: 2, photo: 'https://i.pravatar.cc/150?img=25', branch: 'Oxford International', staffId: '4298f00', name: 'Emma Jarvis', designation: 'Director', role: 'Admin', department: 'General', email: 'admin2@ramom.com', mobile: '+1812-464-4685' },
    // Teachers
    { id: 3, photo: 'https://i.pravatar.cc/150?img=35', branch: 'Icon School & College', staffId: 'f528610', name: 'Summer Simpson', designation: 'Teacher', role: 'Teacher', department: 'Science', email: 'teacher@ramom.com', mobile: '+1-979-776-5395' },
    { id: 4, photo: 'https://i.pravatar.cc/150?img=45', branch: 'Icon School & College', staffId: '6021438', name: 'Jose McKinley', designation: 'Asst. Teacher', role: 'Teacher', department: 'General', email: 'jose@ramom.com', mobile: '+18583369479' },
    { id: 5, photo: 'https://i.pravatar.cc/150?img=55', branch: 'Oxford International', staffId: '7d51658', name: 'Shannon Ellis', designation: 'Teacher', role: 'Teacher', department: 'Science', email: 'teacher3@ramom.com', mobile: '+5056995322' },
    // Accountants
    { id: 6, photo: 'https://i.pravatar.cc/150?img=65', branch: 'Icon School & College', staffId: 'c3a24cc', name: 'Bhavini Guhathakurta', designation: 'Accountant', role: 'Accountant', department: 'Finance', email: 'accountant@ramom.com', mobile: '+17188353233' },
    { id: 7, photo: 'https://i.pravatar.cc/150?img=16', branch: 'Oxford International', staffId: '6970f4a', name: 'Callum Berry', designation: 'Accountant', role: 'Accountant', department: 'Finance', email: 'accountant2@ramom.com', mobile: '+1809-288-6396' },
    // Librarians
    { id: 8, photo: 'https://i.pravatar.cc/150?img=26', branch: 'Icon School & College', staffId: '9f2a312', name: 'Earnestine Tennant', designation: 'Librarian', role: 'Librarian', department: 'Library', email: 'librarian@ramom.com', mobile: '+7f201-739-9442' },
    { id: 9, photo: 'https://i.pravatar.cc/150?img=36', branch: 'Oxford International', staffId: 'a7c02c5', name: 'Dylan Hutchens', designation: 'Librarian', role: 'Librarian', department: 'Library', email: 'librarian2@ramom.com', mobile: '+15332465928' },
];

const tabs = [
    { name: 'Admin', icon: <AdminIcon /> },
    { name: 'Teacher', icon: <TeacherIcon /> },
    { name: 'Accountant', icon: <AccountantIcon /> },
    { name: 'Librarian', icon: <LibrarianIcon /> },
    { name: 'Receptionist', icon: <ReceptionistIcon /> }
];

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState(allEmployees);
    const [activeTab, setActiveTab] = useState('Admin');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    const filteredEmployees = useMemo(() => {
        return employees
            .filter(emp => emp.role === activeTab)
            .filter(emp => 
                emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.staffId.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [employees, activeTab, searchTerm]);
    
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    
    const handleDelete = (id: number) => {
        // In a real app, a confirmation modal would be ideal here.
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        }
    };
    
    // Reset page to 1 when tab or search term changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

  return (
    <DashboardLayout title="Employee">
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                {tabs.map(tab => (
                    <button 
                        key={tab.name} 
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === tab.name 
                            ? 'border-b-2 border-primary text-primary' 
                            : 'border-b-2 border-transparent text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-gray-200'
                        }`}
                    >
                        {tab.icon} {tab.name}
                    </button>
                ))}
            </div>
            
            {/* Table Container */}
            <div className="mt-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
                        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><FileCopyIcon /></button>
                        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><DocumentTextIcon /></button>
                        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><CsvIcon /></button>
                        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><PrintIcon /></button>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-4 pr-10 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700/50">
                            <tr>
                                {['Sl', 'Photo', 'Branch', 'Staff ID', 'Name', 'Designation', 'Department', 'Email', 'Mobile No', 'Action'].map(head => (
                                    <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                             {currentItems.length > 0 ? currentItems.map((employee, index) => (
                                 <tr key={employee.id}>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{indexOfFirstItem + index + 1}</td>
                                     <td className="p-3"><img src={employee.photo} alt={employee.name} className="h-10 w-10 rounded-full object-cover"/></td>
                                     <td className="p-3 text-sm text-text-primary dark:text-gray-200">{employee.branch}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{employee.staffId}</td>
                                     <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">{employee.name}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{employee.designation}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{employee.department}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{employee.email}</td>
                                     <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{employee.mobile}</td>
                                     <td className="p-3">
                                         <div className="flex space-x-2">
                                            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-text-secondary dark:text-gray-200 hover:opacity-80" aria-label="View Details"><PlusIcon/></button>
                                            <button onClick={() => handleDelete(employee.id)} className="h-8 w-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700" aria-label="Delete Employee"><TrashIcon/></button>
                                         </div>
                                     </td>
                                 </tr>
                             )) : (
                                <tr>
                                    <td colSpan={10} className="text-center p-8 text-text-secondary dark:text-gray-400">
                                        No data available in table
                                    </td>
                                </tr>
                             )}
                         </tbody>
                    </table>
                </div>
                 <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
                    <p>Showing {filteredEmployees.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} entries</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-2">
                            <select value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))} className="bg-transparent border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary">
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span>rows per page</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md dark:border-gray-600 text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&lt;</button>
                            <button className="px-3 py-1 rounded-md bg-primary text-white">{currentPage}</button>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded-md dark:border-gray-600 text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default EmployeeListPage;
