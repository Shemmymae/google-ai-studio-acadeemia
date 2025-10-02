import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- SVG Icons for About Us Page ---
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const AwardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80 py-20 text-center">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const OurStorySection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Our Story</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforming Education Management</h2>
                    <p className="text-lg text-text-secondary dark:text-gray-400 mb-4">
                        Acadeemia was founded in 2017 by Michael Mwaringa. Due to the lack of a management system in his fathers school, he recognized the need for a comprehensive, user-friendly school management system that could adapt to diverse educational environments. Operations began in 2019.
                    </p>
                    <p className="text-lg text-text-secondary dark:text-gray-400 mb-4">
                        What began as a solution for a single institution quickly evolved into a versatile platform serving hundreds of educational institutions worldwide. Our journey has been guided by a simple principle: technology should enhance education, not complicate it.
                    </p>
                    <p className="text-lg text-text-secondary dark:text-gray-400">
                        Today, Acadeemia continues to innovate at the intersection of education and technology, developing solutions that address the evolving needs of modern educational institutions.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute -top-5 -right-5 w-32 h-32 bg-primary/10 rounded-lg"></div>
                    <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-100 rounded-lg"></div>
                    <img
                        src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/frontend/about-us.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9mcm9udGVuZC9hYm91dC11cy5wbmciLCJpYXQiOjE3NTkxMDk0NTksImV4cCI6MzMyOTUxMDk0NTl9.mxgcM0CJUAz5fu8EhexitpyCpZ_ZxNgxVGdt5u77hUA"
                        alt="Acadeemia team meeting"
                        className="rounded-xl shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105 relative z-10 w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </section>
);

const MissionVisionSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Our Foundation</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission, Vision & Values</h2>
                <p className="text-lg text-text-secondary dark:text-gray-400">
                    The principles that guide our company and shape our approach to serving educational institutions worldwide.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-t-4 border-primary">
                    <div className="p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <TargetIcon />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-text-secondary dark:text-gray-400">
                        To empower educational institutions with intuitive technology solutions that streamline administrative processes, enhance learning experiences, and foster academic excellence.
                    </p>
                </div>
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-t-4 border-secondary">
                    <div className="p-3 bg-secondary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <UsersIcon />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-text-secondary dark:text-gray-400">
                        To be the global leader in educational management systems, recognized for innovation, reliability, and commitment to advancing education through technology.
                    </p>
                </div>
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-t-4 border-accent">
                    <div className="p-3 bg-accent/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <HeartIcon />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                    <ul className="space-y-3 text-text-secondary dark:text-gray-400">
                        <li className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2"><strong>Innovation</strong> - Constantly evolving our solutions</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2"><strong>Integrity</strong> - Upholding the highest ethical standards</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2"><strong>Excellence</strong> - Delivering exceptional quality</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2"><strong>Empathy</strong> - Understanding our users' needs</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const GlobalImpactSection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Global Reach</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Global Impact</h2>
                <p className="text-lg text-text-secondary dark:text-gray-400">
                    Transforming education management across continents through strategic partnerships and innovative solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                    <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <GlobeIcon />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Global Presence</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">
                        Operating in over 15 countries across 6 continents, serving diverse educational systems and cultures.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">300+ Educational Institutions</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">2M+ Students Impacted</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">15+ Countries Served</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                    <div className="p-3 bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <ShieldIcon />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Strategic Partnerships</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">
                        Collaborating with leading educational institutions and technology providers worldwide.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">Microsoft Education Partner</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">Google Workspace Integration</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">UNESCO Education Partner</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-primary/20 transition-shadow">
                    <div className="p-3 bg-purple-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                        <ZapIcon />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Innovation Hub</h3>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">
                        Driving educational technology innovation through research and development.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">AI-Powered Analytics</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">Simplified Management</span>
                        </li>
                        <li className="flex items-center text-text-secondary dark:text-gray-400">
                            <CheckIcon />
                            <span className="ml-2">Smart Learning Tools</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-secondary dark:bg-gray-800/50 rounded-xl p-8 mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Featured Partners</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Global Education Alliance",
                            location: "United States",
                            type: "Research Partner"
                        },
                        {
                            name: "EduTech Solutions",
                            location: "United Kingdom",
                            type: "Technology Partner"
                        },
                        {
                            name: "African Education Council",
                            location: "Kenya",
                            type: "Regional Partner"
                        },
                        {
                            name: "Asian School Network",
                            location: "Singapore",
                            type: "Implementation Partner"
                        }
                    ].map((partner, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-card dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold text-text-primary dark:text-gray-100">{partner.name}</h4>
                                <p className="text-sm text-text-secondary dark:text-gray-400">{partner.location}</p>
                                <p className="text-xs text-primary mt-1">{partner.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const OurImpactSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Our Impact</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference</h2>
                <p className="text-lg text-text-secondary dark:text-gray-400">
                    We're proud of the positive impact our solutions have made for educational institutions worldwide.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
                {[
                    { number: "300+", label: "Educational Institutions" },
                    { number: "15+", label: "Countries" },
                    { number: "2M+", label: "Students Impacted" },
                    { number: "15M+", label: "Hours Saved Annually" }
                ].map((stat, index) => (
                    <div key={index} className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                        <p className="text-text-secondary dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-center">Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            institution: "Westlake University",
                            quote: "Acadeemia revolutionized our administrative processes, reducing paperwork by 85% and allowing our staff to focus on what matters most: supporting our students.",
                            person: "Dr. Richard Martinez, President"
                        },
                        {
                            institution: "Global Academy Network",
                            quote: "Managing our 12 campuses was a logistical challenge until we implemented Acadeemia. Now we have complete visibility and standardized processes across all locations.",
                            person: "Jennifer Lewis, Operations Director"
                        },
                        {
                            institution: "Eastside High School",
                            quote: "The parents at our school love the transparency and communication features. Attendance rates improved by 12% in the first year after implementation.",
                            person: "Thomas Anderson, Principal"
                        }
                    ].map((story, index) => (
                        <div key={index} className="flex flex-col h-full">
                            <div className="bg-secondary dark:bg-gray-800/50 p-6 rounded-lg mb-4 flex-grow">
                                <p className="italic text-text-secondary dark:text-gray-300">"{story.quote}"</p>
                            </div>
                            <div>
                                <p className="font-semibold text-text-primary dark:text-gray-100">{story.person}</p>
                                <p className="text-sm text-text-secondary dark:text-gray-400">{story.institution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const OurCommitmentSection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        src="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/frontend/about-us-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9mcm9udGVuZC9hYm91dC11cy0yLnBuZyIsImlhdCI6MTc1OTEwOTQ4MywiZXhwIjozMzI5NTEwOTQ4M30.4ucy1RkEXpcnkSziuoILHbajMR6XVa43XBmJdMfCzgg"
                        alt="Team collaboration"
                        className="rounded-xl shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105 w-full h-auto"
                    />
                </div>
                <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Our Commitment</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Acadeemia</h2>
                    <p className="text-lg text-text-secondary dark:text-gray-400 mb-6">
                        Our commitment extends beyond providing software—we're your partner in educational excellence.
                    </p>

                    <ul className="space-y-4">
                        {[
                            {
                                title: "Education-First Approach",
                                description: "Our solutions are designed by educators for educators, with pedagogy at the core."
                            },
                            {
                                title: "Continuous Innovation",
                                description: "We're constantly evolving our platform based on user feedback and educational trends."
                            },
                            {
                                title: "Dedicated Support",
                                description: "Our support team understands education and is committed to your institution's success."
                            },
                            {
                                title: "Scalable Solutions",
                                description: "Whether you're a small school or a large university, our system grows with your needs."
                            },
                            {
                                title: "Data Security & Privacy",
                                description: "We adhere to the highest standards of data protection, especially important for student information."
                            }
                        ].map((item, index) => (
                            <li key={index} className="flex">
                                <div className="mr-4 mt-1">
                                    <AwardIcon />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-text-primary dark:text-gray-100">{item.title}</h3>
                                    <p className="text-text-secondary dark:text-gray-400">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const JoinUsCTA = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Educational Community</h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-8">
                Discover how Acadeemia can transform your institution's management and empower your educational mission.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/demo" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Request Demo
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                    Contact Us
                </Link>
            </div>
        </div>
    </section>
);

const AboutUsPage = () => {
    return (
        <LandingLayout>
            <PageHero
                title="About Acadeemia"
                subtitle="Empowering educational institutions with innovative management solutions since 2019."
            />
            <OurStorySection />
            <MissionVisionSection />
            <GlobalImpactSection />
            <OurImpactSection />
            <OurCommitmentSection />
            <JoinUsCTA />
        </LandingLayout>
    );
};

export default AboutUsPage;
