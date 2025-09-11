import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    back: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
};

// --- MOCK DATA ---
const domainData = [
    { id: 1, schoolName: 'Icon School & College', originUrl: 'https://ramomcoder.com/saas/iconschool', customDomain: 'iconschool.ramomcoder.com', domainType: 'Sub Domain', requestDate: '01.Jun.2025', approvedDate: '01.Jun.2025', status: 'Approved' },
    { id: 2, schoolName: 'Oxford International', originUrl: 'https://ramomcoder.com/saas/oxfordschool', customDomain: 'oxford.ramomcoder.com', domainType: 'Sub Domain', requestDate: '01.Jun.2025', approvedDate: '01.Jun.2025', status: 'Approved' },
];

const StatusBadge = ({ status }: { status: string }) => (
    <span className="px-2 py-1 text-xs font-semibold rounded-full inline-block bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
        {status}
    </span>
);

const DomainList = ({ onShowInstructions }: { onShowInstructions: () => void }) => (
    <>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 flex items-center">{icons.list} Domain List</h3>
            <button onClick={onShowInstructions} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Custom Domain Instruction
            </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.copy}</button>
                <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{icons.print}</button>
            </div>
            <div className="relative">
                <input type="text" placeholder="Search..." className="pl-4 pr-10 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <svg className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        {['SI', 'School Name', 'Origin Url', 'Custom Domain', 'Domain Type', 'Request Date', 'Approved Date', 'Status', 'Action'].map(head => (
                            <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {domainData.map((domain, index) => (
                        <tr key={domain.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                            <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{domain.schoolName}</td>
                            <td className="p-3 text-sm text-primary dark:text-primary-hover hover:underline"><a href={domain.originUrl} target="_blank" rel="noopener noreferrer">{domain.originUrl}</a></td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{domain.customDomain}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{domain.domainType}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{domain.requestDate}</td>
                            <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{domain.approvedDate}</td>
                            <td className="p-3 text-sm"><StatusBadge status={domain.status} /></td>
                            <td className="p-3">
                                <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete domain">{icons.delete}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
            <span>Showing 1 to {domainData.length} of {domainData.length} entries</span>
            <div className="flex items-center space-x-1">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
                <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&gt;</button>
            </div>
        </div>
    </>
);

const ToggleSwitch = ({ enabled, setEnabled }: { enabled: boolean, setEnabled: (enabled: boolean) => void }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800`}
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
    >
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);

const DomainInstructions = ({ onShowList }: { onShowList: () => void }) => {
    const [statusEnabled, setStatusEnabled] = useState(true);
    const [dnsEnabled, setDnsEnabled] = useState(true);

    return (
        <form className="space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100">Custom Domain Instruction</h3>
                <button type="button" onClick={onShowList} className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-primary dark:text-gray-200 bg-card dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    {icons.back} Back to Custom Domain
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" defaultValue="Custom Domain Settings Instruction" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instruction</label>
                    {/* Placeholder for a rich text editor */}
                    <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-t-md bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-500 dark:text-gray-400">Mock Rich Text Editor Toolbar</div>
                    <textarea 
                        rows={8}
                        defaultValue={"You'll need to setup a DNS record to point to your store on our server. DNS records can be setup through your domain registrars control panel. Since every registrar has a different setup, contact them for assistance if you're unsure.\nDNS changes may take up to 48-72 hours to take effect, although it's normally a lot faster than that. You will receive a reply when your custom domain has been activated. Please allow 1-2 business days for this process to complete."}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <ToggleSwitch enabled={statusEnabled} setEnabled={setStatusEnabled} />
                </div>
            </div>

            <div className="space-y-6 pt-8 border-t dark:border-gray-700">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-100">DNS Settings</h3>
                 <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">DNS Settings Enable</label>
                    <ToggleSwitch enabled={dnsEnabled} setEnabled={setDnsEnabled} />
                </div>
                <div>
                    <label htmlFor="dns-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input type="text" id="dns-title" name="dns-title" defaultValue="Configure your DNS records" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DNS records</label>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 font-semibold text-xs uppercase text-text-secondary dark:text-gray-400">
                            <span>Type</span>
                            <span>Host <span className="text-red-500">*</span></span>
                            <span>Value <span className="text-red-500">*</span></span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <span className="text-sm text-text-primary dark:text-gray-200">CNAME Records</span>
                            <input type="text" defaultValue="www" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" defaultValue="ramomcoder.com" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <span className="text-sm text-text-primary dark:text-gray-200">A Records</span>
                            <input type="text" defaultValue="@" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" defaultValue="130.155.155.55" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>
                 </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover">
                    {icons.save} Save
                </button>
            </div>
        </form>
    );
};


const CustomDomainPage = () => {
  const [view, setView] = useState<'list' | 'instructions'>('list');

  return (
    <DashboardLayout title="Domain">
      <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        {view === 'list' 
            ? <DomainList onShowInstructions={() => setView('instructions')} /> 
            : <DomainInstructions onShowList={() => setView('list')} />
        }
      </div>
    </DashboardLayout>
  );
};

export default CustomDomainPage;