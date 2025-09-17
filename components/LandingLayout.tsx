

import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for react-router-dom.
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { useCart } from './CartContext';
import { addNewsletterSubscriber } from '../db';

const NavLink: React.FC<{ to: string; children: React.ReactNode, onClick?: () => void, className?: string }> = ({ to, children, onClick, className }) => {
  const activeStyle = {
    color: '#5D5FEF',
    fontWeight: 600,
  };

  return (
    <RouterNavLink 
      to={to} 
      onClick={onClick}
      className={`text-text-primary dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium ${className}`}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
    >
      {children}
    </RouterNavLink>
  );
};

const HamburgerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
    const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);
    const [isMobileProductOpen, setMobileProductOpen] = useState(false);
    const [isMobileCompanyOpen, setMobileCompanyOpen] = useState(false);

    const { theme } = useTheme();
    const { cart } = useCart();
    const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
    const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
    const logoSrc = theme === 'light' ? logoLight : logoDark;

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setMobileProductOpen(false);
        setMobileCompanyOpen(false);
    }

    return (
      <header className="bg-background/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logoSrc} alt="Acadeemia Logo" className="h-10 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            <div 
                className="relative" 
                onMouseEnter={() => { setProductDropdownOpen(true); setCompanyDropdownOpen(false); }}
                onMouseLeave={() => setProductDropdownOpen(false)}
            >
                <button 
                    className="flex items-center text-text-primary dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium"
                >
                    Product
                    <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isProductDropdownOpen && (
                    <div className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-20">
                        <Link to="/modules" onClick={() => setProductDropdownOpen(false)} className="block px-4 py-2 text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Modules</Link>
                        <Link to="/versions" onClick={() => setProductDropdownOpen(false)} className="block px-4 py-2 text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Deployment</Link>
                    </div>
                )}
            </div>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/store">Store</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <div 
                className="relative" 
                onMouseEnter={() => { setCompanyDropdownOpen(true); setProductDropdownOpen(false); }}
                onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
                <button 
                    className="flex items-center text-text-primary dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium"
                >
                    Company
                    <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isCompanyDropdownOpen && (
                    <div className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-20">
                        <Link to="/about" onClick={() => setCompanyDropdownOpen(false)} className="block px-4 py-2 text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Us</Link>
                        <Link to="/why-acadeemia" onClick={() => setCompanyDropdownOpen(false)} className="block px-4 py-2 text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Why Acadeemia?</Link>
                    </div>
                )}
            </div>
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/cart" className="relative text-text-primary dark:text-gray-200 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>}
            </Link>
            <Link to="/login" className="text-text-primary dark:text-gray-200 font-semibold hover:text-primary transition-colors">
              Log In
            </Link>
            <Link to="/demo" className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-all duration-300 shadow-md">
              Request a Demo
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
              <ThemeToggle />
              <Link to="/cart" className="relative text-text-primary dark:text-gray-200 hover:text-primary transition-colors ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="ml-4 text-text-primary dark:text-gray-200" aria-label="Toggle menu">
                {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background dark:bg-gray-900 absolute top-full left-0 w-full shadow-lg border-t border-gray-200 dark:border-gray-800">
             <div className="px-6 py-4 space-y-4">
                {/* Mobile product dropdown */}
                <div>
                    <button onClick={() => setMobileProductOpen(!isMobileProductOpen)} className="w-full flex justify-between items-center text-text-primary dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium">
                        Product
                        <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isMobileProductOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isMobileProductOpen && (
                        <div className="pl-4 pt-2 space-y-2">
                             <NavLink to="/modules" onClick={closeAllMenus} className="block">Modules</NavLink>
                             <NavLink to="/versions" onClick={closeAllMenus} className="block">Deployment</NavLink>
                        </div>
                    )}
                </div>
                <NavLink to="/pricing" onClick={closeAllMenus}>Pricing</NavLink>
                <NavLink to="/demo" onClick={closeAllMenus}>Demo</NavLink>
                <NavLink to="/store" onClick={closeAllMenus}>Store</NavLink>
                <NavLink to="/blog" onClick={closeAllMenus}>Blog</NavLink>
                 {/* Mobile company dropdown */}
                <div>
                    <button onClick={() => setMobileCompanyOpen(!isMobileCompanyOpen)} className="w-full flex justify-between items-center text-text-primary dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium">
                        Company
                         <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isMobileCompanyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isMobileCompanyOpen && (
                        <div className="pl-4 pt-2 space-y-2">
                            <NavLink to="/about" onClick={closeAllMenus} className="block">About Us</NavLink>
                            <NavLink to="/why-acadeemia" onClick={closeAllMenus} className="block">Why Acadeemia?</NavLink>
                        </div>
                    )}
                </div>
                <NavLink to="/contact" onClick={closeAllMenus}>Contact Us</NavLink>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                     <Link to="/login" onClick={closeAllMenus} className="block text-text-primary dark:text-gray-200 font-semibold hover:text-primary transition-colors">
                        Log In
                    </Link>
                    <Link to="/demo" onClick={closeAllMenus} className="block w-full text-center bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                        Request a Demo
                    </Link>
                </div>
            </div>
          </div>
        )}
      </header>
    );
};

// --- Social Icons for Footer ---
const TwitterIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
const FacebookIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const LinkedinIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
const InstagramIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.522 19.854.218 19.09.083 18.22.015 16.947 0 15.667 0 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.25 1.805-.414 2.227-.218.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.056-1.816-.25-2.236-.414-.562-.218-.96-.479-1.381-.897-.419-.419-.69-.824-.896-1.38-.165-.42-.359-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859 0-3.211.015-3.586.07-4.859.056-1.171.25-1.816.414-2.236.218-.562.479-.96.896-1.381.42-.419.81-.69 1.38-.896.42-.165 1.065-.359 2.236-.413 1.274-.057 1.649-.07 4.859-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>;

const SocialLink = ({ children }: { children: React.ReactNode }) => (
    <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-gray-200 transition-colors">
        {children}
    </a>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
  const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
  const logoSrc = theme === 'light' ? logoLight : logoDark;


  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      await addNewsletterSubscriber({ email, name: name || null });
      setMessage('Thank you for subscribing!');
      setEmail('');
      setName('');
    } catch (error: any) {
      // Supabase might throw an error if the email is a duplicate (due to UNIQUE constraint)
      if (error.message.includes('duplicate key value violates unique constraint')) {
        setMessage('This email is already subscribed.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
        setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <footer className="bg-secondary dark:bg-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logoSrc} alt="Acadeemia Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-text-secondary dark:text-gray-400">The complete school management solution for modern educational institutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-text-secondary dark:text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link to="/pricing" className="text-text-secondary dark:text-gray-400 hover:text-primary">Pricing</Link></li>
              <li><Link to="/contact" className="text-text-secondary dark:text-gray-400 hover:text-primary">Contact</Link></li>
              <li><Link to="/blog" className="text-text-secondary dark:text-gray-400 hover:text-primary">Blog</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faqs" className="text-text-secondary dark:text-gray-400 hover:text-primary">FAQs</Link></li>
              <li><Link to="/careers" className="text-text-secondary dark:text-gray-400 hover:text-primary">Careers</Link></li>
              <li><Link to="/help-center" className="text-text-secondary dark:text-gray-400 hover:text-primary">Help Center</Link></li>
              <li><Link to="/testimonials" className="text-text-secondary dark:text-gray-400 hover:text-primary">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="text-text-secondary dark:text-gray-400 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-text-secondary dark:text-gray-400 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name" 
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Subscribe
              </button>
              {message && <p className="text-sm mt-2">{message}</p>}
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary dark:text-gray-400 text-sm">&copy; {new Date().getFullYear()} Acadeemia. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <SocialLink><TwitterIcon /></SocialLink>
            <SocialLink><FacebookIcon /></SocialLink>
            <SocialLink><LinkedinIcon /></SocialLink>
            <SocialLink><InstagramIcon /></SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-background dark:bg-gray-900 text-text-primary dark:text-gray-200">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;