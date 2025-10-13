import React, { useState } from 'react';
import { supabase } from '../supabase';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
}

interface JobApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

interface ApplicationFormData {
  candidate_name: string;
  candidate_email: string;
  candidate_phone: string;
  resume_url: string;
  cover_letter: string;
  linkedin_url: string;
  portfolio_url: string;
  years_experience: string;
  current_company: string;
  current_position: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    candidate_name: '',
    candidate_email: '',
    candidate_phone: '',
    resume_url: '',
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
    years_experience: '',
    current_company: '',
    current_position: ''
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Only PDF and Word documents are allowed' }));
        return;
      }

      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const uploadResume = async (): Promise<string | null> => {
    if (!resumeFile) return null;

    setUploading(true);
    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('applications')
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
      setErrors(prev => ({ ...prev, resume: 'Failed to upload resume. Please try again.' }));
      return null;
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.candidate_name.trim()) {
      newErrors.candidate_name = 'Full name is required';
    }

    if (!formData.candidate_email.trim()) {
      newErrors.candidate_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidate_email)) {
      newErrors.candidate_email = 'Invalid email format';
    }

    if (!formData.candidate_phone.trim()) {
      newErrors.candidate_phone = 'Phone number is required';
    }

    if (!resumeFile) {
      newErrors.resume = 'Resume/CV is required';
    }

    if (formData.linkedin_url && !/^https?:\/\/.+/.test(formData.linkedin_url)) {
      newErrors.linkedin_url = 'Invalid URL format';
    }

    if (formData.portfolio_url && !/^https?:\/\/.+/.test(formData.portfolio_url)) {
      newErrors.portfolio_url = 'Invalid URL format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const resumeUrl = await uploadResume();

      if (!resumeUrl && resumeFile) {
        setSubmitting(false);
        return;
      }

      const applicationData = {
        job_id: job.id,
        candidate_name: formData.candidate_name.trim(),
        candidate_email: formData.candidate_email.trim().toLowerCase(),
        candidate_phone: formData.candidate_phone.trim(),
        resume_url: resumeUrl || formData.resume_url,
        cover_letter: formData.cover_letter.trim(),
        linkedin_url: formData.linkedin_url.trim() || null,
        portfolio_url: formData.portfolio_url.trim() || null,
        years_experience: formData.years_experience ? parseFloat(formData.years_experience) : null,
        current_company: formData.current_company.trim() || null,
        current_position: formData.current_position.trim() || null,
        status: 'applied',
        applied_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('applications')
        .insert(applicationData);

      if (error) throw error;

      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error: any) {
      console.error('Error submitting application:', error.message);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit application. Please try again.'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      candidate_name: '',
      candidate_email: '',
      candidate_phone: '',
      resume_url: '',
      cover_letter: '',
      linkedin_url: '',
      portfolio_url: '',
      years_experience: '',
      current_company: '',
      current_position: ''
    });
    setResumeFile(null);
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" onClick={handleClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {success ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <svg className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for applying. We'll review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white" id="modal-title">
                    Apply for {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {job.department} • {job.location}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="candidate_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="candidate_name"
                        name="candidate_name"
                        required
                        value={formData.candidate_name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.candidate_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white`}
                        placeholder="John Doe"
                      />
                      {errors.candidate_name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.candidate_name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="candidate_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="candidate_email"
                        name="candidate_email"
                        required
                        value={formData.candidate_email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.candidate_email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.candidate_email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.candidate_email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="candidate_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="candidate_phone"
                        name="candidate_phone"
                        required
                        value={formData.candidate_phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.candidate_phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.candidate_phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.candidate_phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="years_experience"
                        name="years_experience"
                        min="0"
                        step="0.5"
                        value={formData.years_experience}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Resume/CV * (PDF or Word, max 5MB)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className={`w-full px-3 py-2 border ${errors.resume ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover`}
                    />
                    {resumeFile && (
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">Selected: {resumeFile.name}</p>
                    )}
                    {errors.resume && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.resume}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="current_position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Position
                      </label>
                      <input
                        type="text"
                        id="current_position"
                        name="current_position"
                        value={formData.current_position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                        placeholder="Senior Software Engineer"
                      />
                    </div>

                    <div>
                      <label htmlFor="current_company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Company
                      </label>
                      <input
                        type="text"
                        id="current_company"
                        name="current_company"
                        value={formData.current_company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        id="linkedin_url"
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.linkedin_url ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white`}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                      {errors.linkedin_url && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.linkedin_url}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="portfolio_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        id="portfolio_url"
                        name="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.portfolio_url ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white`}
                        placeholder="https://johndoe.com"
                      />
                      {errors.portfolio_url && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.portfolio_url}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      id="cover_letter"
                      name="cover_letter"
                      rows={6}
                      value={formData.cover_letter}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us why you're a great fit for this position..."
                    />
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    disabled={submitting || uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting || uploading}
                  >
                    {uploading ? 'Uploading Resume...' : submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
