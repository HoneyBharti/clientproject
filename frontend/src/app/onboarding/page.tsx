"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/lib/api-base";
import {
  Building2,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Globe,
  Plus,
  Trash2,
  Info,
  Briefcase,
  CreditCard,
  FileText,
  ClipboardList,
  Loader2,
} from "lucide-react";

function OnboardingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  const planName = searchParams.get("planName") || "";
  const planState = searchParams.get("state") || "";
  const planEntityType = searchParams.get("entityType") || "";
  const planCountry = searchParams.get("country") || "USA";

  const resolvePricingCountry = (value?: string) => {
    if (!value) return "USA";
    const normalized = String(value).trim();
    if (!normalized) return "USA";
    const map: Record<string, string> = {
      US: "USA",
      USA: "USA",
      "United States": "USA",
      UK: "UK",
      "U.K.": "UK",
      "United Kingdom": "UK",
      UAE: "UAE",
      Dubai: "UAE",
      "United Arab Emirates": "UAE",
      India: "India",
      Singapore: "Singapore",
      Australia: "Australia",
      Netherlands: "Netherlands",
      SaudiArabia: "Saudi Arabia",
      "Saudi Arabia": "Saudi Arabia",
    };
    return map[normalized] || normalized || "USA";
  };

  const resolvePricingPath = (value?: string) => {
    const country = resolvePricingCountry(value);
    const pathMap: Record<string, string> = {
      USA: "/usa/pricing",
      UK: "/uk/pricing",
      UAE: "/dubai/pricing",
      India: "/in/pricing",
      Singapore: "/singapore/pricing",
      Australia: "/australia/pricing",
      Netherlands: "/netherlands/pricing",
      "Saudi Arabia": "/saudi-arabia/pricing",
    };
    return pathMap[country] || "/usa/pricing";
  };

  const [currentStep, setCurrentStep] = useState(0);
  const resolvedDestination =
    planCountry === "USA"
      ? "USA"
      : planCountry === "India"
      ? "India"
      : planCountry === "UAE"
      ? "UAE"
      : "ExistingCompliance";
  const [destination, setDestination] = useState(resolvedDestination);
  const [entityType, setEntityType] = useState(planEntityType || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");
  const [documentErrors, setDocumentErrors] = useState({});
  const [planLookupDone, setPlanLookupDone] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const [formData, setFormData] = useState({
    stakeholders: [
      {
        id: Date.now(),
        role: "Primary",
        name: "",
        email: "",
        phone: "",
        dob: "",
        nationality: "",
        passportNo: "",
        ownership: "",
        address: "",
        pan: "",
        aadhaar: "",
        hasDin: "No",
        dinNumber: "",
        isResponsibleParty: true,
        mothersName: "",
        documents: {
          passport: null,
          proofOfAddress: null,
          pan: null,
          aadhaar: null,
          photo: null,
        },
      },
    ],
    addOns: {
      bankAccount: false,
      boiReporting: true,
      expedited: false,
      taxConsultation: false,
      annualCompliance: false,
    },
    bookkeeping: {
      software: "",
      monthlyTransactions: "",
      avgTransactionValue: "",
      bankAccounts: "",
      fiscalYearEnd: "",
      hasPriorTaxReturns: "No",
      documents: {
        bankStatements: null,
        taxId: null,
        priorTaxReturn: null,
      },
    },
    existingCompany: {
      country: "",
      name: "",
      entityType: "",
      taxId: "",
      incorporationDate: "",
      industry: "",
    },
    complianceServices: {
      bookkeeping: true,
      corporateTax: false,
      salesTax: false,
      payroll: false,
      annualFiling: false,
    },
    state: "",
    freeZone: "",
    licenseType: "",
    nameChoice1: "",
    nameChoice2: "",
    nameChoice3: "",
    website: "",
    industry: "",
    purpose: "",
    shares: "10000000",
    parValue: "0.00001",
    authorizedCapital: "100000",
    paidUpCapital: "100000",
    visaCount: "0",
    office: "Flexi",
    processingSpeed: "Standard",
    hasSSN: "Yes",
    needAddress: "No",
    sourceOfFunds: "",
    targetMarkets: "",
    estimatedRevenue: "",
    indiaRegisteredOffice: "",
    businessPlan: "",
    referralCode: "",
    pocDifferent: false,
    pocName: "",
    pocEmail: "",
    pocPhone: "",
    eSignConsent: false,
  });

  useEffect(() => {
    if (loading) return;
    if (submissionComplete) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "admin") {
      router.replace("/admin");
      return;
    }

    const hasPlanParams = Boolean(planName && planState && planEntityType);
    const isPaid = Boolean(user.servicePlan || user.bypassPlan);

    if (hasPlanParams && isPaid) {
      return;
    }

    if (planLookupDone) {
      return;
    }

    const resolvePlanFromPayments = async () => {
      setPlanLookupDone(true);
      try {
        const response = await fetch(`${API_BASE_URL}/payment/my-payments`, { credentials: "include" });
        const data = await response.json().catch(() => null);
        const payments = Array.isArray(data?.payments) ? data.payments : [];
        const succeeded = payments.filter((payment) => payment?.status === "succeeded");
        const latest =
          succeeded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;

        if (latest) {
          const planValue = latest.plan || latest.metadata?.serviceName || "";
          const stateValue = latest.metadata?.state || "";
          const entityValue = latest.metadata?.entityType || "";
          const countryValue = latest.metadata?.country || "USA";
          const amountValue = latest.amount;

          if (planValue && stateValue && entityValue) {
            const params = new URLSearchParams({
              planName: planValue,
              state: stateValue,
              entityType: entityValue,
              country: countryValue,
            });
            if (amountValue) {
              params.set("amount", String(amountValue));
            }
            router.replace(`/onboarding?${params.toString()}`);
            return;
          }
        }

        router.replace(resolvePricingPath(user?.region));
      } catch (error) {
        router.replace(resolvePricingPath(user?.region));
      }
    };

    if (!hasPlanParams || !isPaid) {
      resolvePlanFromPayments();
    }
  }, [loading, user, planName, planState, planEntityType, planLookupDone, submissionComplete, router]);

  const clearErrors = () => {
    if (stepError) setStepError("");
    if (submitError) setSubmitError("");
    setDocumentErrors({});
  };

  const handleInputChange = (e) => {
    clearErrors();
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOnChange = (e) => {
    clearErrors();
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      addOns: { ...prev.addOns, [name]: checked },
    }));
  };

  const handleBookkeepingChange = (e) => {
    clearErrors();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bookkeeping: { ...prev.bookkeeping, [name]: value },
    }));
  };

  const handleExistingCompanyChange = (e) => {
    clearErrors();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      existingCompany: { ...prev.existingCompany, [name]: value },
    }));
  };

  const handleComplianceServicesChange = (e) => {
    clearErrors();
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      complianceServices: { ...prev.complianceServices, [name]: checked },
    }));
  };

  const handleStakeholderChange = (index, field, value) => {
    clearErrors();
    const updatedStakeholders = [...formData.stakeholders];
    updatedStakeholders[index][field] = value;
    setFormData((prev) => ({ ...prev, stakeholders: updatedStakeholders }));
  };

  const addStakeholder = () => {
    clearErrors();
    setFormData((prev) => ({
      ...prev,
      stakeholders: [
        ...prev.stakeholders,
        {
          id: Date.now(),
          role: "Additional",
          name: "",
          email: "",
          phone: "",
          dob: "",
          nationality: "",
          passportNo: "",
          ownership: "",
          address: "",
          hasDin: "No",
          dinNumber: "",
          isResponsibleParty: false,
          mothersName: "",
          documents: {
            passport: null,
            proofOfAddress: null,
            pan: null,
            aadhaar: null,
            photo: null,
          },
        },
      ],
    }));
  };

  const handleDocumentUpload = (stakeholderIndex, documentType, file) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setDocumentErrors(prev => ({
        ...prev,
        [`${stakeholderIndex}_${documentType}`]: 'Please upload only JPG, PNG, or PDF files'
      }));
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setDocumentErrors(prev => ({
        ...prev,
        [`${stakeholderIndex}_${documentType}`]: 'File size must be less than 5MB'
      }));
      return;
    }
    
    // Clear any previous errors for this document
    setDocumentErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${stakeholderIndex}_${documentType}`];
      return newErrors;
    });
    
    // Update stakeholder documents
    const updatedStakeholders = [...formData.stakeholders];
    updatedStakeholders[stakeholderIndex].documents[documentType] = file;
    setFormData(prev => ({ ...prev, stakeholders: updatedStakeholders }));
  };
  
  const handleBookkeepingDocumentUpload = (documentType, file) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'text/csv', 'application/vnd.ms-excel'];
    if (!allowedTypes.includes(file.type)) {
      setDocumentErrors(prev => ({
        ...prev,
        [`bookkeeping_${documentType}`]: 'Please upload only JPG, PNG, PDF, or CSV files'
      }));
      return;
    }
    
    // Validate file size (10MB max for bank statements)
    if (file.size > 10 * 1024 * 1024) {
      setDocumentErrors(prev => ({
        ...prev,
        [`bookkeeping_${documentType}`]: 'File size must be less than 10MB'
      }));
      return;
    }
    
    // Clear any previous errors for this document
    setDocumentErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`bookkeeping_${documentType}`];
      return newErrors;
    });
    
    // Update bookkeeping documents
    setFormData(prev => ({
      ...prev,
      bookkeeping: {
        ...prev.bookkeeping,
        documents: {
          ...prev.bookkeeping.documents,
          [documentType]: file
        }
      }
    }));
  };

  const removeStakeholder = (id) => {
    clearErrors();
    setFormData((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.filter((s) => s.id !== id),
    }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const getDynamicSteps = () => {
    if (destination === "ExistingCompliance") {
      return ["Company Info", "Required Services", "Accounting Setup", "Stakeholders", "Review & Submit"];
    }
    const steps = ["Company Details", "Stakeholders & KYC", "Compliance & Add-ons"];
    if (formData.addOns.annualCompliance) steps.push("Bookkeeping Setup");
    steps.push("Review & Submit");
    return steps;
  };

  const isBlank = (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value === "string") return value.trim().length === 0;
    return false;
  };

  const validateStakeholders = (missing) => {
    formData.stakeholders.forEach((stakeholder, index) => {
      const labelPrefix = `Stakeholder ${index + 1}`;
      if (isBlank(stakeholder.name)) missing.push(`${labelPrefix} name`);
      if (isBlank(stakeholder.email)) missing.push(`${labelPrefix} email`);
      if (isBlank(stakeholder.phone)) missing.push(`${labelPrefix} phone`);
      if (isBlank(stakeholder.dob)) missing.push(`${labelPrefix} date of birth`);
      if (isBlank(stakeholder.nationality)) missing.push(`${labelPrefix} nationality`);
      if (isBlank(stakeholder.address)) missing.push(`${labelPrefix} address`);
      if (isBlank(stakeholder.ownership)) missing.push(`${labelPrefix} ownership`);

      const isIndia = destination === "India" || formData.existingCompany.country === "India";
      if (isIndia) {
        if (isBlank(stakeholder.pan)) missing.push(`${labelPrefix} PAN`);
        if (isBlank(stakeholder.aadhaar)) missing.push(`${labelPrefix} Aadhaar`);
        if (stakeholder.hasDin === "Yes" && isBlank(stakeholder.dinNumber)) {
          missing.push(`${labelPrefix} DIN number`);
        }
        // Document validation for India
        if (!stakeholder.documents.pan) missing.push(`${labelPrefix} PAN document`);
        if (!stakeholder.documents.aadhaar) missing.push(`${labelPrefix} Aadhaar document`);
        if (!stakeholder.documents.proofOfAddress) missing.push(`${labelPrefix} Proof of Address document`);
      } else {
        if (isBlank(stakeholder.passportNo)) missing.push(`${labelPrefix} passport number`);
        // Document validation for non-India
        if (!stakeholder.documents.passport) missing.push(`${labelPrefix} passport document`);
        if (!stakeholder.documents.proofOfAddress) missing.push(`${labelPrefix} Proof of Address document`);
      }

      if (destination === "UAE") {
        if (isBlank(stakeholder.mothersName)) {
          missing.push(`${labelPrefix} mother's name`);
        }
        // UAE specific document validation
        if (!stakeholder.documents.photo) missing.push(`${labelPrefix} passport photo (white background)`);
      }
    });

    if (formData.pocDifferent) {
      if (isBlank(formData.pocName)) missing.push("POC name");
      if (isBlank(formData.pocEmail)) missing.push("POC email");
      if (isBlank(formData.pocPhone)) missing.push("POC phone");
    }
  };

  const validateStep = () => {
    if (currentStep === 0) {
      if (!destination) return "Select a destination to continue.";
      return "";
    }

    const stepName = getDynamicSteps()[currentStep - 1];
    const missing = [];

    if (stepName === "Company Details") {
      if (destination === "USA") {
        if (isBlank(formData.state)) missing.push("State of Incorporation");
        if (isBlank(formData.estimatedRevenue)) missing.push("Estimated Revenue");
      } else if (destination === "India") {
        if (isBlank(formData.state)) missing.push("State of Incorporation");
        if (isBlank(formData.indiaRegisteredOffice)) missing.push("Registered Office Preference");
      } else if (destination === "UAE") {
        if (isBlank(formData.freeZone)) missing.push("Free Zone");
        if (isBlank(formData.licenseType)) missing.push("License Type");
        if (isBlank(formData.businessPlan)) missing.push("Business Plan");
      }

      if (isBlank(formData.nameChoice1)) missing.push("Company name choice 1");
      if (isBlank(formData.nameChoice2)) missing.push("Company name choice 2");
      if (isBlank(formData.nameChoice3)) missing.push("Company name choice 3");
      if (isBlank(formData.purpose)) missing.push("Business purpose");
      if (isBlank(formData.sourceOfFunds)) missing.push("Source of funds");
      if (isBlank(formData.targetMarkets)) missing.push("Target markets");

      if (entityType === "C-Corp") {
        if (isBlank(formData.shares)) missing.push("Authorized shares");
        if (isBlank(formData.parValue)) missing.push("Par value");
      }
      if (entityType === "PvtLtd") {
        if (isBlank(formData.authorizedCapital)) missing.push("Authorized capital");
        if (isBlank(formData.paidUpCapital)) missing.push("Paid-up capital");
      }
    }

    if (stepName === "Company Info") {
      if (isBlank(formData.existingCompany.country)) missing.push("Company jurisdiction");
      if (isBlank(formData.existingCompany.entityType)) missing.push("Entity structure");
      if (isBlank(formData.existingCompany.name)) missing.push("Legal company name");
      if (isBlank(formData.existingCompany.taxId)) missing.push("Tax ID");
    }

    if (stepName === "Required Services") {
      const anyService = Object.values(formData.complianceServices || {}).some(Boolean);
      if (!anyService) missing.push("At least one service selection");
    }

    if (stepName === "Accounting Setup" || stepName === "Bookkeeping Setup") {
      if (isBlank(formData.bookkeeping.software)) missing.push("Accounting software");
      if (isBlank(formData.bookkeeping.monthlyTransactions)) missing.push("Monthly transactions");
      if (isBlank(formData.bookkeeping.avgTransactionValue)) missing.push("Average transaction value");
      if (isBlank(formData.bookkeeping.bankAccounts)) missing.push("Bank accounts");
      if (isBlank(formData.bookkeeping.fiscalYearEnd)) missing.push("Fiscal year end");
      
      // Document validation for bookkeeping
      if (!formData.bookkeeping.documents.bankStatements) missing.push("Bank statements document");
      if (!formData.bookkeeping.documents.taxId) missing.push("Tax ID document");
      if (formData.bookkeeping.hasPriorTaxReturns === "Yes" && !formData.bookkeeping.documents.priorTaxReturn) {
        missing.push("Prior tax return document");
      }
    }

    if (stepName === "Stakeholders & KYC" || stepName === "Stakeholders") {
      validateStakeholders(missing);
    }

    if (stepName === "Review & Submit") {
      if (!formData.eSignConsent) missing.push("E-sign consent");
    }

    if (missing.length) {
      return `Please complete: ${missing.join(", ")}.`;
    }

    return "";
  };

  const goNextStep = () => {
    const error = validateStep();
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    nextStep();
  };

  const renderProgressBar = () => {
    if (currentStep === 0) return null;
    const steps = getDynamicSteps();
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-600 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300 ${
                  currentStep > index
                    ? "bg-indigo-600 text-white"
                    : currentStep === index + 1
                    ? "bg-white border-4 border-indigo-600 text-indigo-700"
                    : "bg-white border-2 border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > index + 1 ? <CheckCircle2 size={20} /> : index + 1}
              </div>
              <span
                className={`text-xs mt-3 text-center leading-tight ${
                  currentStep >= index + 1 ? "text-indigo-900 font-semibold" : "text-gray-400 font-medium"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    const error = validateStep();
    if (error) {
      setStepError(error);
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // First, upload all documents
      const uploadedDocuments = await uploadAllDocuments();
      
      const response = await fetch(`${API_BASE_URL}/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          plan: planName,
          planState,
          planEntityType,
          planCountry,
          destination,
          entityType,
          formData: {
            ...formData,
            uploadedDocuments, // Include document references
          },
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to submit onboarding.");
      }
      setSubmissionComplete(true);
      if (typeof window !== "undefined") {
        const timestamp = new Date().toISOString();
        sessionStorage.setItem("onboarding_submitted_at", timestamp);
        if (data?.submissionId) {
          sessionStorage.setItem("onboarding_submission_id", String(data.submissionId));
        }
      }
      router.push("/dashboard");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadAllDocuments = async () => {
    const uploadedDocs = [];
    
    try {
      // Upload stakeholder documents
      for (let i = 0; i < formData.stakeholders.length; i++) {
        const stakeholder = formData.stakeholders[i];
        const docs = stakeholder.documents;
        
        for (const [docType, file] of Object.entries(docs)) {
          if (file) {
            const uploadedDoc = await uploadSingleDocument(
              file, 
              `${stakeholder.name || `Stakeholder ${i + 1}`} - ${docType}`,
              'KYC',
              stakeholder.name || `Stakeholder ${i + 1}`,
              docType
            );
            if (uploadedDoc) {
              uploadedDocs.push({
                stakeholderIndex: i,
                documentType: docType,
                documentId: uploadedDoc.id,
                fileName: uploadedDoc.name,
                category: 'KYC'
              });
            }
          }
        }
      }
      
      // Upload bookkeeping documents
      const bookkeepingDocs = formData.bookkeeping.documents;
      for (const [docType, file] of Object.entries(bookkeepingDocs)) {
        if (file) {
          const uploadedDoc = await uploadSingleDocument(
            file, 
            `Bookkeeping - ${docType}`,
            'Compliance',
            'Bookkeeping',
            docType
          );
          if (uploadedDoc) {
            uploadedDocs.push({
              documentType: docType,
              documentId: uploadedDoc.id,
              fileName: uploadedDoc.name,
              category: 'Compliance'
            });
          }
        }
      }
      
      return uploadedDocs;
    } catch (error) {
      throw new Error(`Document upload failed: ${error.message}`);
    }
  };
  
  const uploadSingleDocument = async (file, fileName, folder, subfolder, documentType) => {
    try {
      const fileDataBase64 = await readFileAsBase64(file);
      
      const response = await fetch(`${API_BASE_URL}/documents/me/upload-client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fileName: fileName,
          mimeType: file.type,
          fileDataBase64: fileDataBase64,
          folder: folder,
          subfolder: subfolder,
          documentType: documentType,
        }),
      });
      
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to upload document");
      }
      
      return data.document;
    } catch (error) {
      console.error(`Failed to upload ${fileName}:`, error);
      throw error;
    }
  };
  
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const renderSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">What do you need help with?</h2>
        <p className="text-gray-500 mt-2">
          Select your target jurisdiction for new incorporation, or set up compliance for an existing company.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => {
            setDestination("USA");
            setEntityType("LLC");
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
            destination === "USA"
              ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-600/10"
              : "border-gray-200 hover:border-indigo-300 hover:shadow-sm bg-white"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${destination === "USA" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <Globe className="w-6 h-6" />
            </div>
            {destination === "USA" && (
              <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <CheckCircle2 size={14} className="mr-1" /> Selected
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">United States</h3>
          <p className="text-sm text-gray-600 mb-6">
            Incorporate in Delaware, Wyoming, or other US states. Ideal for global startups and SaaS.
          </p>

          {destination === "USA" && (
            <div className="mt-4 space-y-3 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm" onClick={(e) => e.stopPropagation()}>
              <label className="block text-sm font-semibold text-gray-800">Select US Entity Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    entityType === "LLC" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <input type="radio" name="entityType" value="LLC" checked={entityType === "LLC"} onChange={(e) => setEntityType(e.target.value)} className="sr-only" />
                  <span className="font-bold">LLC</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Flexible, Pass-through Tax</span>
                </label>
                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    entityType === "C-Corp" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <input type="radio" name="entityType" value="C-Corp" checked={entityType === "C-Corp"} onChange={(e) => setEntityType(e.target.value)} className="sr-only" />
                  <span className="font-bold">C-Corp</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Venture/Investor Ready</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => {
            setDestination("UAE");
            setEntityType("FreeZone");
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
            destination === "UAE"
              ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-600/10"
              : "border-gray-200 hover:border-indigo-300 hover:shadow-sm bg-white"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${destination === "UAE" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <Building2 className="w-6 h-6" />
            </div>
            {destination === "UAE" && (
              <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <CheckCircle2 size={14} className="mr-1" /> Selected
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">United Arab Emirates</h3>
          <p className="text-sm text-gray-600 mb-4">Set up a Dubai Free Zone company. Access 0% corporate tax benefits and residency visas.</p>
        </div>

        <div
          onClick={() => {
            setDestination("India");
            setEntityType("PvtLtd");
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
            destination === "India"
              ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-600/10"
              : "border-gray-200 hover:border-indigo-300 hover:shadow-sm bg-white"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${destination === "India" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <MapPin className="w-6 h-6" />
            </div>
            {destination === "India" && (
              <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <CheckCircle2 size={14} className="mr-1" /> Selected
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">India</h3>
          <p className="text-sm text-gray-600 mb-4">Incorporate a Private Limited or LLP. Access one of the world's fastest-growing markets.</p>

          {destination === "India" && (
            <div className="mt-4 space-y-3 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm" onClick={(e) => e.stopPropagation()}>
              <label className="block text-sm font-semibold text-gray-800">Select Entity Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    entityType === "PvtLtd" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <input type="radio" name="entityType" value="PvtLtd" checked={entityType === "PvtLtd"} onChange={(e) => setEntityType(e.target.value)} className="sr-only" />
                  <span className="font-bold">Pvt Ltd</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Standard Corporate</span>
                </label>
                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    entityType === "LLP" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <input type="radio" name="entityType" value="LLP" checked={entityType === "LLP"} onChange={(e) => setEntityType(e.target.value)} className="sr-only" />
                  <span className="font-bold">LLP</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Limited Liability Partnership</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => {
            setDestination("ExistingCompliance");
            setEntityType("Compliance");
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
            destination === "ExistingCompliance"
              ? "border-green-500 bg-green-50/50 shadow-md ring-4 ring-green-500/10"
              : "border-gray-200 hover:border-green-300 hover:shadow-sm bg-white"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${destination === "ExistingCompliance" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <ClipboardList className="w-6 h-6" />
            </div>
            {destination === "ExistingCompliance" && (
              <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <CheckCircle2 size={14} className="mr-1" /> Selected
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Regular Compliance</h3>
          <p className="text-sm text-gray-600 mb-4">
            I already have an incorporated company and need ongoing bookkeeping, tax filing, or annual compliance services.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={goNextStep}
          disabled={!destination}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          Continue <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderCompanyDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Briefcase size={24} /></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Company Particulars</h3>
          <p className="text-sm text-gray-500">Define the core identity and operations of your new {destination} entity.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {destination === "USA" ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State of Incorporation *</label>
              <select name="state" onChange={handleInputChange} value={formData.state || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
                <option value="">Select a State</option>
                <option value="Delaware">Delaware (Recommended for C-Corps)</option>
                <option value="Wyoming">Wyoming (Recommended for LLCs)</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
              </select>
            </div>
          ) : destination === "India" ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State of Incorporation *</label>
              <select name="state" onChange={handleInputChange} value={formData.state || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
                <option value="">Select a State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Free Zone *</label>
              <select name="freeZone" onChange={handleInputChange} value={formData.freeZone || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
                <option value="">Select Free Zone</option>
                <option value="IFZA">IFZA (International Free Zone Authority)</option>
                <option value="DMCC">DMCC (Commodities and Trading)</option>
                <option value="Meydan">Meydan Free Zone</option>
              </select>
            </div>
          )}

          {destination === "UAE" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Primary License Type *</label>
              <select name="licenseType" onChange={handleInputChange} value={formData.licenseType || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
                <option value="">Select License</option>
                <option value="Commercial">Commercial / Trading License</option>
                <option value="Professional">Professional / Services License</option>
              </select>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
              Proposed Company Names *
              <span className="ml-2 text-xs font-normal text-gray-400 cursor-help" title="Provide 3 options in case your top choice is taken.">
                Requires 3 options
              </span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm font-bold">1.</span>
                <input type="text" name="nameChoice1" placeholder="First Choice" onChange={handleInputChange} value={formData.nameChoice1 || ""} className="w-full border border-gray-300 rounded-lg p-3 pl-8 bg-gray-50 focus:bg-white" />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm font-bold">2.</span>
                <input type="text" name="nameChoice2" placeholder="Second Choice" onChange={handleInputChange} value={formData.nameChoice2 || ""} className="w-full border border-gray-300 rounded-lg p-3 pl-8 bg-gray-50 focus:bg-white" />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm font-bold">3.</span>
                <input type="text" name="nameChoice3" placeholder="Third Choice" onChange={handleInputChange} value={formData.nameChoice3 || ""} className="w-full border border-gray-300 rounded-lg p-3 pl-8 bg-gray-50 focus:bg-white" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-2 flex items-center">
              <Info size={14} className="mr-1" /> Includes suffix ({entityType === "LLC" ? "LLC, L.L.C." : entityType === "C-Corp" ? "Inc., Corp." : entityType === "PvtLtd" ? "Private Limited" : entityType === "LLP" ? "LLP" : "FZ-LLC, FZE"})
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Business Activities / Purpose *</label>
          <textarea name="purpose" rows={3} placeholder="Describe the core products and services. Required by registrar for classification." onChange={handleInputChange} value={formData.purpose || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Source of Funds (AML Requirement) *</label>
            <select name="sourceOfFunds" onChange={handleInputChange} value={formData.sourceOfFunds || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
              <option value="">Select Source</option>
              <option value="Personal Savings">Personal Savings / Wealth</option>
              <option value="Business Revenue">Existing Business Revenue</option>
              <option value="VC Funding">Venture Capital / Angel Funding</option>
              <option value="Loan">Bank Loan / Financing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Target Markets (Countries) *</label>
            <input type="text" name="targetMarkets" placeholder="e.g. US, UK, Global" onChange={handleInputChange} value={formData.targetMarkets || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
          </div>
        </div>

        {destination === "USA" && (
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated First Year Revenue (USD) *</label>
            <select name="estimatedRevenue" onChange={handleInputChange} value={formData.estimatedRevenue || ""} className="w-full md:w-1/2 border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors">
              <option value="">Select Range</option>
              <option value="0-50k">$0 - $50,000</option>
              <option value="50k-250k">$50,000 - $250,000</option>
              <option value="250k-1m">$250,000 - $1,000,000</option>
              <option value="1m+">$1,000,000+</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Required for banking partner pre-approval.</p>
          </div>
        )}

        {destination === "UAE" && (
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Business Plan / Founder Profile *</label>
            <textarea name="businessPlan" rows={3} placeholder="Briefly outline your business model. Freezones require this for compliance and security clearance." onChange={handleInputChange} value={formData.businessPlan || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white"></textarea>
          </div>
        )}

        {destination === "India" && (
          <div className="pt-2 p-4 bg-orange-50 border border-orange-100 rounded-xl mt-4">
            <label className="block text-sm font-semibold text-orange-900 mb-3">Registered Office Address Preference *</label>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="radio" name="indiaRegisteredOffice" value="Commercial" onChange={handleInputChange} className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500" />
                <div>
                  <span className="block text-sm font-medium text-gray-900">I have a commercial address</span>
                  <span className="block text-xs text-gray-500">Requires NOC and latest Utility Bill</span>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="radio" name="indiaRegisteredOffice" value="Residential" onChange={handleInputChange} className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500" />
                <div>
                  <span className="block text-sm font-medium text-gray-900">I will use a residential address</span>
                  <span className="block text-xs text-gray-500">Subject to local municipal rules</span>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="radio" name="indiaRegisteredOffice" value="Virtual" onChange={handleInputChange} className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500" />
                <div>
                  <span className="block text-sm font-medium text-gray-900">Provide a Virtual Registered Office</span>
                  <span className="block text-xs text-orange-700 font-bold">Additional annual fee applies</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {entityType === "C-Corp" && (
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 mt-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center">
              <FileText size={18} className="mr-2" /> Stock Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Authorized Shares</label>
                <input type="number" name="shares" defaultValue="10000000" onChange={handleInputChange} className="w-full border border-blue-200 rounded-lg p-3 bg-white" />
                <p className="text-xs text-blue-600 mt-1">Standard for VC-backed startups: 10M shares.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Par Value per Share ($)</label>
                <input type="text" name="parValue" defaultValue="0.00001" onChange={handleInputChange} className="w-full border border-blue-200 rounded-lg p-3 bg-white" />
              </div>
            </div>
          </div>
        )}

        {entityType === "PvtLtd" && (
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 mt-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center">
              <FileText size={18} className="mr-2" /> Capital Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Authorized Capital (INR)</label>
                <input type="number" name="authorizedCapital" defaultValue="100000" onChange={handleInputChange} className="w-full border border-blue-200 rounded-lg p-3 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Paid-up Capital (INR)</label>
                <input type="number" name="paidUpCapital" defaultValue="100000" onChange={handleInputChange} className="w-full border border-blue-200 rounded-lg p-3 bg-white" />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Referral / Partner Code (Optional)</label>
          <input type="text" name="referralCode" placeholder="Enter code if referred by a partner" onChange={handleInputChange} value={formData.referralCode || ""} className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
        </div>
      </div>
    </div>
  );

  const renderExistingCompanyDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg text-green-600"><Building2 size={24} /></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Existing Company Information</h3>
          <p className="text-sm text-gray-500">Provide the details of the entity you want us to manage compliance for.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Company Jurisdiction *</label>
            <select name="country" onChange={handleExistingCompanyChange} value={formData.existingCompany.country || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors">
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="UAE">United Arab Emirates</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Entity Structure *</label>
            <input type="text" name="entityType" placeholder="e.g. LLC, C-Corp, FZ-LLC, Pvt Ltd" onChange={handleExistingCompanyChange} value={formData.existingCompany.entityType || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Legal Company Name *</label>
          <input type="text" name="name" placeholder="Exactly as it appears on incorporation docs" onChange={handleExistingCompanyChange} value={formData.existingCompany.name || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {formData.existingCompany.country === "USA"
                ? "EIN (Employer Identification Number) *"
                : formData.existingCompany.country === "UAE"
                ? "TRN / Trade License Number *"
                : formData.existingCompany.country === "India"
                ? "Company PAN / CIN *"
                : "Primary Tax ID *"}
            </label>
            <input type="text" name="taxId" placeholder="Tax ID Number" onChange={handleExistingCompanyChange} value={formData.existingCompany.taxId || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Incorporation</label>
            <input type="date" name="incorporationDate" onChange={handleExistingCompanyChange} value={formData.existingCompany.incorporationDate || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Industry / Sector</label>
          <input type="text" name="industry" placeholder="e.g. E-commerce, Software Development, Trading" onChange={handleExistingCompanyChange} value={formData.existingCompany.industry || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
        </div>
      </div>
    </div>
  );

  const renderComplianceServices = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg text-green-600"><ClipboardList size={24} /></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Required Services</h3>
          <p className="text-sm text-gray-500">Select the specific compliance and accounting services you need for your existing company.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={`flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.complianceServices.bookkeeping ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}>
          <input type="checkbox" name="bookkeeping" onChange={handleComplianceServicesChange} checked={formData.complianceServices.bookkeeping} className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300" />
          <div>
            <span className="block text-sm font-bold text-gray-900">Monthly Bookkeeping and Recon</span>
            <span className="block text-xs text-gray-500 mt-1">Categorization of transactions, bank reconciliations, and monthly financial reporting.</span>
          </div>
        </label>

        <label className={`flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.complianceServices.corporateTax ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}>
          <input type="checkbox" name="corporateTax" onChange={handleComplianceServicesChange} checked={formData.complianceServices.corporateTax} className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300" />
          <div>
            <span className="block text-sm font-bold text-gray-900">Corporate Tax Returns</span>
            <span className="block text-xs text-gray-500 mt-1">Annual federal/state income tax filings.</span>
          </div>
        </label>

        <label className={`flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.complianceServices.salesTax ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}>
          <input type="checkbox" name="salesTax" onChange={handleComplianceServicesChange} checked={formData.complianceServices.salesTax} className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300" />
          <div>
            <span className="block text-sm font-bold text-gray-900">Sales Tax / VAT / GST Filing</span>
            <span className="block text-xs text-gray-500 mt-1">Periodic filings based on your jurisdiction requirements.</span>
          </div>
        </label>

        <label className={`flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.complianceServices.annualFiling ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}>
          <input type="checkbox" name="annualFiling" onChange={handleComplianceServicesChange} checked={formData.complianceServices.annualFiling} className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300" />
          <div>
            <span className="block text-sm font-bold text-gray-900">State Compliance and Annual Returns</span>
            <span className="block text-xs text-gray-500 mt-1">Routine maintenance such as franchise taxes and state reports.</span>
          </div>
        </label>

        <label className={`flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.complianceServices.payroll ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}>
          <input type="checkbox" name="payroll" onChange={handleComplianceServicesChange} checked={formData.complianceServices.payroll} className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300" />
          <div>
            <span className="block text-sm font-bold text-gray-900">Payroll Processing</span>
            <span className="block text-xs text-gray-500 mt-1">Wages calculation, paystubs, and local payroll tax remittances.</span>
          </div>
        </label>
      </div>
    </div>
  );

  const renderStakeholders = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Users size={24} /></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Stakeholder Information</h3>
          <p className="text-sm text-gray-500">Provide KYC details for all owners, directors, and officers.</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" name="pocDifferent" onChange={handleInputChange} checked={formData.pocDifferent} className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
          <span className="font-semibold text-gray-800 text-sm">The person filling out this form is different from the Primary Stakeholder (e.g. Agency/Assistant)</span>
        </label>
        {formData.pocDifferent && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">POC Name *</label>
              <input type="text" name="pocName" onChange={handleInputChange} value={formData.pocName || ""} className="w-full border border-gray-300 rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">POC Email *</label>
              <input type="email" name="pocEmail" onChange={handleInputChange} value={formData.pocEmail || ""} className="w-full border border-gray-300 rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">POC Phone *</label>
              <input type="tel" name="pocPhone" onChange={handleInputChange} value={formData.pocPhone || ""} className="w-full border border-gray-300 rounded p-2 text-sm" />
            </div>
          </div>
        )}
      </div>

      {formData.stakeholders.map((stakeholder, index) => (
        <div key={stakeholder.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 relative transition-all hover:shadow-md">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-bold text-gray-800 flex items-center">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2">{index + 1}</span>
              {index === 0 ? `Primary ${entityType === "LLC" ? "Member" : entityType === "C-Corp" ? "Founder" : "Shareholder"}` : "Additional Stakeholder"}
            </h4>
            {index > 0 && (
              <button onClick={() => removeStakeholder(stakeholder.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center font-medium transition-colors">
                <Trash2 size={16} className="mr-1" /> Remove
              </button>
            )}
          </div>

          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Full Legal Name *</label>
                <input type="text" placeholder="Exactly as on Passport" value={stakeholder.name} onChange={(e) => handleStakeholderChange(index, "name", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Email Address *</label>
                <input type="email" placeholder="john@example.com" value={stakeholder.email} onChange={(e) => handleStakeholderChange(index, "email", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Phone Number *</label>
                <input type="tel" placeholder="+1 234 567 8900" value={stakeholder.phone} onChange={(e) => handleStakeholderChange(index, "phone", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Date of Birth *</label>
                <input type="date" value={stakeholder.dob} onChange={(e) => handleStakeholderChange(index, "dob", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Nationality *</label>
                <input type="text" placeholder="e.g. British" value={stakeholder.nationality} onChange={(e) => handleStakeholderChange(index, "nationality", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>

              {destination === "India" || formData.existingCompany.country === "India" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">PAN Number *</label>
                    <input type="text" placeholder="ABCDE1234F" value={stakeholder.pan || ""} onChange={(e) => handleStakeholderChange(index, "pan", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Aadhaar Number *</label>
                    <input type="text" placeholder="1234 5678 9012" value={stakeholder.aadhaar || ""} onChange={(e) => handleStakeholderChange(index, "aadhaar", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
                  </div>
                </>
              ) : (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Passport Number *</label>
                  <input type="text" placeholder="Passport No." value={stakeholder.passportNo} onChange={(e) => handleStakeholderChange(index, "passportNo", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Residential Address *</label>
                <input type="text" placeholder="Full Street Address, City, State, Zip, Country" value={stakeholder.address} onChange={(e) => handleStakeholderChange(index, "address", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
              </div>

              {destination === "UAE" && (
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Mother's Full Name *</label>
                  <input type="text" placeholder="For security clearance" value={stakeholder.mothersName || ""} onChange={(e) => handleStakeholderChange(index, "mothersName", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm focus:bg-white" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">% Ownership *</label>
                <div className="relative">
                  <input type="number" placeholder="0 - 100" value={stakeholder.ownership} onChange={(e) => handleStakeholderChange(index, "ownership", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 pr-8 bg-gray-50 text-sm focus:bg-white" />
                  <span className="absolute right-3 top-2.5 text-gray-500 font-bold">%</span>
                </div>
              </div>

              {entityType === "C-Corp" && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Corporate Officer Roles</label>
                  <div className="flex space-x-3 mt-1 text-sm">
                    <label className="flex items-center space-x-1"><input type="checkbox" className="rounded text-indigo-600" /> <span>President</span></label>
                    <label className="flex items-center space-x-1"><input type="checkbox" className="rounded text-indigo-600" /> <span>Secretary</span></label>
                    <label className="flex items-center space-x-1"><input type="checkbox" className="rounded text-indigo-600" /> <span>Treasurer</span></label>
                  </div>
                </div>
              )}

              {(entityType === "PvtLtd" || entityType === "LLP") && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Director / Partner Role</label>
                  <div className="flex space-x-3 mt-1 text-sm">
                    <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                      <span>{entityType === "PvtLtd" ? "Appoint as Director" : "Designated Partner"}</span>
                    </label>
                  </div>
                </div>
              )}

              {destination === "USA" && index === 0 && (
                <div className="md:col-span-3 bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={stakeholder.isResponsibleParty} onChange={(e) => handleStakeholderChange(index, "isResponsibleParty", e.target.checked)} className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-sm font-semibold text-blue-900">Designate as IRS Responsible Party (Required for SS-4 / EIN filing)</span>
                  </label>
                </div>
              )}

              {destination === "India" && (
                <div className="md:col-span-3 bg-orange-50 p-4 rounded-lg border border-orange-100 mt-2">
                  <label className="block text-xs font-semibold text-orange-900 uppercase tracking-wide mb-2">Do you have an existing Director Identification Number (DIN)?</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-sm"><input type="radio" name={`hasDin-${index}`} value="Yes" checked={stakeholder.hasDin === "Yes"} onChange={(e) => handleStakeholderChange(index, "hasDin", e.target.value)} className="text-orange-600" /> <span>Yes</span></label>
                    <label className="flex items-center space-x-2 text-sm"><input type="radio" name={`hasDin-${index}`} value="No" checked={stakeholder.hasDin === "No"} onChange={(e) => handleStakeholderChange(index, "hasDin", e.target.value)} className="text-orange-600" /> <span>No (Apply for new)</span></label>
                  </div>
                  {stakeholder.hasDin === "Yes" && (
                    <div className="mt-3">
                      <input type="text" placeholder="Enter 8-digit DIN" value={stakeholder.dinNumber || ""} onChange={(e) => handleStakeholderChange(index, "dinNumber", e.target.value)} className="w-full md:w-1/2 border border-orange-200 rounded-lg p-2.5 bg-white text-sm" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-xl p-4 text-center">
              <p className="text-xs font-semibold text-gray-600 mb-2">Required Document Uploads (KYC and AML) *</p>
              <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 flex-wrap gap-y-2">
                {destination === "India" || formData.existingCompany.country === "India" ? (
                  <>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id={`pan-${index}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(index, 'pan', e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor={`pan-${index}`}
                        className={`bg-white border text-gray-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${
                          stakeholder.documents.pan ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                        }`}
                      >
                        {stakeholder.documents.pan ? '✓ PAN Uploaded' : 'Upload PAN Copy *'}
                      </label>
                      {documentErrors[`${index}_pan`] && (
                        <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_pan`]}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id={`aadhaar-${index}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(index, 'aadhaar', e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor={`aadhaar-${index}`}
                        className={`bg-white border text-gray-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${
                          stakeholder.documents.aadhaar ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                        }`}
                      >
                        {stakeholder.documents.aadhaar ? '✓ Aadhaar Uploaded' : 'Upload Aadhaar/Passport *'}
                      </label>
                      {documentErrors[`${index}_aadhaar`] && (
                        <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_aadhaar`]}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id={`poa-${index}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(index, 'proofOfAddress', e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor={`poa-${index}`}
                        className={`bg-white border text-indigo-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-indigo-50 transition-colors cursor-pointer ${
                          stakeholder.documents.proofOfAddress ? 'border-green-500 bg-green-50 text-green-700' : 'border-indigo-200'
                        }`}
                      >
                        {stakeholder.documents.proofOfAddress ? '✓ POA Uploaded' : 'Upload POA (Utility Bill) *'}
                      </label>
                      {documentErrors[`${index}_proofOfAddress`] && (
                        <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_proofOfAddress`]}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id={`passport-${index}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(index, 'passport', e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor={`passport-${index}`}
                        className={`bg-white border text-gray-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${
                          stakeholder.documents.passport ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                        }`}
                      >
                        {stakeholder.documents.passport ? '✓ Passport Uploaded' : 'Upload Passport *'}
                      </label>
                      {documentErrors[`${index}_passport`] && (
                        <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_passport`]}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id={`poa-${index}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(index, 'proofOfAddress', e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor={`poa-${index}`}
                        className={`bg-white border text-indigo-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-indigo-50 transition-colors cursor-pointer ${
                          stakeholder.documents.proofOfAddress ? 'border-green-500 bg-green-50 text-green-700' : 'border-indigo-200'
                        }`}
                      >
                        {stakeholder.documents.proofOfAddress ? '✓ POA Uploaded' : 'Upload POA (Utility Bill) *'}
                      </label>
                      {documentErrors[`${index}_proofOfAddress`] && (
                        <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_proofOfAddress`]}</p>
                      )}
                    </div>
                    {destination === "UAE" && (
                      <div className="flex flex-col items-center">
                        <input
                          type="file"
                          id={`photo-${index}`}
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleDocumentUpload(index, 'photo', e.target.files[0])}
                          className="hidden"
                        />
                        <label
                          htmlFor={`photo-${index}`}
                          className={`bg-white border text-gray-700 px-4 py-2 rounded-lg shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${
                            stakeholder.documents.photo ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                          }`}
                        >
                          {stakeholder.documents.photo ? '✓ Photo Uploaded' : 'Upload Passport Photo (White BG) *'}
                        </label>
                        {documentErrors[`${index}_photo`] && (
                          <p className="text-xs text-red-500 mt-1">{documentErrors[`${index}_photo`]}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs text-red-600 mt-2 font-medium">* All documents are mandatory and must be uploaded to proceed</p>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addStakeholder} className="w-full py-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-700 font-bold flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-400 transition-all">
        <Plus size={20} className="mr-2" /> Add Another {entityType === "LLC" ? "Member" : entityType === "C-Corp" ? "Shareholder" : "Partner/Manager"}
      </button>
    </div>
  );

  const renderAddOns = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><ShieldCheck size={24} /></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Compliance and Add-ons</h3>
          <p className="text-sm text-gray-500">Configure essential post-incorporation requirements and services.</p>
        </div>
      </div>

      <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all mb-6 ${formData.addOns.annualCompliance ? "border-green-500 bg-green-50 shadow-md" : "border-gray-200 bg-white hover:border-green-300"}`} onClick={() => handleAddOnChange({ target: { name: "annualCompliance", checked: !formData.addOns.annualCompliance } })}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-gray-900 text-lg flex items-center"><ShieldCheck className="text-green-600 mr-2" size={20} /> Regular Compliance with Yourlegal</h4>
            <p className="text-sm text-gray-600 mt-1">
              Let our experts handle your ongoing {destination === "India" ? "ROC filings, GST returns, and bookkeeping" : destination === "USA" ? "state franchise taxes, registered agent renewals, and bookkeeping" : "FTA tax returns, economic substance reporting, and bookkeeping"} so you can focus on growing your business.
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 mt-1">
            <input type="checkbox" name="annualCompliance" checked={formData.addOns.annualCompliance} readOnly className="h-6 w-6 text-green-600 rounded focus:ring-green-500" />
          </div>
        </div>
        <span className="inline-block px-3 py-1 bg-green-100 border border-green-200 rounded-md text-xs font-bold text-green-800 mt-2">Highly Recommended - Request Quote</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.addOns.boiReporting ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300"}`} onClick={() => handleAddOnChange({ target: { name: "boiReporting", checked: !formData.addOns.boiReporting } })}>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-900">{destination === "USA" ? "FinCEN BOI Reporting" : destination === "India" ? "GST Registration" : "UAE Corporate Tax Reg."}</h4>
            <input type="checkbox" name="boiReporting" checked={formData.addOns.boiReporting} readOnly className="h-5 w-5 text-indigo-600 rounded" />
          </div>
          <p className="text-xs text-gray-600 mb-2">
            {destination === "USA"
              ? "Mandatory federal requirement for all US companies formed after Jan 1, 2024."
              : destination === "India"
              ? "Required if turnover exceeds threshold or for inter-state e-commerce."
              : "Mandatory registration with Federal Tax Authority (FTA) regardless of revenue."}
          </p>
          <span className="inline-block px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-700 mt-2">Opt-in for Processing</span>
        </div>

        <div className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.addOns.bankAccount ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300"}`} onClick={() => handleAddOnChange({ target: { name: "bankAccount", checked: !formData.addOns.bankAccount } })}>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-900"><CreditCard size={18} className="inline mr-1 mb-1" /> Business Bank Account Setup</h4>
            <input type="checkbox" name="bankAccount" checked={formData.addOns.bankAccount} readOnly className="h-5 w-5 text-indigo-600 rounded" />
          </div>
          <p className="text-xs text-gray-600 mb-2">
            {destination === "USA"
              ? "Partner introduction to US digital banks for non-residents."
              : destination === "India"
              ? "Assistance with opening current accounts with top Indian banks."
              : "Introduction to top UAE digital banks."}
          </p>
          <span className="inline-block px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-700 mt-2">Opt-in for Intro</span>
        </div>
      </div>

      {destination === "USA" && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Tax ID (EIN) Configuration</h4>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Does the primary founder possess a US Social Security Number (SSN) or ITIN?</label>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
                <input type="radio" name="hasSSN" value="Yes" onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="text-sm font-medium">Yes, I have an SSN/ITIN</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
                <input type="radio" name="hasSSN" value="No" onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="text-sm font-medium">No (Requires SS-4 filing)</span>
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Processing Speed</h4>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="processingSpeed" value="Standard" onChange={handleInputChange} defaultChecked className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">Standard Processing</span>
                  <span className="block text-xs text-gray-500 mt-1">State filing completed within standard government timelines.</span>
                </div>
              </label>
              <label className="flex items-start space-x-3 p-4 border rounded-xl border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 cursor-pointer">
                <input type="radio" name="processingSpeed" value="Expedited" onChange={handleInputChange} className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <div>
                  <span className="block text-sm font-bold text-indigo-900">Expedited State Filing Request</span>
                  <span className="block text-xs text-indigo-700/70 mt-1">24-48 hour state processing (additional state fees may apply).</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBookkeeping = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg text-green-600"><FileText size={24}/></div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Bookkeeping & Compliance Setup</h3>
          <p className="text-sm text-gray-500">Provide accounting details to set up your ongoing compliance for {destination === "ExistingCompliance" ? formData.existingCompany.country : destination}.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Accounting Software</label>
            <select name="software" onChange={handleBookkeepingChange} value={formData.bookkeeping.software || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors">
              <option value="">Select Software</option>
              <option value="QuickBooks">QuickBooks Online</option>
              <option value="Xero">Xero</option>
              <option value="ZohoBooks">Zoho Books</option>
              <option value="None">None / Need Recommendation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Monthly Transactions</label>
            <select name="monthlyTransactions" onChange={handleBookkeepingChange} value={formData.bookkeeping.monthlyTransactions || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors">
              <option value="">Select Volume</option>
              <option value="0-50">0 - 50</option>
              <option value="51-200">51 - 200</option>
              <option value="201-500">201 - 500</option>
              <option value="500+">500+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Average Transaction Value</label>
            <select name="avgTransactionValue" onChange={handleBookkeepingChange} value={formData.bookkeeping.avgTransactionValue || ""} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors">
              <option value="">Select Range</option>
              <option value="Micro (<$50)">Micro (Under $50)</option>
              <option value="Low ($50-$500)">Low ($50 - $500)</option>
              <option value="Medium ($500-$5000)">Medium ($500 - $5,000)</option>
              <option value="High (>$5000)">High-Ticket (Over $5,000)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Bank / Credit Accounts</label>
            <input type="number" name="bankAccounts" placeholder="e.g. 2" onChange={handleBookkeepingChange} value={formData.bookkeeping.bankAccounts || ""} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Fiscal Year End</label>
            <select name="fiscalYearEnd" onChange={handleBookkeepingChange} value={formData.bookkeeping.fiscalYearEnd || ((destination === "India" || formData.existingCompany.country === "India") ? "March 31" : "December 31")} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors">
              <option value="December 31">December 31 (Standard US/UAE)</option>
              <option value="March 31">March 31 (Standard India)</option>
              <option value="Custom">Other / Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Have you filed tax returns for this entity previously?</label>
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center space-x-2"><input type="radio" name="hasPriorTaxReturns" value="Yes" onChange={handleBookkeepingChange} checked={formData.bookkeeping.hasPriorTaxReturns === "Yes"} className="text-green-600 focus:ring-green-500" /> <span>Yes</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="hasPriorTaxReturns" value="No" onChange={handleBookkeepingChange} checked={formData.bookkeeping.hasPriorTaxReturns === "No"} className="text-green-600 focus:ring-green-500" /> <span>No (New Entity)</span></label>
            </div>
          </div>
        </div>

        <div className="bg-green-50/50 p-5 rounded-xl border border-green-200 mt-4">
          <h4 className="font-bold text-green-900 mb-3 text-sm flex items-center"><Info size={16} className="mr-2"/> Required Compliance Documents</h4>
          <p className="text-xs text-green-800 mb-4">Please upload the following documents so our CPAs can complete your onboarding:</p>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white border border-green-100 rounded-lg">
              <span className="text-sm text-gray-700 font-medium mb-2 sm:mb-0">Last 3 Months Bank Statements *</span>
              <div className="flex flex-col items-end">
                <input
                  type="file"
                  id="bankStatements"
                  accept=".pdf,.csv,.xlsx,.xls"
                  onChange={(e) => handleBookkeepingDocumentUpload('bankStatements', e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="bankStatements"
                  className={`bg-white border text-gray-700 px-3 py-1.5 rounded shadow-sm text-xs font-medium hover:bg-gray-50 cursor-pointer ${
                    formData.bookkeeping.documents.bankStatements ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                  }`}
                >
                  {formData.bookkeeping.documents.bankStatements ? '✓ Uploaded' : 'Upload PDF / CSV'}
                </label>
                {documentErrors['bookkeeping_bankStatements'] && (
                  <p className="text-xs text-red-500 mt-1">{documentErrors['bookkeeping_bankStatements']}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white border border-green-100 rounded-lg">
              <span className="text-sm text-gray-700 font-medium mb-2 sm:mb-0">
                {(destination === "USA" || formData.existingCompany.country === "USA") ? "EIN Confirmation Letter (Form SS-4) *" :
                 (destination === "India" || formData.existingCompany.country === "India") ? "GST Registration Certificate / PAN *" : "FTA TRN Certificate / Trade License *"}
              </span>
              <div className="flex flex-col items-end">
                <input
                  type="file"
                  id="taxId"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleBookkeepingDocumentUpload('taxId', e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="taxId"
                  className={`bg-white border text-gray-700 px-3 py-1.5 rounded shadow-sm text-xs font-medium hover:bg-gray-50 cursor-pointer ${
                    formData.bookkeeping.documents.taxId ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                  }`}
                >
                  {formData.bookkeeping.documents.taxId ? '✓ Uploaded' : 'Upload File'}
                </label>
                {documentErrors['bookkeeping_taxId'] && (
                  <p className="text-xs text-red-500 mt-1">{documentErrors['bookkeeping_taxId']}</p>
                )}
              </div>
            </div>

            {formData.bookkeeping.hasPriorTaxReturns === "Yes" && (
              <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white border border-green-100 rounded-lg">
                <span className="text-sm text-gray-700 font-medium mb-2 sm:mb-0">
                  {(destination === "USA" || formData.existingCompany.country === "USA") ? "Prior Year Tax Return (1120/1065) *" :
                   (destination === "India" || formData.existingCompany.country === "India") ? "Previous ITR / Audited Financials *" : "Previous Corporate Tax/VAT Return *"}
                </span>
                <div className="flex flex-col items-end">
                  <input
                    type="file"
                    id="priorTaxReturn"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleBookkeepingDocumentUpload('priorTaxReturn', e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="priorTaxReturn"
                    className={`bg-white border text-gray-700 px-3 py-1.5 rounded shadow-sm text-xs font-medium hover:bg-gray-50 cursor-pointer ${
                      formData.bookkeeping.documents.priorTaxReturn ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'
                    }`}
                  >
                    {formData.bookkeeping.documents.priorTaxReturn ? '✓ Uploaded' : 'Upload Return'}
                  </label>
                  {documentErrors['bookkeeping_priorTaxReturn'] && (
                    <p className="text-xs text-red-500 mt-1">{documentErrors['bookkeeping_priorTaxReturn']}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-red-600 mt-3 font-medium">* All documents are mandatory for compliance setup</p>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-6 border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-black text-gray-900">Review Application</h3>
        <p className="text-sm text-gray-500 mt-1">Please verify all details. Once submitted, our legal team will begin the process immediately.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">1. Entity Configuration</h4>
        {destination === "ExistingCompliance" ? (
          <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
            <div className="text-gray-500">Jurisdiction</div>
            <div className="font-bold text-right text-gray-900">{formData.existingCompany.country || "Not provided"}</div>

            <div className="text-gray-500">Legal Name</div>
            <div className="font-bold text-right text-gray-900">{formData.existingCompany.name || <span className="text-red-500 text-xs">Missing</span>}</div>

            <div className="text-gray-500">Entity Type</div>
            <div className="font-medium text-right text-gray-900">{formData.existingCompany.entityType || "-"}</div>

            <div className="text-gray-500">Tax ID</div>
            <div className="font-medium text-right text-gray-900">{formData.existingCompany.taxId || "-"}</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
            <div className="text-gray-500">Jurisdiction</div>
            <div className="font-bold text-right text-gray-900">{destination} ({formData.state || formData.freeZone})</div>

            <div className="text-gray-500">Entity Structure</div>
            <div className="font-bold text-right text-gray-900">{entityType}</div>

            <div className="text-gray-500">Proposed Name (Choice 1)</div>
            <div className="font-bold text-right text-gray-900">{formData.nameChoice1 || <span className="text-red-500 text-xs">Missing</span>}</div>

            <div className="text-gray-500">Industry</div>
            <div className="font-medium text-right text-gray-900">{formData.industry || "-"}</div>
          </div>
        )}

        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 mt-6">2. Stakeholder Breakdown</h4>
        <div className="space-y-3">
          {formData.stakeholders.map((s, i) => (
            <div key={s.id} className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center text-sm shadow-sm">
              <div>
                <span className="font-bold text-gray-800">{s.name || `Stakeholder ${i + 1}`}</span>
                <span className="text-xs text-gray-500 block">{s.email || "No email"} | {s.nationality || "Nationality unspecified"}</span>
              </div>
              <div className="text-right">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">{s.ownership ? `${s.ownership}%` : "0%"} Ownership</span>
              </div>
            </div>
          ))}
        </div>

        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 mt-8">3. Services & Compliance Options Selected</h4>
        <div className="space-y-2 text-sm">
          {destination === "ExistingCompliance" ? (
            Object.entries(formData.complianceServices)
              .filter(([_, v]) => v)
              .map(([key]) => (
                <div key={key} className="flex justify-between items-center text-gray-700 bg-white p-2 rounded border border-gray-100 shadow-sm mb-2">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()} Services</span>
                  <span className="font-medium text-green-600 text-xs bg-green-50 px-2 py-1 rounded">Opted-in</span>
                </div>
              ))
          ) : (
            <>
              <div className="flex justify-between items-center text-gray-700">
                <span>Base Formation Package ({destination})</span>
                <span className="font-medium text-green-600">Paid & Confirmed</span>
              </div>

              {formData.addOns.annualCompliance && (
                <div className="flex justify-between items-center text-gray-700 font-bold bg-green-50 p-2 rounded text-green-800 border border-green-100 mt-2">
                  <span>Regular Compliance with Yourlegal</span>
                  <span>Enrolled</span>
                </div>
              )}

              {formData.addOns.boiReporting && (
                <div className="flex justify-between items-center text-gray-700 mt-2">
                  <span>Compliance Filing / Registration</span>
                  <span className="font-medium text-indigo-600">Opted-in</span>
                </div>
              )}
              {formData.addOns.bankAccount && (
                <div className="flex justify-between items-center text-gray-700">
                  <span>Bank Account Intro</span>
                  <span className="font-medium text-indigo-600">Opted-in</span>
                </div>
              )}
              {formData.processingSpeed === "Expedited" && (
                <div className="flex justify-between items-center text-gray-700 text-amber-700 font-medium">
                  <span>Expedited Government Processing Requested</span>
                  <span>Noted</span>
                </div>
              )}
            </>
          )}

          {(formData.addOns.annualCompliance || destination === "ExistingCompliance") && (
            <div className="pl-4 py-2 text-xs text-gray-500 border-l-2 border-green-200 ml-2 space-y-1 mt-2">
              <p>• Software: <span className="font-medium text-gray-700">{formData.bookkeeping.software || "Not specified"}</span></p>
              <p>• Vol/Month: <span className="font-medium text-gray-700">{formData.bookkeeping.monthlyTransactions || "Not specified"} txns</span></p>
              <p>• Fiscal Year: <span className="font-medium text-gray-700">{formData.bookkeeping.fiscalYearEnd || "Standard"}</span></p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 shadow-sm">
        <label className="flex items-start space-x-3 text-sm text-gray-700 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
          <span>I declare under penalty of perjury that the information provided is accurate and all stakeholders have authorized this filing.</span>
        </label>
        <label className="flex items-start space-x-3 text-sm text-gray-700 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors bg-indigo-50/50 border border-indigo-100">
          <input type="checkbox" name="eSignConsent" onChange={handleInputChange} checked={formData.eSignConsent} className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-indigo-300" />
          <span className="font-semibold text-indigo-900">E-Signature Consent: I consent to use electronic signatures and authorize Yourlegal.in to act as an authorized representative to sign and file state/federal documents on my behalf.</span>
        </label>
        <label className="flex items-start space-x-3 text-sm text-gray-700 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
          <span>I acknowledge that if I selected add-on services not included in my initial payment, Yourlegal.in will send a separate invoice for those items.</span>
        </label>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          {submitError}
        </div>
      )}
    </div>
  );

  const getStepContent = () => {
    if (currentStep === 0) return renderSelection();

    const currentStepName = getDynamicSteps()[currentStep - 1];

    switch (currentStepName) {
      case "Company Details":
        return renderCompanyDetails();
      case "Stakeholders & KYC":
        return renderStakeholders();
      case "Compliance & Add-ons":
        return renderAddOns();
      case "Bookkeeping Setup":
        return renderBookkeeping();
      case "Company Info":
        return renderExistingCompanyDetails();
      case "Required Services":
        return renderComplianceServices();
      case "Accounting Setup":
        return renderBookkeeping();
      case "Stakeholders":
        return renderStakeholders();
      case "Review & Submit":
        return renderReview();
      default:
        return renderSelection();
    }
  };

  const totalSteps = getDynamicSteps().length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans text-gray-800">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <ShieldCheck size={18} className="text-indigo-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Secure Onboarding Portal</span>
          </div>
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Yourlegal" width={220} height={60} priority />
          </div>
          <p className="text-slate-500 font-medium mt-2 text-lg">Global Incorporation & Compliance Operations</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10">
            {renderProgressBar()}
            {getStepContent()}
          </div>

            {currentStep > 0 && (
             <div className="bg-gray-50/80 backdrop-blur-sm p-6 md:px-10 border-t border-gray-100">
                {stepError || submitError ? (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {stepError || submitError}
                  </div>
                ) : null}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-5 py-2.5 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl font-bold transition-all"
                  >
                    <ChevronLeft size={20} className="mr-1" /> Back
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={goNextStep}
                      className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md hover:shadow-xl transition-all"
                    >
                      Continue <ChevronRight size={20} className="ml-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!formData.eSignConsent || isSubmitting}
                      className="flex items-center px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Uploading Documents & Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <CheckCircle2 size={20} className="ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>

        <div className="text-center mt-8 text-xs text-gray-400 font-medium flex items-center justify-center space-x-4">
          <span>256-bit Bank-Level Encryption</span>
          <span>•</span>
          <span>Yourlegal.in © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>}>
      <OnboardingPageContent />
    </Suspense>
  );
}
