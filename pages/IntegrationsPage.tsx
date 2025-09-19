

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getGoogleAnalyticsConfig, upsertGoogleAnalyticsConfig, getCalendlyConfig, upsertCalendlyConfig, getPusherConfig, upsertPusherConfig, PusherConfig, getApiConfig, upsertApiConfig, ApiConfig } from '../db';


// --- SVG Icons for Integrations ---
const ICONS: { [key: string]: React.ReactNode } = {
  'Calendly': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 7V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  'Google Analytics': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 18.5L22 22" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Tawk.to Messenger': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#03A84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Pusher': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#7D41DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7L12 12" stroke="#7D41DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V12" stroke="#7D41DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7L12 12" stroke="#7D41DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 4.5L7 9.5" stroke="#7D41DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'WhatsApp API': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.75 13.96C17.05 14.28 17.34 14.61 17.6 14.96C17.66 15.03 17.71 15.11 17.76 15.18C18.66 16.32 18.16 17.84 16.94 18.52C16.88 18.55 16.81 18.57 16.75 18.6C16.3 18.8 15.82 18.91 15.34 18.9C13.25 18.9 11.31 18.11 9.8 16.65C8.25 15.15 7.41 13.26 7.36 11.23C7.31 10.74 7.37 10.27 7.53 9.81C8.24 7.53 10.43 6.64 12.44 7.62C12.51 7.65 12.58 7.69 12.64 7.73C13.56 8.35 14.25 9.24 14.66 10.27C14.7 10.35 14.74 10.43 14.78 10.51" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Meet': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18V6C15 5.44772 14.5523 5 14 5Z" stroke="#008373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9L21 6V18L15 15" stroke="#008373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Sheet': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15H15" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Drive': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L18 2L22 12L12 22L2 12L6 2Z" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22L8 12L12 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22L16 12L12 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12H22" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Docs': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17H8" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9H8" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Zoom': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18V6C15 5.44772 14.5523 5 14 5Z" stroke="#2D8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9L21 6V18L15 15" stroke="#2D8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Calendar': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2V5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2V5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.5 9H20.5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Outlook Calendar': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V6" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V18" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 3V21" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3H15" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21H15" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Webhook': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8" stroke="#F48024" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#F48024" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12V22" stroke="#F48024" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18H16" stroke="#F48024" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'N8n': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1A82E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9L9 15" stroke="#1A82E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9L15 15" stroke="#1A82E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Forms': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#7B56C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="#7B56C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18H8" stroke="#7B56C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14H8" stroke="#7B56C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'OneDrive': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2 2.1C11.5-1.5 6.1-1.5 4.4 2.1C2.7 5.7 6.1 9.4 6.1 9.4L4.4 13C2.7 16.6 6.1 20.2 6.1 20.2C7.8 23.8 13.2 23.8 14.8 20.2C16.5 16.6 13.2 13 13.2 13L14.8 9.4C16.5 5.7 14.8 2.1 13.2 2.1Z" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Dropbox': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L6 6L12 10L18 6L12 2Z" stroke="#0061FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L2 10L8 14L6 6Z" stroke="#0061FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 6L22 10L16 14L18 6Z" stroke="#0061FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22L18 18L12 14L6 18L12 22Z" stroke="#0061FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'QuickBooks': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2CA01C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 16V12" stroke="#2CA01C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8H12.01" stroke="#2CA01C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Outlook Mail': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12H22" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L15 15" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L15 9" stroke="#0072C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'To Do': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12C22 16.97 16.97 22 12 22C7.03 22 2 16.97 2 12C2 7.03 7.03 2 12 2C12.44 2 12.87 2.02 13.3 2.07" stroke="#3E65A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2L22 8" stroke="#3E65A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8L22 2" stroke="#3E65A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'API': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Google Captcha': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4274 7.03871C13.1259 7.15848 13.774 7.52152 14.2792 8.0691C14.7844 8.61668 15.1194 9.31448 15.23 10" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 15C14.64 15.35 14.21 15.61 13.74 15.76" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'PesaPal': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#AE2012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L22 17" stroke="#AE2012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2L2 7" stroke="#AE2012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'DPO Pay': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L22 17" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2L2 7" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Mpesa': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 10L14 14" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 10L10 14" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  'Paystack': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00C3F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L22 17" stroke="#00C3F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2L2 7" stroke="#00C3F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// --- Data Structure for Integrations ---
const initialIntegrationData = [
    { id: 1, name: 'Google Analytics', description: 'Track engagement and user activity with Google Analytics for insightful data.', category: 'Analytics', connected: false },
    { id: 2, name: 'Tawk.to Messenger', description: 'Integrate live chat on your website to communicate with visitors in real-time.', category: 'Communication', connected: false },
    { id: 3, name: 'Pusher', description: 'Enable real-time features like notifications and live updates in your application.', category: 'Developer Tools', connected: false },
    { id: 4, name: 'WhatsApp API', description: 'Send notifications, alerts, and communicate with parents and students via WhatsApp.', category: 'Communication', connected: false },
    { id: 5, name: 'Google Meet', description: 'Schedule and conduct online classes and meetings directly from Acadeemia.', category: 'Productivity', connected: false },
    { id: 6, name: 'Google Sheet', description: 'Export reports and data to Google Sheets for advanced analysis and sharing.', category: 'Productivity', connected: false },
    { id: 7, name: 'Google Drive', description: 'Store and access documents, assignments, and resources from your Google Drive.', category: 'Productivity', connected: false },
    { id: 8, name: 'Google Docs', description: 'Create and collaborate on documents for assignments, notes, and school policies.', category: 'Productivity', connected: false },
    { id: 9, name: 'Zoom', description: 'Host virtual classrooms, webinars, and parent-teacher meetings with Zoom.', category: 'Productivity', connected: false },
    { id: 10, name: 'Google Calendar', description: 'Sync school events, schedules, and deadlines with Google Calendar.', category: 'Productivity', connected: false },
    { id: 11, name: 'Outlook Calendar', description: 'Keep your school schedule organized by syncing with Outlook Calendar.', category: 'Productivity', connected: false },
    { id: 26, name: 'Calendly', description: 'Automate meeting and appointment scheduling with parents and prospective students.', category: 'Productivity', connected: false },
    { id: 12, name: 'Webhook', description: 'Connect Acadeemia to other apps and services with custom webhooks.', category: 'Developer Tools', connected: false },
    { id: 13, name: 'N8n', description: 'Automate complex workflows between Acadeemia and hundreds of other applications.', category: 'Developer Tools', connected: false },
    { id: 14, name: 'Google Forms', description: 'Create and embed Google Forms for surveys, registrations, and feedback.', category: 'Productivity', connected: false },
    { id: 15, name: 'OneDrive', description: 'Integrate Microsoft OneDrive for secure cloud storage and file sharing.', category: 'Productivity', connected: false },
    { id: 16, name: 'Dropbox', description: 'Sync and share files and educational materials using Dropbox.', category: 'Productivity', connected: false },
    { id: 17, name: 'QuickBooks', description: 'Streamline your accounting by syncing financial data with QuickBooks.', category: 'Finance', connected: false },
    { id: 18, name: 'Outlook Mail', description: 'Send and receive emails from within Acadeemia using your Outlook account.', category: 'Communication', connected: false },
    { id: 19, name: 'To Do', description: 'Manage tasks and to-do lists for staff and students with Microsoft To Do.', category: 'Productivity', connected: false },
    { id: 20, name: 'Google Captcha', description: 'Protect your forms from spam and abuse with Google reCAPTCHA.', category: 'Security', connected: false },
    { id: 21, name: 'PesaPal', description: 'Accept online payments through PesaPal for school fees and other services.', category: 'Finance', connected: false },
    { id: 22, name: 'DPO Pay', description: 'Enable secure online payments with DPO Pay for a seamless checkout experience.', category: 'Finance', connected: false },
    { id: 23, name: 'Mpesa', description: 'Collect payments easily in Kenya with the M-Pesa mobile money service.', category: 'Finance', connected: false },
    { id: 24, name: 'Paystack', description: 'Process online payments from parents and students with Paystack.', category: 'Finance', connected: false },
    { id: 25, name: 'API', description: 'Connect with external services using custom API keys and endpoints.', category: 'Developer Tools', connected: false },
].map(item => ({ ...item, icon: ICONS[item.name] || ICONS['API'] }));

// --- Component for the toggle switch ---
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (e: React.MouseEvent) => void }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800`}
        role="switch"
        aria-checked={enabled}
        onClick={onChange}
    >
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);


// --- Component for each integration card ---
const IntegrationCard = ({ integration, onToggle }: { integration: typeof initialIntegrationData[0]; onToggle: (id: number) => void }) => (
    <div className="bg-card dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col gap-4 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">{integration.icon}</div>
            <ToggleSwitch enabled={integration.connected} onChange={(e) => { e.stopPropagation(); onToggle(integration.id); }} />
        </div>
        <div>
            <h3 className="font-bold text-text-primary dark:text-gray-100">{integration.name}</h3>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">{integration.description}</p>
        </div>
    </div>
);

// --- Component for Google Analytics Modal ---
const GAConfigModal = ({ isOpen, onClose, onSave, initialMeasurementId }: { isOpen: boolean; onClose: () => void; onSave: (measurementId: string) => void; initialMeasurementId: string }) => {
    const [measurementId, setMeasurementId] = useState(initialMeasurementId);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(measurementId);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Configure Google Analytics</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="measurementId" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Measurement ID</label>
                        <input
                            type="text"
                            id="measurementId"
                            value={measurementId}
                            onChange={e => setMeasurementId(e.target.value)}
                            placeholder="G-XXXXXXXXXX"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        <p className="text-xs text-text-secondary dark:text-gray-400 mt-2">Enter your Google Analytics 4 Measurement ID.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Component for Calendly Modal ---
const CalendlyConfigModal = ({ isOpen, onClose, onSave, initialLink }: { isOpen: boolean; onClose: () => void; onSave: (link: string) => void; initialLink: string }) => {
    const [schedulingLink, setSchedulingLink] = useState(initialLink);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(schedulingLink);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Configure Calendly</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="schedulingLink" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Scheduling Link</label>
                        <input
                            type="url"
                            id="schedulingLink"
                            value={schedulingLink}
                            onChange={e => setSchedulingLink(e.target.value)}
                            placeholder="https://calendly.com/your-username/30min"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        <p className="text-xs text-text-secondary dark:text-gray-400 mt-2">Enter your Calendly scheduling link. This will be shown to users after they request a demo.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">Save & Enable</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PusherConfigModal = ({ isOpen, onClose, onSave, initialConfig }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (config: Omit<PusherConfig, 'id' | 'user_id' | 'is_enabled'>) => void;
    initialConfig: Partial<PusherConfig>;
}) => {
    const [appId, setAppId] = useState(initialConfig.app_id || '');
    const [key, setKey] = useState(initialConfig.key || '');
    const [secret, setSecret] = useState(initialConfig.secret || '');
    const [cluster, setCluster] = useState(initialConfig.cluster || '');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ app_id: appId, key, secret, cluster });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Configure Pusher</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="appId" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">App ID</label>
                            <input type="text" id="appId" value={appId} onChange={e => setAppId(e.target.value)} placeholder="Your Pusher App ID" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="key" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Key</label>
                            <input type="text" id="key" value={key} onChange={e => setKey(e.target.value)} placeholder="Your Pusher Key" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="secret" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Secret</label>
                            <input type="password" id="secret" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Your Pusher Secret" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="cluster" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Cluster</label>
                            <input type="text" id="cluster" value={cluster} onChange={e => setCluster(e.target.value)} placeholder="e.g., ap2" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">Save & Enable</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- NEW: Component for API Modal ---
const ApiConfigModal = ({ isOpen, onClose, onSave, initialConfig }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (config: Omit<ApiConfig, 'id' | 'user_id' | 'is_enabled'>) => void;
    initialConfig: Partial<ApiConfig>;
}) => {
    const [apiKey, setApiKey] = useState(initialConfig.api_key || '');
    const [endpointUrl, setEndpointUrl] = useState(initialConfig.endpoint_url || '');
    const [authType, setAuthType] = useState(initialConfig.auth_type || 'Bearer');
    const [headerName, setHeaderName] = useState(initialConfig.header_name || '');
    const [showKey, setShowKey] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            api_key: apiKey,
            endpoint_url: endpointUrl,
            auth_type: authType as ApiConfig['auth_type'],
            header_name: authType === 'Header' ? headerName : null,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Configure API Settings</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div className="relative">
                            <label htmlFor="apiKey" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">API Key</label>
                            <input
                                id="apiKey"
                                type={showKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={e => setApiKey(e.target.value)}
                                placeholder="Enter your secret API key"
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                                required
                            />
                             <button type="button" onClick={() => setShowKey(!showKey)} className="absolute right-3 top-9 text-gray-500">
                                {showKey ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .527-1.663 1.49-3.16 2.68-4.32m.878-1.02A13.937 13.937 0 0112 5c4.478 0 8.268 2.943 9.542 7a13.937 13.937 0 01-1.543 3.351m-4.221-4.221a3 3 0 11-4.242-4.242M1 1l22 22" /></svg>}
                            </button>
                        </div>
                        <div>
                            <label htmlFor="endpointUrl" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Endpoint URL</label>
                            <input type="url" id="endpointUrl" value={endpointUrl} onChange={e => setEndpointUrl(e.target.value)} placeholder="https://api.example.com/v1" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="authType" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Authentication Type</label>
                            {/* FIX: Cast event target value to the correct type for the state setter */}
                            <select id="authType" value={authType} onChange={e => setAuthType(e.target.value as 'Bearer' | 'Header')} className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600">
                                <option value="Bearer">Bearer Token</option>
                                <option value="Header">API Key in Header</option>
                            </select>
                        </div>
                        {authType === 'Header' && (
                             <div>
                                <label htmlFor="headerName" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Header Name</label>
                                <input type="text" id="headerName" value={headerName} onChange={e => setHeaderName(e.target.value)} placeholder="e.g., X-API-KEY" className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">Save & Enable</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const IntegrationsPage = () => {
    const categories = ['All', 'Finance', 'Communication', 'Productivity', 'Analytics', 'Security', 'Developer Tools'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [integrations, setIntegrations] = useState(initialIntegrationData);
    
    // State for modals
    const [isGAModalOpen, setIsGAModalOpen] = useState(false);
    const [gaMeasurementId, setGaMeasurementId] = useState('');
    const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
    const [calendlyLink, setCalendlyLink] = useState('');
    const [isPusherModalOpen, setIsPusherModalOpen] = useState(false);
    const [pusherConfig, setPusherConfig] = useState<Partial<PusherConfig>>({});
    const [isApiModalOpen, setIsApiModalOpen] = useState(false);
    const [apiConfig, setApiConfig] = useState<Partial<ApiConfig>>({});


    // Fetch configs on load
    useEffect(() => {
        const fetchConfigs = async () => {
            const [gaConfig, calendlyConfig, pusherCfg, apiCfg] = await Promise.all([
                getGoogleAnalyticsConfig(),
                getCalendlyConfig(),
                getPusherConfig(),
                getApiConfig(),
            ]);

            setIntegrations(prev => prev.map(int => {
                if (int.name === 'Google Analytics' && gaConfig) {
                    setGaMeasurementId(gaConfig.measurement_id || '');
                    return { ...int, connected: gaConfig.is_enabled };
                }
                if (int.name === 'Calendly' && calendlyConfig) {
                    setCalendlyLink(calendlyConfig.scheduling_link || '');
                    return { ...int, connected: calendlyConfig.is_enabled };
                }
                if (int.name === 'Pusher' && pusherCfg) {
                    setPusherConfig(pusherCfg);
                    return { ...int, connected: pusherCfg.is_enabled };
                }
                if (int.name === 'API' && apiCfg) {
                    setApiConfig(apiCfg);
                    return { ...int, connected: apiCfg.is_enabled };
                }
                return int;
            }));
        };
        fetchConfigs();
    }, []);
    
    const handleToggle = async (id: number) => {
        const integrationToToggle = integrations.find(int => int.id === id);
        if (!integrationToToggle) return;

        if (integrationToToggle.name === 'Google Analytics') {
            if (integrationToToggle.connected) {
                await upsertGoogleAnalyticsConfig({ is_enabled: false });
                setIntegrations(prev => prev.map(int => (int.id === id ? { ...int, connected: false } : int)));
            } else {
                setIsGAModalOpen(true);
            }
        } else if (integrationToToggle.name === 'Calendly') {
            if (integrationToToggle.connected) {
                await upsertCalendlyConfig({ is_enabled: false });
                setIntegrations(prev => prev.map(int => (int.id === id ? { ...int, connected: false } : int)));
            } else {
                setIsCalendlyModalOpen(true);
            }
        } else if (integrationToToggle.name === 'Pusher') {
            if (integrationToToggle.connected) {
                await upsertPusherConfig({ is_enabled: false });
                setIntegrations(prev => prev.map(int => (int.id === id ? { ...int, connected: false } : int)));
            } else {
                setIsPusherModalOpen(true);
            }
        } else if (integrationToToggle.name === 'API') {
             if (integrationToToggle.connected) {
                await upsertApiConfig({ is_enabled: false });
                setIntegrations(prev => prev.map(int => (int.id === id ? { ...int, connected: false } : int)));
            } else {
                setIsApiModalOpen(true);
            }
        } else {
            setIntegrations(prev =>
                prev.map(int => (int.id === id ? { ...int, connected: !int.connected } : int))
            );
        }
    };

    const handleSaveGAConfig = async (measurementId: string) => {
        try {
            await upsertGoogleAnalyticsConfig({ measurement_id: measurementId, is_enabled: true });
            setGaMeasurementId(measurementId);
            setIntegrations(prev =>
                prev.map(int => int.name === 'Google Analytics' ? { ...int, connected: true } : int)
            );
            setIsGAModalOpen(false);
        } catch (error) {
            console.error("Failed to save GA config:", error);
        }
    };
    
    const handleSaveCalendlyConfig = async (link: string) => {
        try {
            await upsertCalendlyConfig({ scheduling_link: link, is_enabled: true });
            setCalendlyLink(link);
            setIntegrations(prev =>
                prev.map(int => int.name === 'Calendly' ? { ...int, connected: true } : int)
            );
            setIsCalendlyModalOpen(false);
        } catch (error) {
            console.error("Failed to save Calendly config:", error);
        }
    };

    const handleSavePusherConfig = async (config: Omit<PusherConfig, 'id' | 'user_id' | 'is_enabled'>) => {
        try {
            await upsertPusherConfig({ ...config, is_enabled: true });
            setPusherConfig({ ...pusherConfig, ...config, is_enabled: true });
            setIntegrations(prev =>
                prev.map(int => int.name === 'Pusher' ? { ...int, connected: true } : int)
            );
            setIsPusherModalOpen(false);
        } catch (error) {
            console.error("Failed to save Pusher config:", error);
            // Optionally, set an error state to show in the modal
        }
    };

    const handleSaveApiConfig = async (config: Omit<ApiConfig, 'id' | 'user_id' | 'is_enabled'>) => {
        try {
            await upsertApiConfig({ ...config, is_enabled: true });
            setApiConfig({ ...apiConfig, ...config, is_enabled: true });
            setIntegrations(prev => prev.map(int => int.name === 'API' ? { ...int, connected: true } : int));
            setIsApiModalOpen(false);
        } catch (error) {
            console.error("Failed to save API config:", error);
        }
    };

    const filteredIntegrations = useMemo(() => {
        return integrations
            .filter(int => activeCategory === 'All' || int.category === activeCategory)
            .filter(int => int.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [integrations, activeCategory, searchTerm]);

    return (
        <DashboardLayout title="Integrations & Apps">
            <GAConfigModal 
                isOpen={isGAModalOpen}
                onClose={() => setIsGAModalOpen(false)}
                onSave={handleSaveGAConfig}
                initialMeasurementId={gaMeasurementId}
            />
            <CalendlyConfigModal
                isOpen={isCalendlyModalOpen}
                onClose={() => setIsCalendlyModalOpen(false)}
                onSave={handleSaveCalendlyConfig}
                initialLink={calendlyLink}
            />
            <PusherConfigModal
                isOpen={isPusherModalOpen}
                onClose={() => setIsPusherModalOpen(false)}
                onSave={handleSavePusherConfig}
                initialConfig={pusherConfig}
            />
            <ApiConfigModal
                isOpen={isApiModalOpen}
                onClose={() => setIsApiModalOpen(false)}
                onSave={handleSaveApiConfig}
                initialConfig={apiConfig}
            />
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100">Integrations & Apps</h2>
                        <p className="text-text-secondary dark:text-gray-400 mt-1">Supercharge your workflow by connecting with these services.</p>
                    </div>
                    <div className="relative">
                        <svg className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder="Search integration..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full md:w-72 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                    <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                                    activeCategory === category
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-text-secondary dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredIntegrations.map(integration => (
                        <IntegrationCard key={integration.id} integration={integration} onToggle={handleToggle} />
                    ))}
                </div>
                {filteredIntegrations.length === 0 && (
                     <div className="text-center py-16 text-text-secondary dark:text-gray-400 col-span-full">
                        <h3 className="text-xl font-semibold mb-2">No Integrations Found</h3>
                        <p>Your search for "{searchTerm}" did not match any integrations in the "{activeCategory}" category.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default IntegrationsPage;