import React, { useState, useEffect, useRef } from 'react';
import type { ContactFormData, ContactFormErrors } from '../types';

const serviceOptions = [
  "Structured Cabling",
  "Networking & Wi-Fi",
  "Security Cameras",
  "Managed IT Support",
  "Point-of-Sale Systems",
  "Installations & Configurations",
  "Cybersecurity",
  "Operational Business Consulting",
  "Not sure – help me decide"
];

const timelineOptions = ["ASAP", "2–4 weeks", "1–3 months", "Just planning"];
const discoveryOptions = ["Referral", "Google Search", "Social Media", "Advertisement", "Other"];

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  businessName: '',
  email: '',
  phone: '',
  zip: '',
  projectType: 'Business',
  contactMethod: 'Email',
  services: [],
  location: '',
  numLocations: '1',
  timeline: 'ASAP',
  helpWith: '',
  howDidYouHear: '',
  agreeToTerms: false,
  sendUpdates: false,
};

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof Partial<ContactFormData>]?: boolean }>({});
  const [areFieldsValid, setAreFieldsValid] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  
  // Captcha State
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Initialize reCAPTCHA
  useEffect(() => {
    const renderCaptcha = () => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        captchaContainerRef.current &&
        widgetIdRef.current === null
      ) {
        try {
          widgetIdRef.current = window.grecaptcha.render(captchaContainerRef.current, {
            'sitekey': '6LdFGxYsAAAAAFMZbGYZQv9LWg4qLIeePIFV3Tn3',
            'callback': (token: string) => {
              setCaptchaToken(token);
              setCaptchaError(false);
            },
            'expired-callback': () => {
              setCaptchaToken(null);
            }
          });
        } catch (e) {
          console.error("Captcha render error:", e);
        }
      }
    };

    // Check if grecaptcha is already loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha();
    } else {
      // Poll for script load if not yet available
      const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderCaptcha();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const newErrors: ContactFormErrors = {};

      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
      }
      
      if (!formData.location.trim()) newErrors.location = 'City/State is required.';

      if (!formData.zip.trim()) {
        newErrors.zip = 'ZIP is required.';
      } else if (!/^\d{5}$/.test(formData.zip)) {
        newErrors.zip = 'Invalid ZIP.';
      }

      if (formData.services.length === 0) newErrors.services = 'Please select at least one service area.';
      if (!formData.helpWith.trim()) newErrors.helpWith = 'Please describe what you need help with.';
      
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to be contacted.';
      
      setErrors(newErrors);
      setAreFieldsValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
        if (!touched.services) {
            setTouched(prev => ({ ...prev, services: true }));
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [touched.services]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleContactMethodChange = (method: 'Email' | 'Phone' | 'Text') => {
    setFormData(prev => ({ ...prev, contactMethod: method }));
  };

  const handleProjectTypeChange = (type: 'Business' | 'Residential') => {
    setFormData(prev => ({ ...prev, projectType: type }));
  };
  
  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services: newServices };
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>) => {
    const { name } = e.target as { name: keyof ContactFormData };
    if (name) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      businessName: true,
      email: true,
      phone: true,
      zip: true,
      services: true,
      helpWith: true,
      location: true,
      agreeToTerms: true,
    });

    if (!areFieldsValid) {
      return;
    }

    // Captcha Verification
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    setSubmissionState('submitting');

    const payload = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        projectType: formData.projectType,
      },
      contact: {
        phone: formData.phone,
        email: formData.email,
        preferredMethod: formData.contactMethod,
      },
      company: {
        businessName: formData.businessName || null,
      },
      location: {
        cityState: formData.location,
        zip: formData.zip,
        numLocations: formData.numLocations,
      },
      services: {
        requested: formData.services,
      },
      project: {
        details: formData.helpWith,
        timeline: formData.timeline,
        heardFrom: formData.howDidYouHear || null,
      },
      meta: {
        sendUpdates: formData.sendUpdates,
        agreeToTerms: formData.agreeToTerms,
      },
    };

    console.log("Form Submitted:", payload);

    fetch('https://formspree.io/f/mnnrrdre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.ok) {
          setSubmissionState('success');
        } else {
          console.error('Form submission error', await response.text());
          setSubmissionState('error');
        }
      })
      .catch((error) => {
        console.error('Network error', error);
        setSubmissionState('error');
      });
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-300 text-slate-900 p-3 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 placeholder-slate-400";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2";

  if (submissionState === 'success') {
    return (
      <section id="contact" className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto bg-slate-50 p-12 border border-blue-200 shadow-xl rounded-sm">
             <div className="w-16 h-16 mx-auto bg-blue-100 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Request Received</h2>
            <p className="mt-4 text-slate-600 text-lg">We've received your project details. A solutions specialist will review your needs and contact you within one business day.</p>
            <div className="mt-8 pt-6 border-t border-slate-200">
               <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">Urgent Inquiry?</p>
               <a href="tel:+17205154843" className="text-blue-600 font-bold text-lg mt-1 hover:underline">(720) 515-4843</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Start Your Project</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Let's Build a Solution</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            <span className="block">
              Ready to improve your infrastructure or technology stack?
            </span>
            <span className="block">
              Troubleshoot an error? Perform an upgrade?
            </span>
            <span className="block">
              We're here to make it happen.
            </span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl border border-slate-100 relative z-10">
          
          {submissionState === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">Something went wrong. Please try again momentarily.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            
            {/* Row 1: First Name & Last Name */}
            <div>
              <label htmlFor="firstName" className={labelClasses}>First Name <span className="text-blue-600">*</span></label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} required className={inputClasses} placeholder="First name" />
              {errors.firstName && touched.firstName && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className={labelClasses}>Last Name <span className="text-blue-600">*</span></label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} required className={inputClasses} placeholder="Last name" />
              {errors.lastName && touched.lastName && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.lastName}</p>}
            </div>

            {/* Row 2: Phone & Email */}
            <div>
              <label htmlFor="phone" className={labelClasses}>Phone Number <span className="text-blue-600">*</span></label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} required className={inputClasses} placeholder="(555) 123-4567" />
              {errors.phone && touched.phone && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>Email Address <span className="text-blue-600">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} required className={inputClasses} placeholder="name@email.com" />
              {errors.email && touched.email && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.email}</p>}
            </div>

            {/* Row 3: Business Name (Full Width) */}
            <div className="md:col-span-2">
              <label htmlFor="businessName" className={labelClasses}>Business Name</label>
              <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleInputChange} onBlur={handleBlur} className={inputClasses} placeholder="Company Name, Inc." />
            </div>

            {/* Row 4: Service Location (Full Width Container) */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Service Location <span className="text-blue-600">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* City, State */}
                <div className="md:col-span-2">
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} onBlur={handleBlur} className={inputClasses} placeholder="City, State" />
                   {errors.location && touched.location && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.location}</p>}
                </div>
                {/* ZIP */}
                <div className="md:col-span-1">
                  <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} onBlur={handleBlur} className={inputClasses} placeholder="ZIP Code" maxLength={5} />
                  {errors.zip && touched.zip && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.zip}</p>}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 italic">Your primary service location helps us get started. Additional sites will be assessed after consultation.</p>
            </div>

            {/* Row 5: Contact Method & Project Type */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preferred Contact Method */}
              <div>
                <label className={labelClasses}>Preferred Contact Method</label>
                <div className="inline-flex bg-slate-100 p-1 border border-slate-200 rounded-sm w-full">
                  {(['Email', 'Phone', 'Text'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handleContactMethodChange(method)}
                      className={`flex-1 px-2 py-2 text-sm font-semibold rounded-sm transition-all duration-200 focus:outline-none ${
                        formData.contactMethod === method
                          ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className={labelClasses}>Project Type</label>
                <div className="inline-flex bg-slate-100 p-1 border border-slate-200 rounded-sm w-full">
                  {(['Business', 'Residential'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleProjectTypeChange(type)}
                      className={`flex-1 px-2 py-2 text-sm font-semibold rounded-sm transition-all duration-200 focus:outline-none ${
                        formData.projectType === type
                          ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 6: Services & Locations Row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services Dropdown (Wider) */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Service Areas Needed <span className="text-blue-600">*</span></label>
                <div className="relative" ref={servicesDropdownRef}>
                  <button
                    type="button"
                    name="services"
                    onClick={() => setIsServicesDropdownOpen(prev => !prev)}
                    onBlur={handleBlur}
                    className={`${inputClasses} text-left flex justify-between items-center ${isServicesDropdownOpen ? 'border-blue-500 ring-1 ring-blue-500 bg-white' : ''}`}
                  >
                    <span className={`truncate ${formData.services.length === 0 ? 'text-slate-400' : 'text-slate-900'}`}>
                      {formData.services.length === 0 && 'Select services...'}
                      {formData.services.length === 1 && formData.services[0]}
                      {formData.services.length > 1 && `${formData.services.length} services selected`}
                    </span>
                    <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${isServicesDropdownOpen ? 'transform rotate-180 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {isServicesDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 shadow-2xl max-h-60 overflow-y-auto">
                      {serviceOptions.map(service => (
                        <label key={service} className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0">
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="accent-blue-600 w-4 h-4"
                          />
                          <span className={`text-sm ${formData.services.includes(service) ? 'text-blue-700 font-semibold' : 'text-slate-700'}`}>{service}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errors.services && touched.services && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.services}</p>}
              </div>

              {/* Number of Locations (Narrower) */}
              <div className="md:col-span-1">
                <label htmlFor="numLocations" className={labelClasses}>Number of Locations</label>
                <div className="relative">
                  <select id="numLocations" name="numLocations" value={formData.numLocations} onChange={handleInputChange} onBlur={handleBlur} className={`${inputClasses} appearance-none cursor-pointer`}>
                    {[...Array(9).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                    <option value="10+">10+</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

             {/* Description / Help With */}
            <div className="md:col-span-2">
              <label htmlFor="helpWith" className={labelClasses}>Project Details <span className="text-blue-600">*</span></label>
              <textarea id="helpWith" name="helpWith" rows={5} value={formData.helpWith} onChange={handleInputChange} onBlur={handleBlur} required className={inputClasses} placeholder="How can we help? Tell us a little about your project or issue."></textarea>
              {errors.helpWith && touched.helpWith && <p className="text-red-600 text-xs mt-1 flex items-center"><span className="mr-1">⚠</span> {errors.helpWith}</p>}
            </div>

            {/* Timeline - Half Width */}
            <div className="md:col-span-1">
              <label htmlFor="timeline" className={labelClasses}>Project Timeline</label>
              <div className="relative">
                <select id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} onBlur={handleBlur} className={`${inputClasses} appearance-none cursor-pointer`}>
                  {timelineOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* How Did You Hear - Half Width */}
             <div className="md:col-span-1">
              <label htmlFor="howDidYouHear" className={labelClasses}>How did you hear about us?</label>
               <div className="relative">
                  <select id="howDidYouHear" name="howDidYouHear" value={formData.howDidYouHear} onChange={handleInputChange} onBlur={handleBlur} className={`${inputClasses} appearance-none cursor-pointer`}>
                      <option value="">Select an option</option>
                      {discoveryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
               </div>
            </div>

            {/* Terms Checkbox */}
            <div className="md:col-span-2 space-y-4">
               <div>
                 <label className="flex items-start space-x-3 text-sm text-slate-600 cursor-pointer group">
                    <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} onBlur={handleBlur} required className="mt-1 accent-blue-600 w-4 h-4 border-slate-300 focus:ring-blue-500" />
                    <span className="group-hover:text-slate-900 transition-colors">I agree to be contacted by InfraQo and have read the privacy notice.<span className="text-blue-600">*</span></span>
                  </label>
                  {errors.agreeToTerms && touched.agreeToTerms && <p className="text-red-600 text-xs ml-7 mt-1">{errors.agreeToTerms}</p>}
               </div>
               <label className="flex items-start space-x-3 text-sm text-slate-600 cursor-pointer group">
                  <input type="checkbox" name="sendUpdates" checked={formData.sendUpdates} onChange={handleInputChange} className="mt-1 accent-blue-600 w-4 h-4 border-slate-300 focus:ring-blue-500" />
                  <span className="group-hover:text-slate-900 transition-colors">Send me occasional updates and technical guides.</span>
                </label>
            </div>
          </div>
          
          {/* CAPTCHA */}
            <div className="w-full mt-10 mb-6 pt-6 border-t border-slate-100">
              <label className={labelClasses}>
                Security Verification <span className="text-blue-600">*</span>
              </label>

              <div ref={captchaContainerRef} className="mt-2"></div>

              {captchaError && !captchaToken && (
                <p className="text-red-600 text-xs mt-2 flex items-center">
                  <span className="mr-1">⚠</span> Please complete the captcha verification.
                </p>
              )}
            </div>

          <div className="mt-10 text-center">
            <button 
              type="submit" 
              disabled={!areFieldsValid || submissionState === 'submitting'} 
              className="w-full md:w-auto bg-slate-900 text-white font-bold uppercase tracking-widest py-4 px-12 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
            >
              {submissionState === 'submitting' ? 'Sending...' : 'Send Request'}
            </button>
            <p className="text-xs text-slate-400 mt-4 space-y-1">
              <span className="flex justify-center items-center gap-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Secure. No spam. Direct response.
              </span>

              <span className="block text-center">
                Your time is valuable. Expect to hear from us within one business day.
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
