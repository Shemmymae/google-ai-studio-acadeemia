
import React, { useState } from 'react';
import LandingLayout from '../components/LandingLayout';
import { addContactUsSubmission } from '../db';

// --- ICONS ---
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PaperAirplaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
// Social Icons
const FacebookIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.522 19.854.218 19.09.083 18.22.015 16.947 0 15.667 0 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.25 1.805-.414 2.227-.218.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.056-1.816-.25-2.236-.414-.562-.218-.96-.479-1.381-.897-.419-.419-.69-.824-.896-1.38-.165-.42-.359-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.015-3.586.07-4.859.056-1.171.25-1.816.414-2.236.218-.562.479-.96.896-1.381.42-.419.81-.69 1.38-.896.42-.165 1.065-.359 2.236-.413 1.274-.057 1.649-.07 4.859-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>;
const LinkedinIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
const TikTokIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
const YoutubeIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;


// --- PAGE COMPONENTS ---
const PageHero = () => (
    <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80 py-20">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Get in Touch</h1>
            <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">We're here to answer your questions and discuss how Acadeemia can benefit your institution.</p>
        </div>
    </div>
);

const ContactDetailItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="ml-4">
            <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">{title}</h3>
            <div className="mt-1 text-text-secondary dark:text-gray-400 space-y-1">{children}</div>
        </div>
    </div>
);

const FAQCard = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <h3 className="font-bold text-text-primary dark:text-gray-100">{question}</h3>
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
            {isOpen && (
                <p className="text-text-secondary dark:text-gray-400 text-sm mt-4">{answer}</p>
            )}
        </div>
    );
};

const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:hover:text-gray-200 transition-colors">
        {children}
    </a>
);


const ContactUsPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const submission = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            await addContactUsSubmission(submission);
            setSubmitted(true);
        } catch (err) {
            setError('There was an error sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LandingLayout>
            <PageHero />

            <section className="py-24 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-10">
                            <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Contact Information</h2>
                            <ContactDetailItem icon={<MapPinIcon />} title="Visit Us">
                                <p>1. USA </p>
                                <p>600 California Street</p>
                                <p>San Francisco, CA 94108</p>
                                <br></br>
                                <p>2. AFRICA</p>
                                <p>90 JGO James Gichuru Road</p>
                                <p>Nairobi City, 00100</p>
                                <p>Kenya</p>
                            </ContactDetailItem>
                            <ContactDetailItem icon={<EnvelopeIcon />} title="Email Us">
                                <p><a href="mailto:info@acadeemia.com" className="hover:underline">info@acadeemia.com</a></p>
                                <p><a href="mailto:supporin the t@acadeemia.com" className="hover:underline">support@acadeemia.com</a></p>
                            </ContactDetailItem>
                            <ContactDetailItem icon={<PhoneIcon />} title="Call Us">
                                <p>+1 (650) 8226 811 <span className="text-xs">(General Inquiries)</span></p>
                                <p>+254 111 313 818 <span className="text-xs">(General Inquiries)</span></p>
                                <p>+254 755 935 993 <span className="text-xs">(WhatsApp Inquiries)</span></p>
                            </ContactDetailItem>
                             <ContactDetailItem icon={<ClockIcon />} title="Business Hours">
                                <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                                <p>Saturday: Closed</p>
                                <p>Sunday: Closed</p>
                            </ContactDetailItem>
                            <div>
                                <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">Connect With Us</h3>
                                <p className="mt-1 text-text-secondary dark:text-gray-400">Follow us on social media for the latest updates, educational insights, and news.</p>
                                <div className="flex space-x-5 mt-4">
                                    <SocialLink href="https://www.instagram.com/acadeemia_sms/"><InstagramIcon /></SocialLink>
                                    <SocialLink href="https://www.linkedin.com/company/acadeemia/"><LinkedinIcon /></SocialLink>
                                    <SocialLink href="https://www.tiktok.com/@acadeemia_sms"><TikTokIcon /></SocialLink>
                                    <SocialLink href="https://www.youtube.com/@ACADEEMIA/videos"><YoutubeIcon /></SocialLink>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div>
                             <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100">Thank You!</h2>
                                        <p className="text-text-secondary dark:text-gray-300 mt-2">Your message has been sent. Our team will get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Send Us a Message</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                                <input type="text" id="name" name="name" placeholder="John Doe" required className="mt-1 block w-full px-4 py-2.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                                <input type="email" id="email" name="email" placeholder="john@example.com" required className="mt-1 block w-full px-4 py-2.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                            <select id="subject" name="subject" required className="mt-1 block w-full px-4 py-2.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                <option>Select an option</option>
                                                <option>General Inquiry</option>
                                                <option>Request a Demo</option>
                                                <option>Technical Support</option>
                                                <option>Partnership</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                            <textarea id="message" name="message" rows={5} placeholder="How can we help you?" required className="mt-1 block w-full px-4 py-2.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"></textarea>
                                        </div>
                                        {error && <p className="text-sm text-red-500">{error}</p>}
                                        <div>
                                            <button type="submit" disabled={loading} className="w-full flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors shadow-md disabled:opacity-75">
                                                <PaperAirplaneIcon />
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Locations Section */}
            <section className="py-24 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Our Locations</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-6">Where to Find Us</h2>
                        <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">
                            Connect with our global team across multiple locations or work remotely with our distributed workforce.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Headquarters Office - San Francisco */}
                        <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                            <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                                <MapPinIcon />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Headquarters Office</h3>
                            <p className="text-text-secondary dark:text-gray-400 mb-4">
                                Our main headquarters located in the heart of San Francisco's tech district.
                            </p>
                            <div className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
                                <p><strong>Address:</strong> 600 California Street, San Francisco, CA 94108</p>
                                <p><strong>Phone:</strong> +1 (650) 8226 811</p>
                                <p><strong>Employees:</strong> 43</p>
                                <p><strong>Hours:</strong> Mon-Fri 7:00 AM - 5:00 PM PST</p>
                            </div>
                        </div>

                        {/* Regional Office - Nairobi */}
                        <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                            <div className="p-3 bg-secondary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                                <MapPinIcon />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Regional Office</h3>
                            <p className="text-text-secondary dark:text-gray-400 mb-4">
                                Serving our African and Middle Eastern clients from our Nairobi office.
                            </p>
                            <div className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
                                <p><strong>Address:</strong> 90 JGO James Gichuru Road, Nairobi City, 00100, Kenya</p>
                                <p><strong>Phone:</strong> +254 111 313 818</p>
                                <p><strong>Employees:</strong> 37</p>
                                <p><strong>Hours:</strong> Mon-Fri 7:00 AM - 5:00 PM EAT</p>
                            </div>
                        </div>

                        {/* Remote Team */}
                        <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                            <div className="p-3 bg-accent/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Remote Team</h3>
                            <p className="text-text-secondary dark:text-gray-400 mb-4">
                                Our distributed team works across time zones to provide 24/7 support and development.
                            </p>
                            <div className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
                                <p><strong>Coverage:</strong> Global (15+ countries)</p>
                                <p><strong>Employees:</strong> 23</p>
                                <p><strong>Support:</strong> 24/7 availability</p>
                                <p><strong>Communication:</strong> Email, Slack, Zoom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Office Section */}
            <section className="pb-24 bg-secondary dark:bg-gray-800/50">
                <div className="container mx-auto px-6 text-center pt-24">
                    <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Visit Our Offices</h2>
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-8 h-96">
                    {/* Headquarters Office - San Francisco */}
                    <div className="bg-card dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-4 bg-primary text-white">
                            <h3 className="text-lg font-semibold">Headquarters Office</h3>
                            <p className="text-sm opacity-90">San Francisco, CA</p>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.096!2d-122.405!3d37.794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2s600%20California%20Street%2C%20San%20Francisco%2C%20CA%2094108!5e0!3m2!1sen!2sus!4v1677113333333!5m2!1sen!2sus"
                            className="w-full h-80 border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map of San Francisco Office"
                        ></iframe>
                    </div>

                    {/* Regional Office - Nairobi */}
                    <div className="bg-card dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-4 bg-primary text-white">
                            <h3 className="text-lg font-semibold">Regional Office</h3>
                            <p className="text-sm opacity-90">Nairobi, Kenya</p>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!d255282.3585374493!2d36.70737925184628!3d-1.3028616422736746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%2C%20Kenya!5e0!3m2!1sen!2sus!4v1677113333333!5m2!1sen!2sus"
                            className="w-full h-80 border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map of Nairobi Office"
                        ></iframe>
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section className="py-24 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto text-left">
                        <FAQCard
                            question="What's the typical response time for inquiries?"
                            answer="We aim to respond to all inquiries within 24 business hours. For urgent technical support, please call our dedicated support line."
                        />
                         <FAQCard
                            question="Can I schedule a personalized demo?"
                            answer="Absolutely! Use our contact form to request a demo, and our team will arrange a personalized demonstration tailored to your institution's needs."
                        />
                         <FAQCard
                            question="Do you provide on-site training?"
                            answer="Yes, we offer on-site training services for institutions purchasing our Standalone version or Enterprise SaaS plan."
                        />
                         <FAQCard
                            question="How can I get technical support?"
                            answer="Existing customers can access our support portal, email support@acadeemia.com, or call our technical support line during business hours."
                        />
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default ContactUsPage;
