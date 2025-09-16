
import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- SVG Icons ---
const CheckIcon = ({ className = "text-primary" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const ValuesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const GlobalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>;
const PartnershipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.756 9.588-1.748-2.799-2.756-6.07-2.756-9.588 0-4.638 3.582-8.407 8-8.407s8 3.769 8 8.407c0 3.517-1.008 6.789-2.756 9.588-1.748-2.799-2.756-6.07-2.756-9.588" /></svg>;
const InnovationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const EducationFirstIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const ContinuousInnovationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653A8.956 8.956 0 0112 21a8.956 8.956 0 01-6.653-2.93A8.956 8.956 0 014 12m16 0h-5" /></svg>;
const DedicatedSupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ScalableSolutionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>;
const DataSecurityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.49l-1.955 5.23-.002.003-.004.01-.003.008-.002.008-.002.009-.002.01-.002.01-.001.011-.002.013-.001.013-.002.014-.002.014-.002.015-.002.015 0 .001-.002.016-.002.016-.002.016-.002.017-.002.017-.002.017-.002.018-.002.018-.002.018-.002.018-.001.018-.002.019-.002.019-.002.019-.002.019-.002.019c-.001.006-.002.012-.002.018s0 .012.002.018l.002.019.002.019.002.019.002.019.002.019.001.018.002.018.002.018.002.018.002.018.002.017.002.017.002.017.002.016.002.016.002.016.002.015.002.015.002.014.002.014.001.013.002.013.001.011-.002.01-.002.01-.002.009-.002.008-.003.008-.004-.01-.002-.003-1.955-5.23a1 1 0 011.8 0z" /></svg>;

const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block bg-secondary dark:bg-gray-700 text-primary dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
        {children}
    </span>
);

const HeroSection = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                About Acadeemia
            </h1>
            <p className="mt-6 text-lg text-purple-200 max-w-3xl mx-auto">
                Empowering educational institutions with innovative management solutions since 2019.
            </p>
        </div>
    </section>
);

const OurStorySection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <Pill>Our Story</Pill>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-6">Transforming Education Management</h2>
                <div className="space-y-4 text-text-secondary dark:text-gray-400">
                    <p>Acadeemia was founded in 2017 by Michael Mwaringa. Due to the lack of a management system in his fathers school, he recognized the need for a comprehensive, user-friendly school management system that could adapt to diverse educational environments. Operations began in 2019.</p>
                    <p>What began as a solution for a single institution quickly evolved into a versatile platform serving hundreds of educational institutions worldwide. Our journey has been guided by a simple principle: technology should enhance education, not complicate it.</p>
                </div>
            </div>
            <div>
                <img src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/frontend/about-us.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9mcm9udGVuZC9hYm91dC11cy5wbmciLCJpYXQiOjE3NTgwMDY5NjEsImV4cCI6MzMyOTQwMDY5NjF9.E7937HI6Q0jJaNiKw2BKrc7qv8ghif1ao8t9He5tpKw" alt="Team collaborating on UI designs" className="rounded-xl w-full h-auto shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105" />
            </div>
        </div>
    </section>
);

const MissionVisionValuesSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
            <Pill>Our Foundation</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-4">Mission, Vision & Values</h2>
            <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto mb-12">The principles that guide our company and shape our approach to serving educational institutions worldwide.</p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-primary">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><MissionIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Our Mission</h3>
                    <p className="text-text-secondary dark:text-gray-400">To empower educational institutions with intuitive technology solutions that streamline administrative processes, enhance learning experiences, and foster academic excellence.</p>
                </div>
                <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-green-500">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><VisionIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Our Vision</h3>
                    <p className="text-text-secondary dark:text-gray-400">To be the global leader in educational management systems, recognized for innovation, reliability, and commitment to advancing education through technology.</p>
                </div>
                <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-primary">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><ValuesIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Our Values</h3>
                    <ul className="space-y-3 text-text-secondary dark:text-gray-400">
                        <li className="flex items-start"><CheckIcon /><span className="ml-2"><strong>Innovation</strong> - Constantly evolving our solutions</span></li>
                        <li className="flex items-start"><CheckIcon /><span className="ml-2"><strong>Integrity</strong> - Upholding the highest ethical standards</span></li>
                        <li className="flex items-start"><CheckIcon /><span className="ml-2"><strong>Excellence</strong> - Delivering exceptional quality</span></li>
                        <li className="flex items-start"><CheckIcon /><span className="ml-2"><strong>Empathy</strong> - Understanding our users' needs</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const GlobalImpactSection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
            <Pill>Global Reach</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-4">Our Global Impact</h2>
            <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto mb-12">Transforming education management across continents through strategic partnerships and innovative solutions.</p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><GlobalIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Global Presence</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">Operating in over 15 countries across 6 continents, serving diverse educational systems and cultures.</p>
                    <ul className="space-y-2 text-text-secondary dark:text-gray-300">
                        <li className="flex items-center"><CheckIcon /><span className="ml-2">300+ Educational Institutions</span></li>
                        <li className="flex items-center"><CheckIcon /><span className="ml-2">2M+ Students Impacted</span></li>
                        <li className="flex items-center"><CheckIcon /><span className="ml-2">15+ Countries Served</span></li>
                    </ul>
                </div>
                 <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><PartnershipIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Strategic Partnerships</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">Collaborating with leading educational institutions and technology providers worldwide.</p>
                     <ul className="space-y-2 text-text-secondary dark:text-gray-300">
                        <li className="flex items-center"><CheckIcon className="text-green-500" /><span className="ml-2">Microsoft Education Partner</span></li>
                        <li className="flex items-center"><CheckIcon className="text-green-500" /><span className="ml-2">Google Workspace Integration</span></li>
                        <li className="flex items-center"><CheckIcon className="text-green-500" /><span className="ml-2">UNESCO Education Partner</span></li>
                    </ul>
                </div>
                 <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-secondary dark:bg-gray-700 h-14 w-14 rounded-full flex items-center justify-center mb-4"><InnovationIcon /></div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">Innovation Hub</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">Driving educational technology innovation through research and development.</p>
                     <ul className="space-y-2 text-text-secondary dark:text-gray-300">
                        <li className="flex items-center"><CheckIcon className="text-purple-500" /><span className="ml-2">AI-Powered Analytics</span></li>
                        <li className="flex items-center"><CheckIcon className="text-purple-500" /><span className="ml-2">Simplified Management</span></li>
                        <li className="flex items-center"><CheckIcon className="text-purple-500" /><span className="ml-2">Smart Learning Tools</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <div className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <p className="text-4xl lg:text-5xl font-extrabold text-primary">{value}</p>
        <p className="mt-2 text-text-secondary dark:text-gray-400">{label}</p>
    </div>
);

const MakingADifferenceSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
            <Pill>Our Impact</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-4">Making a Difference</h2>
            <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto mb-12">We're proud of the positive impact our solutions have made for educational institutions worldwide.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard value="300+" label="Educational Institutions" />
                <StatCard value="15+" label="Countries" />
                <StatCard value="2M+" label="Students Impacted" />
                <StatCard value="15M+" label="Hours Saved Annually" />
            </div>
        </div>
    </section>
);

const SuccessStoriesSection = () => {
    const successStories = [
        { quote: "Acadeemia revolutionized our administrative processes, reducing paperwork by 85% and allowing our staff to focus on what matters most: supporting our students.", name: "Dr. Richard Martinez, President", title: "Westlake University" },
        { quote: "Managing our 12 campuses was a logistical challenge until we implemented Acadeemia. Now we have complete visibility and standardized processes across all locations.", name: "Jennifer Lewis, Operations Director", title: "Global Academy Network" },
        { quote: "The parents at our school love the transparency and communication features. Attendance rates improved by 12% in the first year after implementation.", name: "Thomas Anderson, Principal", title: "Eastside High School" },
        { quote: "Parent communication has never been easier. The portal is a game-changer for engagement and has been praised by our entire community.", name: "David Chen", title: "Parent-Teacher Association President" },
        { quote: "As a teacher, I find the academic management tools incredibly intuitive. Grade reporting is now a breeze instead of a chore.", name: "Emily Rodriguez", title: "Lead Teacher, Northwood High" },
        { quote: "The financial module streamlined our entire billing process. We've seen a significant reduction in overdue payments.", name: "Michael Thompson", title: "Finance Officer, Crestview Academy" },
    ];

    return (
        <section className="py-20 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-12">Success Stories</h2>
            </div>
             <div
                className="w-full overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                }}
            >
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                    {[...successStories, ...successStories].map((story, index) => (
                        <div key={index} className="flex-shrink-0 mx-4 w-[calc(100vw-4rem)] sm:w-[400px]">
                            <div className="bg-card dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-left h-full flex flex-col justify-between min-h-[280px]">
                                <div>
                                    <p className="text-text-secondary dark:text-gray-300 italic mb-6">"{story.quote}"</p>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary dark:text-gray-100">{story.name}</p>
                                    <p className="text-sm text-text-secondary dark:text-gray-400">{story.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const WhyChooseSection = () => (
     <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                 <img src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/frontend/about-us-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9mcm9udGVuZC9hYm91dC11cy0yLnBuZyIsImlhdCI6MTc1ODAwNzQxOSwiZXhwIjozMzI5NDAwNzQxOX0.Pjbcq4Cllj5S0MjqRhZ4cKhdvLoTGrSpC3U2DvfJOnE" alt="Illustration of woman with laptop and chat bubbles" className="rounded-lg w-full h-auto shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105" />
            </div>
            <div>
                <Pill>Our Commitment</Pill>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-gray-100 mb-6">Why Choose Acadeemia</h2>
                <p className="text-text-secondary dark:text-gray-400 mb-8">Our commitment extends beyond providing software—we're your partner in educational excellence.</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <EducationFirstIcon />
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-gray-100">Education-First Approach</h4>
                            <p className="text-text-secondary dark:text-gray-400">Our solutions are designed by educators for educators, with pedagogy at the core.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <ContinuousInnovationIcon />
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-gray-100">Continuous Innovation</h4>
                            <p className="text-text-secondary dark:text-gray-400">We're constantly evolving our platform based on user feedback and educational trends.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <DedicatedSupportIcon />
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-gray-100">Dedicated Support</h4>
                            <p className="text-text-secondary dark:text-gray-400">Our support team understands education and is committed to your institution's success.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <ScalableSolutionsIcon />
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-gray-100">Scalable Solutions</h4>
                            <p className="text-text-secondary dark:text-gray-400">Whether you're a small school or a large university, our system grows with your needs.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <DataSecurityIcon />
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-gray-100">Data Security & Privacy</h4>
                            <p className="text-text-secondary dark:text-gray-400">We adhere to the highest standards of data protection, especially important for student information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const JoinCommunityCTA = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Join Our Educational Community</h2>
            <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">
                Discover how Acadeemia can transform your institution's management and empower your educational mission.
            </p>
             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/demo" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Request Demo
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300">
                    Contact Us
                </Link>
            </div>
        </div>
    </section>
);


const AboutUsPage = () => {
    return (
        <LandingLayout>
            <HeroSection />
            <OurStorySection />
            <MissionVisionValuesSection />
            <GlobalImpactSection />
            <MakingADifferenceSection />
            <SuccessStoriesSection />
            <WhyChooseSection />
            <JoinCommunityCTA />
        </LandingLayout>
    );
};

export default AboutUsPage;
