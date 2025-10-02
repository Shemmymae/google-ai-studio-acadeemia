import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuth } from '../App';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ComposeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

interface Message {
  id: string;
  sender_name: string;
  subject: string;
  created_at: string;
  is_read: boolean;
}

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!recipients || !subject || !message) return;

    setSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRecipients('');
      setSubject('');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleDiscard = () => {
    setRecipients('');
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-red-500 dark:border-red-600">
          <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">Write Message</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <div>
            <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary dark:text-gray-100 transition-colors"
            >
              <option value="">Select</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              Receiver <span className="text-red-500">*</span>
            </label>
            <select
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary dark:text-gray-100 transition-colors"
            >
              <option value="">Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary dark:text-gray-100 transition-colors"
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-2 flex items-center gap-1 flex-wrap">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Font">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><text x="2" y="15" fontSize="14" fontWeight="bold">A</text></svg>
                </button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Font Size">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><text x="2" y="15" fontSize="12">14</text></svg>
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors font-bold" title="Bold">B</button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors italic" title="Italic">I</button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors underline" title="Underline">U</button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors line-through" title="Strikethrough">S</button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Bullet List">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Numbered List">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Link">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors" title="Image">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none text-text-primary dark:text-gray-100 resize-none"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">
              Attachment File
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-8 text-center hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-text-secondary dark:text-gray-400">
                  <svg className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm font-medium">Select file</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={handleDiscard}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white rounded-md font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Discard
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !recipients || !subject || !message}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md font-semibold transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MessageNotificationDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchUnreadMessages();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fetchUnreadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('message_recipients')
        .select(`
          id,
          is_read,
          created_at,
          message:messages (
            id,
            subject,
            created_at,
            sender:user_profiles (
              full_name
            )
          )
        `)
        .eq('recipient_id', user?.id)
        .eq('is_read', false)
        .eq('folder', 'inbox')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      const formattedMessages: Message[] = (data || []).map((item: any) => ({
        id: item.message.id,
        sender_name: item.message.sender?.full_name || 'Unknown Sender',
        subject: item.message.subject,
        created_at: item.message.created_at,
        is_read: item.is_read,
      }));

      setMessages(formattedMessages);
      setUnreadCount(formattedMessages.length);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
      setUnreadCount(0);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const handleMessageClick = (messageId: string) => {
    setIsOpen(false);
    navigate('/mailbox');
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/mailbox');
  };

  const handleComposeClick = () => {
    setIsOpen(false);
    setShowCompose(true);
  };

  return (
    <>
      <ComposeModal isOpen={showCompose} onClose={() => setShowCompose(false)} />

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
          aria-label="Messages"
        >
          <MailIcon />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-card dark:ring-gray-800">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-bold text-text-primary dark:text-gray-100">Message</h3>
                </div>
                <button
                  onClick={handleComposeClick}
                  className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-primary transition-colors"
                  title="Compose Message"
                >
                  <ComposeIcon />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-text-secondary dark:text-gray-400">
                  <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm font-medium">No new messages</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleMessageClick(msg.id)}
                    className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-sm">
                          {msg.sender_name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-text-primary dark:text-gray-100 truncate">
                            {msg.sender_name}
                          </p>
                          <span className="text-xs text-text-secondary dark:text-gray-400 flex-shrink-0">
                            {formatTimeAgo(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary dark:text-gray-400 truncate">
                          {msg.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={handleViewAll}
                className="w-full py-2 text-sm font-semibold text-primary hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover transition-colors"
              >
                All Messages
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageNotificationDropdown;
