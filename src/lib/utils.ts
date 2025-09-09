import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Google Ads Conversion Tracking
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

export const trackConversion = (action: string, value?: number, additionalParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const params = {
      transaction_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      value: value || 0,
      currency: 'BRL',
      ...additionalParams
    };
    
    window.gtag('event', 'conversion', {
      send_to: `AW-16801136452/${action}`,
      ...params
    });
    
    // Also send as custom event for enhanced tracking
    window.gtag('event', action, params);
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters || {});
  }
};
