import React from 'react';
import LandingLayout from '../components/LandingLayout';

const PageHero = () => (
  <div className="bg-gradient-to-br from-primary/10 via-secondary to-primary/5 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-gray-100 mb-4">
        Affiliate Picks
      </h1>
      <p className="text-xl text-text-secondary dark:text-gray-300 max-w-3xl mx-auto mb-6">
        Curated Tools & Resources for Educators
      </p>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-text-secondary dark:text-gray-400 leading-relaxed">
          We've partnered with the best tools and services in the education technology space
          to bring you carefully selected resources that complement Acadeemia's school management platform.
          These are products we trust and recommend to enhance your educational institution's digital ecosystem.
        </p>
      </div>
    </div>
  </div>
);

const AffiliatePicksPage = () => {
  return (
    <LandingLayout>
      <PageHero />

      <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              We're currently curating the best tools and resources for your educational institution.
              Check back soon to discover our recommended partners and exclusive offers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-text-secondary dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Carefully vetted educational technology tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Exclusive discounts for Acadeemia users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Integration-ready solutions that work seamlessly with our platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Resources to enhance teaching, learning, and administration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                Want to be notified when we launch?
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
              >
                Stay Updated
              </a>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default AffiliatePicksPage;
