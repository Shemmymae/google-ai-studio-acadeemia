
import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- ICONS ---
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.045l.04.041M16.3 4.045l-.04.041M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const ValuesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;


const PageHero = () => (
    <div className="bg-secondary dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100">About Acadeemia</h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">We are a passionate team of educators, technologists, and innovators dedicated to transforming education through technology.</p>
        </div>
    </div>
);

const OurStorySection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-text-primary dark:text-white mb-4">Our Story</h2>
                <p className="text-text-secondary dark:text-gray-400 mb-4">Founded by a group of former teachers and school administrators, Acadeemia was born from a firsthand understanding of the challenges educational institutions face. We saw a need for a modern, intuitive, and powerful school management system that could truly streamline administrative tasks and enhance the educational experience for everyone involved.</p>
                <p className="text-text-secondary dark:text-gray-400">Our journey began with a simple goal: to create a platform that allows educators to focus on what they do best – teaching. Today, Acadeemia is trusted by hundreds of schools worldwide to manage their operations efficiently and effectively.</p>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" alt="Team working" className="rounded-lg shadow-lg" />
            </div>
        </div>
    </section>
);

const MissionVisionSection = () => (
    <section className="py-20 bg-secondary dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <MissionIcon />
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white mt-4">Our Mission</h3>
                    <p className="mt-2 text-text-secondary dark:text-gray-400">To empower educational institutions with innovative technology that simplifies administration, fosters collaboration, and enhances learning outcomes.</p>
                </div>
                 <div className="p-6">
                    <VisionIcon />
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white mt-4">Our Vision</h3>
                    <p className="mt-2 text-text-secondary dark:text-gray-400">To be the leading global platform for school management, creating a connected and efficient educational ecosystem for every student, teacher, and parent.</p>
                </div>
                 <div className="p-6">
                    <ValuesIcon />
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white mt-4">Our Values</h3>
                    <p className="mt-2 text-text-secondary dark:text-gray-400">Innovation, Integrity, Collaboration, and an unwavering commitment to the success of our partner schools and their communities.</p>
                </div>
            </div>
        </div>
    </section>
);

const TeamMemberCard = ({ name, title, imgSrc }: { name: string; title: string; imgSrc: string }) => (
    <div className="text-center">
        <img src={imgSrc} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md object-cover" />
        <h4 className="text-lg font-bold text-text-primary dark:text-white">{name}</h4>
        <p className="text-primary">{title}</p>
    </div>
);

const OurTeamSection = () => (
    <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white mb-12">Meet the Leadership Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                <TeamMemberCard name="Dr. Evelyn Reed" title="CEO & Co-Founder" imgSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070" />
                <TeamMemberCard name="Marcus Chen" title="CTO & Co-Founder" imgSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887" />
                <TeamMemberCard name="Sofia Garcia" title="Head of Product" imgSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961" />
                <TeamMemberCard name="David Lee" title="Head of Customer Success" imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887" />
            </div>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Join Our Growing Community</h2>
            <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
                Ready to transform your institution? Discover how Acadeemia can make a difference.
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

const AboutUsPage = () => {
    return (
        <LandingLayout>
            <PageHero />
            <OurStorySection />
            <MissionVisionSection />
            <OurTeamSection />
            <FinalCTA />
        </LandingLayout>
    );
};

export default AboutUsPage;
