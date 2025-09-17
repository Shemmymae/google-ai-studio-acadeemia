
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for react-router-dom.
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { supabase } from '../supabase';
import { useTheme } from '../components/ThemeProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'signIn' | 'forgotPassword'>('signIn');
  const navigate = useNavigate();
  const { user, profile } = useAuth(); // Get profile to determine role
  const location = useLocation();
  const { theme } = useTheme();
  const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
  const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
  const logoSrc = theme === 'light' ? logoLight : logoDark;


  // Redirect if user is already logged in, ensuring profile is loaded to check role
  useEffect(() => {
    if (user && profile) {
      const defaultPath = profile.role === 'Super Admin' ? '/admin-home' : '/dashboard';
      const from = location.state?.from?.pathname || defaultPath;
      navigate(from, { replace: true });
    }
  }, [user, profile, navigate, location.state]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }
      // On successful sign in, the AuthProvider's onAuthStateChange listener
      // will update the user and profile context, which will trigger the
      // useEffect hook in this component to navigate the user away.
      // The loading spinner will remain until navigation occurs.
    } catch (err: any) {
        setError(err.error_description || err.message);
        // Only stop loading if there's an error.
        setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    // FIX: Use v2's `resetPasswordForEmail`. The `api` property is from v1.
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('If an account with this email exists, a password reset link has been sent.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
            <img src={logoSrc} alt="Acadeemia Logo" className="h-14 w-auto" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary dark:text-gray-100">
          {view === 'signIn' ? 'Sign in to your account' : 'Reset your password'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          {view === 'signIn' ? (
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password (min. 6 characters)
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" onClick={(e) => { e.preventDefault(); setView('forgotPassword'); setError(''); setMessage(''); }} className="font-medium text-primary hover:text-primary-hover">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                  {loading ? 'Processing...' : 'Sign In'}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handlePasswordReset}>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">Enter your email address and we will send you a link to reset your password.</p>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {message && <p className="text-green-600 text-sm text-center">{message}</p>}

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>

               <div className="text-sm text-center">
                  <a href="#" onClick={(e) => { e.preventDefault(); setView('signIn'); setError(''); setMessage(''); }} className="font-medium text-primary hover:text-primary-hover">
                    Back to Sign In
                  </a>
                </div>
            </form>
          )}
        </div>
         <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="font-medium text-primary hover:text-primary-hover">
            &larr; Back to website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
