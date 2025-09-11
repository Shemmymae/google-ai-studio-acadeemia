
import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../App';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../components/ThemeProvider';
import { updateUserProfile, updateUserAvatar } from '../db';

const SettingsPage = () => {
  const { user, profile } = useAuth();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile fields state
  const [displayName, setDisplayName] = useState('');
  
  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState('');
  const [avatarError, setAvatarError] = useState('');

  // General form state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile?.full_name) {
      setDisplayName(profile.full_name);
    }
    setAvatarPreview(user?.user_metadata?.avatar_url || "https://picsum.photos/id/1027/100/100");
  }, [profile, user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !displayName) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await updateUserProfile(user.id, { full_name: displayName });
      setMessage('Profile saved successfully!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 4000);
    }
  };

  const handleAvatarChangeClick = () => {
      fileInputRef.current?.click();
  };
  
  const handleAvatarFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setAvatarError("File size must not exceed 2MB.");
        return;
    }
    
    const originalAvatar = avatarPreview;
    setAvatarPreview(URL.createObjectURL(file)); // Optimistic UI update

    setAvatarLoading(true);
    setAvatarMessage('');
    setAvatarError('');

    try {
        await updateUserAvatar(user.id, file);
        setAvatarMessage('Avatar updated successfully!');
        // AuthProvider will automatically update the user object via onAuthStateChange after refreshSession
    } catch (err: any) {
        setAvatarError(err.message || 'An unexpected error occurred.');
        setAvatarPreview(originalAvatar); // Revert on failure
    } finally {
        setAvatarLoading(false);
        setTimeout(() => {
            setAvatarMessage('');
            setAvatarError('');
        }, 4000);
    }
  };


  return (
    <DashboardLayout title="Application Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Settings */}
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 border-b dark:border-gray-700 pb-4 mb-6">
            Profile Settings
          </h2>
          <form className="space-y-6" onSubmit={handleProfileSave}>
            <div className="flex items-center space-x-4">
              <img 
                className="h-20 w-20 rounded-full object-cover" 
                src={avatarPreview} 
                alt="User avatar" 
              />
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleAvatarFileSelected}
                accept="image/png, image/jpeg"
                className="hidden"
              />
              <button 
                type="button"
                onClick={handleAvatarChangeClick}
                disabled={avatarLoading}
                className="bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-70"
              >
                {avatarLoading ? 'Uploading...' : 'Change Avatar'}
              </button>
            </div>
             {avatarMessage && <p className="text-sm text-green-600 dark:text-green-400">{avatarMessage}</p>}
             {avatarError && <p className="text-sm text-red-500 dark:text-red-400">{avatarError}</p>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                disabled 
                value={user?.email || ''} 
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 cursor-not-allowed" 
              />
            </div>
             <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Display Name
              </label>
              <input 
                id="displayName" 
                name="displayName" 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              />
            </div>
             {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
             {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
             <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-70"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100 border-b dark:border-gray-700 pb-4 mb-6">
            Appearance Settings
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-text-primary dark:text-gray-200">Interface Theme</h3>
              <p className="text-sm text-text-secondary dark:text-gray-400">Current theme is <strong>{theme}</strong>. Toggle to switch.</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;