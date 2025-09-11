import React from 'react';
import LandingLayout from '../components/LandingLayout';

// --- Icons for the policy sections ---
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 112.632-3.005M2 12h1m6.343-6.343a3 3 0 014.242 0M19.778 19.778a3 3 0 01-4.242 0" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14l-4 6h8l-4-6z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.49l-1.955 5.23-.002.003-.004.01-.003.008-.002.008-.002.009-.002.01-.002.01-.001.011-.002.013-.001.013-.002.014-.002.014-.002.015-.002.015 0 .001-.002.016-.002.016-.002.016-.002.017-.002.017-.002.017-.002.018-.002.018-.002.018-.002.018-.001.018-.002.019-.002.019-.002.019-.002.019-.002.019c-.001.006-.002.012-.002.018s0 .012.002.018l.002.019.002.019.002.019.002.019.002.019.001.018.002.018.002.018.002.018.002.018.002.017.002.017.002.017.002.016.002.016.002.016.002.015.002.015.002.014.002.014.001.013.002.013.001.011-.002.01-.002.01-.002.009-.002.008-.003.008-.004-.01-.002-.003-1.955-5.23a1 1 0 011.8 0z" /></svg>;
const CookieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3l-1.17.585A2 2 0 0115 5.414V6a2 2 0 01-2 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-.586a2 2 0 01.17-.83L6 3m12 18l-1.17-.585A2 2 0 0015 18.586V18a2 2 0 00-2-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v.586a2 2 0 00.17.83L6 21" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 12a8.956 8.956 0 01-2.93 6.653A8.956 8.956 0 0112 21a8.956 8.956 0 01-6.653-2.93A8.956 8.956 0 014 12m16 0h-5" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const PrivacyPolicyPage = () => {
  return (
    <LandingLayout>
      <section className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-600/80 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-lg text-purple-200 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-6 rounded-lg flex items-start space-x-4 border border-green-200 dark:border-green-700">
            <ShieldIcon />
            <div>
              <p className="font-bold">Last Updated: January 1, 2025</p>
              <p className="text-sm mt-1">
                This Privacy Policy explains how Acadeemia collects, uses, and protects your personal information when you use our school management services.
              </p>
            </div>
          </div>

          <div className="prose lg:prose-lg dark:prose-invert max-w-none mt-12 space-y-10">
            {/* Section 1 */}
            <section id="information-collection">
              <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><EyeIcon /> 1. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Account registration information (name, email, phone number)</li>
                <li>School and institutional details</li>
                <li>Student and staff information entered into the system</li>
                <li>Payment and billing information</li>
                <li>Communication preferences and support requests</li>
              </ul>
              <h3>Automatically Collected Information</h3>
              <p>We also collect some information automatically when you use our services:</p>
              <ul>
                <li>Usage data and system logs</li>
                <li>IP addresses and device information</li>
                <li>Browser type and operating system</li>
                <li>Access times and referring websites</li>
              </ul>
            </section>
            
            {/* Section 2 */}
            <section id="how-we-use">
              <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><FileTextIcon /> 2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our school management services</li>
                <li>Process transactions and manage subscriptions</li>
                <li>Communicate with you about your account and our services</li>
                <li>Provide customer support and technical assistance</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            {/* Section 3 */}
            <section id="information-sharing">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ShareIcon /> 3. Information Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent your personal information. We may share information in the following circumstances:</p>
                <h3>With Your Consent</h3>
                <p>We may share information when you explicitly consent to such sharing.</p>
                <h3>Service Providers</h3>
                <p>We may share information with trusted third-party service providers who assist us in:</p>
                <ul>
                    <li>Cloud hosting and infrastructure services</li>
                    <li>Payment processing</li>
                    <li>Email and communication services</li>
                    <li>Analytics and performance monitoring</li>
                </ul>
                <h3>Legal Requirements</h3>
                <p>We may disclose information when required by law or to protect our rights, property, or safety.</p>
            </section>
            
            {/* Section 4 */}
            <section id="data-security">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><LockIcon /> 4. Data Security</h2>
                <p>We implement comprehensive security measures to protect your information:</p>
                <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response and breach notification procedures</li>
                    <li>Compliance with industry security standards</li>
                </ul>
            </section>
            
            {/* Section 5 */}
            <section id="data-retention">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ClockIcon /> 5. Data Retention</h2>
                <p>We retain your information for as long as necessary to:</p>
                <ul>
                    <li>Provide our services to you</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                    <li>Maintain business records as required</li>
                </ul>
                <p>Upon termination of your account, we will delete or anonymize your personal information within a reasonable timeframe, unless retention is required by law.</p>
            </section>
            
            {/* Section 6 */}
            <section id="your-rights">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><UserCheckIcon /> 6. Your Rights and Choices</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul>
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                    <li><strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
            </section>
            
            {/* Section 7 */}
            <section id="data-transfers">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><GlobeIcon /> 7. International Data Transfers</h2>
                <p>If you are located outside Kenya, your information may be transferred to and processed in Kenya or other countries where we operate. We ensure appropriate safeguards are in place to protect your information.</p>
            </section>
            
            {/* Section 8 */}
            <section id="childrens-privacy">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><ShieldIcon /> 8. Children's Privacy</h2>
                <p>Our services are designed for educational institutions and may contain information about students under 18. We collect and process student information only as necessary for our services and in compliance with applicable laws such as FERPA and COPPA.</p>
            </section>
            
            {/* Section 9 */}
            <section id="cookies">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><CookieIcon /> 9. Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze usage patterns and improve our services</li>
                    <li>Provide security features</li>
                    <li>Deliver relevant content and advertisements</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
            </section>

            {/* Section 10 */}
            <section id="third-party">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><LinkIcon /> 10. Third-Party Links</h2>
                <p>Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.</p>
            </section>
            
            {/* Section 11 */}
            <section id="changes">
                <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><RefreshIcon /> 11. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our service. Your continued use of our services after such changes constitutes acceptance of the updated policy.</p>
            </section>

            {/* Section 12 */}
            <section id="contact-us">
              <h2 className="flex items-center not-prose text-2xl font-bold text-text-primary dark:text-gray-100"><MailIcon /> 12. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="mt-4 not-prose text-base space-y-2 text-text-secondary dark:text-gray-300">
                <p className="flex items-center"><MailIcon /> <strong>Privacy Officer:</strong>&nbsp;<a href="mailto:privacy@acadeemia.com" className="text-primary hover:underline">privacy@acadeemia.com</a></p>
                <p className="flex items-start"><MapPinIcon /> Acadeemia <br />90 JGO James Gichuru Road <br />Nairobi City, 00100 <br />Kenya</p>
                <p className="flex items-center"><PhoneIcon /> <a href="tel:+254111313818" className="hover:underline">+254 111 313 818</a></p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default PrivacyPolicyPage;
