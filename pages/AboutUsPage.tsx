
import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- SVG Icons for About Us Page ---
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800/50 py-20 text-center">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const OurStorySection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-text-primary dark:text-white mb-4">Our Story</h2>
                <p className="text-text-secondary dark:text-gray-400 mb-4">
                    Acadeemia was founded by a team of educators and technologists who saw a need for a more intuitive and integrated school management system. Frustrated by fragmented software and outdated processes, we set out to create a solution that truly serves the needs of modern educational institutions.
                </p>
                <p className="text-text-secondary dark:text-gray-400">
                    From our humble beginnings, we've grown into a trusted partner for hundreds of schools worldwide, driven by our passion for education and a commitment to innovation.
                </p>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" alt="Our Team" className="rounded-lg shadow-lg" />
            </div>
        </div>
    </section>
);

const MissionVisionSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6 space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4"><MissionIcon /></div>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">Our Mission</h3>
                    <p className="mt-2 text-text-secondary dark:text-gray-300">To empower educational institutions with technology that simplifies administration, enhances learning experiences, and fosters strong community engagement.</p>
                </div>
                <div className="text-center md:text-left">
                     <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4"><VisionIcon /></div>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">Our Vision</h3>
                    <p className="mt-2 text-text-secondary dark:text-gray-300">To be the leading platform for school management globally, recognized for our innovation, reliability, and commitment to student success.</p>
                </div>
            </div>
        </div>
    </section>
);

const JoinUsCTA = () => (
    <section className="bg-primary">
        <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold text-white">Join Our Team</h2>
            <p className="mt-2 text-lg text-purple-200 max-w-2xl mx-auto">
                We're always looking for passionate individuals to join our mission. Explore our open positions and help us shape the future of education.
            </p>
            <Link to="/careers" className="mt-6 inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Careers
            </Link>
        </div>
    </section>
);

const AboutUsPage = () => {
    return (
        <LandingLayout>
            <PageHero 
                title="About Acadeemia" 
                subtitle="We're passionate about leveraging technology to create better educational experiences for everyone involved." 
            />
            <OurStorySection />
            <MissionVisionSection />
            <JoinUsCTA />
        </LandingLayout>
    );
};

export default AboutUsPage;
