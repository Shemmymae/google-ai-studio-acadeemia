import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useTheme } from '../components/ThemeProvider';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const logoLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NzkzLCJleHAiOjMzMjkyNzU2NzkzfQ.4sLXHZ9j2o5OpP6lSjYHzGEXYU_-hPkHmZJ1zjETiQI';
  const logoDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/logo-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2xvZ28tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NjgsImV4cCI6MzMyOTI3NTY3Njh9.XpJbMk19-pJLNUoRSWyNbWDjvn4sUH9CmqOhAyxmzi0';
  const logoSrc = theme === 'light' ? logoLight : logoDark;


  useEffect(() => {
    // FIX: Corrected Supabase v2 onAuthStateChange implementation
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setShowForm(true);
      }
    });

    // Check for recovery token in URL for initial load
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
        setShowForm(true);
    }


    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
     if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    // FIX: Use v2's `updateUser` method.
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
    } else {
      // Send security notification email
      try {
        // FIX: Use v2's async `getUser` method.
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
            const { error: emailError } = await supabase.functions.invoke('send-email', {
                body: {
                    to: user.email,
                    subject: 'Your Acadeemia Password Has Been Changed',
                    html: `
                        <h2>Password Changed Successfully</h2>
                        <p>This is a confirmation that the password for your Acadeemia account (${user.email}) has just been changed.</p>
                        <p>If you did not make this change, please contact our support team immediately.</p>
                        <p>Thank you,<br>The Acadeemia Team</p>
                    `,
                },
            });
            if (emailError) {
                console.error("Error sending password change confirmation email:", emailError);
            }
        }
      } catch (e) {
          console.error("Failed to get user or invoke email function for password reset:", e);
      }
      
      setMessage('Your password has been reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
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
          Set a new password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          {showForm ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {message && <p className="text-green-600 text-sm text-center">{message}</p>}

              <div>
                <button type="submit" disabled={loading || !!message} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>Please wait while we verify your password reset link...</p>
              <p className="mt-2 text-sm">You should have been redirected here from an email.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;