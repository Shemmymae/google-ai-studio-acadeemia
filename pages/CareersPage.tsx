
import React, { useState, useEffect } from 'react';
import LandingLayout from '../components/LandingLayout';
import JobApplicationModal from '../components/JobApplicationModal';
import { supabase } from '../supabase';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  employment_type: string;
  experience_level: string;
  salary_range?: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
}

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const JobOpening = ({ job, onApply }: { job: Job; onApply: (job: Job) => void }) => {
    const getSalaryDisplay = () => {
        if (job.salary_range) return job.salary_range;
        if (job.salary_min && job.salary_max) {
            return `${job.currency || 'USD'} ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`;
        }
        return null;
    };

    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary dark:text-gray-100">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-primary font-semibold">{job.location}</span>
                        <span className="text-text-secondary dark:text-gray-400">•</span>
                        <span className="text-text-secondary dark:text-gray-400">{job.employment_type}</span>
                        {getSalaryDisplay() && (
                            <>
                                <span className="text-text-secondary dark:text-gray-400">•</span>
                                <span className="text-text-secondary dark:text-gray-400">{getSalaryDisplay()}</span>
                            </>
                        )}
                    </div>
                    <p className="text-text-secondary dark:text-gray-400 mt-3 max-w-2xl line-clamp-2">
                        {job.description}
                    </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <button
                        onClick={() => onApply(job)}
                        className="block w-full text-center bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const JobSection = ({ title, jobs, onApply }: { title: string; jobs: Job[]; onApply: (job: Job) => void }) => {
    if (jobs.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-6">{title}</h2>
            <div className="space-y-6">
                {jobs.map((job) => (
                    <JobOpening key={job.id} job={job} onApply={onApply} />
                ))}
            </div>
        </div>
    );
};


const CareersPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleApply = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const fetchJobs = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error: any) {
            console.error('Error fetching jobs:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const groupJobsByDepartment = () => {
        const grouped: { [key: string]: Job[] } = {};
        jobs.forEach(job => {
            const dept = job.department || 'Other';
            if (!grouped[dept]) {
                grouped[dept] = [];
            }
            grouped[dept].push(job);
        });
        return grouped;
    };

    const groupedJobs = groupJobsByDepartment();
    const departments = Object.keys(groupedJobs).sort();

    return (
        <LandingLayout>
            <PageHero
                title="Join Our Mission"
                subtitle="We're a passionate team of educators and technologists dedicated to shaping the future of education. Sound like you? Come join us."
            />

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="mt-4 text-xl font-semibold text-text-primary dark:text-gray-100">
                                No open positions at the moment
                            </h3>
                            <p className="mt-2 text-text-secondary dark:text-gray-400">
                                Check back soon for new opportunities, or send us your resume at{' '}
                                <a href="mailto:careers@acadeemia.com" className="text-primary hover:underline">
                                    careers@acadeemia.com
                                </a>
                            </p>
                        </div>
                    ) : (
                        <>
                            {departments.map((department) => (
                                <JobSection
                                    key={department}
                                    title={department}
                                    jobs={groupedJobs[department]}
                                    onApply={handleApply}
                                />
                            ))}
                        </>
                    )}
                </div>
            </section>

            {selectedJob && (
                <JobApplicationModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </LandingLayout>
    );
};

export default CareersPage;
