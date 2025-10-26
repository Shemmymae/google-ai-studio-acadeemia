
import React from 'react';
// FIX: Corrected import path for react-router-dom.
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';

// --- SVG Icons for the new sections ---

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const CheckIconTeal = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const CloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const StudentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>;
const AcademicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg>;
const FinancialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CertificateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const LibraryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
const ModulesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>;


// --- New Sections for the Homepage ---

const HeroSection = () => (
    <section className="bg-secondary dark:bg-gray-800/50 relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary dark:text-white leading-tight">
                        The #1 Complete <span className="text-primary">School Management</span> Solution
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-lg text-text-secondary dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                        Streamline administration, enhance learning experiences, and empower educational institutions with Acadeemia.
                    </p>
                    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
                        <Link to="/demo" className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg whitespace-nowrap">
                            Request Demo
                        </Link>
                        <Link to="/modules" className="bg-white text-text-primary hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-base md:text-lg transition-transform transform hover:scale-105 shadow-lg whitespace-nowrap">
                            Explore Modules
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <img src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/frontend/hero-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9mcm9udGVuZC9oZXJvLWltYWdlLnBuZyIsImlhdCI6MTc1Njc1OTg0NywiZXhwIjozMzI5Mjc1OTg0N30._e4Umeb6UweLa_QHkpIquzlz7i0TNyz8BLQNxHYmCT4" alt="School Management Dashboard" className="w-full h-auto rounded-xl shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105 relative z-10" />

                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-float z-20">
                        <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>

                    <div className="absolute -bottom-4 -left-12 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-float-delayed z-20">
                        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>

                    <div className="absolute -top-4 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-float-slow z-20">
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>

                    <div className="absolute bottom-12 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-float z-20">
                        <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>

                    <div className="absolute top-1/3 -right-10 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-float-delayed z-20">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const DeploymentSection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Choose Your Ideal Deployment</h2>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">
                Whether you prefer a cloud-based solution or self-hosted system, we've got you covered with two flexible deployment options.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto text-left">
                {/* SaaS Card */}
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-primary/20 transition-shadow">
                    <div className="flex items-center gap-4 mb-4"><CloudIcon /> <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100">SaaS (Cloud-Based)</h3></div>
                    <p className="text-text-secondary dark:text-gray-400 mb-6">Access your school management system anywhere, anytime with our secure cloud-based solution. No installation or maintenance required.</p>
                    <ul className="space-y-3 text-text-secondary dark:text-gray-300 mb-8">
                        <li className="flex items-center gap-3"><CheckIcon /> Instant setup</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Automatic updates</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Scalable resources</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Custom domain available*</li>
                    </ul>
                    <div className="flex gap-4">
                         <Link to="/versions" className="flex-1 text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Learn More</Link>
                         <Link to="/demo" className="flex-1 text-center bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border dark:border-gray-600 transition-colors">Try Demo</Link>
                    </div>
                </div>
                {/* Standalone Card */}
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border-2 border-teal-400 shadow-lg hover:shadow-teal-400/20 transition-shadow">
                    <div className="flex items-center gap-4 mb-4"><ServerIcon /> <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100">Standalone (Self-Hosted)</h3></div>
                    <p className="text-text-secondary dark:text-gray-400 mb-6">Full control over your data and infrastructure with our self-hosted solution, deployed and managed by you or our experts.</p>
                     <ul className="space-y-3 text-text-secondary dark:text-gray-300 mb-8">
                        <li className="flex items-center gap-3"><CheckIconTeal /> Complete data ownership</li>
                        <li className="flex items-center gap-3"><CheckIconTeal /> Customized infrastructure</li>
                        <li className="flex items-center gap-3"><CheckIconTeal /> Enhanced security</li>
                        <li className="flex items-center gap-3"><CheckIconTeal /> Hosting & domain service*</li>
                    </ul>
                     <div className="flex gap-4">
                         <Link to="/versions" className="flex-1 text-center bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">Learn More</Link>
                         <Link to="/demo" className="flex-1 text-center bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border dark:border-gray-600 transition-colors">Try Demo</Link>
                    </div>
                </div>
            </div>
             <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">* Additional service fees apply</p>
        </div>
    </section>
);

const FeatureSection = () => {
    const features = [
        { icon: <StudentIcon />, title: "Student Management", description: "Comprehensive student profiles, attendance tracking, and performance analytics in one centralized system." },
        { icon: <AcademicIcon />, title: "Academic Management", description: "Easily manage courses, curriculum, assignments, and generate detailed grade reports." },
        { icon: <FinancialIcon />, title: "Financial Management", description: "Streamline fee collection, track expenses, and generate financial reports with minimal effort." },
        { icon: <CertificateIcon />, title: "Certification System", description: "Create, manage and distribute certificates and transcripts for completed courses and programs." },
        { icon: <LibraryIcon />, title: "Resource Library", description: "Digital library for educational resources, accessible to students and faculty anytime, anywhere." },
        { icon: <ModulesIcon />, title: "Customizable Modules", description: "Extend functionality with add-ons designed for your institution's specific requirements." },
    ];

    return (
        <section className="py-20 bg-secondary dark:bg-gray-800/50">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Empower Your Educational Institution</h2>
                <p className="mt-2 text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">
                    Designed with educators in mind, our comprehensive features streamline administration and enhance learning.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
                    {features.map(feature => (
                        <div key={feature.title} className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                             <div className="flex items-center gap-4">
                                {feature.icon}
                                <h3 className="text-xl font-bold text-text-primary dark:text-gray-100">{feature.title}</h3>
                             </div>
                            <p className="mt-4 text-text-secondary dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <Link to="/modules" className="mt-12 inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-hover transition-colors shadow-md">
                    → Explore All Features
                </Link>
            </div>
        </section>
    );
};

const TestimonialSection = () => {
    const testimonials = [
        { quote: "Acadeemia transformed our administrative processes, saving us countless hours and improving communication with students and parents.", name: "Dr. Maria Johnson", title: "Principal, Westlake Academy" },
        { quote: "The flexibility to choose between cloud and self-hosted options made Acadeemia the perfect solution for our college's specific needs.", name: "Prof. James Anderson", title: "Dean, Riverside College" },
        { quote: "The add-on modules allowed us to tailor the system perfectly to our requirements. Outstanding support team too!", name: "Sarah Williams", title: "IT Director, Global Education Institute" },
        { quote: "Parent communication has never been easier. The portal is a game-changer for engagement and has been praised by our entire community.", name: "David Chen", title: "Parent-Teacher Association President" },
        { quote: "As a teacher, I find the academic management tools incredibly intuitive. Grade reporting is now a breeze instead of a chore.", name: "Emily Rodriguez", title: "Lead Teacher, Northwood High" },
        { quote: "The financial module streamlined our entire billing process. We've seen a significant reduction in overdue payments.", name: "Michael Thompson", title: "Finance Officer, Crestview Academy" },
    ];

    return (
        <section className="py-20 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Trusted by Educational Institutions</h2>
                <p className="mt-2 text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">
                    Join hundreds of schools and colleges worldwide who trust Acadeemia for their management needs.
                </p>
            </div>
            {/* The Carousel Container */}
            <div
                className="w-full overflow-hidden mt-12"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                }}
            >
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                    {/* Render testimonials twice for the seamless loop */}
                    {[...testimonials, ...testimonials].map((t, index) => (
                        <div key={index} className="flex-shrink-0 mx-4 w-[calc(100vw-4rem)] sm:w-[400px]">
                            <div className="bg-card dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-left h-full flex flex-col justify-between min-h-[280px]">
                                <div>
                                    <div className="flex text-yellow-400 mb-4">★★★★★</div>
                                    <p className="text-text-secondary dark:text-gray-300 mb-6 italic">"{t.quote}"</p>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary dark:text-gray-100">{t.name}</p>
                                    <p className="text-sm text-text-secondary dark:text-gray-400">{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTA = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Institution?</h2>
            <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
                Start your journey with Acadeemia today and experience the difference our system can make.
            </p>
             <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Contact Us
                </Link>
                <Link to="/demo" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300">
                    Request Demo
                </Link>
            </div>
        </div>
    </section>
);


// --- Main Landing Page Component ---

const LandingPage = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <DeploymentSection />
      <FeatureSection />
      <TestimonialSection />
      <FinalCTA />
    </LandingLayout>
  );
};

export default LandingPage;
