
import React from 'react';
import LandingLayout from '../components/LandingLayout';

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const JobOpening = ({ title, location, description }: { title: string, location: string, description: string }) => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h3 className="text-xl font-bold text-text-primary dark:text-gray-100">{title}</h3>
            <p className="text-primary font-semibold mt-1">{location}</p>
            <p className="text-text-secondary dark:text-gray-400 mt-2 max-w-xl">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
            <a href="#" className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Apply Now
            </a>
        </div>
    </div>
);

const JobSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-6">{title}</h2>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);


const CareersPage = () => {
    return (
        <LandingLayout>
            <PageHero 
                title="Join Our Mission"
                subtitle="We're a passionate team of educators and technologists dedicated to shaping the future of education. Sound like you? Come join us."
            />
            
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <JobSection title="Engineering">
                        <JobOpening 
                            title="Senior Frontend Engineer (React)"
                            location="Remote"
                            description="Build beautiful, intuitive, and performant user interfaces that empower thousands of educators and students every day."
                        />
                        <JobOpening 
                            title="Backend Engineer (PostgreSQL, Supabase)"
                            location="Remote"
                            description="Design, build, and maintain the scalable and secure backend systems that power the Acadeemia platform."
                        />
                    </JobSection>
                    
                    <JobSection title="Sales & Marketing">
                        <JobOpening 
                            title="Account Executive"
                            location="New York, NY"
                            description="Drive growth by building relationships with school leaders and demonstrating the value of Acadeemia to prospective clients."
                        />
                    </JobSection>
                </div>
            </section>
        </LandingLayout>
    );
};

export default CareersPage;
