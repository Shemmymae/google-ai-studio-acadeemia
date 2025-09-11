import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for react-router-dom.
import { Link, NavLink as RouterNavLink } from "react-router-dom";
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

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      await addNewsletterSubscriber({ email, name: null });
      setMessage('Thank you for subscribing!');
      setEmail('');
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Acadeemia</h3>
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
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="text-text-secondary dark:text-gray-400 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-text-secondary dark:text-gray-400 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit}>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Subscribe
              </button>
              {message && <p className="text-sm mt-2">{message}</p>}
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary dark:text-gray-400 text-sm">&copy; {new Date().getFullYear()} Acadeemia. All rights reserved.</p>
          {/* Social icons can be added here if needed */}
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
