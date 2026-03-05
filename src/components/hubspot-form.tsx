'use client';
import React, { useEffect } from 'react';

interface HubspotFormProps {
  portalId: string;
  formId: string;
}

export const HubspotForm: React.FC<HubspotFormProps> = ({ portalId, formId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: portalId,
          formId: formId,
          target: `#hbspt-form-container-${portalId}-${formId}`,
        });
      }
    };

    return () => {
      // Cleanup script and form
      const formContainer = document.querySelector(`#hbspt-form-container-${portalId}-${formId}`);
      if (formContainer) {
        formContainer.innerHTML = '';
      }
      // It might be beneficial to also remove the script tag
      const existingScript = document.querySelector(`script[src='//js.hsforms.net/forms/embed/v2.js']`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [portalId, formId]);

  return <div id={`hbspt-form-container-${portalId}-${formId}`} className="w-full"></div>;
};

declare global {
  interface Window {
    hbspt: any;
  }
}
