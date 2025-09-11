

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// Icons
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

const FormField = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2">
        <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
);

const RadioGroup = ({ name, options, value, onChange }: { name: string, options: string[], value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center space-x-4 pt-2">
        {options.map(opt => (
            <label key={opt} className="flex items-center">
                <input
                    type="radio"
                    name={name}
                    value={opt}
                    checked={value === opt}
                    onChange={() => onChange(opt)}
                    className="form-radio h-4 w-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-text-primary dark:text-gray-200">{opt}</span>
            </label>
        ))}
    </div>
);

const ImageUploader = ({ label, currentImage }: { label: string, currentImage?: string }) => {
    const [preview, setPreview] = useState(currentImage);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex items-center space-x-4">
            {preview ? <img src={preview} alt="preview" className="h-12 w-auto object-contain rounded-md bg-gray-100 dark:bg-gray-700 p-1" /> : <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>}
            <input type="file" onChange={handleFileChange} className="text-sm text-text-secondary dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
        </div>
    );
};

const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center space-x-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent"/>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="form-input w-28 text-sm"/>
        <span className="text-sm text-text-secondary dark:text-gray-400">{label}</span>
    </div>
);

const WebsiteSettings = () => {
    // some state for the form fields, using defaults from screenshot
    const [cmsFrontend, setCmsFrontend] = useState('Enabled');
    const [onlineAdmission, setOnlineAdmission] = useState('Enabled');
    const [themeOptions, setThemeOptions] = useState({
        primaryBg: '#5D5FEF', menuBg: '#ffffff', buttonHover: '#4338CA', textColor: '#232323',
        textSecondary: '#636363', footerBg: '#f0f0f0', footerText: '#4f4f4f', copyrightBg: '#e6e6e6',
        copyrightText: '#4f4f4f'
    });

    const handleColorChange = (key: keyof typeof themeOptions, value: string) => {
        setThemeOptions(prev => ({...prev, [key]: value}));
    };

    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8 border-t-4 border-primary">
            <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Website Settings</h3>
            <form className="space-y-6">
                <FormField label="Cms Title" required><input type="text" defaultValue="Icon School Management System With CMS" className="form-input"/></FormField>
                <FormField label="Cms Url Alias" required><input type="text" defaultValue="ramomnschool" className="form-input"/></FormField>
                <FormField label="Cms Frontend" required><RadioGroup name="cms_frontend" options={['Enabled', 'Disabled']} value={cmsFrontend} onChange={setCmsFrontend} /></FormField>
                <FormField label="Online Admission" required><RadioGroup name="online_admission" options={['Enabled', 'Disabled']} value={onlineAdmission} onChange={setOnlineAdmission} /></FormField>
                <FormField label="Receive Email To" required><input type="email" defaultValue="info@ramomname.com" className="form-input"/></FormField>
                <FormField label="Captcha Status" required><select className="form-select"><option>Disable</option><option>Enable</option></select></FormField>
                <FormField label="Working Hours" required><input type="text" defaultValue="Open Hours : 7am-4pm, How To Fix : 10AM - 04PM, Sunday Closed" className="form-input"/></FormField>
                <FormField label="Login"><ImageUploader label="Login Image" currentImage="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/public/website_images/frontend/mock-login.png"/></FormField>
                <FormField label="Fav Icon"><ImageUploader label="Fav Icon" currentImage="https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/public/website_images/frontend/mock-favicon.png"/></FormField>
                <FormField label="Address" required><input type="text" defaultValue="3670 Geraldine Lane, New York" className="form-input"/></FormField>
                <FormField label="Google Analytics"><textarea className="form-textarea h-24"/></FormField>
                <FormField label="Theme">
                    <div className="space-y-4">
                        <input type="text" placeholder="Header Title" className="form-input"/>
                        <input type="text" placeholder="Footer Text" className="form-input"/>
                        <input type="text" placeholder="Copyright Text" className="form-input"/>
                    </div>
                </FormField>
                
                <div className="pt-6 border-t dark:border-gray-700">
                    <h4 className="text-md font-semibold text-text-primary dark:text-gray-200 mb-4">Theme Options</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ColorPicker label="Primary BG Color" value={themeOptions.primaryBg} onChange={v => handleColorChange('primaryBg', v)}/>
                        <ColorPicker label="Menu BG Color" value={themeOptions.menuBg} onChange={v => handleColorChange('menuBg', v)}/>
                        <ColorPicker label="Button Hover BG Color" value={themeOptions.buttonHover} onChange={v => handleColorChange('buttonHover', v)}/>
                        <ColorPicker label="Text Color" value={themeOptions.textColor} onChange={v => handleColorChange('textColor', v)}/>
                        <ColorPicker label="Text Secondary Color" value={themeOptions.textSecondary} onChange={v => handleColorChange('textSecondary', v)}/>
                        <ColorPicker label="Footer BG Color" value={themeOptions.footerBg} onChange={v => handleColorChange('footerBg', v)}/>
                        <ColorPicker label="Footer Text Color" value={themeOptions.footerText} onChange={v => handleColorChange('footerText', v)}/>
                        <ColorPicker label="Copyright BG Color" value={themeOptions.copyrightBg} onChange={v => handleColorChange('copyrightBg', v)}/>
                        <ColorPicker label="Copyright Text Color" value={themeOptions.copyrightText} onChange={v => handleColorChange('copyrightText', v)}/>
                        <div className="flex items-center space-x-2">
                             <input type="number" defaultValue="0" className="form-input w-20"/>
                             <span className="text-sm text-text-secondary dark:text-gray-400">Border Radius</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Mobile No" required><input type="tel" defaultValue="+1-954-848-1802" className="form-input"/></FormField>
                    <FormField label="Email" required><input type="email" defaultValue="info@demo.com" className="form-input"/></FormField>
                    <FormField label="Fax" required><input type="text" defaultValue="001 - 785 987 1234" className="form-input"/></FormField>
                    <FormField label="Footer About Text" required><textarea className="form-textarea h-24" defaultValue="If you are going to use a passage Lorem Ipsum, you anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to."></textarea></FormField>
                    <FormField label="Copyright Text" required><input type="text" defaultValue="Copyright &copy; 2024 ramomcoder/themexhunt/ All Rights Reserved." className="form-input"/></FormField>
                </div>

                <div className="pt-6 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Facebook Url"><input type="url" defaultValue="https://facebook.com" className="form-input"/></FormField>
                    <FormField label="Twitter Url"><input type="url" defaultValue="https://twitter.com" className="form-input"/></FormField>
                    <FormField label="Youtube Url"><input type="url" defaultValue="https://youtube.com" className="form-input"/></FormField>
                    <FormField label="Google Plus Url"><input type="url" className="form-input"/></FormField>
                    <FormField label="Linkedin Url"><input type="url" className="form-input"/></FormField>
                    <FormField label="Pinterest Url"><input type="url" className="form-input"/></FormField>
                    <FormField label="Instagram Url"><input type="url" className="form-input"/></FormField>
                </div>
                
                <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                    <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover"><SaveIcon/> Save</button>
                </div>
            </form>
        </div>
    );
}

const SettingPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [schools, setSchools] = useState<School[]>([]);
    const [loadingSchools, setLoadingSchools] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoadingSchools(true);
            const schoolsData = await getSchools();
            setSchools(schoolsData);
            setLoadingSchools(false);
        };
        fetchSchools();
    }, []);

    const handleFilter = () => {
        if (selectedSchool) {
            setShowSettings(true);
        } else {
            alert('Please select a school.');
        }
    };
    
  return (
    <DashboardLayout title="Frontend">
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
             <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="md:col-span-3">
                     <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                        School <span className="text-red-500">*</span>
                    </label>
                    <select id="school" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className="form-select" disabled={loadingSchools}>
                        <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                        {schools.map(school => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:text-right">
                    <button onClick={handleFilter} className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                        <FilterIcon/> Filter
                    </button>
                </div>
             </div>
        </div>

        {showSettings && <WebsiteSettings />}
         <style>{`
            .form-input, .form-select, .form-textarea, .form-radio, .form-checkbox {
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            }
            .form-input, .form-select, .form-textarea {
                width: 100%;
                padding: 0.5rem 0.75rem;
                border-radius: 0.375rem;
                border-width: 1px;
                background-color: var(--background);
            }
            .form-radio, .form-checkbox {
                 color: #5D5FEF;
            }
            html.dark .form-input, html.dark .form-select, html.dark .form-textarea {
                border-color: #4B5563;
                background-color: #374151;
                color: white;
            }
            html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea {
                border-color: #D1D5DB;
                color: #111827;
            }
            .form-input:focus, .form-select:focus, .form-textarea:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-ring-color: #5D5FEF;
                --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                border-color: #5D5FEF;
            }
        `}</style>
    </DashboardLayout>
  );
};

export default SettingPage;
