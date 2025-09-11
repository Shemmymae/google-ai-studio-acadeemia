
import React from 'react';
import LandingLayout from '../components/LandingLayout';

const HelpCenterPage = () => {
    const categories = [
        {
            title: "Getting Started",
            description: "Learn how to set up your school, add users, and configure your first school year.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        },
        {
            title: "Admissions & Enrollment",
            description: "Guides on managing your admissions pipeline, from applications to enrollment.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
        },
        {
            title: "Academics",
            description: "Find help with gradebooks, attendance, report cards, and lesson planning.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        },
        {
            title: "Billing & Finance",
            description: "Information on tuition invoicing, online payments, and financial reporting.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 0h-2" /></svg>
        },
        {
            title: "Parent & Student Portals",
            description: "Help articles for parents and students on accessing grades, assignments, and more.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" /></svg>
        },
        {
            title: "Account & Settings",
            description: "Manage your profile, notification preferences, and security settings.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        },
    ];

    return (
        <LandingLayout>
            <div className="bg-primary">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold text-white">How can we help?</h1>
                    <div className="mt-8 max-w-2xl mx-auto relative">
                        <input 
                            type="search" 
                            placeholder="Search our knowledge base..."
                            className="w-full pl-5 pr-12 py-4 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-primary-hover/50 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />
                        <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map(cat => (
                             <a href="#" key={cat.title} className="block bg-card dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all">
                                <div className="text-primary">{cat.icon}</div>
                                <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mt-4">{cat.title}</h3>
                                <p className="mt-2 text-text-secondary dark:text-gray-400">{cat.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default HelpCenterPage;
