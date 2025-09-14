import React, { useState } from 'react';
import { useAuth } from '../App';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabase';
import { useTheme } from './ThemeProvider';

// --- SVG Icons for the new header ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const SearchIcon = () => <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;


interface DashboardHeaderProps {
    title: string;
    onToggleSidebar: () => void;
    showMobileMenuButton: boolean;
    showLogo?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, onToggleSidebar, showMobileMenuButton, showLogo }) => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { theme } = useTheme();

    const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
    const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
    const logoSrc = theme === 'light' ? logoLight : logoDark;

    const handleLogout = async () => {
        sessionStorage.removeItem('adminView'); // Clean up view state
        navigate('/');
        await supabase.auth.signOut();
    };
    
    // --- RENDER UNIFIED HEADER FOR ALL DASHBOARD PAGES ---
    return (
        <header className="bg-card dark:bg-gray-800 text-text-primary dark:text-gray-100 h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm dark:border-b dark:border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Hamburger icon - for mobile/sidebar toggle */}
                {showMobileMenuButton && (
                    <button onClick={onToggleSidebar} className="p-2 rounded-full text-text-secondary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 xl:hidden" aria-label="Toggle sidebar">
                        <MenuIcon />
                    </button>
                )}
                
                {showLogo ? (
                    <Link to="/dashboard">
                        <img src={logoSrc} alt="Acadeemia Logo" className="h-10 w-auto" />
                    </Link>
                ) : (
                    <h1 className="text-xl md:text-2xl font-semibold text-text-primary dark:text-gray-100">{title}</h1>
                )}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input type="text" placeholder="Search" className="bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <div className="absolute top-1/2 left-2 -translate-y-1/2">
                        <SearchIcon />
                    </div>
                </div>
                {/* Action Icons */}
                <button className="p-2 rounded-full text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Language"><GlobeIcon /></button>
                <button className="p-2 rounded-full text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Calendar"><CalendarIcon /></button>
                <button className="p-2 rounded-full text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative" aria-label="Notifications">
                    <BellIcon />
                    <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-card dark:ring-gray-800"></span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setProfileOpen(!isProfileOpen)} onBlur={() => setTimeout(() => setProfileOpen(false), 200)} className="block border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card dark:focus:ring-offset-gray-800 focus:ring-primary">
                        <img className="h-9 w-9 rounded-full object-cover" src={user?.user_metadata?.avatar_url || "https://picsum.photos/id/1027/100/100"} alt="User avatar" />
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 text-gray-800 dark:text-gray-200 ring-1 ring-black ring-opacity-5">
                           <div className="px-4 py-3 border-b dark:border-gray-600">
                               <p className="font-semibold text-sm">{profile?.full_name || 'Admin User'}</p>
                               <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                           </div>
                           <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
                           <div className="px-4 py-2 flex justify-between items-center text-sm">
                               <span>Theme</span>
                               <ThemeToggle />
                           </div>
                           <div className="border-t dark:border-gray-600 my-1"></div>
                           <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;