
import React from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ValueProp = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-text-secondary dark:text-gray-400">{description}</p>
    </div>
);

const WhyAcadeemiaPage = () => {
    return (
        <LandingLayout>
            <PageHero 
                title="Why Choose Acadeemia?"
                subtitle="Discover the Acadeemia difference. We're more than just software; we're your partner in education."
            />
            
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            title="All-in-One Platform"
                            description="Eliminate data silos and streamline workflows by managing every aspect of your school from a single, unified system."
                        />
                        <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                            title="Intuitive & User-Friendly"
                            description="Designed with educators in mind. Our clean interface reduces training time and increases adoption for staff, parents, and students."
                        />
                        <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>}
                            title="Data-Driven Insights"
                            description="Make informed decisions with powerful, real-time analytics and customizable reports on enrollment, academics, and finance."
                        />
                        <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m8-4H5a2 2 0 00-2 2v10a2 2 0 002 2h11l4 4V7a2 2 0 00-2-2z" /></svg>}
                            title="Dedicated Support"
                            description="We're your partners in success. Our expert support team is always ready to help you get the most out of Acadeemia."
                        />
                         <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.49l-1.955 5.23-.002.003-.004.01-.003.008-.002.008-.002.009-.002.01-.002.01-.001.011-.002.013-.001.013-.002.014-.002.014-.002.015-.002.015 0 .001-.002.016-.002.016-.002.016-.002.017-.002.017-.002.017-.002.018-.002.018-.002.018-.002.018-.001.018-.002.019-.002.019-.002.019-.002.019-.002.019c-.001.006-.002.012-.002.018s0 .012.002.018l.002.019.002.019.002.019.002.019.002.019.001.018.002.018.002.018.002.018.002.018.002.017.002.017.002.017.002.016.002.016.002.016.002.015.002.015.002.014.002.014.001.013.002.013.001.011.002.01.002.01.002.009.002.008.003.008.004.01.002.003 1.955 5.23a1 1 0 01-1.8 0l-1.955-5.23-.002-.003-.004-.01-.003-.008-.002-.008-.002-.009-.002-.01-.002-.01-.001-.011-.002-.013-.001-.013-.002-.014-.002-.014-.002-.015-.002-.015 0-.001.002-.016.002-.016.002-.016.002-.017.002-.017.002-.017.002-.018.002-.018.002-.018.002-.018.001-.018.002-.019.002-.019.002-.019.002-.019.002-.019c.001-.006.002-.012.002-.018s0-.012-.002-.018l-.002-.019-.002-.019-.002-.019-.002-.019-.002-.019-.001-.018-.002-.018-.002-.018-.002-.018-.002-.018-.002-.017-.002-.017-.002-.017-.002-.016-.002-.016-.002-.016-.002-.015-.002-.015-.002-.014-.002-.014-.001-.013-.002-.013-.001-.011-.002-.01-.002-.01-.002-.009-.002-.008-.003-.008-.004-.01-.002-.003-1.955-5.23a1 1 0 011.8 0z" /></svg>}
                            title="Secure & Reliable"
                            description="Built on enterprise-grade infrastructure, we ensure your data is safe, secure, and always accessible with a 99.9% uptime."
                        />
                         <ValueProp 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                            title="Constantly Evolving"
                            description="We partner with our schools to continuously innovate, releasing new features and updates that meet the evolving needs of education."
                        />
                    </div>
                </div>
            </section>

            <div className="bg-secondary dark:bg-gray-800">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100">Ready to See the Difference?</h2>
                    <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">Let us show you how Acadeemia can empower your school community and simplify your daily operations.</p>
                    <Link to="/contact" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                        Request Your Free Demo
                    </Link>
                </div>
            </div>

        </LandingLayout>
    );
};

export default WhyAcadeemiaPage;
