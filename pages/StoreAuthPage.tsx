import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { supabase } from '../supabase';
import { useTheme } from '../components/ThemeProvider';

const StoreAuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();
  const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
  const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
  const logoSrc = theme === 'light' ? logoLight : logoDark;

  const from = location.state?.from?.pathname || '/store';

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Try to sign in first
      // FIX: Use v2's `signInWithPassword`.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
            // If sign-in fails, try to sign up
            const { error: signUpError } = await supabase.auth.signUp({ email, password });
            
            if (signUpError) {
                // If sign-up also fails, show the error
                throw signUpError;
            }
            // Successful signup will trigger onAuthStateChange and redirect
        } else {
             // A different sign-in error occurred
            throw signInError;
        }
      }
      // Successful signin will trigger onAuthStateChange and redirect
    } catch (err: any) {
        setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
            <img src={logoSrc} alt="Acadeemia Logo" className="h-14 w-auto" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary dark:text-gray-100">
          Sign in or create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            You need to be logged in to complete your purchase.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleAuth}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password (min. 6 characters)
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                  {loading ? 'Processing...' : 'Continue to Checkout'}
                </button>
              </div>
            </form>
        </div>
         <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link to="/store" className="font-medium text-primary hover:text-primary-hover">
            &larr; Back to store
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StoreAuthPage;