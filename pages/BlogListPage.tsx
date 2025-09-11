
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

const BlogCard = ({ slug, image, title, excerpt }: { slug: string, image: string, title: string, excerpt: string }) => (
    <Link to={`/blog/${slug}`} className="block group bg-card dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4">{excerpt}</p>
            <span className="font-semibold text-primary">Read More &rarr;</span>
        </div>
    </Link>
);


const BlogListPage = () => {
    const posts = [
        {
            slug: 'streamlining-admissions',
            title: '5 Ways to Streamline Your School’s Admissions Process',
            excerpt: 'Discover how modern technology can help you reduce paperwork, improve communication, and attract more families to your institution.',
            image: 'https://picsum.photos/seed/blog1/400/300'
        },
        {
            slug: 'parent-engagement',
            title: 'Boosting Parent Engagement: A Guide for Modern Schools',
            excerpt: 'Learn effective strategies to keep parents informed, involved, and invested in their child’s academic journey through better communication tools.',
            image: 'https://picsum.photos/seed/blog2/400/300'
        },
        {
            slug: 'data-driven-decisions',
            title: 'Making Data-Driven Decisions in Education',
            excerpt: 'Explore how to leverage the data in your SIS to improve student outcomes, optimize resource allocation, and drive strategic planning.',
            image: 'https://picsum.photos/seed/blog3/400/300'
        },
    ];

    return (
        <LandingLayout>
            <PageHero 
                title="Acadeemia Insights"
                subtitle="Your source for the latest trends, tips, and best practices in school management and educational technology."
            />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <BlogCard key={post.slug} {...post} />
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default BlogListPage;
