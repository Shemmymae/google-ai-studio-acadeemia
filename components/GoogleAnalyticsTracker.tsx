import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getActiveGoogleAnalyticsConfig } from '../db';

// Declare gtag on the window object
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GoogleAnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeAnalytics = async () => {
      // Prevent re-initialization
      if (initialized || window.gtag) return;

      const config = await getActiveGoogleAnalyticsConfig();
      const measurementId = config?.measurement_id;
      
      if (measurementId) {
        // Create script tag for gtag.js
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        
        script.onload = () => {
          // Initialize dataLayer and configure gtag
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]){ (window.dataLayer as any[]).push(args); }
          // Re-declare gtag on window for global access after load
          window.gtag = gtag as (command: string, ...args: any[]) => void;

          gtag('js', new Date());
          gtag('config', measurementId, {
              page_path: location.pathname + location.search,
          });
          setInitialized(true);
        };

        document.head.appendChild(script);
      }
    };
    
    initializeAnalytics();

  }, [initialized, location]);

  // This effect runs on every route change AFTER initialization
  useEffect(() => {
    if (initialized && window.gtag) {
        const config = async () => {
            const gaConfig = await getActiveGoogleAnalyticsConfig();
            const measurementId = gaConfig?.measurement_id;
            if (measurementId) {
                window.gtag('config', measurementId, {
                    page_path: location.pathname + location.search,
                });
            }
        };
        config();
    }
  }, [location.pathname, location.search, initialized]);

  return null; // This component does not render anything
};

export default GoogleAnalyticsTracker;
