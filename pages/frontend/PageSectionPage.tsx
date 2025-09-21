import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getSchools, School } from '../../db';

// Icons
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

const ToggleSwitch = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (enabled: boolean) => void }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        onClick={() => setEnabled(!enabled)}
    >
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);

const SidebarLink = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => {
    const icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors relative flex items-center group ${
                isActive 
                ? 'bg-gray-900 text-primary' 
                : 'text-text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"></div>}
            <span className={`ml-2 transition-colors ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-text-primary dark:group-hover:text-gray-300'}`}>
                {icon}
            </span>
            <span className="ml-2">{label}</span>
        </button>
    );
};


const ContentTab = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors relative ${
            isActive ? 'text-primary font-bold' : 'text-text-secondary dark:text-gray-400 hover:text-primary/80'
        }`}
    >
        {label}
        {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"></div>}
    </button>
);

const WelcomeMessageForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [titleColor, setTitleColor] = useState("#000000");
    const [photo, setPhoto] = useState<File | null>(null);
    const photoPreview = photo ? URL.createObjectURL(photo) : "https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/public/website_images/frontend/welcome_photo.png";

    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <input type="text" defaultValue="Welcome To Education" className="form-input" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Subtitle <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <input type="text" defaultValue="We will give you future" className="form-input" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-2">
                    <textarea 
                        rows={6}
                        defaultValue="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-2 flex items-center gap-4">
                    <img src={photoPreview} alt="Welcome" className="h-16 w-16 object-cover rounded-md" />
                    <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="text-sm text-text-secondary dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Title Text Color</label>
                <div className="md:col-span-2 flex items-center gap-2">
                    <input type="color" value={titleColor} onChange={e => setTitleColor(e.target.value)} className="w-10 h-10 p-1 border-none rounded-md cursor-pointer bg-transparent"/>
                    <input type="text" value={titleColor} onChange={e => setTitleColor(e.target.value)} className="form-input w-28"/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right">Show Website</label>
                <div className="md:col-span-2">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            <div className="flex justify-center pt-6 border-t dark:border-gray-700">
                <button type="submit" className="flex items-center px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const TeachersSectionForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [titleTextColor, setTitleTextColor] = useState("#ffffff");
    const [descriptionTextColor, setDescriptionTextColor] = useState("#ffffff");
    const [photo, setPhoto] = useState<File | null>(null);
    const photoPreview = photo ? URL.createObjectURL(photo) : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1287&auto=format&fit=crop";
    
    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Experience Teachers Team" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Start No Of Teacher <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="number" defaultValue="0" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <textarea 
                        rows={6}
                        defaultValue="Making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        <img src={photoPreview} alt="Teachers" className="w-full object-cover rounded-md mb-2 border-2 border-gray-500 dark:border-gray-600" />
                        <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="form-file"/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title Text Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: titleTextColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Description Text Color <span className="text-primary">*</span></label>
                 <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={descriptionTextColor} onChange={e => setDescriptionTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={descriptionTextColor} onChange={e => setDescriptionTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: descriptionTextColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Show Website</label>
                <div className="md:col-span-6">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const TestimonialSectionForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);

    return (
        <form className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="WHAT PEOPLE SAYS" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <textarea 
                        rows={4}
                        defaultValue="Fusce sem dolor, interdum in efficitur at, faucibus nec lorem. Sed nec molestie justo."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Show Website</label>
                <div className="md:col-span-6">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const ServicesSectionForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [titleTextColor, setTitleTextColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    return (
        <form className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="WHY CHOOSE US" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <textarea 
                        rows={4}
                        defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title Text Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: titleTextColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Background Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: backgroundColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Show Website</label>
                <div className="md:col-span-6">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const StatisticsSectionForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [titleTextColor, setTitleTextColor] = useState("#ffffff");
    const [descriptionTextColor, setDescriptionTextColor] = useState("#ffffff");
    const [photo, setPhoto] = useState<File | null>(null);
    const photoPreview = photo ? URL.createObjectURL(photo) : "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop";

    const WidgetIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    );

    const WidgetForm = ({ title, defaultTitle, defaultIcon, defaultType }: { title: string, defaultTitle: string, defaultIcon: string, defaultType: string }) => (
        <div className="space-y-6">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-gray-100 border-t border-gray-300 dark:border-gray-600 pt-6">
                <WidgetIcon />
                {title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Widget Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue={defaultTitle} className="form-input" required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Widget Icon <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue={defaultIcon} className="form-input" required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Statistics Type <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <select className="form-input" defaultValue={defaultType}>
                        <option>Teacher</option>
                        <option>Student</option>
                        <option>Live Class</option>
                        <option>Branch</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="20 years experience in the field of study" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <textarea 
                        rows={4}
                        defaultValue="Lorem Ipsum is simply dummy text printer took a galley of type and scrambled it to make a type specimen book."
                        className="form-input" 
                        required 
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        <img src={photoPreview} alt="Statistics" className="w-full object-cover rounded-md mb-2 border-2 border-gray-500 dark:border-gray-600" />
                        <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="form-file"/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title Text Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: titleTextColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Description Text Color <span className="text-primary">*</span></label>
                 <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={descriptionTextColor} onChange={e => setDescriptionTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={descriptionTextColor} onChange={e => setDescriptionTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: descriptionTextColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6">
                <WidgetForm title="Widget 1" defaultTitle="Certified Teachers" defaultIcon="fas fa-user-tie" defaultType="Teacher" />
                <WidgetForm title="Widget 2" defaultTitle="Students Enrolled" defaultIcon="fas fa-user-graduate" defaultType="Student" />
                <WidgetForm title="Widget 3" defaultTitle="Live Classes" defaultIcon="far fa-file-video" defaultType="Live Class" />
                <WidgetForm title="Widget 4" defaultTitle="Branch" defaultIcon="fas fa-school" defaultType="Branch" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4 border-t border-gray-300 dark:border-gray-600 pt-6">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Show Website</label>
                <div className="md:col-span-6">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const CallToActionSectionForm = () => {
    const [showWebsite, setShowWebsite] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState("#464646");
    const [textColor, setTextColor] = useState("#ffffff");

    return (
        <form className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Cta Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Request for a free Education Class" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Mobile No <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="+2484-398-8987" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Button Text <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Request Now" className="form-input" required />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Button Url <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="#" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Background Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: backgroundColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Text Color <span className="text-primary">*</span></label>
                <div className="md:col-span-6 flex items-center gap-2">
                    <input type="text" value={textColor} onChange={e => setTextColor(e.target.value.toLowerCase())} className="form-input w-24 uppercase"/>
                    <div className="relative w-10 h-10">
                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div style={{ backgroundColor: textColor }} className="w-full h-full rounded border border-gray-500 dark:border-gray-600"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Show Website</label>
                <div className="md:col-span-6">
                    <ToggleSwitch enabled={showWebsite} setEnabled={setShowWebsite} />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const OptionsSectionForm = () => {
    return (
        <form className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">
                    Page Title <span className="text-primary">*</span>
                </label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Home" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">
                    Meta Keyword
                </label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom Home Page" className="form-input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">
                    Meta Description
                </label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom - School Management ERP System With CMS" className="form-input" />
                </div>
            </div>

            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const TeachersPageForm = () => {
    const [bannerPhoto, setBannerPhoto] = useState<File | null>(null);
    const bannerPhotoPreview = bannerPhoto ? URL.createObjectURL(bannerPhoto) : "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop";

    return (
        <form className="space-y-8">
            <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 inline-block">
                Teachers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Page Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Teachers" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Banner Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <img src={bannerPhotoPreview} alt="Banner Preview" className="w-full h-auto max-h-48 object-cover rounded-md mb-2 border-2 border-gray-500 dark:border-gray-600" />
                    <input type="file" onChange={(e) => setBannerPhoto(e.target.files?.[0] || null)} className="form-file"/>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Meta Keyword</label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom Teachers Page" className="form-input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Meta Description</label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom - School Management System With CMS" className="form-input" />
                </div>
            </div>

            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const EventsPageForm = () => {
    const [activeTab, setActiveTab] = useState('Events');
    const eventTabs = ['Events', 'Options'];

    return (
        <div>
            <div className="border-b dark:border-gray-700 mb-6">
                <nav className="flex flex-wrap -mb-px">
                    {eventTabs.map(tab => (
                        <ContentTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                    ))}
                </nav>
            </div>
            {activeTab === 'Events' && <EventsContentForm />}
            {activeTab === 'Options' && <EventsOptionsForm />}
        </div>
    );
};

const RichTextEditorMock = () => (
    <div className="form-input p-0 overflow-hidden">
        <div className="flex items-center flex-wrap gap-x-1 gap-y-1 p-2 bg-gray-100 dark:bg-gray-700/50 border-b border-gray-300 dark:border-gray-600 text-text-secondary dark:text-gray-300">
            <select className="text-xs bg-transparent border border-gray-400 dark:border-gray-600 rounded px-1 py-0.5"><option>Arial</option></select>
            <select className="text-xs bg-transparent border border-gray-400 dark:border-gray-600 rounded px-1 py-0.5"><option>14</option></select>
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 font-bold">B</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 italic">I</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 underline">U</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 line-through">S</button>
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">🎨</button>
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">📊</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">🔗</button>
             <button type="button" className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">&lt;/&gt;</button>
        </div>
        <textarea
            rows={10}
            defaultValue="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat caecat beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
            className="w-full p-3 bg-transparent focus:outline-none resize-y"
        />
    </div>
);

const EventsContentForm = () => {
    return (
        <form className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Upcoming Events" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Description <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <RichTextEditorMock />
                </div>
            </div>
            
            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};

const BannerUploader = () => {
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>("https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=2070&auto=format&fit=crop");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPhotoFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemovePhoto = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPhotoFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div 
            className="w-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-2 text-center"
            onClick={triggerFileInput}
        >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <div className="relative group cursor-pointer">
                {preview ? (
                    <>
                        <img src={preview} alt="Banner" className="w-full h-auto max-h-32 object-cover rounded-md" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs">Drag and drop or click to replace</p>
                        </div>
                        <div className="absolute top-2 right-2 flex items-center bg-black/60 p-1 rounded">
                            <span className="text-white text-xs mr-2 truncate max-w-[150px]">{photoFile?.name || 'events1.jpg'}</span>
                            <button onClick={handleRemovePhoto} className="text-white bg-gray-700 hover:bg-gray-600 px-2 py-0.5 text-xs rounded">REMOVE</button>
                        </div>
                    </>
                ) : (
                    <div className="py-8">
                        <p className="text-sm text-text-secondary dark:text-gray-400">Drag and drop or click to upload</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const EventsOptionsForm = () => {
    return (
        <form className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Page Title <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Events" className="form-input" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-start gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right pt-2 md:col-span-2">Banner Photo <span className="text-primary">*</span></label>
                <div className="md:col-span-6">
                    <BannerUploader />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Meta Keyword</label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom Events Page" className="form-input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-4">
                <label className="text-sm font-medium text-text-secondary dark:text-gray-300 md:text-right md:col-span-2">Meta Description</label>
                <div className="md:col-span-6">
                    <input type="text" defaultValue="Ramom - School Management System With CMS" className="form-input" />
                </div>
            </div>

            <div className="flex justify-center pt-8 mt-4">
                <button type="submit" className="flex items-center px-8 py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors">
                    <SaveIcon />
                    Save
                </button>
            </div>
        </form>
    );
};


const PageSectionPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const [activeTab, setActiveTab] = useState('Welcome Message');
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

    const sidebarItems = ['Home', 'Teachers', 'Events', 'About Us', 'FAQ', 'Online Admission', 'Gallery', 'News', 'Admit Card', 'Exam Results', 'Certificates', 'Contact Us'];
    const contentTabs = ['Welcome Message', 'Teachers', 'Testimonial', 'Services', 'Statistics', 'Call To Action Section', 'Options'];

    const handleFilter = () => {
        if (selectedSchool) {
            setShowContent(true);
        } else {
            alert('Please select a school to continue.');
        }
    };

    return (
        <DashboardLayout title="Website Page">
             <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-primary">
                 <h3 className="text-lg font-bold text-text-primary dark:text-gray-100 mb-6 pb-2 border-b-2 border-primary inline-block">Select Ground</h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-3">
                        <label htmlFor="school" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                           School <span className="text-primary">*</span>
                        </label>
                        <select id="school" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className="form-select w-full" disabled={loadingSchools}>
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
            
            {showContent && (
                <div className="mt-8 flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <aside className="w-full md:w-1/4 lg:w-1/5 bg-card dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <nav className="space-y-1">
                            {sidebarItems.map(item => (
                                <SidebarLink key={item} label={item} isActive={activeSection === item} onClick={() => setActiveSection(item)} />
                            ))}
                        </nav>
                    </aside>
                    {/* Right Content Area */}
                    <main className="flex-1 bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        {activeSection === 'Home' ? (
                            <>
                                <div className="border-b dark:border-gray-700 mb-6">
                                    <nav className="flex flex-wrap -mb-px">
                                        {contentTabs.map(tab => (
                                            <ContentTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                                        ))}
                                    </nav>
                                </div>
                                {activeTab === 'Welcome Message' && <WelcomeMessageForm />}
                                {activeTab === 'Teachers' && <TeachersSectionForm />}
                                {activeTab === 'Testimonial' && <TestimonialSectionForm />}
                                {activeTab === 'Services' && <ServicesSectionForm />}
                                {activeTab === 'Statistics' && <StatisticsSectionForm />}
                                {activeTab === 'Call To Action Section' && <CallToActionSectionForm />}
                                {activeTab === 'Options' && <OptionsSectionForm />}
                            </>
                        ) : activeSection === 'Teachers' ? (
                            <TeachersPageForm />
                        ) : activeSection === 'Events' ? (
                            <EventsPageForm />
                        ) : (
                             <div className="text-center p-8 text-text-secondary dark:text-gray-400">
                                <h2 className="text-xl font-semibold">Page not configured</h2>
                                <p>The content for "{activeSection}" has not been implemented yet.</p>
                            </div>
                        )}
                    </main>
                </div>
            )}
            <style>{`
                .form-input, .form-select, .form-textarea {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.375rem;
                    border-width: 1px;
                    background-color: var(--background);
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                html.dark .form-input, html.dark .form-select, html.dark .form-textarea {
                    border-color: #4B5563; /* gray-600 */
                    background-color: #374151; /* gray-700 */
                    color: white;
                }
                html:not(.dark) .form-input, html:not(.dark) .form-select, html:not(.dark) .form-textarea {
                    border-color: #D1D5DB; /* gray-300 */
                    color: #111827;
                }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    --tw-ring-color: #5D5FEF;
                    box-shadow: 0 0 0 2px var(--tw-ring-color);
                    border-color: #5D5FEF;
                }
                .form-file {
                    font-size: 0.875rem;
                }
                html:not(.dark) .form-file { color: #6B7280; }
                html.dark .form-file { color: #9CA3AF; }
                .form-file::file-selector-button {
                    margin-right: 1rem;
                    padding: 0.5rem 1rem;
                    border-radius: 9999px;
                    border-width: 0px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    background-color: rgba(93, 95, 239, 0.1);
                    color: #5D5FEF;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                 .form-file::file-selector-button:hover {
                    background-color: rgba(93, 95, 239, 0.2);
                }
            `}</style>
        </DashboardLayout>
    );
};

export default PageSectionPage;
