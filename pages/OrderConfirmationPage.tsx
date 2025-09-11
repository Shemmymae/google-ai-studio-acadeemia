
import React from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';

const OrderConfirmationPage = () => {
  return (
    <LandingLayout>
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-text-primary dark:text-gray-100">Thank you for your order!</h1>
          <p className="mt-3 text-lg text-text-secondary dark:text-gray-400">
            Your purchase has been completed successfully. You will receive an email confirmation shortly with your license keys and instructions.
          </p>
          <p className="mt-2 text-sm text-text-secondary dark:text-gray-500">
            Order Confirmation #: <span className="font-mono">ACD-{Math.floor(Math.random() * 900000) + 100000}</span>
          </p>
          <div className="mt-8">
            <Link to="/store" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default OrderConfirmationPage;
