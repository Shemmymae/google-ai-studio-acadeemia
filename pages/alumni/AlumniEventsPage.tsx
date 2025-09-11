

import React, { useState }from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { format, addMonths, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';

// --- SVG Icons ---
const EventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;


const eventsData = [
    { id: 1, title: 'xx', startDate: '15.May.2024', endDate: '31.Aug.2024', audience: 'Everybody' },
    { id: 2, title: 'damo', startDate: '24.May.2024', endDate: '26.May.2024', audience: 'Class - Ten\nPassing Session : 2024-2025' },
    { id: 3, title: 'abc testing', startDate: '01.Jun.2024', endDate: '01.Jun.2024', audience: 'Class - Seven\nPassing Session : 2024-2025' },
    { id: 4, title: 'Party', startDate: '28.Jun.2024', endDate: '29.Jun.2024', audience: 'Class - Six\nPassing Session : 2025-2026' },
    { id: 5, title: 'Farewell Party', startDate: '29.Jul.2024', endDate: '29.Jul.2024', audience: 'Everybody' },
    { id: 6, title: 'Testing Event111111', startDate: '12.Aug.2024', endDate: '14.Aug.2024', audience: 'Everybody' },
    { id: 7, title: 'youth festival', startDate: '20.Aug.2024', endDate: '22.Aug.2024', audience: 'Everybody' },
    { id: 8, title: 'New Event', startDate: '23.Aug.2024', endDate: '23.Aug.2024', audience: 'Everybody' },
    { id: 9, title: 'ram', startDate: '02.Sep.2024', endDate: '10.Sep.2024', audience: 'Everybody' },
    { id: 10, title: 'hdhndhtn', startDate: '12.Oct.2024', endDate: '15.Oct.2024', audience: 'Section - Six (A)\nPassing Session : 2024-2025' },
    { id: 11, title: 'Social', startDate: '03.Dec.2024', endDate: '03.Dec.2024', audience: 'Class - Six\nPassing Session : 2025-2026' },
    { id: 12, title: 'test', startDate: '22.Dec.2024', endDate: '31.Dec.2024', audience: 'Everybody' },
    { id: 13, title: 'test', startDate: '05.Jan.2025', endDate: '05.Jan.2025', audience: 'Everybody' },
    { id: 14, title: 'test', startDate: '10.Jan.2025', endDate: '06.Jan.2025', audience: 'Class - Six\nPassing Session : 2023-2024' },
    { id: 15, title: 'tst', startDate: '12.Jan.2025', endDate: '13.Jan.2025', audience: 'Everybody' },
    { id: 16, title: 'fhufnu', startDate: '04.Feb.2025', endDate: '12.Feb.2025', audience: 'Everybody' },
];

const CustomCalendar = ({ month, setMonth }: { month: Date, setMonth: (date: Date) => void }) => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 }); // Start week on Monday
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div>
            <div className="grid grid-cols-7 text-center font-semibold text-sm text-text-secondary dark:text-gray-400 border-b border-l border-r dark:border-gray-700">
                {weekdays.map(day => (
                    <div key={day} className="py-2 border-r dark:border-gray-700 last:border-r-0">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 border-l border-b dark:border-gray-700">
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={`
                            h-24 p-2 border-t border-r dark:border-gray-700
                            ${!isSameMonth(day, month) && 'bg-gray-50 dark:bg-gray-800/50'}
                            ${isToday(day) && 'bg-primary/10'}
                        `}
                    >
                        <span className={`
                            flex items-center justify-center h-7 w-7 rounded-full text-sm ml-auto
                            ${!isSameMonth(day, month) && 'text-gray-400 dark:text-gray-500'}
                            ${isToday(day) ? 'bg-primary text-white font-bold' : 'text-text-primary dark:text-gray-200'}
                        `}>
                            {format(day, 'd')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AlumniEventsPage = () => {
    const [month, setMonth] = useState(new Date(2025, 8)); // September 2025
    const [view, setView] = useState('Month');
    
    const handlePrevMonth = () => setMonth(addMonths(month, -1));
    const handleNextMonth = () => setMonth(addMonths(month, 1));
    const handleToday = () => setMonth(new Date());

    return (
        <DashboardLayout title="Alumni">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Events List */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center border-b-2 border-primary pb-3 mb-4">
                        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 flex items-center">
                            <EventsIcon />
                            <span className="ml-2">Events List</span>
                        </h2>
                        <button className="flex items-center bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                            <AddIcon /> Add Events
                        </button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-text-secondary dark:text-gray-400">
                            <select className="bg-card dark:bg-gray-800 border dark:border-gray-600 rounded-md p-1.5 focus:ring-primary focus:border-primary">
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span className="ml-2">rows per page</span>
                        </div>
                        <input type="text" placeholder="Search..." className="w-48 px-3 py-1.5 border rounded-lg bg-card dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700/50">
                                <tr>
                                    {['#', 'Title', 'Photo', 'Date', 'Audience', 'Action'].map(h => (
                                        <th key={h} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {eventsData.map((event) => (
                                    <tr key={event.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{event.id}</td>
                                        <td className="p-3 text-sm text-text-primary dark:text-gray-200">{event.title}</td>
                                        <td className="p-3">
                                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex flex-col items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                                <PhotoIcon/>
                                                <span>Photo</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                                            <div>Date Of Start : {event.startDate}</div>
                                            <div>Date Of End : {event.endDate}</div>
                                        </td>
                                        <td className="p-3 text-sm text-text-secondary dark:text-gray-400 whitespace-pre-line">{event.audience}</td>
                                        <td className="p-3">
                                            <div className="flex space-x-2">
                                                <button className="p-2 bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-600"><ViewIcon /></button>
                                                <button className="p-2 bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-600"><EditIcon /></button>
                                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="flex justify-end items-center mt-4">
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border rounded-md dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">&lt;</button>
                            <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                            <button className="px-3 py-1 border rounded-md dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
                        </div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-primary pb-3 mb-4">
                        <div className="flex items-center space-x-2">
                             <button onClick={handlePrevMonth} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">&lt;</button>
                             <button onClick={handleNextMonth} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
                             <button onClick={handleToday} className="px-4 py-2 text-sm font-semibold border rounded dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">Today</button>
                        </div>
                         <div className="flex items-center text-xl font-semibold text-text-primary dark:text-gray-100 my-2 sm:my-0">
                            <CalendarIcon />
                            <span className="ml-2">{format(month, 'MMMM yyyy')}</span>
                         </div>
                         <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md p-1">
                            {['Month', 'Week', 'Day', 'List'].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`px-3 py-1 text-sm font-semibold rounded ${view === v ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-text-secondary dark:text-gray-300'}`}
                                >
                                    {v}
                                </button>
                            ))}
                         </div>
                    </div>
                    {view === 'Month' ? (
                       <CustomCalendar month={month} setMonth={setMonth} />
                    ) : (
                        <div className="flex items-center justify-center h-[400px] text-text-secondary dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-md">
                            <p>{view} view is not implemented yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AlumniEventsPage;