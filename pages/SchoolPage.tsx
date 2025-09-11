
import React, { useState, useRef, useCallback, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getSchools, addSchool, deleteSchool, School, getCurrencies, Currency } from '../db';


// --- ICONS ---
const icons = {
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    print: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
};

const SchoolList = ({ schools, onSchoolDeleted }: { schools: School[], onSchoolDeleted: () => void }) => {
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
            setDeleteError(null);
            try {
                await deleteSchool(id);
                onSchoolDeleted();
            } catch (err: any) {
                setDeleteError(err.message || "Failed to delete school.");
                console.error(err);
            }
        }
    };
    
    return (
  <>
    {deleteError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{deleteError}</div>}
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
            {['SI', 'School Name', 'Official School Name', 'Email', 'Mobile No', 'Currency', 'Symbol', 'City', 'State', 'Address', 'Action'].map(head => (
              <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schools.map((school, index) => (
            <tr key={school.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
              <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{school.name}</td>
              <td className="p-3 text-sm text-text-primary dark:text-gray-200">{school.officialName}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.email}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.mobile}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.currencies?.code}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.currencies?.symbol}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.city}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.state}</td>
              <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{school.address}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit school">{icons.edit}</button>
                  <button onClick={() => handleDelete(school.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete school">{icons.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-gray-400">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>Showing 1 to {schools.length} of {schools.length} entries</span>
            <select className="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600">
                <option>25</option>
            </select>
            <span>rows per page</span>
        </div>
        <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&lt;</button>
            <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>&gt;</button>
        </div>
    </div>
  </>
)};

const FormField = ({ label, name, type = 'text', required = false, rows, children }: { label: string, name: string, type?: string, required?: boolean, rows?: number, children?: React.ReactNode }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children || (type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                required={required}
                rows={rows || 3}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        ) : (
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        ))}
    </div>
);

const ImageUpload = ({ label, onFileChange }: { label: string; onFileChange: (file: File | null) => void }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file));
            onFileChange(file);
        } else {
            setPreview(null);
            onFileChange(null);
        }
    };

    const handleClick = () => fileInputRef.current?.click();
    
    const reset = () => {
        setPreview(null);
        onFileChange(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <div
                onClick={handleClick}
                className="mt-1 flex justify-center items-center h-40 px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-primary dark:hover:border-primary-hover transition-colors"
            >
                <div className="space-y-1 text-center">
                    {preview ? (
                        <img src={preview} alt={`${label} preview`} className="mx-auto h-28 w-auto object-contain" />
                    ) : (
                        <>
                            {icons.upload}
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                <span>Upload a file</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG up to 2MB</p>
                        </>
                    )}
                     <input ref={fileInputRef} type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg" />
                </div>
            </div>
             {preview && <button type="button" onClick={reset} className="text-xs text-red-500 hover:underline mt-1">Remove</button>}
        </div>
    );
};

const CreateSchoolForm = ({ onSchoolAdded }: { onSchoolAdded: () => void }) => {
    type LogoType = 'systemLogo' | 'textLogo' | 'printingLogo' | 'reportCardLogo';
    const [logos, setLogos] = useState<Partial<Record<LogoType, File>>>({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const data = await getCurrencies();
            setCurrencies(data);
        };
        fetchCurrencies();
    }, []);

    const handleFileChange = (type: LogoType, file: File | null) => {
        setLogos(prev => {
            const newLogos = { ...prev };
            if (file) {
                newLogos[type] = file;
            } else {
                delete newLogos[type];
            }
            return newLogos;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        
        try {
            const formData = new FormData(e.currentTarget);
            const newSchoolData: Omit<School, 'id' | 'user_id' | 'systemLogoUrl' | 'textLogoUrl' | 'printingLogoUrl' | 'reportCardLogoUrl' | 'currencies'> = {
                name: formData.get('name') as string,
                officialName: formData.get('officialName') as string,
                email: formData.get('email') as string,
                mobile: formData.get('mobile') as string,
                currency_id: Number(formData.get('currency_id')),
                city: formData.get('city') as string,
                state: formData.get('state') as string,
                address: formData.get('address') as string,
            };
            await addSchool(newSchoolData, logos);
            onSchoolAdded();
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };


    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="School Name" name="name" required />
                <FormField label="Official School Name" name="officialName" required />
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Mobile No" name="mobile" type="tel" required />
                <FormField label="Currency" name="currency_id" required>
                    <select
                        id="currency_id"
                        name="currency_id"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Select a currency</option>
                        {currencies.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                    </select>
                </FormField>
                <FormField label="City" name="city" />
                <FormField label="State" name="state" />
                <div className="md:col-span-2 lg:col-span-3">
                    <FormField label="Address" name="address" type="textarea" rows={3} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t dark:border-gray-700">
                 <ImageUpload label="System Logo" onFileChange={(file) => handleFileChange('systemLogo', file)} />
                 <ImageUpload label="Text Logo" onFileChange={(file) => handleFileChange('textLogo', file)} />
                 <ImageUpload label="Printing Logo" onFileChange={(file) => handleFileChange('printingLogo', file)} />
                 <ImageUpload label="Report Card" onFileChange={(file) => handleFileChange('reportCardLogo', file)} />
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

            <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50">
                    {icons.save} {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
};


const SchoolPage = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchools = useCallback(async () => {
      setLoading(true);
      const data = await getSchools();
      setSchools(data);
      setLoading(false);
  }, []);

  useEffect(() => {
      fetchSchools();
  }, [fetchSchools]);

  const handleSchoolAdded = () => {
      fetchSchools();
      setView('list');
  };

  const TabButton = ({ label, icon, currentView, targetView }: { label: string, icon: React.ReactNode, currentView: string, targetView: 'list' | 'create' }) => {
    const isActive = currentView === targetView;
    return (
      <button
        onClick={() => setView(targetView)}
        className={`flex items-center px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-200 ${isActive
            ? 'border-b-2 border-primary text-primary bg-primary/5 dark:bg-primary/10'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <DashboardLayout title="School">
      <div className="bg-card dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="border-b dark:border-gray-700 mb-6">
          <nav className="flex space-x-2 -mb-px">
            <TabButton label="School List" icon={icons.list} currentView={view} targetView="list" />
            <TabButton label="Create School" icon={icons.add} currentView={view} targetView="create" />
          </nav>
        </div>
        {loading ? (
             <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading Schools...</div>
        ) : view === 'list' ? (
            <SchoolList schools={schools} onSchoolDeleted={fetchSchools} />
        ) : (
            <CreateSchoolForm onSchoolAdded={handleSchoolAdded} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SchoolPage;
