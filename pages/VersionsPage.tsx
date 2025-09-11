
import React, { useState } from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- Icons for the page ---
const CloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const CheckIcon = ({ className = "text-green-500" }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const CrossIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const TimeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10m16-10v10M4 13h16M4 7h16M4 10h16" /></svg>;


const PageHero = () => (
    <div className="bg-gradient-to-b from-purple-100 to-white dark:from-gray-800/50 dark:to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100">Choose Your Ideal Deployment</h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">Flexible deployment options tailored to your institution's needs and preferences.</p>
        </div>
    </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-center"
                aria-expanded={isOpen}
            >
                <h3 className="font-bold text-text-primary dark:text-white">{q}</h3>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <p className="text-text-secondary dark:text-gray-400 mt-2 pr-6">{a}</p>}
        </div>
    );
};

const VersionsPage = () => {
    // Data for the page
    const saasDefaultModules = ["Alumni", "Attachments Book", "Attendance", "Bulk SMS And Email", "Card Management", "Certificate", "Custom Domain", "Events", "Homework", "Hostel", "Human Resource", "Inventory", "Library", "Live Class", "Multi Class", "Office Accounting", "Online Exam", "Reception", "Student Accounting", "Transport", "Website"];
    const standaloneDefaultModules = ["Alumni", "Annual Calendar", "Calendar To-Do List", "Certificate", "Chat", "Communicate", "Download Center", "Examination", "Expense", "Fees Collection", "Front CMS", "Front Office", "Homework", "Hostel", "Income", "Inventory", "Lesson Plan", "Library", "Multi Class", "Online Admission", "Online Examination", "Student Attendance", "Student CV", "Transport"];
    const saasAddons = ["QR Code Attendance", "Two-Factor Authentication"];
    const standaloneAddons = ["Zoom Live Classes", "Gmeet Live Classes", "Online Course", "Behaviour Records", "CBSE Examination", "Multi School", "Two-Factor Authenticator", "QR Code Attendance", "Quick Fees", "Thermal Print", "Android App", "Biometrics Entry"];

    const comparisonData = [
        { feature: 'Deployment Time', saas: { text: 'Immediate', icon: <TimeIcon /> }, standalone: { text: '1-2 Weeks', icon: <TimeIcon /> } },
        { feature: 'Data Ownership', saas: { text: 'Hosted on our secure servers', icon: <DatabaseIcon /> }, standalone: { text: 'Complete ownership on your servers', icon: <DatabaseIcon /> } },
        { feature: 'Updates & Maintenance', saas: { text: 'Automatic', icon: <CheckIcon /> }, standalone: { text: 'Manual or managed service', icon: <CheckIcon /> } },
        { feature: 'Infrastructure Management', saas: { text: 'Fully managed by us', icon: <CheckIcon /> }, standalone: { text: 'Your responsibility or optional service', icon: <CheckIcon /> } },
        { feature: 'Multi-School Management', saas: { text: 'Included', icon: <CheckIcon /> }, standalone: { text: 'Available as add-on (Multi School)', icon: <CrossIcon /> } },
        { feature: 'Free Trial', saas: { text: 'Available', icon: <CheckIcon /> }, standalone: { text: 'Demo available', icon: <CrossIcon /> } },
        { feature: 'Online Payment', saas: { text: 'Built-in subscription management', icon: <CheckIcon /> }, standalone: { text: 'Yearly license', icon: <CrossIcon /> } },
        { feature: 'Customization Flexibility', saas: { text: 'Limited to available modules', icon: <WarningIcon /> }, standalone: { text: 'Extensive possibilities', icon: <CheckIcon /> } },
        { feature: 'Integration with Internal Systems', saas: { text: 'API-based only', icon: <InfoIcon /> }, standalone: { text: 'Direct database access possible', icon: <CheckIcon /> } },
        { feature: 'Scalability', saas: { text: 'Automatic scaling', icon: <CheckIcon /> }, standalone: { text: 'Manual resource allocation', icon: <CheckIcon /> } },
        { feature: 'Security Compliance', saas: { text: 'Our standard compliance', icon: <InfoIcon /> }, standalone: { text: 'Customizable to your policies', icon: <CheckIcon /> } },
        { feature: 'Internet Dependency', saas: { text: 'Required for access', icon: <WarningIcon /> }, standalone: { text: 'Can operate on local network', icon: <CheckIcon /> } },
        { feature: 'Initial Setup Cost', saas: { text: 'Minimal', icon: <CheckIcon /> }, standalone: { text: 'Higher upfront investment', icon: <WarningIcon /> } },
    ];
    
    const faqs = [
        { q: "How does the free trial work for the SaaS version?", a: "You can start a free trial immediately with full access to all features. No credit card is required to begin your trial period." },
        { q: "Can I manage multiple schools with the SaaS version?", a: "Yes, our SaaS version includes multi-school management capabilities, allowing you to manage multiple institutions from a single platform." },
        { q: "How do I purchase or renew my subscription?", a: "You can purchase and renew subscriptions directly through our website using our secure online payment system." },
        { q: "What happens when my free trial ends?", a: "You'll be notified before your trial ends and can easily upgrade to a paid subscription to continue using the system without interruption." },
        { q: "Can I switch between deployment options later?", a: "Yes, we offer migration services to help you transition between SaaS and Standalone versions as your needs evolve." },
        { q: "What happens to my data if I cancel my SaaS subscription?", a: "We provide a grace period during which you can export all your data. After this period, data is securely deleted from our servers." }
    ];

    return (
        <LandingLayout>
            <PageHero />
            
            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
                    {/* SaaS Card */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-2">
                            <CloudIcon />
                            <h2 className="text-2xl font-bold text-text-primary dark:text-white">SaaS Version</h2>
                        </div>
                        <p className="text-sm font-semibold text-primary mb-4">Free Trial Available</p>
                        <p className="text-text-secondary dark:text-gray-400 mb-6">Our cloud-based solution provides instant access with minimal setup, perfect for institutions seeking convenience and flexibility. Manage multiple schools under one platform with our comprehensive multi-school management system.</p>
                        
                        <h3 className="font-bold text-text-primary dark:text-white mb-3">Key Benefits</h3>
                        <ul className="space-y-2 text-text-secondary dark:text-gray-300 mb-6">
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Multi-school management capabilities</span></li>
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Instant access with 1 Month free trial period</span></li>
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Online subscription purchase and renewal</span></li>
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Automatic updates with the latest features</span></li>
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Reduced IT overhead and maintenance</span></li>
                            <li className="flex items-center"><CheckIcon className="text-primary" /><span className="ml-3">Enterprise-grade security and backups</span></li>
                        </ul>

                        <h3 className="font-bold text-text-primary dark:text-white mb-3">Default Modules Included</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 grid grid-cols-2 gap-2 text-sm text-text-secondary dark:text-gray-300">
                            {saasDefaultModules.map(m => <div key={m} className="flex items-center"><CheckIcon className="text-primary w-4 h-4 mr-2" />{m}</div>)}
                        </div>

                        <h3 className="font-bold text-text-primary dark:text-white mb-3">Optional Add-ons</h3>
                         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 grid grid-cols-2 gap-2 text-sm text-text-secondary dark:text-gray-300">
                            {saasAddons.map(a => <div key={a} className="flex items-center"><CheckIcon className="text-primary w-4 h-4 mr-2" />{a}</div>)}
                        </div>

                        <h3 className="font-bold text-text-primary dark:text-white mb-3">Subscription Features</h3>
                         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-8 grid grid-cols-1 gap-2 text-sm text-text-secondary dark:text-gray-300">
                            <div className="flex items-center">Online payment for subscriptions</div>
                            <div className="flex items-center">Easy subscription renewal</div>
                            <div className="flex items-center">Multi-school management</div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center">Start Free Trial</Link>
                            <Link to="/pricing" className="bg-white dark:bg-gray-700 text-text-primary dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors text-center">View Pricing</Link>
                        </div>
                    </div>

                    {/* Standalone Card */}
                    <div className="border-2 border-teal-400 rounded-xl p-8">
                         <div className="flex items-center gap-4 mb-2">
                            <ServerIcon />
                            <h2 className="text-2xl font-bold text-text-primary dark:text-white">Standalone Version</h2>
                        </div>
                        <p className="text-sm font-semibold text-teal-500 mb-4">Demos Available</p>
                        <p className="text-text-secondary dark:text-gray-400 mb-6">Our self-hosted solution gives you complete control over your data and infrastructure. We offer custom hosting and domain setup services at an additional cost to ensure a seamless deployment.</p>

                         <h3 className="font-bold text-text-primary dark:text-white mb-3">Key Benefits</h3>
                        <ul className="space-y-2 text-text-secondary dark:text-gray-300 mb-6">
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">Complete data ownership and privacy control</span></li>
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">Customized infrastructure based on your requirements</span></li>
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">Enhanced security with your own firewall and VPN options</span></li>
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">Operate fully within your institution's network</span></li>
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">No dependency on third-party cloud services</span></li>
                            <li className="flex items-center"><CheckIcon className="text-teal-500" /><span className="ml-3">Dedicated support and direct communication channels</span></li>
                        </ul>

                        <h3 className="font-bold text-text-primary dark:text-white mb-3">Default Modules Included</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 grid grid-cols-2 gap-2 text-sm text-text-secondary dark:text-gray-300">
                            {standaloneDefaultModules.map(m => <div key={m} className="flex items-center"><CheckIcon className="text-teal-500 w-4 h-4 mr-2" />{m}</div>)}
                        </div>

                         <h3 className="font-bold text-text-primary dark:text-white mb-3">Optional Add-ons</h3>
                         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-8 grid grid-cols-2 gap-2 text-sm text-text-secondary dark:text-gray-300">
                            {standaloneAddons.map(a => <div key={a} className="flex items-center"><CheckIcon className="text-teal-500 w-4 h-4 mr-2" />{a}</div>)}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                             <Link to="/contact" className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors text-center">Try Standalone Demo</Link>
                             <Link to="/pricing" className="bg-white dark:bg-gray-700 text-text-primary dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors text-center">View Pricing</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-secondary dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-text-primary dark:text-white mb-4">Detailed Comparison</h2>
                    <p className="text-center text-lg text-text-secondary dark:text-gray-400 mb-12">Compare both versions side by side to determine which solution best fits your institution's needs.</p>
                    
                    <div className="bg-card dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
                        <div className="grid grid-cols-3 font-bold text-text-primary dark:text-white bg-gray-50 dark:bg-gray-700/50">
                            <div className="p-4">Feature</div>
                            <div className="p-4 border-l dark:border-gray-700">SaaS Version</div>
                            <div className="p-4 border-l dark:border-gray-700">Standalone Version</div>
                        </div>
                        {comparisonData.map(item => (
                            <div key={item.feature} className="grid grid-cols-3 text-sm text-text-secondary dark:text-gray-300 border-t dark:border-gray-700">
                                <div className="p-4 font-medium">{item.feature}</div>
                                <div className="p-4 border-l dark:border-gray-700 flex items-center gap-2">{item.saas.icon}{item.saas.text}</div>
                                <div className="p-4 border-l dark:border-gray-700 flex items-center gap-2">{item.standalone.icon}{item.standalone.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-text-primary dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-center text-lg text-text-secondary dark:text-gray-400 mb-12">Common questions about our deployment options.</p>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8">
                        {faqs.map(faq => (
                            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

             <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Still Not Sure Which Option Is Right for You?</h2>
                    <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
                        Our experts can help assess your needs and recommend the best solution for your institution.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Contact Sales
                        </Link>
                        <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300">
                            Request Demo
                        </Link>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}

export default VersionsPage;
