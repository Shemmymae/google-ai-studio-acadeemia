

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Lead, Task, getLeads, updateLead, addLead, getTasks, addTask, updateTask } from '../db';

const KANBAN_COLUMNS = ['New Enquiry', 'Contacted', 'Application Submitted', 'Interview Scheduled', 'Admitted'];
const COLUMN_COLORS: { [key: string]: string } = {
  'New Enquiry': 'bg-blue-100 border-blue-400 dark:bg-blue-900/50 dark:border-blue-500',
  'Contacted': 'bg-yellow-100 border-yellow-400 dark:bg-yellow-900/50 dark:border-yellow-500',
  'Application Submitted': 'bg-purple-100 border-purple-400 dark:bg-purple-900/50 dark:border-purple-500',
  'Interview Scheduled': 'bg-indigo-100 border-indigo-400 dark:bg-indigo-900/50 dark:border-indigo-500',
  'Admitted': 'bg-green-100 border-green-400 dark:bg-green-900/50 dark:border-green-500',
};


// --- Sub-components for CRM Page ---

// Lead Card Component (Used by KanbanColumn)
const LeadCard = ({ lead, onStatusChange }: { lead: Lead, onStatusChange: (id: number, status: Lead['status']) => void }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectStatus = (newStatus: Lead['status']) => {
    if (lead.id) {
        onStatusChange(lead.id, newStatus);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="bg-card dark:bg-gray-700 p-4 rounded-lg shadow-md border dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all">
      <h4 className="font-bold text-text-primary dark:text-gray-100">{lead.name}</h4>
      <p className="text-sm text-text-secondary dark:text-gray-400">Interested in: {lead.grade}</p>
      <p className="text-sm text-text-secondary dark:text-gray-400 truncate">{lead.contact}</p>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Enquiry: {lead.enquiryDate}</div>
      <div className="relative mt-3">
        <button 
            onClick={() => setDropdownOpen(!isDropdownOpen)} 
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            className="w-full text-left text-sm font-medium text-primary hover:underline focus:outline-none"
        >
          Move to...
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700">
            {KANBAN_COLUMNS.filter(col => col !== lead.status).map(status => (
              <a
                key={status}
                href="#"
                onClick={(e) => { e.preventDefault(); handleSelectStatus(status as Lead['status']); }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {status}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Kanban Column Component (Used by LeadsPipeline)
const KanbanColumn = ({ title, leads, onStatusChange }: { title: string, leads: Lead[], onStatusChange: (id: number, status: Lead['status']) => void }) => {
  return (
    <div className={`flex-shrink-0 w-72 md:w-80 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border-t-4 ${COLUMN_COLORS[title]}`}>
      <h3 className="font-semibold text-lg text-text-primary dark:text-gray-100 mb-4 flex justify-between items-center">
        {title}
        <span className="bg-primary/10 text-primary font-bold text-sm px-2 py-1 rounded-full">{leads.length}</span>
      </h3>
      <div className="space-y-4 h-full overflow-y-auto">
        {leads.map(lead => (
          <LeadCard key={lead.id} lead={lead} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
};


// 1. Leads Pipeline Component (The Kanban Board)
const LeadsPipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const leadsData = await getLeads();
    setLeads(leadsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: number, newStatus: Lead['status']) => {
    await updateLead(leadId, { status: newStatus });
    fetchLeads(); // Re-fetch
  };
  
  const handleAddNewLead = async () => {
    const allLeads = await getLeads();
    const newLead: Omit<Lead, 'id' | 'school_id'> = {
      name: 'New Prospect',
      grade: 'Grade 7',
      contact: `prospect${allLeads.length + 1}@example.com`,
      enquiryDate: new Date().toISOString().substring(0, 10),
      status: 'New Enquiry'
    };
    await addLead(newLead);
    fetchLeads(); // Re-fetch
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Enrollment Pipeline</h2>
        <button onClick={handleAddNewLead} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
          Add New Lead
        </button>
      </div>
      {loading ? (
        <div className="text-center py-8 dark:text-gray-400">Loading leads pipeline...</div>
      ) : (
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex space-x-4 min-w-max">
            {KANBAN_COLUMNS.map(column => (
              <KanbanColumn
                key={column}
                title={column}
                leads={leads?.filter(lead => lead.status === column) || []}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// 2. Task Management Component
const TaskManagement = () => {
    const [filter, setFilter] = useState('All');
    const [isFormVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
      setLoading(true);
      const allTasks = await getTasks();
      if (filter === 'All') {
          setTasks(allTasks);
      } else {
          setTasks(allTasks.filter(task => task.status === filter));
      }
      setLoading(false);
    }, [filter]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
    
    const priorityColors: { [key: string]: string } = { High: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400', Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400', Low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' };

    const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newTask: Omit<Task, 'id' | 'school_id'> = {
            title: formData.get('title') as string,
            assignedTo: formData.get('assignedTo') as string,
            dueDate: formData.get('dueDate') as string,
            priority: formData.get('priority') as Task['priority'],
            status: 'To Do',
        };
        await addTask(newTask);
        form.reset();
        setFormVisible(false);
        if (filter !== 'All' && filter !== 'To Do') {
            setFilter('All');
        } else {
            fetchTasks();
        }
    };
    
    const handleToggleStatus = async (task: Task) => {
        if (task.id) {
            const newStatus = task.status === 'Completed' ? 'In Progress' : 'Completed';
            await updateTask(task.id, { status: newStatus });
            fetchTasks();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary dark:text-gray-100">Manage Tasks</h2>
                <button onClick={() => setFormVisible(!isFormVisible)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                    {isFormVisible ? 'Cancel' : 'Add New Task'}
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleAddTask} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6 space-y-4 animate-fade-in-down">
                    <input name="title" type="text" placeholder="Task title" required className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="assignedTo" type="text" placeholder="Assign to" required className="px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
                        <input name="dueDate" type="date" required className="px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600"/>
                        <select name="priority" defaultValue="Medium" className="px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition-opacity">Save Task</button>
                </form>
            )}

            <div className="mb-4">
                <div className="flex space-x-2 border-b dark:border-gray-700">
                    {['All', 'To Do', 'In Progress', 'Completed'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 font-medium text-sm ${filter === f ? 'border-b-2 border-primary text-primary' : 'text-text-secondary dark:text-gray-400'}`}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
             {loading ? (
                <div className="text-center py-8 dark:text-gray-400">Loading tasks...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            <th className="p-3 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Status</th>
                            <th className="p-3 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Task</th>
                            <th className="p-3 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Assigned To</th>
                            <th className="p-3 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Due Date</th>
                            <th className="p-3 font-semibold text-text-secondary dark:text-gray-300 uppercase text-sm tracking-wider">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map(task => (
                            <tr key={task.id} className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 ${task.status === 'Completed' ? 'bg-gray-50 dark:bg-gray-800/50 opacity-60' : 'bg-white dark:bg-gray-800'}`}>
                                <td className="p-3"><input type="checkbox" checked={task.status === 'Completed'} onChange={() => handleToggleStatus(task)} className="h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 focus:ring-primary dark:bg-gray-900"/></td>
                                <td className={`p-3 font-medium text-text-primary dark:text-gray-200 ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">{task.assignedTo}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">{task.dueDate}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};


// 3. Placeholder for future features
const ComingSoon = ({ featureName }: {featureName: string}) => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-text-primary dark:text-gray-100">{featureName}</h2>
        <p className="text-text-secondary dark:text-gray-400 mt-2">This feature is under construction and will be available soon!</p>
    </div>
);


// --- Main CRM Page Component ---
const CRMPage = () => {
    const [activeTab, setActiveTab] = useState('pipeline');

    const renderContent = () => {
        switch(activeTab) {
            case 'pipeline':
                return <LeadsPipeline />;
            case 'tasks':
                return <TaskManagement />;
            case 'contacts':
                return <ComingSoon featureName="Contact Directory" />;
            case 'reports':
                return <ComingSoon featureName="Analytics & Reports" />;
            default:
                return <LeadsPipeline />;
        }
    };
    
    const TabButton = ({ name, label }: {name: string, label: string}) => {
        const isActive = activeTab === name;
        return (
            <button
                onClick={() => setActiveTab(name)}
                className={`px-4 py-2 font-medium text-sm rounded-md transition-colors duration-200 ${isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
                {label}
            </button>
        );
    };

    return (
        <DashboardLayout title="Customer Relationship Management">
            <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md">
                <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2">
                        <TabButton name="pipeline" label="Leads Pipeline" />
                        <TabButton name="tasks" label="Tasks" />
                        <TabButton name="contacts" label="Contacts" />
                        <TabButton name="reports" label="Reports" />
                    </nav>
                </div>
                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CRMPage;