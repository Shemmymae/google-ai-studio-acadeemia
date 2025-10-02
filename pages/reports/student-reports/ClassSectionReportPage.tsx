import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

const ClassSectionReportPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    school: '',
    class: '',
    section: ''
  });

  const handleFilter = () => {
    setShowResults(true);
  };

  const mockData = [
    { id: 1, sl: 1, photo: '/api/placeholder/40/40', name: 'Danielle Solomon', gender: 'Male', registerNo: 'RSM-00001', roll: 1, class: 'Six', section: 'A', guardianName: 'Binoya Naik', admissionDate: '25.Mar.2025' },
    { id: 2, sl: 2, photo: '/api/placeholder/40/40', name: 'Angelina Jolie', gender: 'Female', registerNo: 'RSM-00002', roll: 2, class: 'Six', section: 'A', guardianName: 'Summer Dixon', admissionDate: '25.Mar.2025' },
    { id: 3, sl: 3, photo: '/api/placeholder/40/40', name: 'Mollie Flores', gender: 'Female', registerNo: 'RSM-00003', roll: 3, class: 'Six', section: 'A', guardianName: 'Summer Dixon', admissionDate: '25.Mar.2025' },
    { id: 4, sl: 4, photo: '/api/placeholder/40/40', name: 'Gajendra Brahmbhatt', gender: 'Male', registerNo: 'RSM-00009', roll: 4, class: 'Six', section: 'A', guardianName: 'Binoya Naik', admissionDate: '27.Apr.2025' }
  ];

  return (
    <DashboardLayout title="Reports - Class & Section Report">
      <div className="space-y-6">
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-6">Select Ground</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                School <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-700 dark:bg-gray-900 text-white rounded border border-gray-600 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filters.school}
                onChange={(e) => setFilters({...filters, school: e.target.value})}
              >
                <option value="">Select</option>
                <option value="icon">Icon School & College</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-700 dark:bg-gray-900 text-white rounded border border-gray-600 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filters.class}
                onChange={(e) => setFilters({...filters, class: e.target.value})}
                disabled={!filters.school}
              >
                <option value="">First Select The School</option>
                <option value="six">Six</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-700 dark:bg-gray-900 text-white rounded border border-gray-600 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filters.section}
                onChange={(e) => setFilters({...filters, section: e.target.value})}
                disabled={!filters.class}
              >
                <option value="">Select Class First</option>
                <option value="all">All Sections</option>
                <option value="a">A</option>
                <option value="b">B</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-gray-700 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-800 text-white rounded border border-gray-600 dark:border-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {showResults && (
          <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-teal-500">
              <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100">Class & Section Report</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="Copy">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="Excel">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="CSV">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="PDF">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="Print">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-700 dark:hover:bg-gray-900 rounded transition-colors" title="Column visibility">
                  <svg className="w-5 h-5 text-text-primary dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 bg-gray-700 dark:bg-gray-900 text-white rounded border border-gray-600 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 dark:border-gray-600">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Sl</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Photo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Gender</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Register No</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Roll</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Class</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Section</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Guardian Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 dark:text-gray-500">Admission Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((student) => (
                    <tr key={student.id} className="border-b border-gray-700 dark:border-gray-600 hover:bg-gray-700/50 dark:hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.sl}</td>
                      <td className="py-3 px-4">
                        <img src={student.photo} alt={student.name} className="w-10 h-10 rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <a href="#" className="text-blue-500 hover:text-blue-400 hover:underline">{student.name}</a>
                      </td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.gender}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.registerNo}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.roll}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.class}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.section}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.guardianName}</td>
                      <td className="py-3 px-4 text-text-secondary dark:text-gray-400">{student.admissionDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-text-secondary dark:text-gray-400">
                Showing 1 to {mockData.length} of {mockData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1 bg-gray-700 dark:bg-gray-900 text-white rounded border border-gray-600 dark:border-gray-700">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-sm text-text-secondary dark:text-gray-400">rows per page</span>
                <button className="p-1 hover:bg-gray-700 dark:hover:bg-gray-900 rounded">
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded">1</button>
                <button className="p-1 hover:bg-gray-700 dark:hover:bg-gray-900 rounded">
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClassSectionReportPage;