
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for react-router-dom.
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../App';
import { getSchoolById, School } from '../db';
import { format, addMonths, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';

// --- Icons ---
const icons = {
  employee: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682m0 0A3.006 3.006 0 0112 13.489M12 13.489c1.218 0 2.33.507 3.111 1.329M12 13.489a3.006 3.006 0 01-3.111-1.329m0 0A3 3 0 016 10V7a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-2.111 2.818" /></svg>,
  students: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>,
  parents: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>,
  teachers: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>,
  admission: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  voucher: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
  transport: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18h3v-7a2 2 0 00-2-2h-1" /></svg>,
  hostel: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  birthdayCake: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454V12a3 3 0 013-3h12a3 3 0 013 3v3.546zM12 3v5.536M10 5l1 1 1-1" /></svg>,
};


const incomeExpenseData = [{ name: 'Income', value: 400 }, { name: 'Expense', value: 300 }];
const annualFeeData = [
  { name: 'Jan', Total: 2000, Collected: 1000, Remaining: 1000 },
  { name: 'Feb', Total: 3500, Collected: 2000, Remaining: 1500 },
  { name: 'Mar', Total: 7800, Collected: 4000, Remaining: 3800 },
  { name: 'Apr', Total: 4000, Collected: 2500, Remaining: 1500 },
  { name: 'May', Total: 2200, Collected: 1800, Remaining: 400 },
  { name: 'Jun', Total: 5500, Collected: 2000, Remaining: 3500 },
  { name: 'Jul', Total: 0, Collected: 0, Remaining: 0 },
];
const studentQuantityData = [{ name: 'Six', value: 80, fill: '#8884d8' }, { name: 'Seven', value: 20, fill: '#82ca9d' }];
const attendanceData = [
  { name: '02-Sep', Employee: 0.8, Student: 0.9 },
  { name: '03-Sep', Employee: 0.7, Student: 0.85 },
  { name: '04-Sep', Employee: 0.9, Student: 0.92 },
  { name: '05-Sep', Employee: 0.85, Student: 0.88 },
];


const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-full flex flex-col">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
        <div className="flex-grow">{children}</div>
    </div>
);

const StatCard = ({ title, value, totalLabel, icon, color, underlineColor }: { title: string, value: string, totalLabel: string, icon: React.ReactNode, color: string, underlineColor: string }) => (
    <div className={`${color} text-white p-4 rounded-lg shadow-sm`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            {icon}
        </div>
        <div className={`w-full h-0.5 ${underlineColor} mt-2`}></div>
        <p className="text-sm mt-1">{totalLabel}</p>
    </div>
);

const CustomCalendar = ({ month, setMonth }: { month: Date, setMonth: (date: Date) => void }) => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 }); // Start week on Monday
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div>
            <div className="grid grid-cols-7 text-center font-semibold text-xs sm:text-sm text-text-secondary dark:text-gray-400">
                {weekdays.map(day => (
                    <div key={day} className="py-2 border-b dark:border-gray-700">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={`
                            h-16 sm:h-20 p-1 border-t border-l dark:border-gray-700 text-text-primary dark:text-gray-200
                            ${!isSameMonth(day, month) && 'text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50'}
                            ${isToday(day) && 'bg-primary/10'}
                        `}
                    >
                         <span className={`
                            flex items-center justify-center h-6 w-6 rounded-full text-xs ml-auto
                            ${isToday(day) ? 'bg-primary text-white font-bold' : ''}
                        `}>
                            {format(day, 'd')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EventsCalendar = () => {
    const [month, setMonth] = useState(new Date(2025, 8)); // September 2025
    const [view, setView] = useState('Month');

    const handlePrevMonth = () => setMonth(addMonths(month, -1));
    const handleNextMonth = () => setMonth(addMonths(month, 1));
    const handleToday = () => setMonth(new Date());

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-full">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                 <div className="flex items-center space-x-1">
                     <button onClick={handlePrevMonth} className="p-1 rounded text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">&lt;</button>
                     <button onClick={handleNextMonth} className="p-1 rounded text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
                     <button onClick={handleToday} className="px-3 py-1 text-xs font-semibold border rounded text-text-secondary dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">Today</button>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 order-first w-full text-center sm:order-none sm:w-auto">
                    🗓️ {format(month, 'MMMM yyyy')}
                </h3>
                 <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md p-1 text-xs">
                    {['Month', 'Week', 'Day', 'List'].map(v => (
                        <button key={v} onClick={() => setView(v)} className={`px-2 py-0.5 rounded transition-colors ${view === v ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white'}`}>
                            {v}
                        </button>
                    ))}
                 </div>
            </div>
            {view === 'Month' ? (
                <CustomCalendar month={month} setMonth={setMonth} />
            ) : (
                 <div className="flex items-center justify-center h-full text-text-secondary dark:text-gray-400">
                    <p>{view} view is not implemented yet.</p>
                </div>
            )}
        </div>
    );
};

const BirthdayWidget = ({ title, icon, count, bgColor }: { title: string, icon: React.ReactNode, count: number, bgColor: string }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
            <div className={`p-2 rounded-full ${bgColor}`}>{icon}</div>
            <div className="ml-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{count}</p>
            </div>
        </div>
        <div className="w-full h-0.5 bg-pink-400 mt-2"></div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">TODAY BIRTHDAY</p>
    </div>
);


const DashboardPage = () => {
    const { schoolId } = useParams<{ schoolId?: string }>();
    const { profile, school: userSchool } = useAuth();
    const [title, setTitle] = useState('Dashboard');
    const [loadingTitle, setLoadingTitle] = useState(true);

    useEffect(() => {
        const determineTitle = async () => {
            setLoadingTitle(true);
            if (schoolId) {
                // Individual school dashboard for Super Admin
                const schoolData = await getSchoolById(parseInt(schoolId, 10));
                setTitle(schoolData ? `${schoolData.name} Dashboard` : 'School Dashboard');
            } else {
                if (profile?.role === 'Super Admin') {
                    // Universal dashboard for Super Admin
                    setTitle('All Schools Dashboard');
                } else if (userSchool) {
                    // Dashboard for a regular school user
                    setTitle(`${userSchool.name} Dashboard`);
                }
            }
            setLoadingTitle(false);
        };
        determineTitle();
    }, [schoolId, profile, userSchool]);

    return (
        <DashboardLayout title={loadingTitle ? 'Loading...' : title}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Row 1 */}
                <div className="md:col-span-1 lg:col-span-1">
                    <ChartCard title="Income Vs Expense Of September">
                        <ResponsiveContainer width="100%" height={250}>
                             <PieChart>
                                <Pie data={incomeExpenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    <Cell fill="#007bff" />
                                    <Cell fill="#e83e8c" />
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                <div className="md:col-span-1 lg:col-span-3">
                     <ChartCard title="Annual Fee Summary">
                         <ResponsiveContainer width="100%" height={250}>
                             <AreaChart data={annualFeeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="Total" stackId="1" stroke="#dc3545" fill="#dc3545" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="Collected" stackId="1" stroke="#007bff" fill="#007bff" fillOpacity={0.6}/>
                                <Area type="monotone" dataKey="Remaining" stackId="1" stroke="#6f42c1" fill="#6f42c1" fillOpacity={0.6}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Row 2 */}
                <StatCard title="Employee" value="6" totalLabel="TOTAL STRENGTH" icon={icons.employee} color="bg-blue-500" underlineColor="bg-red-400" />
                <StatCard title="Students" value="11" totalLabel="TOTAL STRENGTH" icon={icons.students} color="bg-indigo-500" underlineColor="bg-red-400" />
                <StatCard title="Parents" value="5" totalLabel="TOTAL STRENGTH" icon={icons.parents} color="bg-purple-500" underlineColor="bg-red-400" />
                <StatCard title="Teachers" value="8" totalLabel="TOTAL STRENGTH" icon={icons.teachers} color="bg-pink-500" underlineColor="bg-red-400" />
                
                {/* Row 3 */}
                <div className="md:col-span-2 lg:col-span-2">
                    <ChartCard title="Student Quantity">
                        <ResponsiveContainer width="100%" height={250}>
                            <RadialBarChart innerRadius="50%" outerRadius="80%" data={studentQuantityData} startAngle={90} endAngle={-270}>
                                <RadialBar background dataKey="value" />
                                <Legend iconType="circle" />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                    <ChartCard title="Weekend Attendance Inspection">
                         <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis domain={[-1,1]} fontSize={12}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Employee" fill="#007bff" />
                                <Bar dataKey="Student" fill="#dc3545" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                
                 {/* Row 4 */}
                <StatCard title="Admission" value="0" totalLabel="INTERVAL 30 DAYS" icon={icons.admission} color="bg-red-500" underlineColor="bg-blue-300" />
                <StatCard title="Voucher" value="0" totalLabel="TOTAL NUMBER" icon={icons.voucher} color="bg-red-500" underlineColor="bg-blue-300" />
                <StatCard title="Transport" value="4" totalLabel="TOTAL ROUTE" icon={icons.transport} color="bg-red-500" underlineColor="bg-blue-300" />
                <StatCard title="Hostel" value="6" totalLabel="TOTAL ROOM" icon={icons.hostel} color="bg-red-500" underlineColor="bg-blue-300" />
                
                {/* Row 5 */}
                <div className="md:col-span-2 lg:col-span-3">
                    <EventsCalendar />
                </div>
                <div className="md:col-span-2 lg:col-span-1 space-y-6">
                    <BirthdayWidget title="Student" icon={icons.birthdayCake} count={0} bgColor="bg-blue-100 dark:bg-blue-900/50" />
                    <BirthdayWidget title="Employee" icon={icons.birthdayCake} count={0} bgColor="bg-blue-100 dark:bg-blue-900/50" />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
