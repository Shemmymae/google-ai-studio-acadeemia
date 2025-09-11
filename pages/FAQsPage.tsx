import React, { useState, useMemo } from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

const allFaqs = [
  { q: "What is Acadeemia?", a: "Acadeemia is a comprehensive school management system that helps educational institutions streamline their administrative processes, manage student information, handle finances, and improve communication between staff, students, and parents.", category: "General" },
  { q: "What are the main differences between SaaS and Standalone versions?", a: "The SaaS version is cloud-based with subscription pricing, automatic updates, and multi-school management capabilities. The Standalone version is self-hosted with a one-time license fee, offering complete data ownership and more extensive customization options.", category: "General" },
  { q: "Do you offer a free trial?", a: "Yes, we offer a 1-month free trial for our SaaS version. You can start immediately without providing credit card information. For the Standalone version, we provide comprehensive demos.", category: "Billing & Pricing" },
  { q: "How do I start my SaaS free trial?", a: "Visit our website at acadeemia.com, click on 'Start Free Trial,' and follow the registration process. You'll have immediate access to all features for one month.", category: "SaaS Version" },
  { q: "Can I manage multiple schools with the SaaS version?", a: "Yes, our SaaS version includes multi-school management capabilities, allowing you to manage multiple institutions from a single platform with centralized administration.", category: "SaaS Version" },
  { q: "What happens to my data if I cancel my SaaS subscription?", a: "You can export all your data before cancellation. We provide a grace period during which you can download your information. After this period, data is securely deleted from our servers.", category: "SaaS Version" },
  { q: "How do I upgrade or downgrade my SaaS plan?", a: "You can change your plan anytime through your account dashboard. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.", category: "SaaS Version" },
  { q: "What are the system requirements for the Standalone version?", a: "Minimum requirements include: 4GB RAM, 50GB storage space, modern web server (Apache/Nginx), PHP 7.4+, MySQL 5.7+, and SSL certificate. We recommend higher specifications for larger institutions.", category: "Standalone" },
  { q: "Do you provide hosting services for the Standalone version?", a: "Yes, we offer managed hosting services starting at KES 3,999 per term for standard hosting and KES 8,499 per term for premium hosting with enhanced resources.", category: "Standalone" },
  { q: "How do updates work for the Standalone version?", a: "Updates are provided as downloadable packages. You can apply them manually or opt for our managed update service. All plans include lifetime updates.", category: "Standalone" },
  { q: "Can I customize the Standalone version?", a: "Yes, the Standalone version offers extensive customization options. We provide basic customization with Advanced plans and extensive customization with Premium plans.", category: "Standalone" },
  { q: "What payment methods do you accept?", a: "We accept major credit cards, bank transfers, and mobile money payments (M-Pesa, Airtel Money). For institutional clients, we also accept purchase orders.", category: "Billing & Pricing" },
  { q: "Do you offer educational discounts?", a: "Yes, we provide special pricing for public schools, non-profit educational institutions, and schools in developing regions. Contact our sales team for details.", category: "Billing & Pricing" },
  { q: "Are there any setup fees?", a: "SaaS version has no setup fees. Standalone version includes deployment in the license fee. Additional services like data migration or custom domain setup have separate fees.", category: "Billing & Pricing" },
  { q: "Can I get a refund if I'm not satisfied?", a: "SaaS subscriptions are generally non-refundable, but we evaluate requests on a case-by-case basis. We encourage using our free trial to evaluate the service first.", category: "Billing & Pricing" },
  { q: "What browsers are supported?", a: "Acadeemia works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest browser versions for optimal performance.", category: "Technical" },
  { q: "Is there a mobile app available?", a: "Our web application is mobile-responsive and works well on mobile devices. We also offer a dedicated Android app as an add-on for the Standalone version.", category: "Technical" },
  { q: "How do I import existing student data?", a: "We provide data migration services. Basic migration from standard formats costs KES 4,999, while complex migrations from legacy systems cost KES 14,999.", category: "Technical" },
  { q: "What kind of support do you provide?", a: "We offer email support, phone support during business hours, comprehensive documentation, video tutorials, and optional premium support packages with dedicated account managers.", category: "General" },
  { q: "Can I integrate Acadeemia with other systems?", a: "Yes, we provide APIs for integration with other systems. The Standalone version offers more extensive integration possibilities including direct database access.", category: "Technical" },
  { q: "How secure is my data?", a: "We implement enterprise-grade security including data encryption, regular security audits, access controls, and compliance with international security standards.", category: "Security" },
  { q: "Where is my data stored?", a: "SaaS data is stored in secure data centers with redundancy and backup systems. Standalone data is stored on your chosen infrastructure with optional managed hosting.", category: "Security" },
  { q: "Do you comply with data protection regulations?", a: "Yes, we comply with applicable data protection laws including GDPR, FERPA, and COPPA. We have comprehensive privacy policies and data handling procedures.", category: "Security" },
  { q: "What backup and disaster recovery options are available?", a: "SaaS version includes automatic daily backups with point-in-time recovery. Standalone version backup depends on your infrastructure, but we can provide managed backup services.", category: "Security" }
];

const categories = [
    { name: "All Questions", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { name: "General", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { name: "SaaS Version", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
    { name: "Standalone", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> },
    { name: "Billing & Pricing", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
    { name: "Technical", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { name: "Security", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: typeof allFaqs[0], isOpen: boolean, onToggle: () => void }) => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex justify-between items-center text-left"
            aria-expanded={isOpen}
        >
            <h3 className="font-bold text-lg text-text-primary dark:text-gray-100">{faq.q}</h3>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen && (
            <div className="mt-4 prose dark:prose-invert max-w-none text-text-secondary dark:text-gray-400">
                <p>{faq.a}</p>
            </div>
        )}
    </div>
);

const FAQsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Questions');
    const [openFaqId, setOpenFaqId] = useState<string | null>(allFaqs[0].q);

    const filteredFaqs = useMemo(() => {
        return allFaqs
            .filter(faq => {
                if (activeCategory === 'All Questions') return true;
                return faq.category === activeCategory;
            })
            .filter(faq =>
                faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.a.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, activeCategory]);

    const handleToggleFaq = (faqId: string) => {
        setOpenFaqId(prevId => (prevId === faqId ? null : faqId));
    };

    return (
        <LandingLayout>
            <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">Find answers to common questions about Acadeemia's school management system.</p>
                </div>
            </div>

            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative mb-8">
                            <input
                                type="search"
                                placeholder="Search for answers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-card dark:bg-gray-800"
                            />
                            <div className="absolute top-0 left-0 h-full flex items-center pl-4 text-gray-400">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {categories.map(category => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === category.name ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >
                                    {category.icon}
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map(faq => (
                                    <FAQItem 
                                        key={faq.q} 
                                        faq={faq} 
                                        isOpen={openFaqId === faq.q} 
                                        onToggle={() => handleToggleFaq(faq.q)} 
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 text-text-secondary dark:text-gray-400">
                                    <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                                    <p>Your search for "{searchTerm}" did not match any FAQs in this category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="bg-secondary dark:bg-gray-800/50 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-text-primary dark:text-white">Still Have Questions?</h2>
                    <p className="mt-4 text-lg text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">Can't find the answer you're looking for? Our support team is here to help.</p>
                    <div className="mt-8 flex justify-center gap-4">
                         <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-hover transition-colors shadow-md">
                            Contact Support
                        </Link>
                         <Link to="/demo" className="bg-white dark:bg-gray-700 text-text-primary dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 border dark:border-gray-600 transition-colors shadow-md">
                            Request Demo
                        </Link>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default FAQsPage;