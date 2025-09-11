
import React, { useState } from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';

// --- New Components for this Page ---

const PageHero = () => (
    <div className="bg-gradient-to-b from-purple-100 to-white dark:from-gray-800/50 dark:to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100">Powerful Modules & Add-Ons</h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">Discover the comprehensive toolset that powers Acadeemia and explore optional add-ons to extend functionality.</p>
        </div>
    </div>
);

const FeatureIcon = () => (
    <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    </div>
);


const FeatureCard = ({ title, description }: { title: string, description: string }) => (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4">
        <FeatureIcon />
        <div>
            <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">{title}</h3>
            <p className="mt-1 text-text-secondary dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const FinalCTA = () => (
    <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Experience Acadeemia?</h2>
            <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
                See all these features in action with a personalized demo tailored to your institution's needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Request Demo
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300">
                    Contact Sales
                </Link>
            </div>
        </div>
    </section>
);

// --- Data for Features ---
const allFeatures = {
  saas: [
    { name: 'Alumni', category: 'Administrative', description: 'Comprehensive alumni management and tracking system.' },
    { name: 'Attachments Book', category: 'Academic', description: 'Comprehensive attachments book management and tracking system.' },
    { name: 'Attendance', category: 'Core Features', description: 'Comprehensive attendance management and tracking system.' },
    { name: 'Bulk SMS And Email', category: 'Communication', description: 'Comprehensive bulk sms and email management and tracking system.' },
    { name: 'Card Management', category: 'Administrative', description: 'Comprehensive card management and tracking system.' },
    { name: 'Certificate', category: 'Academic', description: 'Comprehensive certificate management and tracking system.' },
    { name: 'Custom Domain', category: 'Add-Ons', description: 'Comprehensive custom domain management and tracking system.' },
    { name: 'Events', category: 'Administrative', description: 'Comprehensive events management and tracking system.' },
    { name: 'Homework', category: 'Academic', description: 'Comprehensive homework management and tracking system.' },
    { name: 'Hostel', category: 'Administrative', description: 'Comprehensive hostel management and tracking system.' },
    { name: 'Human Resource', category: 'Core Features', description: 'Comprehensive human resource management and tracking system.' },
    { name: 'Inventory', category: 'Administrative', description: 'Comprehensive inventory management and tracking system.' },
    { name: 'Library', category: 'Core Features', description: 'Comprehensive library management and tracking system.' },
    { name: 'Live Class', category: 'Academic', description: 'Comprehensive live class management and tracking system.' },
    { name: 'Multi School', category: 'Administrative', description: 'Comprehensive multi school management and tracking system.' },
    { name: 'Multi Class', category: 'Academic', description: 'Comprehensive multi class management and tracking system.' },
    { name: 'Office Accounting', category: 'Administrative', description: 'Comprehensive office accounting management and tracking system.' },
    { name: 'Online Exam', category: 'Academic', description: 'Comprehensive online exam management and tracking system.' },
    { name: 'Reception', category: 'Administrative', description: 'Comprehensive reception management and tracking system.' },
    { name: 'Student Accounting', category: 'Core Features', description: 'Comprehensive student accounting management and tracking system.' },
    { name: 'Transport', category: 'Administrative', description: 'Comprehensive transport management and tracking system.' },
    { name: 'Website', category: 'Add-Ons', description: 'Comprehensive website management and tracking system.' },
  ],
  standalone: [
    { name: 'Fees Collection', category: 'Core Features', description: 'Comprehensive fees collection management and tracking system.' },
    { name: 'Income', category: 'Administrative', description: 'Comprehensive income management and tracking system.' },
    { name: 'Expense', category: 'Administrative', description: 'Comprehensive expense management and tracking system.' },
    { name: 'Student Attendance', category: 'Core Features', description: 'Comprehensive student attendance management and tracking system.' },
    { name: 'Examination', category: 'Core Features', description: 'Comprehensive examination management and tracking system.' },
    { name: 'Download Center', category: 'Academic', description: 'Comprehensive download center management and tracking system.' },
    { name: 'Library', category: 'Core Features', description: 'Comprehensive library management and tracking system.' },
    { name: 'Inventory', category: 'Administrative', description: 'Comprehensive inventory management and tracking system.' },
    { name: 'Transport', category: 'Administrative', description: 'Comprehensive transport management and tracking system.' },
    { name: 'Hostel', category: 'Administrative', description: 'Comprehensive hostel management and tracking system.' },
    { name: 'Communicate', category: 'Communication', description: 'Comprehensive communicate management and tracking system.' },
    { name: 'Front CMS', category: 'Add-Ons', description: 'Comprehensive front cms management and tracking system.' },
    { name: 'Front Office', category: 'Administrative', description: 'Comprehensive front office management and tracking system.' },
    { name: 'Homework', category: 'Academic', description: 'Comprehensive homework management and tracking system.' },
    { name: 'Certificate', category: 'Academic', description: 'Comprehensive certificate management and tracking system.' },
    { name: 'Calendar To-Do List', category: 'Academic', description: 'Comprehensive calendar to-do list management and tracking system.' },
    { name: 'Online Examination', category: 'Academic', description: 'Comprehensive online examination management and tracking system.' },
    { name: 'Chat', category: 'Communication', description: 'Comprehensive chat management and tracking system.' },
    { name: 'Multi Class', category: 'Academic', description: 'Comprehensive multi class management and tracking system.' },
    { name: 'Online Admission', category: 'Administrative', description: 'Comprehensive online admission management and tracking system.' },
    { name: 'Alumni', category: 'Administrative', description: 'Comprehensive alumni management and tracking system.' },
    { name: 'Lesson Plan', category: 'Academic', description: 'Comprehensive lesson plan management and tracking system.' },
    { name: 'Annual Calendar', category: 'Academic', description: 'Comprehensive annual calendar management and tracking system.' },
    { name: 'Student CV', category: 'Academic', description: 'Comprehensive student cv management and tracking system.' },
  ]
};

const filters = ["All Features", "Core Features", "Academic", "Administrative", "Communication", "Add-Ons"];


const ModulesPage = () => {
    const [activeVersion, setActiveVersion] = useState<'saas' | 'standalone'>('saas');
    const [activeFilter, setActiveFilter] = useState('All Features');
    
    const featuresToDisplay = allFeatures[activeVersion];
    const filteredFeatures = activeFilter === 'All Features'
        ? featuresToDisplay
        : featuresToDisplay.filter(feature => feature.category === activeFilter);

    return (
        <LandingLayout>
            <PageHero />

            <section className="py-20 bg-background dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    {/* Version Toggle */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex space-x-1">
                            <button
                                onClick={() => setActiveVersion('saas')}
                                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${activeVersion === 'saas' ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                SaaS Version
                            </button>
                            <button
                                onClick={() => setActiveVersion('standalone')}
                                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${activeVersion === 'standalone' ? 'bg-white dark:bg-gray-800 text-primary shadow' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Standalone Version
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex justify-center flex-wrap gap-2 mb-12">
                         {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === filter ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFeatures.map(feature => (
                            <FeatureCard key={`${activeVersion}-${feature.name}`} title={feature.name} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>
            
            <FinalCTA />
        </LandingLayout>
    );
};

export default ModulesPage;
