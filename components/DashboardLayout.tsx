import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for react-router-dom.
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { supabase } from '../supabase';

// Define the notification type
type Notification = {
  title: string;
  message: string;
  link: string;
};

// Create the toast component
const NotificationToast = ({ notification, onClose }: { notification: Notification; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 8000); // Auto-dismiss after 8 seconds

        return () => clearTimeout(timer);
    }, [notification, onClose]);

    return (
        <div className="fixed top-8 right-8 w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4 z-50 animate-slide-in-right">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{notification.title}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                    <Link to={notification.link} onClick={onClose} className="mt-2 text-sm font-semibold text-primary hover:underline">
                        View Submission &rarr;
                    </Link>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={onClose} className="inline-flex text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300">
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Determine if the sidebar should be shown based on the current route
  const showSidebar = location.pathname !== '/admin-home';
  const isSuperAdminLanding = location.pathname === '/admin-home';

  useEffect(() => {
    // --- Real-time Subscriptions for Form Submissions ---
    const handleNewSubmission = (payload: any, formType: 'Contact' | 'Demo' | 'Newsletter') => {
        const name = payload.new.name || 'N/A';
        const email = payload.new.email || 'N/A';
        
        let link = '/forms-manager/contact-us';
        if (formType === 'Demo') link = '/forms-manager/demo-requests';
        if (formType === 'Newsletter') link = '/forms-manager/newsletter';

        setNotification({
            title: `New ${formType} Submission`,
            message: `From: ${name} (${email})`,
            link: link,
        });
    };

    const contactChannel = supabase.channel('public:contact_us_submissions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_us_submissions' }, 
      (payload) => handleNewSubmission(payload, 'Contact'))
      .subscribe();

    const demoChannel = supabase.channel('public:demo_requests')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'demo_requests' }, 
      (payload) => handleNewSubmission(payload, 'Demo'))
      .subscribe();
      
    const newsletterChannel = supabase.channel('public:newsletter_subscribers')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'newsletter_subscribers' }, 
      (payload) => handleNewSubmission(payload, 'Newsletter'))
      .subscribe();

    // Cleanup function
    return () => {
        supabase.removeChannel(contactChannel);
        supabase.removeChannel(demoChannel);
        supabase.removeChannel(newsletterChannel);
    };
  }, []);

  return (
    <div className="flex bg-[#F0F2F5] dark:bg-gray-900 min-h-screen">
      {showSidebar && <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className={`flex-1 ${showSidebar ? 'xl:ml-64' : ''} transition-all duration-300`}>
        <DashboardHeader 
            title={title} 
            onToggleSidebar={() => setSidebarOpen(true)} 
            showMobileMenuButton={showSidebar}
            showLogo={isSuperAdminLanding}
        />
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
      {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
      <style>{`
        .form-input, .form-select, .form-textarea, .form-radio, .form-checkbox {
            transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            border-width: 1px;
        }
        .form-radio, .form-checkbox {
            color: #5D5FEF;
        }
        html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea {
            border-color: #D1D5DB;
            background-color: #FFFFFF;
            color: #111827;
        }
        html.dark .form-input, html.dark .form-select, html.dark .form-textarea {
            border-color: #4B5563; 
            background-color: #374151;
            color: #F9FAFB;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-color: #5D5FEF;
            box-shadow: 0 0 0 2px var(--tw-ring-color);
            border-color: #5D5FEF;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;