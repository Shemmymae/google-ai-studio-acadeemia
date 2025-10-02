import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { supabase } from '../supabase';
import { useAuth } from '../App';

const icons = {
  compose: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  inbox: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
  sent: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  important: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  reply: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>,
  replyAll: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6M11 4l6 6-6 6" /></svg>,
  forward: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l6 6-6 6M5 7l6 6-6 6" /></svg>,
  archive: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
  print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
  refresh: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  fullscreen: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>,
};

type MessageData = {
  id: string;
  sender: string;
  sender_id: string;
  subject: string;
  message: string;
  time: string;
  is_read: boolean;
  is_starred: boolean;
};

type Folder = 'inbox' | 'sent' | 'important' | 'trash';

const ComposeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTo('');
    setSubject('');
    setMessage('');
    setSending(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">Compose Message</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary dark:text-gray-300">To</label>
            <input
              type="text"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="Recipient email or name"
              className="form-input w-full mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary dark:text-gray-300">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Message subject"
              className="form-input w-full mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary dark:text-gray-300">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              className="form-textarea w-full mt-1"
            />
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white rounded-md font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !to || !subject || !message}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md font-semibold transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MailboxPage = () => {
  const { user } = useAuth();
  const [currentFolder, setCurrentFolder] = useState<Folder>('inbox');
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const mockMessages: MessageData[] = [];

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(mockMessages);
      setLoading(false);
    };
    loadMessages();
  }, [currentFolder]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMessages(messages.map(m => m.id));
    } else {
      setSelectedMessages([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedMessages(prev =>
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  const folderCounts = {
    inbox: 0,
    sent: 0,
    important: 0,
    trash: 0,
  };

  const FolderButton = ({ folder, label, icon, count }: { folder: Folder; label: string; icon: React.ReactNode; count: number }) => (
    <button
      onClick={() => setCurrentFolder(folder)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
        currentFolder === folder
          ? 'bg-red-500 text-white shadow-sm'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {count > 0 && (
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
          currentFolder === folder
            ? 'bg-white text-red-500'
            : 'bg-red-500 text-white'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <DashboardLayout title="Mailbox">
      <ComposeModal isOpen={showCompose} onClose={() => setShowCompose(false)} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-1 bg-card dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-md font-bold text-text-primary dark:text-gray-100 mb-4 pb-2 border-b-2 border-red-500">Mailbox Folder</h3>
            <button
              onClick={() => setShowCompose(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm"
            >
              {icons.compose}
              <span>Compose</span>
            </button>
          </div>

          <div className="space-y-2">
            <FolderButton folder="inbox" label="Inbox" icon={icons.inbox} count={folderCounts.inbox} />
            <FolderButton folder="sent" label="Sent" icon={icons.sent} count={folderCounts.sent} />
            <FolderButton folder="important" label="Important" icon={icons.important} count={folderCounts.important} />
            <FolderButton folder="trash" label="Trash" icon={icons.trash} count={folderCounts.trash} />
          </div>
        </div>

        <div className="lg:col-span-3 bg-card dark:bg-gray-800 rounded-lg shadow-md flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {currentFolder === 'inbox' && icons.inbox}
              {currentFolder === 'sent' && icons.sent}
              {currentFolder === 'important' && icons.important}
              {currentFolder === 'trash' && icons.trash}
              <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 capitalize">{currentFolder}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.refresh}
              </button>
              <button className="p-2 rounded-md text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.delete}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.reply}
              </button>
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.replyAll}
              </button>
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.forward}
              </button>
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.archive}
              </button>
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.print}
              </button>
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {icons.fullscreen}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:border-gray-600 dark:text-white text-sm"
              />
              <svg
                className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-text-secondary dark:text-gray-400">Loading messages...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-text-secondary dark:text-gray-400">
                <svg className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-lg font-semibold">No data available in table</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700/50 sticky top-0">
                  <tr>
                    <th className="p-3 text-left w-12">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedMessages.length === messages.length && messages.length > 0}
                        className="form-checkbox"
                      />
                    </th>
                    <th className="p-3 text-left font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="p-3 text-left font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th className="p-3 text-left font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="p-3 text-left font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {messages.map(msg => (
                    <tr
                      key={msg.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(msg.id)}
                          onChange={() => handleSelectOne(msg.id)}
                          className="form-checkbox"
                        />
                      </td>
                      <td className="p-3 text-sm font-medium text-text-primary dark:text-gray-200">
                        {msg.sender}
                      </td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                        {msg.subject}
                      </td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                        {msg.message}
                      </td>
                      <td className="p-3 text-sm text-text-secondary dark:text-gray-400">
                        {msg.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
            <div className="text-sm text-text-secondary dark:text-gray-400">
              Showing 0 to 0 of 0 entries
            </div>
            <div className="flex items-center gap-4">
              <select className="px-3 py-1 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white text-sm">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-text-secondary dark:text-gray-400">rows per page</span>
              <div className="flex gap-1">
                <button className="p-2 rounded-md text-text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                  &lt;
                </button>
                <button className="p-2 rounded-md text-text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MailboxPage;
