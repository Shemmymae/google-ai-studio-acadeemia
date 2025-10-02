import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { supabase } from '../../supabase';

interface Application {
  id: string;
  candidate_name: string;
  candidate_email: string;
  job_id: string;
}

interface Interview {
  id?: string;
  application_id: string;
  interview_type: string;
  scheduled_at: string;
  duration_minutes: number;
  location: string;
  notes: string;
  status: string;
}

const InterviewSchedulingPage: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Interview>({
    application_id: applicationId || '',
    interview_type: 'phone_screen',
    scheduled_at: '',
    duration_minutes: 60,
    location: '',
    notes: '',
    status: 'scheduled'
  });

  useEffect(() => {
    if (applicationId) {
      fetchData();
    }
  }, [applicationId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: appData, error: appError } = await supabase
        .from('applications')
        .select('id, candidate_name, candidate_email, job_id')
        .eq('id', applicationId)
        .single();

      if (appError) throw appError;
      setApplication(appData);

      const { data: interviewsData, error: intError } = await supabase
        .from('interviews')
        .select('*')
        .eq('application_id', applicationId)
        .order('scheduled_at', { ascending: false });

      if (intError) throw intError;
      setInterviews(interviewsData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('interviews')
        .insert({
          ...formData,
          scheduled_at: new Date(formData.scheduled_at).toISOString()
        });

      if (error) throw error;

      await supabase
        .from('applications')
        .update({ status: 'interview_scheduled' })
        .eq('id', applicationId);

      setShowForm(false);
      fetchData();
      setFormData({
        application_id: applicationId || '',
        interview_type: 'phone_screen',
        scheduled_at: '',
        duration_minutes: 60,
        location: '',
        notes: '',
        status: 'scheduled'
      });
    } catch (error: any) {
      console.error('Error scheduling interview:', error.message);
      alert('Failed to schedule interview');
    }
  };

  const handleStatusUpdate = async (interviewId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('interviews')
        .update({
          status: newStatus,
          ...(newStatus === 'completed' && { completed_at: new Date().toISOString() })
        })
        .eq('id', interviewId);

      if (error) throw error;
      fetchData();
    } catch (error: any) {
      console.error('Error updating interview status:', error.message);
      alert('Failed to update interview status');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-background dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interview Scheduling
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {application?.candidate_name} ({application?.candidate_email})
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scheduled Interviews</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                {showForm ? 'Cancel' : 'Schedule Interview'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Interview Type *
                    </label>
                    <select
                      required
                      value={formData.interview_type}
                      onChange={(e) => setFormData({ ...formData, interview_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="phone_screen">Phone Screen</option>
                      <option value="technical">Technical Interview</option>
                      <option value="behavioral">Behavioral Interview</option>
                      <option value="panel">Panel Interview</option>
                      <option value="final">Final Interview</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location / Meeting Link *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Zoom link, Office location"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any additional information..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              </form>
            )}

            {interviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No interviews scheduled yet
              </div>
            ) : (
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {interview.interview_type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </h3>
                          <select
                            value={interview.status}
                            onChange={(e) => interview.id && handleStatusUpdate(interview.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="rescheduled">Rescheduled</option>
                          </select>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>
                            <span className="font-medium">When:</span>{' '}
                            {new Date(interview.scheduled_at).toLocaleString('en-US', {
                              dateStyle: 'full',
                              timeStyle: 'short'
                            })}
                          </p>
                          <p>
                            <span className="font-medium">Duration:</span> {interview.duration_minutes} minutes
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> {interview.location}
                          </p>
                          {interview.notes && (
                            <p>
                              <span className="font-medium">Notes:</span> {interview.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSchedulingPage;
