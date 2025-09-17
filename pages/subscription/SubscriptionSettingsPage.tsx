


import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getPesaPalConfig, upsertPesaPalConfig, PesaPalConfig, getPayPalConfig, upsertPayPalConfig, PayPalConfig } from '../../db';

// --- ICONS ---
const icons = {
    general: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    payment: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    email: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    test: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
};

// --- General Form Components ---
const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span> {title}
        </h3>
        <div className="space-y-4 pl-4">{children}</div>
    </div>
);

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 md:text-right">{label}</label>
        <div className="md:col-span-2">{children}</div>
    </div>
);

const SelectInput = ({ children }: { children: React.ReactNode }) => (
    <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {children}
    </select>
);

const TextInput = ({ ...props }) => (
    <input
        type="text"
        {...props}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    />
);

const TextareaInput = ({ ...props }) => (
     <textarea
        rows={4}
        {...props}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    />
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

// --- Settings Panels ---
const GeneralSettingsPanel = () => (
    <form>
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <FormSection title="General">
                <FormField label="Automatic Subscription Approval">
                    <SelectInput><option>Yes</option><option>No</option></SelectInput>
                </FormField>
                <FormField label="Google-Captcha Status"><SelectInput><option>Disable</option><option>Enable</option></SelectInput></FormField>
            </FormSection>

            <FormSection title="Offline Payments Setting">
                <FormField label="Offline Payments"><SelectInput><option>Enabled</option><option>Disabled</option></SelectInput></FormField>
            </FormSection>

            <FormSection title="Dashboard Alert Setting">
                <FormField label="Expired Alert"><SelectInput><option>Yes</option><option>No</option></SelectInput></FormField>
                <FormField label="Expired Alert Days"><TextInput defaultValue="7" /></FormField>
                <FormField label="Expired Reminder Message"><TextareaInput defaultValue="Your school subscription will expire in {days} days." /></FormField>
                <FormField label="Expired Message"><TextareaInput defaultValue="Your school subscription has already expired. Please <a href='subscription/index'>renew</a> the subscription." /></FormField>
            </FormSection>

            <FormSection title="Seo">
                <FormField label="Site Title"><TextInput defaultValue="Ramom School Subscription (SaaS)" /></FormField>
                <FormField label="Meta Keyword"><TextInput defaultValue="School subscription, Custom domains features" /></FormField>
                <FormField label="Meta Description"><TextareaInput defaultValue="Ramom School Subscription (SaaS)" /></FormField>
            </FormSection>
             <FormSection title="Google Analytics">
                 <FormField label="Google Analytics"><TextareaInput /></FormField>
             </FormSection>
            
             <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.save} Save</button>
            </div>
        </div>
    </form>
);

const PaymentSettingsPanel = () => {
    const [activeGateway, setActiveGateway] = useState('paypalconfig');
    const gateways = ['Paypal Config', 'Stripe Config', 'PayUmoney Config', 'Paystack', 'Razorpay', 'Midtrans', 'SSLCommerz', 'Jazzcash', 'Flutter Wave', 'PesaPal'];
    const activeGateways = ['Paypal', 'Stripe', 'PayUmoney', 'Paystack', 'Razorpay', 'Midtrans', 'SSLCommerz', 'Jazzcash', 'Flutter Wave', 'Paytm', 'toyibuPay', 'Payhere', 'PesaPal'];
    
    // Config states
    const [pesapalConfig, setPesapalConfig] = useState<Partial<PesaPalConfig>>({});
    const [paypalConfig, setPaypalConfig] = useState<Partial<PayPalConfig>>({});
    
    // Loading states
    const [loadingPesapal, setLoadingPesapal] = useState(true);
    const [loadingPaypal, setLoadingPaypal] = useState(true);

    // Active Gateway states
    const [activeGatewayStates, setActiveGatewayStates] = useState<Record<string, boolean>>({});
    const [loadingActiveGateways, setLoadingActiveGateways] = useState(true);


    useEffect(() => {
        const fetchConfigs = async () => {
            setLoadingActiveGateways(true);
            setLoadingPesapal(true);
            setLoadingPaypal(true);

            const pesapalCfg = await getPesaPalConfig();
            if (pesapalCfg) {
                setPesapalConfig(pesapalCfg);
                setActiveGatewayStates(s => ({ ...s, PesaPal: pesapalCfg.is_enabled }));
            }
            setLoadingPesapal(false);

            const paypalCfg = await getPayPalConfig();
            if (paypalCfg) {
                setPaypalConfig(paypalCfg);
                 setActiveGatewayStates(s => ({ ...s, Paypal: paypalCfg.is_enabled }));
            }
            setLoadingPaypal(false);

            setLoadingActiveGateways(false);
        };
        fetchConfigs();
    }, []);

    const handleSavePesapal = async (e: React.FormEvent) => {
        e.preventDefault();
        await upsertPesaPalConfig(pesapalConfig);
        alert('PesaPal settings saved!');
    };
    
    const handleSavePaypal = async (e: React.FormEvent) => {
        e.preventDefault();
        await upsertPayPalConfig(paypalConfig);
        alert('PayPal settings saved!');
    };
    
    const handleActiveGatewayChange = (gateway: string, isEnabled: boolean) => {
        setActiveGatewayStates(prev => ({ ...prev, [gateway]: isEnabled }));
    };

    const handleSaveActiveGateways = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activeGatewayStates.hasOwnProperty('Paypal')) {
                await upsertPayPalConfig({ ...paypalConfig, is_enabled: activeGatewayStates['Paypal'] });
            }
            if (activeGatewayStates.hasOwnProperty('PesaPal')) {
                await upsertPesaPalConfig({ ...pesapalConfig, is_enabled: activeGatewayStates['PesaPal'] });
            }
            // Add other gateways with config tables here in the future
            alert('Active gateways saved!');
        } catch (err) {
            alert('Error saving active gateways.');
            console.error(err);
        }
    };


    const TabButton = ({ name }: { name: string }) => (
        <button
            type="button"
            onClick={() => setActiveGateway(name.toLowerCase().replace(/ /g, ''))}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeGateway === name.toLowerCase().replace(/ /g, '') ? 'border-b-2 border-primary text-primary bg-primary/5' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
        >{name}</button>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                 <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <div className="border-b dark:border-gray-700 mb-6">
                        <nav className="flex flex-wrap space-x-2 -mb-px">
                            {gateways.map(g => <TabButton key={g} name={g} />)}
                        </nav>
                     </div>
                     
                     {activeGateway === 'paypalconfig' && (
                         <form onSubmit={handleSavePaypal} className="space-y-4">
                            {loadingPaypal ? <p>Loading PayPal settings...</p> : (
                                <>
                                    <FormField label="Paypal Username">
                                        <TextInput
                                            value={paypalConfig.username || ''}
                                            onChange={(e) => setPaypalConfig(c => ({...c, username: e.target.value}))}
                                            placeholder="Your PayPal API Username"
                                        />
                                    </FormField>
                                    <FormField label="Paypal Password">
                                        <TextInput
                                            type="password"
                                            value={paypalConfig.password || ''}
                                            onChange={(e) => setPaypalConfig(c => ({...c, password: e.target.value}))}
                                            placeholder="Your PayPal API Password"
                                        />
                                    </FormField>
                                    <FormField label="Paypal Signature">
                                        <TextInput
                                            value={paypalConfig.signature || ''}
                                            onChange={(e) => setPaypalConfig(c => ({...c, signature: e.target.value}))}
                                            placeholder="Your PayPal API Signature"
                                        />
                                    </FormField>
                                    <FormField label="Paypal Email">
                                        <TextInput
                                            type="email"
                                            value={paypalConfig.email || ''}
                                            onChange={(e) => setPaypalConfig(c => ({...c, email: e.target.value}))}
                                            placeholder="Your PayPal Email"
                                        />
                                    </FormField>
                                    <FormField label="Paypal Sandbox">
                                        <ToggleSwitch
                                            enabled={paypalConfig.sandbox || false}
                                            setEnabled={(val) => setPaypalConfig(c => ({...c, sandbox: val}))}
                                        />
                                    </FormField>
                                    <div className="pt-6 flex justify-end">
                                        <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.save} Save</button>
                                    </div>
                                </>
                            )}
                         </form>
                     )}

                    {activeGateway === 'pesapal' && (
                        <form onSubmit={handleSavePesapal} className="space-y-4">
                            {loadingPesapal ? <p>Loading PesaPal settings...</p> : (
                                <>
                                    <FormField label="Consumer Key">
                                        <TextInput 
                                            value={pesapalConfig.consumer_key || ''} 
                                            onChange={(e) => setPesapalConfig(c => ({...c, consumer_key: e.target.value}))}
                                            placeholder="Your PesaPal Consumer Key"
                                        />
                                    </FormField>
                                    <FormField label="Consumer Secret">
                                        <TextInput 
                                            type="password"
                                            value={pesapalConfig.consumer_secret || ''} 
                                            onChange={(e) => setPesapalConfig(c => ({...c, consumer_secret: e.target.value}))}
                                            placeholder="Your PesaPal Consumer Secret"
                                        />
                                    </FormField>
                                    <div className="pt-6 flex justify-end">
                                        <button 
                                            type="submit"
                                            className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
                                        >
                                            {icons.save} Save PesaPal Settings
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    )}
                    
                    {!['paypalconfig', 'pesapal'].includes(activeGateway) && <p className="text-center text-gray-500 py-8">Configuration for {activeGateway} is not implemented.</p>}
                 </div>
            </div>
            <div className="lg:col-span-1">
                 <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Active Gateway</h3>
                    <form className="space-y-3" onSubmit={handleSaveActiveGateways}>
                        {loadingActiveGateways ? <p>Loading...</p> : activeGateways.map(g => (
                             <div key={g} className="flex items-center">
                                <input id={g} type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={activeGatewayStates[g] || false}
                                    onChange={(e) => handleActiveGatewayChange(g, e.target.checked)}
                                />
                                <label htmlFor={g} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">{g}</label>
                            </div>
                        ))}
                         <div className="pt-4 flex justify-end">
                            <button type="submit" className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.save} Save</button>
                        </div>
                    </form>
                 </div>
            </div>
        </div>
    );
};

const EmailTriggerAccordion = ({ title, subject, body, codes }: { title: string, subject: string, body: string, codes: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b dark:border-gray-700">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3 text-left font-semibold text-text-primary dark:text-gray-200"
            >
                <span>{title}</span>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-md space-y-4">
                    <div className="flex items-center">
                        <input id={`notify_${title}`} type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <label htmlFor={`notify_${title}`} className="ml-2 text-sm text-gray-600 dark:text-gray-400">Notify Enable</label>
                    </div>
                    <FormField label="Subject"><TextInput defaultValue={subject} /></FormField>
                    <FormField label="Body">
                        <div>
                            <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-t-md bg-gray-100 dark:bg-gray-900/50 text-xs text-gray-500 dark:text-gray-400">Mock Rich Text Editor</div>
                            <TextareaInput defaultValue={body} />
                        </div>
                    </FormField>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Codes: {codes}</p>
                </div>
            )}
        </div>
    );
};


const EmailSettingsPanel = () => {
    const [activeTab, setActiveTab] = useState('triggers');

    return (
         <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="border-b dark:border-gray-700 mb-6">
                <nav className="flex space-x-2 -mb-px">
                    <button onClick={() => setActiveTab('config')} className={`px-4 py-2 font-medium text-sm rounded-t-md ${activeTab === 'config' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}>Email Config</button>
                    <button onClick={() => setActiveTab('triggers')} className={`px-4 py-2 font-medium text-sm rounded-t-md ${activeTab === 'triggers' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}>Email Triggers</button>
                </nav>
            </div>
            
            {activeTab === 'config' && (
                <form className="space-y-8">
                     <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <FormField label="Email"><TextInput defaultValue="All Outgoing Email Will be Sent From This Email Address."/></FormField>
                        <FormField label="Email Protocol"><SelectInput><option>PHP Mail</option><option>SMTP</option></SelectInput></FormField>
                        <FormField label="SMTP Host"><TextInput /></FormField>
                        <FormField label="SMTP Username"><TextInput /></FormField>
                        <FormField label="SMTP Password"><TextInput type="password" /></FormField>
                        <FormField label="SMTP Port"><TextInput /></FormField>
                        <FormField label="Email Encryption"><SelectInput><option>No</option><option>SSL</option><option>TLS</option></SelectInput></FormField>
                        <FormField label="SMTP Auth"><SelectInput><option>Yes</option><option>No</option></SelectInput></FormField>
                        <div className="flex justify-end pt-4"><button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.save} Save</button></div>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-4">Send Test Email</h3>
                        <FormField label="Email Address"><TextInput placeholder="Email Address" /></FormField>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">You can use this function to make sure your SMTP settings are set correctly.</p>
                         <div className="flex justify-end pt-4"><button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.test} Test Now</button></div>
                     </div>
                </form>
            )}

            {activeTab === 'triggers' && (
                <div className="space-y-2">
                    <EmailTriggerAccordion 
                        title="School Registered" 
                        subject="Submit School Registered Form"
                        body="{institute_name}, {admin_name}, {login_username}, {password}, {school_name}, {plan_name}, {invoice_url}, {payment_url}, {reference_no}, {date}, {fees_amount}" 
                        codes="{institute_name}, {admin_name}, {login_username}, {password}, {school_name}, {plan_name}, {invoice_url}, {payment_url}, {reference_no}, {date}, {fees_amount}" 
                    />
                    <EmailTriggerAccordion 
                        title="School Subscription Payment Confirmation"
                        subject="School Subscription Payment Confirmation"
                        body=""
                        codes="{institute_name}, {admin_name}, {school_name}, {plan_name}, {invoice_url}, {reference_no}, {date}, {paid_amount}"
                    />
                     <EmailTriggerAccordion 
                        title="School Subscription Approval Confirmation"
                        subject="School Subscription Approval Confirmation"
                        body=""
                        codes="{institute_name}, {admin_name}, {login_username}, {password}, {school_name}, {plan_name}, {invoice_url}, {reference_no}, {subscription_start_date}, {subscription_expiry_date}, {paid_amount}"
                    />
                    <EmailTriggerAccordion 
                        title="School Subscription Reject"
                        subject="Rejeição de Assinatura Escolar"
                        body=""
                        codes="{institute_name}, {admin_name}, {school_name}, {reject_reason}"
                    />
                     <div className="pt-6 flex justify-end">
                        <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">{icons.save} Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Main Subscription Settings Page Component ---
const SubscriptionSettingsPage = () => {
    const [activePanel, setActivePanel] = useState('payment');

    const renderPanel = () => {
        switch (activePanel) {
            case 'general':
                return <GeneralSettingsPanel />;
            case 'payment':
                return <PaymentSettingsPanel />;
            case 'email':
                return <EmailSettingsPanel />;
            default:
                return <GeneralSettingsPanel />;
        }
    };

    const SidebarButton = ({ name, label, icon }: { name: string, label: string, icon: React.ReactNode }) => (
        <button
            onClick={() => setActivePanel(name)}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${activePanel === name ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <DashboardLayout title="Subscription - Settings">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4">
                    <div className="bg-card dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                        <SidebarButton name="general" label="General Settings" icon={icons.general} />
                        <SidebarButton name="payment" label="Payment Settings" icon={icons.payment} />
                        <SidebarButton name="email" label="Email Settings" icon={icons.email} />
                    </div>
                </aside>
                <main className="lg:w-3/4">
                    {renderPanel()}
                </main>
            </div>
        </DashboardLayout>
    );
};

export default SubscriptionSettingsPage;
