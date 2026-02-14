import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';

const MSPPage = () => {
  const [emailSubscribe, setEmailSubscribe] = useState('');

  const services = [
    {
      icon: '💻',
      title: 'Workstation Leasing',
      description: 'High-performance desktop computers and workstations leased on flexible terms to meet your institution\'s computing needs.'
    },
    {
      icon: '📱',
      title: 'Laptop Leasing',
      description: 'Portable computing solutions for teachers, administrators, and students with comprehensive support and maintenance.'
    },
    {
      icon: '❤️',
      title: 'Network Infrastructure',
      description: 'Complete network setup, management, and maintenance including routers, switches, and wireless access points.'
    },
    {
      icon: '🖥️',
      title: 'Server Management',
      description: 'Dedicated server hosting, virtualization, and cloud infrastructure management for your critical applications.'
    },
    {
      icon: '☎️',
      title: 'IT Support & Maintenance',
      description: '24/7 technical support, proactive maintenance, and rapid response to ensure minimal downtime.'
    },
    {
      icon: '🔒',
      title: 'Security (CCTV and Biometrics)',
      description: 'Comprehensive security solutions including CCTV surveillance and biometric access control systems for campus safety.'
    }
  ];

  const benefits = [
    { icon: '💰', title: 'Cost-effective leasing options with flexible terms' },
    { icon: '⚙️', title: 'Proactive maintenance and support to minimize disruptions' },
    { icon: '📈', title: 'Scalable solutions that grow with your institution' },
    { icon: '👨‍💼', title: 'Expert IT management by certified professionals' },
    { icon: '💾', title: 'Reduced capital expenditure on IT infrastructure' },
    { icon: '🔄', title: 'Access to latest technology without large upfront costs' },
    { icon: '📋', title: 'Comprehensive warranty and insurance coverage' },
    { icon: '📜', title: 'Customized service level agreements (SLAs)' }
  ];

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Managed Service Provider (MSP)
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive IT infrastructure management and equipment leasing solutions tailored for educational institutions.
            </p>
          </div>
        </div>

        {/* Our MSP Services Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Our MSP Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Why Choose Our MSP Services?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Focus on education while we handle your IT infrastructure needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-4 flex-shrink-0">{benefit.icon}</span>
                  <p className="text-gray-700 dark:text-gray-300">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Streamline Your IT Infrastructure?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Contact our MSP team to discuss your institution's specific requirements and get a customized solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Contact MSP Team
              </Link>
              <Link
                to="/contact"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                  <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailSubscribe}
                    onChange={(e) => setEmailSubscribe(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm mb-4 sm:mb-0">© 2026 Acadeemia. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-10c.828 0 1.5-.672 1.5-1.5S16.328 9 15.5 9 14 9.672 14 10.5s.672 1.5 1.5 1.5zm-7 0c.828 0 1.5-.672 1.5-1.5S9.328 9 8.5 9 7 9.672 7 10.5 7.672 12 8.5 12zm3.5 6.5c2.33 0 4.31-1.46 5.14-3.5H6.36c.83 2.04 2.81 3.5 5.14 3.5z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LandingLayout>
  );
};

export default MSPPage;
