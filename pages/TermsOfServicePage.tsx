import React from 'react';
import LandingLayout from '../components/LandingLayout';

// --- Icons for the policy sections ---
const FileCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const BanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 13h16M4 7h16M4 10h16" /></svg>;
const BadgeCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ExclamationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653A8.956 8.956 0 0112 21a8.956 8.956 0 01-6.653-2.93A8.956 8.956 0 014 12m16 0h-5" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

const TermsOfServicePage = () => {
  return (
    <LandingLayout>
      <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
          <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">
            Please read these terms carefully before using Acadeemia services.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 p-6 rounded-lg flex items-start space-x-4 border border-blue-200 dark:border-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="font-bold">Last Updated: January 1, 2025</p>
              <p className="text-sm mt-1">
                These Terms of Service govern your use of Acadeemia's school management system and related services.
              </p>
            </div>
          </div>

          <div className="prose lg:prose-lg dark:prose-invert max-w-none mt-12 space-y-10">
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><FileCheckIcon /> 1. Acceptance of Terms</h2><p>By accessing or using Acadeemia's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ServerIcon /> 2. Description of Service</h2><p>Acadeemia provides comprehensive school management software solutions available in two deployment options:</p><ul><li><strong>SaaS Version:</strong> Cloud-based software as a service with subscription-based pricing</li><li><strong>Standalone Version:</strong> Self-hosted software with yearly licensing fees</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><UserCircleIcon /> 3. User Accounts and Registration</h2><p>To access certain features of our service, you must register for an account. You agree to:</p><ul><li>Provide accurate, current, and complete information during registration</li><li>Maintain and promptly update your account information</li><li>Maintain the security of your password and accept all risks of unauthorized access</li><li>Accept responsibility for all activities under your account</li><li>Notify us immediately of any unauthorized use of your account</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><CreditCardIcon /> 4. Subscription and Payment Terms</h2><h3>SaaS Version</h3><ul><li>Subscriptions are billed on a termly or annual basis</li><li>Payment is due in advance for each billing period</li><li>Free trial periods are available for new customers</li><li>Subscription fees are non-refundable except as required by law</li><li>We reserve the right to change pricing with 30 days notice</li></ul><h3>Standalone Version</h3><ul><li>One-time license fees are required for software purchase</li><li>Additional services (hosting, support) are billed separately</li><li>Maintenance and support contracts are optional but recommended</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><BanIcon /> 5. Acceptable Use Policy</h2><p>You agree not to use our services to:</p><ul><li>Violate any applicable laws or regulations</li><li>Infringe on intellectual property rights</li><li>Transmit harmful, offensive, or inappropriate content</li><li>Attempt to gain unauthorized access to our systems</li><li>Interfere with or disrupt our services</li><li>Use our services for any illegal or unauthorized purpose</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><DatabaseIcon /> 6. Data Ownership and Privacy</h2><p>You retain ownership of all data you input into our system. We are committed to protecting your privacy and handling your data responsibly:</p><ul><li>Your data is used solely to provide our services</li><li>We implement industry-standard security measures</li><li>Data processing complies with applicable privacy laws</li><li>You can export your data at any time</li><li>See our Privacy Policy for detailed information</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><BadgeCheckIcon /> 7. Intellectual Property</h2><p>The Acadeemia software, including all content, features, and functionality, is owned by Acadeemia and protected by international copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive license to use our software in accordance with these terms.</p></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><SupportIcon /> 8. Service Availability and Support</h2><p>We strive to maintain high service availability but cannot guarantee uninterrupted service.</p><ul><li>SaaS services target 99.9% uptime</li><li>Scheduled maintenance will be announced in advance</li><li>Support is provided during business hours</li><li>Emergency support is available for critical issues</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ExclamationIcon /> 9. Limitation of Liability</h2><p>To the maximum extent permitted by law, Acadeemia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our services.</p></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><XCircleIcon /> 10. Termination</h2><p>Either party may terminate this agreement:</p><ul><li>You may cancel your subscription at any time</li><li>We may terminate for breach of these terms</li><li>Upon termination, you retain the right to export your data</li><li>Standalone licenses remain valid after termination of support services</li></ul></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ScaleIcon /> 11. Governing Law</h2><p>These terms are governed by the laws of Kenya. Any disputes will be resolved in the courts of Nairobi, Kenya.</p></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><RefreshIcon /> 12. Changes to Terms</h2><p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our service. Continued use of our services after changes constitutes acceptance of the new terms.</p></section>
            <section><h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><MailIcon /> 13. Contact Information</h2><p>If you have questions about these Terms of Service, please contact us:</p><div className="not-prose text-base space-y-2">
                <p><strong>Email:</strong> <a href="mailto:legal@acadeemia.com" className="text-primary hover:underline">legal@acadeemia.com</a></p>
                <p>Acadeemia<br/>90 JGO James Gichuru Road<br/>Nairobi City, 00100<br/>Kenya</p>
            </div></section>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default TermsOfServicePage;