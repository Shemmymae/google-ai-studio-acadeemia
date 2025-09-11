
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const attendanceData = [
    { id: 'S001', name: 'Alice Johnson', status: 'present' },
    { id: 'S002', name: 'Bob Smith', status: 'present' },
    { id: 'S003', name: 'Charlie Brown', status: 'absent' },
    { id: 'S004', name: 'Diana Prince', status: 'late' },
    { id: 'S005', name: 'Ethan Hunt', status: 'present' },
];

const AttendancePage = () => {
  return (
    <DashboardLayout title="Daily Attendance">
      <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Mark Attendance</h2>
                <p className="text-text-secondary dark:text-gray-400">Select class and date to view student list.</p>
            </div>
            <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>Select Class</option>
                    <option>Grade 10 - Section A</option>
                    <option>Grade 11 - Section B</option>
                </select>
                <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
            </div>
        </div>

         <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-4 font-semibold text-text-secondary dark:text-gray-300">Student Name</th>
                <th className="p-4 font-semibold text-center text-text-secondary dark:text-gray-300">Present</th>
                <th className="p-4 font-semibold text-center text-text-secondary dark:text-gray-300">Absent</th>
                <th className="p-4 font-semibold text-center text-text-secondary dark:text-gray-300">Late</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map(student => (
                <tr key={student.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4 font-medium text-text-primary dark:text-gray-100">{student.name}</td>
                  <td className="p-4 text-center">
                    <input type="radio" name={`attendance-${student.id}`} className="form-radio h-5 w-5 text-primary focus:ring-primary dark:bg-gray-600 dark:border-gray-500" defaultChecked={student.status === 'present'}/>
                  </td>
                  <td className="p-4 text-center">
                    <input type="radio" name={`attendance-${student.id}`} className="form-radio h-5 w-5 text-red-500 focus:ring-red-500 dark:bg-gray-600 dark:border-gray-500" defaultChecked={student.status === 'absent'}/>
                  </td>
                  <td className="p-4 text-center">
                    <input type="radio" name={`attendance-${student.id}`} className="form-radio h-5 w-5 text-yellow-500 focus:ring-yellow-500 dark:bg-gray-600 dark:border-gray-500" defaultChecked={student.status === 'late'}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Submit Attendance</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;