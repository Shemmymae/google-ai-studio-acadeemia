
import React from 'react';
import LandingLayout from '../components/LandingLayout';

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300">{subtitle}</p>
        </div>
    </div>
);

const FeaturesPage = () => {
  return (
    <LandingLayout>
      <PageHero title="Features" subtitle="This page is under construction." />
      <section className="py-20 bg-background dark:bg-gray-900">
          <div className="container mx-auto px-6 text-center">
              <p className="text-text-secondary dark:text-gray-400">
                  Please check back later to see our amazing features!
              </p>
          </div>
      </section>
    </LandingLayout>
  );
};

export default FeaturesPage;
