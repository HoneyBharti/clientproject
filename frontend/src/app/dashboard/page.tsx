'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef, useActionState } from 'react';
import Image from 'next/image';
import { 
    LayoutGrid, Building, Folder, Calendar, PiggyBank, Sparkles, Users, Settings, User, CheckCircle, Hourglass, 
    ChevronRight, Mail, Bot, LifeBuoy, X, FileText, Upload, Clock, Briefcase, DollarSign, Zap, PhoneCall, 
    Link, CreditCard, Menu, Globe, Clock4, Shield, BookOpen, MessageCircle, BarChart3, TrendingUp, Handshake, Gift, 
    ShoppingCart, Calculator, MapPin, ChevronLeft, Award, RefreshCw, Key, ShieldCheck, TrendingDown, Clock3, ListChecks,
    ChevronDown, CreditCard as CardIcon, Plus, FileCheck, Landmark, Loader2, SendHorizontal, MailQuestion, Phone, Video, HelpCircle, UserCog, Lock, ToggleLeft, ToggleRight, Search, Sun, Moon, ArrowRight, BookUser, Banknote
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFormStatus } from 'react-dom';
import { askQuestion, type ChatState } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfitAndLossReport } from '@/components/dashboard/pnl-report';
import { NotificationsMenu } from '@/components/notifications/notifications-menu';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/lib/api-base';
import axios from 'axios';


// =====================================================================
// --- DASHBOARD PORTAL COMPONENTS ---
// =====================================================================

const QUICKBOOKS_API_BASE = `${API_BASE_URL}/quickbooks`;

// Enhanced Navigation Items with nesting for Bookkeeping
const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: 'dashboard' },
    { name: 'Company & Legal', icon: Building, path: 'company' },
    { name: 'Services & Add-ons', icon: ShoppingCart, path: 'services' }, // New Services Tab
    { 
        name: 'Bookkeeping', 
        icon: Briefcase, 
        path: 'bookkeeping', 
        subItems: [
            { name: 'Overview', path: 'bookkeeping/overview', icon: BarChart3 },
            { name: 'Transactions', path: 'bookkeeping/transactions', icon: ListChecks },
            { name: 'Invoicing', path: 'bookkeeping/invoicing', icon: FileText },
            { name: 'Chart of Accounts', path: 'bookkeeping/chart', icon: BookOpen },
            { name: 'Reports', path: 'bookkeeping/reports', icon: FileText },
            { name: 'AR/AP', path: 'bookkeeping/ar-ap', icon: DollarSign },
        ] 
    },
    { name: 'Banking', icon: CardIcon, path: 'banking' },
    { name: 'Taxes & Filings', icon: PiggyBank, path: 'taxes' },
    { name: 'Documents', icon: Folder, path: 'documents' },
    { name: 'Compliance Dates', icon: Calendar, path: 'compliance' },
    { name: 'Consultation', icon: Users, path: 'consultation' },
];

const MetricCard = ({ title, value, icon: Icon, color, bgColor, tooltip }) => (
    <div className={`p-5 rounded-2xl shadow-md border ${bgColor} hover:shadow-lg transition duration-300`}>
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="mt-2">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <p className="text-xs text-gray-400 mt-2 truncate">{tooltip}</p>
    </div>
);

const TaskItem = ({ title, status, due, icon: Icon, priority }) => {
    let statusClass = "bg-gray-200 text-gray-700";
    if (priority === "Critical") statusClass = "bg-red-100 text-red-600 font-bold";
    if (priority === "High") statusClass = "bg-amber-100 text-amber-600";
    
    return (
        <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 border-b last:border-b-0 transition duration-150">
            <div className="flex items-center space-x-4">
                <Icon className="w-5 h-5 text-indigo-500" />
                <div>
                    <p className="text-sm font-semibold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{due}</p>
                </div>
            </div>
            <div className={`text-xs px-3 py-1 rounded-full ${statusClass}`}>
                {status}
            </div>
            <button className="text-blue-600 hover:text-blue-800 transition text-sm font-medium">
                Action <ChevronRight className="w-3 h-3 inline ml-1" />
            </button>
        </div>
    );
};

const FinancialSnapshot = ({ isQuickBooksLinked, data, isLoading, lastSyncAt }) => {
    const hasData = Array.isArray(data) && data.length > 0;
    const maxValue = hasData
        ? Math.max(...data.map(d => Math.max(d.revenue || 0, d.expense || 0)))
        : 0;
    const lastSyncLabel = lastSyncAt
        ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(lastSyncAt)
        : null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" /> Financial Snapshot
                    </h3>
                    <p className="text-sm text-gray-500">Last 4 Months Performance</p>
                    {lastSyncLabel && isQuickBooksLinked && (
                        <p className="text-xs text-gray-400 mt-1">Last synced: {lastSyncLabel}</p>
                    )}
                </div>
                {isQuickBooksLinked && (
                     <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                    </div>
                )}
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4 mb-4 border-b pb-2">
                <p>Month</p>
                <p>Revenue / Expense</p>
            </div>

            {!isQuickBooksLinked && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed">
                    <p className="text-gray-500">Connect to QuickBooks to see live financial data.</p>
                </div>
            )}

            {isQuickBooksLinked && isLoading && (
                <div className="flex justify-center items-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    <p className="ml-3 text-gray-500">Syncing with QuickBooks...</p>
                </div>
            )}

            {isQuickBooksLinked && !isLoading && !hasData && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed">
                    <p className="text-gray-500">No financial activity found yet.</p>
                </div>
            )}

            {isQuickBooksLinked && !isLoading && hasData && (
                <div className="space-y-4">
                    {data.map((row, index) => (
                        <div key={index} className="space-y-1">
                            <p className="text-xs font-medium text-gray-700">{row.month}</p>
                            <div className="flex items-center space-x-2">
                                <div className="relative h-4 flex-grow rounded-full bg-gray-100">
                                    <div 
                                        className="h-full bg-emerald-500 rounded-full" 
                                        style={{ width: `${maxValue ? (row.revenue / maxValue) * 100 : 0}%` }}
                                    ></div>
                                    <span className="absolute right-0 top-0.5 text-xs text-emerald-800 font-bold pr-2">
                                        ${row.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                                <div className="relative h-4 flex-grow rounded-full bg-gray-100">
                                    <div 
                                        className="h-full bg-red-400 rounded-full" 
                                        style={{ width: `${maxValue ? (row.expense / maxValue) * 100 : 0}%` }}
                                    ></div>
                                     <span className="absolute right-0 top-0.5 text-xs text-red-800 font-bold pr-2">
                                        ${row.expense.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                     </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isQuickBooksLinked && hasData && (
                <div className="flex justify-around text-xs mt-6 pt-4 border-t border-gray-100">
                    <span className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span> Revenue</span>
                    <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Expenses</span>
                </div>
            )}
        </div>
    );
};

const EnhancedChatbot = () => {
    const initialState: ChatState = {
        messages: [{ role: 'assistant', content: "Hi there! I'm your Legal & Tax AI Assistant. I can help with LLC formation, tax deadlines, or bookkeeping questions.", id: 'initial' }],
        loading: false,
    };
    const [state, formAction] = useActionState(askQuestion, initialState);
    const messagesEndRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [state.messages]);

    const handleSend = (formData: FormData) => {
        formAction(formData);
        formRef.current?.reset();
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center">
                    <Bot className="w-6 h-6 mr-2 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-800">YourLegal AI Assistant</h3>
                </div>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Powered
                </span>
            </div>
            
            <div className="flex-grow overflow-y-auto mb-4 space-y-3 p-2 bg-gray-50 rounded-xl h-[300px]">
                {state.messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-xl text-sm shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-gray-200 text-gray-800 rounded-br-none' 
                                : 'bg-blue-500 text-white rounded-bl-none'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {state.loading && (
                    <div className="flex justify-start">
                        <div className="bg-blue-500 text-white p-3 rounded-xl rounded-bl-none text-sm flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form ref={formRef} action={handleSend} className="relative">
                <Input 
                    ref={inputRef}
                    name="question"
                    placeholder="Ask a legal question..." 
                    className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition" 
                    disabled={state.loading}
                    autoComplete="off"
                />
                <button 
                    type="submit"
                    disabled={state.loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

const DashboardContent = ({ user, navigate, isQuickBooksLinked, financialSnapshot, isQuickBooksLoading, lastSyncAt, metrics, tasks, isUserDataLoading }) => {
    const welcomeName = user?.name || user?.email || 'Valued Client';
    const companyName = user?.companyName || 'Your Company';


    return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-10 bg-gray-50 min-h-screen">
        
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <p className="text-sm font-medium opacity-80 mb-1">Welcome to YourLegal Portal</p>
                 <h2 className="text-3xl font-extrabold mb-2">Hello, {welcomeName}</h2>
                <p className="text-sm opacity-90">{companyName} is 100% compliant and ready for operation.</p>
            </div>
            <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-0 px-5 py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg text-sm flex items-center">
                <PhoneCall className="w-4 h-4 mr-2" /> Book Tax Review
            </a>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </div>

        {/* Main Content: Tasks, Financials, and Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Urgent Tasks & Compliance */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                            <ListChecks className="w-5 h-5 mr-2 text-red-500" /> Urgent Action Items
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Resolve these items to maintain compliance and financial clarity.</p>
                    </div>
                      <div>
                          {isUserDataLoading ? (
                              <div className="flex items-center gap-2 p-4 text-sm text-gray-500">
                                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                  Loading tasks...
                              </div>
                          ) : (
                              tasks.map(task => (
                                  <TaskItem key={task.id} {...task} />
                              ))
                          )}
                      </div>
                </div>
                
                {/* Financial Snapshot */}
                  <FinancialSnapshot
                      isQuickBooksLinked={isQuickBooksLinked}
                      data={financialSnapshot}
                      isLoading={isQuickBooksLoading}
                      lastSyncAt={lastSyncAt}
                  />

            </div>

            {/* Chatbot */}
            <div className="lg:col-span-1 h-full flex flex-col">
                <EnhancedChatbot />
                <div className="mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                    <h4 className="text-md font-semibold text-gray-700 flex items-center mb-2">
                        <Globe className="w-4 h-4 mr-2 text-blue-600" /> Global Founder Resources
                    </h4>
                    <p className="text-sm text-gray-500">Access exclusive guides on non-resident taxation, VAT, and international banking.</p>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2 block">Read Guides →</a>
                </div>
            </div>

        </div>
    </div>
    );
};

// Helper for other sections
const SectionWrapper = ({ title, children }) => (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">{title}</h1>
        {children}
    </div>
);

// --- New/Updated Sections ---

const addOnIconMap = {
    'IP Protection': Award,
    'Tax Strategy': FileText,
    'Compliance': ShieldCheck,
    'Expansion': Globe,
    'Legal': Settings,
    'Tax ID': User,
};

const backendToAddOnCategory = {
    'audit-support': 'IP Protection',
    'tax-compliance': 'Tax Strategy',
    'annual-compliance': 'Compliance',
    formation: 'Legal',
    payroll: 'Expansion',
    bookkeeping: 'Compliance',
    'virtual-cfo': 'Tax Strategy',
};

const resolveServicePrice = (service) => {
    const pricing = service?.pricing || {};
    const price = Number(pricing.starter ?? pricing.growth ?? pricing.scale ?? 0);
    return Number.isFinite(price) ? price : 0;
};

const resolveUiCategory = (service) =>
    service?.uiCategory || backendToAddOnCategory[service?.category] || 'Compliance';

const resolveIcon = (service) => {
    const iconUrl = service?.icon;
    if (iconUrl && typeof iconUrl === 'string' && (iconUrl.startsWith('http') || iconUrl.startsWith('/'))) {
        return { type: 'image', value: iconUrl };
    }
    const uiCategory = resolveUiCategory(service);
    return { type: 'icon', value: addOnIconMap[uiCategory] || ShieldCheck };
};

const normalizeRegion = (region) => {
    if (!region) return null;
    const value = String(region).trim();
    if (!value || value === 'N/A') return null;
    if (value === 'SaudiArabia') return 'Saudi Arabia';
    return value;
};

const serviceMatchesRegion = (service, region) => {
    if (!region) return true;
    const countries = Array.isArray(service?.countries) ? service.countries : [];
    if (!countries.length) return true;
    return countries.some((country) => String(country).toLowerCase() === region.toLowerCase());
};

const ServicesSection = ({ orders = [], userRegion }) => {
    const [purchasing, setPurchasing] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [services, setServices] = useState([]);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [servicesError, setServicesError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const normalizedRegion = useMemo(() => normalizeRegion(userRegion), [userRegion]);

    const handleBuyClick = (service) => {
        setPurchasing(service);
        setShowPaymentModal(true);
        setServicesError('');
    };

    const purchasedServiceIds = useMemo(() => {
        const ids = new Set();
        (orders || []).forEach((order) => {
            const paymentStatus = order?.payment?.status;
            if (paymentStatus !== 'succeeded') return;
            const serviceId = order?.metadata?.serviceId;
            const serviceName = order?.metadata?.serviceName;
            if (serviceId) ids.add(String(serviceId));
            if (serviceName) ids.add(`name:${serviceName}`);
        });
        return ids;
    }, [orders]);

    useEffect(() => {
        const loadServices = async () => {
            setIsLoadingServices(true);
            setServicesError('');
            try {
                const response = await fetch(`${API_BASE_URL}/services?isActive=true`);
                const data = await response.json().catch(() => null);
                if (!response.ok || !data?.success) {
                    throw new Error(data?.message || 'Unable to load services.');
                }
                const addOns = (data.services || []).filter((service) => service.uiType === 'addon' && service.isActive);
                setServices(addOns);
            } catch (error) {
                setServices([]);
                setServicesError(error instanceof Error ? error.message : 'Unable to load services.');
            } finally {
                setIsLoadingServices(false);
            }
        };

        loadServices();
    }, []);

    const visibleServices = useMemo(
        () => services.filter((service) => serviceMatchesRegion(service, normalizedRegion)),
        [services, normalizedRegion]
    );

    const confirmPurchase = async () => {
        if (!purchasing) return;
        setIsProcessing(true);
        setServicesError('');
        try {
            const response = await fetch(`${API_BASE_URL}/payment/create-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    amount: purchasing.price,
                    country: normalizedRegion || 'USA',
                    serviceType: purchasing.serviceType || 'formation',
                    serviceName: purchasing.title,
                    serviceId: purchasing.id,
                })
            });

            const data = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(data?.message || 'Payment error. Please try again.');
            }
            if (data?.url) {
                window.location.href = data.url;
                return;
            }
            throw new Error('Unable to start Stripe checkout.');
        } catch (error) {
            setServicesError(error instanceof Error ? error.message : 'Payment error. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <SectionWrapper title="Additional Services & Compliance Add-ons">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <p className="text-gray-600 mb-8">Scale your business with our premium legal and tax services. Secure, one-click compliance.</p>
                
                  {servicesError ? (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                          {servicesError}
                      </div>
                  ) : null}

                  {isLoadingServices ? (
                      <div className="flex items-center justify-center p-10 text-sm text-gray-500">
                          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading services...
                      </div>
                  ) : visibleServices.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
                          No add-on services available right now.
                      </div>
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {visibleServices.map(service => {
                          const uiCategory = resolveUiCategory(service);
                          const price = resolveServicePrice(service);
                          const iconData = resolveIcon(service);
                          const serviceId = String(service._id || service.id || '');
                          const isPurchased = purchasedServiceIds.has(serviceId) || purchasedServiceIds.has(`name:${service.name}`);
                          return (
                              <div key={serviceId} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                          {iconData.type === 'image' ? (
                                              <img src={iconData.value} alt={service.name} className="w-6 h-6 object-contain" />
                                          ) : (
                                              <iconData.value className="w-6 h-6" />
                                          )}
                                      </div>
                                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold uppercase rounded-md">{uiCategory}</span>
                                  </div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                                  <p className="text-sm text-gray-600 mb-6 flex-grow">{service.description}</p>
                                  
                                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                      <span className="text-xl font-bold text-gray-900">${price}</span>
                                      {isPurchased ? (
                                          <button disabled className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-sm flex items-center cursor-default">
                                              <CheckCircle className="w-4 h-4 mr-1" /> Purchased
                                          </button>
                                      ) : (
                                          <button 
                                              onClick={() => handleBuyClick({
                                                  id: serviceId,
                                                  title: service.name,
                                                  description: service.description,
                                                  price,
                                                  category: uiCategory,
                                                  icon: iconData,
                                                  serviceType: service.category,
                                              })}
                                              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-sm flex items-center shadow-lg shadow-blue-200"
                                          >
                                              Add Service <ChevronRight className="w-4 h-4 ml-1" />
                                          </button>
                                      )}
                                  </div>
                              </div>
                          )
                      })}
                  </div>
                  )}

                {/* Payment Modal Overlay */}
                {showPaymentModal && purchasing && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Confirm Purchase</h3>
                                <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                            </div>
                            <div className="p-6 space-y-4">
                                  <div className="flex items-center space-x-4 mb-4">
                                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                          {purchasing.icon?.type === 'image' ? (
                                              <img src={purchasing.icon.value} alt={purchasing.title} className="w-6 h-6 object-contain" />
                                          ) : purchasing.icon?.value ? (
                                              <purchasing.icon.value className="w-6 h-6" />
                                          ) : null}
                                      </div>
                                      <div>
                                          <p className="font-bold text-gray-900">{purchasing.title}</p>
                                          <p className="text-sm text-gray-500">${purchasing.price} (One-time fee)</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Payment Method</p>
                                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center">
                                            <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                                            <span className="text-sm font-medium text-gray-700">•••• 4242</span>
                                        </div>
                                        <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">Change</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                                <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition">Cancel</button>
                                  <button onClick={confirmPurchase} disabled={isProcessing} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center disabled:opacity-60">
                                      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                      Pay ${purchasing.price}
                                  </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
};

const Timeline = ({ title, steps }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
        <div className="relative">
            <div className="hidden md:flex justify-between items-start relative z-0">
                 {/* Horizontal Line Background */}
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-10"></div>
                
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 ${
                            step.status === 'completed' ? 'bg-emerald-500 border-emerald-100 text-white' : 
                            step.status === 'current' ? 'bg-white border-blue-200 text-blue-600 ring-4 ring-blue-50' : 
                            'bg-gray-100 border-gray-50 text-gray-400'
                        }`}>
                            {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <span>{idx + 1}</span>}
                        </div>
                        <p className="mt-3 text-sm font-bold text-gray-800">{step.label}</p>
                        <p className="text-xs text-gray-500">{step.date}</p>
                        {step.details && <p className="text-xs text-gray-400 mt-1 text-center max-w-[120px]">{step.details}</p>}
                    </div>
                ))}
            </div>
            
            {/* Mobile Vertical Fallback */}
            <div className="md:hidden space-y-6 relative border-l-2 border-gray-100 ml-4 pl-6">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className={`absolute -left-[33px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                            step.status === 'completed' ? 'bg-emerald-500 border-emerald-100 text-white' : 
                            step.status === 'current' ? 'bg-white border-blue-200 text-blue-600' : 
                            'bg-gray-100 border-gray-50 text-gray-400'
                        }`}>
                            {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{idx + 1}</span>}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">{step.label}</p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                             {step.details && <p className="text-xs text-gray-400 mt-1">{step.details}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FormationProgressTimeline = ({ steps }) => <Timeline title="Formation Progress" steps={steps} />;
const EinProgressTimeline = ({ steps }) => <Timeline title="EIN Application & Allotment" steps={steps} />;
const ComplianceSetupTimeline = ({ steps }) => <Timeline title="Initial Compliance Setup" steps={steps} />;

const CompanySection = ({ userId, formations, documents, isLoading }) => {
    const [progressData, setProgressData] = useState<any | null>(null);
    const [progressLoading, setProgressLoading] = useState(false);
    const [progressError, setProgressError] = useState("");
    const { toast } = useToast();
    const company = useMemo(() => {
        if (!formations || formations.length === 0) return null;
        const sorted = [...formations].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        return sorted[0];
    }, [formations]);

    useEffect(() => {
        if (!company?._id && !company?.id) return;
        const formationId = company?._id || company?.id;
        setProgressLoading(true);
        setProgressError("");
        fetch(`${API_BASE_URL}/company/${formationId}/progress`, { credentials: 'include' })
            .then((res) => res.json().catch(() => null))
            .then((data) => {
                if (!data?.success) {
                    throw new Error(data?.message || "Unable to load progress.");
                }
                setProgressData(data);
            })
            .catch((error) => {
                setProgressError(error instanceof Error ? error.message : "Unable to load progress.");
                setProgressData(null);
            })
            .finally(() => setProgressLoading(false));
    }, [company?._id, company?.id]);

    const formatTimelineDate = (value?: string | Date | null) => {
        if (!value) return 'Pending';
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return 'Pending';
        return parsed.toLocaleDateString();
    };

    const buildStepsFromProgress = (
        definitions: Array<{ key: string; label: string; description: string }>,
        progressObj: any,
        legacyCurrentKey: string | null
    ) => {
        const keys = definitions.map((step) => step.key);
        const currentKey = legacyCurrentKey || keys.find((key) => progressObj?.[key]?.status !== 'completed') || keys[keys.length - 1];

        return definitions.map((step) => {
            const rawStatus = progressObj?.[step.key]?.status;
            const isCompleted = rawStatus === 'completed' || (legacyCurrentKey ? keys.indexOf(step.key) < keys.indexOf(legacyCurrentKey) : false);
            const isCurrent = step.key === currentKey && !isCompleted;
            return {
                label: step.label,
                status: isCompleted ? 'completed' : isCurrent ? 'current' : 'pending',
                date: isCompleted
                    ? formatTimelineDate(progressObj?.[step.key]?.completedAt || company?.updatedAt || company?.createdAt)
                    : isCurrent
                        ? 'In Progress'
                        : 'Pending',
                details: step.description,
            };
        });
    };

    const formationProgressObj = progressData?.formationProgress || (typeof company?.formationProgress === 'object' ? company.formationProgress : null);
    const formationStatusFallback: Record<string, string> = {
        pending: 'nameCheck',
        documents_required: 'filingPrep',
        processing: 'filingPrep',
        filed: 'stateFiling',
        approved: 'approved',
        completed: 'approved',
        rejected: 'filingPrep',
    };
    const formationLegacyMap: Record<string, string> = {
        name_check: 'nameCheck',
        filing_prep: 'filingPrep',
        state_filing: 'stateFiling',
        approved: 'approved',
    };
    const formationLegacyCurrent = formationProgressObj
        ? null
        : typeof company?.formationProgress === 'string'
            ? formationLegacyMap[company.formationProgress] || 'nameCheck'
            : formationStatusFallback[company?.status || 'pending'] || 'nameCheck';
    const formationSteps = buildStepsFromProgress(
        [
            { key: 'nameCheck', label: 'Name Check', description: 'Verify company name availability in the state registry.' },
            { key: 'filingPrep', label: 'Filing Prep', description: 'Prepare Articles of Organization or Incorporation.' },
            { key: 'stateFiling', label: 'State Filing', description: 'Submit formation documents to the Secretary of State.' },
            { key: 'approved', label: 'Approved', description: 'State approves the company and issues certificate.' },
        ],
        formationProgressObj,
        formationLegacyCurrent
    );

    const einProgressObj = progressData?.einProgress || (typeof company?.einProgress === 'object' ? company.einProgress : null);
    const einLegacyMap: Record<string, string> = {
        ss4_application: 'ss4Application',
        irs_submission: 'irsSubmission',
        processing: 'processing',
        allotment: 'allotment',
    };
    const einLegacyCurrent = einProgressObj
        ? null
        : typeof company?.einProgress === 'string'
            ? einLegacyMap[company.einProgress] || 'ss4Application'
            : company?.ein
                ? 'allotment'
                : 'ss4Application';
    const einNumber = progressData?.einNumber || einProgressObj?.einNumber || company?.ein || '';
    const einProgressNormalized = einProgressObj
        ? {
            ...einProgressObj,
            allotment: {
                ...(einProgressObj.allotment || {}),
                status: einNumber ? 'completed' : einProgressObj?.allotment?.status,
            },
        }
        : null;
    const einSteps = buildStepsFromProgress(
        [
            { key: 'ss4Application', label: 'SS-4 Application', description: 'Prepare the IRS SS-4 EIN application form.' },
            { key: 'irsSubmission', label: 'IRS Submission', description: 'Submit the SS-4 form to the IRS.' },
            { key: 'processing', label: 'Processing', description: 'IRS processing the EIN application.' },
            { key: 'allotment', label: 'Allotment', description: einNumber ? `EIN issued: ${einNumber}` : 'EIN issued by IRS.' },
        ],
        einProgressNormalized,
        einLegacyCurrent
    );

    const complianceProgressObj = progressData?.initialCompliance || (typeof company?.initialCompliance === 'object' ? company.initialCompliance : null);
    const complianceLegacyMap: Record<string, string> = {
        operating_agreement: 'operatingAgreement',
        initial_resolutions: 'initialResolutions',
        boi_report: 'boiReport',
        good_standing: 'goodStanding',
    };
    const complianceLegacyCurrent = complianceProgressObj
        ? null
        : typeof company?.complianceProgress === 'string'
            ? complianceLegacyMap[company.complianceProgress] || 'operatingAgreement'
            : 'operatingAgreement';
    const complianceSetupSteps = buildStepsFromProgress(
        [
            { key: 'operatingAgreement', label: 'Operating Agreement', description: 'Company operating agreement prepared and signed.' },
            { key: 'initialResolutions', label: 'Initial Resolutions', description: 'Internal corporate resolutions approved.' },
            { key: 'boiReport', label: 'BOI Report', description: 'Beneficial Ownership Information filing submitted.' },
            { key: 'goodStanding', label: 'Good Standing', description: 'Company is compliant and active.' },
        ],
        complianceProgressObj,
        complianceLegacyCurrent
    );

    const resolveDocumentUrl = (docId: string, forceDownload = false) =>
        `${API_BASE_URL}/documents/${docId}/download${forceDownload ? '?download=1' : ''}`;

    const openOfficialDocument = async (doc: any, mode: 'view' | 'download') => {
        const docId = doc?.id || doc?._id;
        if (!docId) return;
        const docName = doc?.name || doc?.originalName || 'document';
        const url = resolveDocumentUrl(docId, mode === 'download');

        try {
            const response = await fetch(url, { credentials: 'include' });
            if (!response.ok) {
                const message = await response.json().then((data) => data?.message).catch(() => '');
                throw new Error(message || 'Unable to fetch document.');
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            if (mode === 'view') {
                const opened = window.open(blobUrl, '_blank', 'noopener,noreferrer');
                if (!opened) {
                    const fallback = document.createElement('a');
                    fallback.href = blobUrl;
                    fallback.download = docName;
                    document.body.appendChild(fallback);
                    fallback.click();
                    fallback.remove();
                }
            } else {
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = docName;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000);
        } catch (error: any) {
            if (error instanceof TypeError) {
                window.open(url, '_blank', 'noopener,noreferrer');
                return;
            }
            toast({
                variant: 'destructive',
                title: 'Unable to open document',
                description: error?.message || 'Could not open this file.',
            });
        }
    };

    const registeredAgentValue = (company?.registeredAgent || '').trim();
    const mailingAddressValue = (company?.mailingAddress || '').trim();
    const authorizedMembersValue = Array.isArray(company?.authorizedMembers)
        ? company.authorizedMembers.join(', ')
        : (company?.authorizedMembers || '');
    const internalIdValue = company?.internalId || userId || 'USR-78901';
    const goodStandingLabel = company?.goodStandingStatus?.trim() || 'Active / Good Standing';

    return (
        <SectionWrapper title="Company & Legal Details">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                {isLoading ? (
                    <div className="flex justify-center items-center p-20">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        <p className="ml-4 text-gray-600">Loading company details...</p>
                    </div>
                ) : !company ? (
                     <div className="text-center p-20 border-dashed border-2 rounded-md">
                        <p className="text-muted-foreground">No company information found.</p>
                    </div>
                ) : (
                <>
                {/* Top Grid: Corporate Info & Docs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">Corporate Information</h3>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">{goodStandingLabel}</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Legal Entity Name</p>
                                    <p className="text-gray-900 font-medium">{company.companyName || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Formation State</p>
                                    <p className="text-gray-900 font-medium flex items-center"><MapPin className="w-3 h-3 mr-1 text-gray-400"/> {company.state || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Filing Date</p>
                                    <p className="text-gray-900 font-medium">{company.incorporationDate ? new Date(company.incorporationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : (company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A')}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Employer ID (EIN)</p>
                                    <p className="text-gray-900 font-medium font-mono">{company.ein || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Registered Agent</p>
                                    <p className="text-gray-900 font-medium">{registeredAgentValue || 'N/A'}</p>
                                    {!registeredAgentValue && (
                                        <p className="text-gray-500 text-xs mt-0.5">No registered agent on file.</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Mailing Address</p>
                                    <p className="text-gray-900 font-medium">{mailingAddressValue || 'N/A'}</p>
                                    {!mailingAddressValue && (
                                        <p className="text-gray-500 text-xs mt-0.5">No mailing address on file.</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Authorized Members</p>
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-900">{authorizedMembersValue || 'N/A'}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Internal ID</p>
                                    <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{internalIdValue}</code>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center">
                                    Edit Details <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center"><ShieldCheck className="w-5 h-5 mr-2"/> Official Documents</h4>
                            <p className="text-xs text-blue-600 mb-4">Access your certified formation documents.</p>
                            <ul className="space-y-3">
                                {(documents || []).filter((doc) => doc.source === 'legal_docs').length === 0 ? (
                                    <li className="text-sm text-gray-500">No official documents available yet.</li>
                                ) : (
                                    (documents || [])
                                        .filter((doc) => doc.source === 'legal_docs')
                                        .slice(0, 5)
                                        .map((doc) => (
                                            <li key={doc._id || doc.id} className="flex items-center justify-between text-sm text-gray-700 bg-white p-2 rounded shadow-sm">
                                                <div className="flex items-center">
                                                    <FileText className="w-4 h-4 mr-2 text-red-500"/> {doc.name || doc.originalName || 'Document'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="text-xs text-blue-600 hover:underline"
                                                        onClick={() => openOfficialDocument(doc, 'view')}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-xs text-blue-600 hover:underline"
                                                        onClick={() => openOfficialDocument(doc, 'download')}
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timelines */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Formation & Compliance History</h2>
                {progressLoading && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading progress data...
                    </div>
                )}
                {progressError && !progressLoading && (
                    <div className="text-sm text-red-600 mb-4">{progressError}</div>
                )}
                <FormationProgressTimeline steps={formationSteps} />
                <EinProgressTimeline steps={einSteps} />
                <ComplianceSetupTimeline steps={complianceSetupSteps} />
                </>
                )}
            </div>
        </SectionWrapper>
    );
};

// Sub-components for Bookkeeping
const BookkeepingOverview = ({ isQuickBooksLinked, lastSyncAt, bankAccountCount, financialSnapshot, isQuickBooksLoading, onNavigate }) => {
    const lastSyncLabel = lastSyncAt
        ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(lastSyncAt)
        : 'Not synced yet';
    const connectedLabel = typeof bankAccountCount === 'number'
        ? `${bankAccountCount} account${bankAccountCount === 1 ? '' : 's'} connected`
        : 'Accounts not available';

    return (
        <>
            <div className="p-6 bg-indigo-50 rounded-xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-indigo-200">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Bank Feed Status</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">Last Synced: {lastSyncLabel} ({connectedLabel})</p>
                        {isQuickBooksLinked && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">via QuickBooks</span>}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onNavigate?.('bookkeeping/transactions')}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition mt-3 sm:mt-0"
                >
                    View Transactions
                </button>
            </div>
            <FinancialSnapshot
                isQuickBooksLinked={isQuickBooksLinked}
                data={financialSnapshot}
                isLoading={isQuickBooksLoading}
                lastSyncAt={lastSyncAt}
            />
        </>
    );
};


// --- New Components for Bookkeeping ---

const RecentTransactions = ({ isQuickBooksLinked, transactions, isLoading }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('all');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const normalizedTransactions = useMemo(() => {
        return (transactions || []).map((tx) => {
            const description = tx?.Line?.[0]?.Description || tx?.Description || tx?.PrivateNote || 'N/A';
            const vendor = tx?.VendorRef?.name || tx?.CustomerRef?.name || tx?.EntityRef?.name || 'N/A';
            const amount = Number(tx?.TotalAmt ?? tx?.Amount ?? 0);
            const dateValue = tx?.TxnDate || tx?.DueDate || tx?.MetaData?.CreateTime || '';
            const date = typeof dateValue === 'string' ? dateValue.slice(0, 10) : '';
            return {
                id: tx?.Id || `${description}-${date}-${amount}`,
                description,
                vendor,
                amount: Number.isFinite(amount) ? amount : 0,
                date,
            };
        });
    }, [transactions]);
    const filteredTransactions = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        const min = minAmount === '' ? null : Number(minAmount);
        const max = maxAmount === '' ? null : Number(maxAmount);
        const now = new Date();
        const rangeStart = (() => {
            if (dateRange === '30d') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            if (dateRange === '90d') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90);
            if (dateRange === '365d') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 365);
            return null;
        })();

        return normalizedTransactions.filter((tx) => {
            if (term) {
                const haystack = `${tx.description} ${tx.vendor}`.toLowerCase();
                if (!haystack.includes(term)) return false;
            }
            if (rangeStart && tx.date) {
                const txDate = new Date(tx.date);
                if (!Number.isNaN(txDate.getTime()) && txDate < rangeStart) return false;
            }
            if (min !== null && Number.isFinite(min) && tx.amount < min) return false;
            if (max !== null && Number.isFinite(max) && tx.amount > max) return false;
            return true;
        });
    }, [normalizedTransactions, searchTerm, dateRange, minAmount, maxAmount]);

    const handleExportCsv = () => {
        if (!filteredTransactions.length) return;
        const header = ['Date', 'Description', 'Vendor', 'Amount'];
        const rows = filteredTransactions.map((tx) => [
            tx.date || '',
            tx.description || '',
            tx.vendor || '',
            tx.amount.toFixed(2),
        ]);
        const escapeCell = (value) => `"${String(value).replace(/"/g, '""')}"`;
        const csv = [header, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                <p className="ml-3 text-gray-500">Syncing with QuickBooks...</p>
            </div>
        )
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow-sm border-2 border-dashed">
                <p className="text-gray-500">No transactions found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-700">Recent Activity</h3>
                    <div className="flex items-center gap-4">
                        {isQuickBooksLinked && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                            </div>
                        )}
                        <div className="space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowFilters((prev) => !prev)}
                                className="text-sm text-gray-600 font-medium px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                            >
                                {showFilters ? 'Hide Filters' : 'Filter'}
                            </button>
                            <button
                                type="button"
                                onClick={handleExportCsv}
                                className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100"
                            >
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>
                {showFilters && (
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div>
                                <Label className="text-xs text-gray-500">Search</Label>
                                <Input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Vendor or description"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Date Range</Label>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="all">All time</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                    <option value="365d">Last 12 months</option>
                                </select>
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Min Amount</Label>
                                <Input
                                    type="number"
                                    value={minAmount}
                                    onChange={(e) => setMinAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Max Amount</Label>
                                <Input
                                    type="number"
                                    value={maxAmount}
                                    onChange={(e) => setMaxAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No transactions match the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((tx) => (
                                    <React.Fragment key={tx.id}>
                                        <tr className="bg-white border-b hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-gray-500">{tx.date || 'N/A'}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                                            <td className="px-6 py-4 text-gray-500">{tx.vendor}</td>
                                            <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const InvoicingSection = ({ isQuickBooksLinked, invoices, isLoading, accounts, onQuickBooksRefresh }) => {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingLookups, setIsLoadingLookups] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [itemId, setItemId] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const safeAmount = (value) => {
        const n = Number(value);
        return Number.isFinite(n) ? n : 0;
    };
    const now = new Date();
    const overdueAmount = invoices?.filter(inv => safeAmount(inv?.Balance) > 0 && inv?.DueDate && new Date(inv.DueDate) < now)
        .reduce((acc, inv) => acc + safeAmount(inv?.Balance), 0) || 0;
    const dueSoonAmount = invoices?.filter(inv => safeAmount(inv?.Balance) > 0 && (!inv?.DueDate || new Date(inv.DueDate) >= now))
        .reduce((acc, inv) => acc + safeAmount(inv?.Balance), 0) || 0;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const resolvePaidDate = (inv) => {
        const candidates = [
            inv?.MetaData?.LastUpdatedTime,
            inv?.MetaData?.CreateTime,
            inv?.TxnDate,
            inv?.DueDate
        ];
        for (const candidate of candidates) {
            if (!candidate) continue;
            const parsed = new Date(candidate);
            if (!Number.isNaN(parsed.getTime())) {
                return parsed;
            }
        }
        return null;
    };
    const paidLast30DaysAmount = invoices?.filter(inv => {
        const isPaid = safeAmount(inv?.Balance) === 0;
        const paidDate = resolvePaidDate(inv);
        return isPaid && paidDate && paidDate >= thirtyDaysAgo;
    }).reduce((acc, inv) => acc + safeAmount(inv?.TotalAmt ?? inv?.Balance), 0) || 0;

    useEffect(() => {
        if (!isDialogOpen || !isQuickBooksLinked) return;
        const loadLookups = async () => {
            setIsLoadingLookups(true);
            try {
                const [customersRes, itemsRes] = await Promise.all([
                    fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Customer' })
                    }),
                    fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Item' })
                    })
                ]);

                const customersData = await customersRes.json();
                const itemsData = await itemsRes.json();

                setCustomers(customersData?.QueryResponse?.Customer || []);
                setItems(itemsData?.QueryResponse?.Item || []);
            } catch (error) {
                console.error(error);
                toast({ variant: 'destructive', title: 'Failed to load QuickBooks lookups.' });
            } finally {
                setIsLoadingLookups(false);
            }
        };
        loadLookups();
    }, [isDialogOpen, isQuickBooksLinked, toast]);

    const ensureCustomer = async () => {
        const normalizedName = customerName.trim();
        if (!normalizedName) {
            throw new Error('Customer name is required.');
        }
        const match = customers.find(customer => customer?.DisplayName?.toLowerCase() === normalizedName.toLowerCase());
        if (match?.Id) {
            return match.Id;
        }
        const payload = {
            DisplayName: normalizedName,
            PrimaryEmailAddr: customerEmail ? { Address: customerEmail.trim() } : undefined
        };
        const response = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ method: 'POST', url: 'customer', data: payload })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || 'Failed to create customer.');
        }
        return data?.Customer?.Id;
    };

    const ensureItem = async () => {
        if (itemId) return itemId;
        const existingService = items.find(item => item?.Type === 'Service' && item?.Active !== false);
        if (existingService?.Id) {
            return existingService.Id;
        }
        const incomeAccount = (accounts || []).find(account => account?.AccountType === 'Income' || account?.AccountType === 'OtherIncome');
        if (!incomeAccount?.Id) {
            throw new Error('No income account available to create a default service item.');
        }
        const payload = {
            Name: 'Services',
            Type: 'Service',
            IncomeAccountRef: { value: incomeAccount.Id }
        };
        const response = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ method: 'POST', url: 'item', data: payload })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || 'Failed to create default service item.');
        }
        return data?.Item?.Id;
    };

    const handleCreateInvoice = async () => {
        if (!isQuickBooksLinked) {
            toast({ variant: 'destructive', title: 'QuickBooks not connected.' });
            return;
        }
        const amountValue = Number(amount);
        if (!Number.isFinite(amountValue) || amountValue <= 0) {
            toast({ variant: 'destructive', title: 'Enter a valid amount.' });
            return;
        }
        if (!dueDate) {
            toast({ variant: 'destructive', title: 'Due date is required.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const customerId = await ensureCustomer();
            const resolvedItemId = await ensureItem();

            const payload = {
                CustomerRef: { value: customerId },
                TxnDate: new Date().toISOString().slice(0, 10),
                DueDate: dueDate,
                BillEmail: customerEmail ? { Address: customerEmail.trim() } : undefined,
                Line: [
                    {
                        Amount: amountValue,
                        DetailType: 'SalesItemLineDetail',
                        Description: description || undefined,
                        SalesItemLineDetail: {
                            ItemRef: { value: resolvedItemId }
                        }
                    }
                ]
            };

            const response = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ method: 'POST', url: 'invoice', data: payload })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.message || 'Failed to create invoice.');
            }
            const createdInvoiceId = data?.Invoice?.Id || data?.Id;
            const sendTo = customerEmail?.trim() || data?.Invoice?.BillEmail?.Address;
            if (createdInvoiceId && sendTo) {
                const sendResponse = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'POST', url: `invoice/${createdInvoiceId}/send?sendTo=${encodeURIComponent(sendTo)}` })
                });
                const sendData = await sendResponse.json().catch(() => ({}));
                if (!sendResponse.ok) {
                    console.error('QuickBooks send invoice error:', sendData);
                    toast({ variant: 'destructive', title: 'Invoice created, but email failed to send.' });
                } else {
                    toast({ title: 'Invoice created and emailed.' });
                }
            } else {
                toast({ title: 'Invoice created in QuickBooks.' });
            }
            setIsDialogOpen(false);
            setCustomerName('');
            setCustomerEmail('');
            setItemId('');
            setDescription('');
            setAmount('');
            setDueDate('');
            await onQuickBooksRefresh?.();
        } catch (error: any) {
            console.error(error);
            toast({ variant: 'destructive', title: error?.message || 'Unable to create invoice.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {isLoading && (
                <div className="flex justify-center items-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    <p className="ml-3 text-gray-500">Fetching invoices from QuickBooks...</p>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                     <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Overdue</p>
                        <p className="text-2xl font-bold text-red-600">${overdueAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Open Invoices</p>
                        <p className="text-2xl font-bold text-amber-500">${dueSoonAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Paid (Last 30d)</p>
                    <p className="text-2xl font-bold text-green-600">${paidLast30DaysAmount.toFixed(2)}</p>
                    </div>
                </div>
                   <button
                      className="px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center whitespace-nowrap disabled:opacity-60"
                      onClick={() => setIsDialogOpen(true)}
                      disabled={!isQuickBooksLinked}
                  >
                      <Plus className="w-5 h-5 mr-2" /> {isQuickBooksLinked ? 'Create in QuickBooks' : 'Create Invoice'}
                  </button>
              </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Invoice History</h3>
                    {isQuickBooksLinked && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                        </div>
                    )}
                </div>
                <div className="overflow-x-auto">
                    {!invoices || invoices.length === 0 ? (
                        <div className="text-center p-10 border-t">
                            <p className="text-gray-500">No invoices found.</p>
                        </div>
                    ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Invoice #</th>
                                <th className="px-6 py-3">Client</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.Id} className="bg-white border-b hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-blue-600">{inv.DocNumber || inv.Id}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{inv.CustomerRef?.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{inv.TxnDate}</td>
                                    <td className="px-6 py-4 text-gray-500">{inv.DueDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                            inv.Balance === 0 ? 'bg-green-100 text-green-700' : 
                                            new Date(inv.DueDate) < new Date() ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {safeAmount(inv?.Balance) === 0 ? 'Paid' : (inv?.DueDate && new Date(inv.DueDate) < new Date() ? 'Overdue' : 'Sent')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                                        ${inv.TotalAmt.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-gray-400 hover:text-blue-600">
                                            <ChevronRight className="w-4 h-4 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create Invoice</DialogTitle>
                        <DialogDescription>
                            This will create an invoice directly in QuickBooks.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="invoice-customer">Customer Name</Label>
                            <Input id="invoice-customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" />
                        </div>
                        <div>
                            <Label htmlFor="invoice-email">Customer Email (optional)</Label>
                            <Input id="invoice-email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="customer@email.com" />
                        </div>
                        <div>
                            <Label htmlFor="invoice-item">Service Item</Label>
                            <Select value={itemId} onValueChange={setItemId}>
                                <SelectTrigger id="invoice-item">
                                    <SelectValue placeholder={isLoadingLookups ? 'Loading items...' : 'Auto-select service item'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {(items || []).map(item => (
                                        <SelectItem key={item.Id} value={item.Id}>{item.Name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="invoice-description">Description</Label>
                            <Textarea id="invoice-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Invoice description" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="invoice-amount">Amount</Label>
                                <Input id="invoice-amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                            </div>
                            <div>
                                <Label htmlFor="invoice-due-date">Due Date</Label>
                                <Input id="invoice-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
                        <Button onClick={handleCreateInvoice} disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Invoice'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const ChartOfAccounts = ({ isQuickBooksLinked, userId }) => {
    const { toast } = useToast();
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [accountsError, setAccountsError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountType, setNewAccountType] = useState('Expense');

    const accountTypes = ["Bank", "AccountsReceivable", "OtherCurrentAsset", "FixedAsset", "OtherAsset", "AccountsPayable", "CreditCard", "OtherCurrentLiability", "LongTermLiability", "OtherLiability", "Equity", "Income", "OtherIncome", "CostOfGoodsSold", "Expense", "OtherExpense"];


    const fetchAccounts = useCallback(async () => {
        if (!isQuickBooksLinked || !userId) return;
        setIsLoading(true);
        setAccountsError(null);
        try {
            const response = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    method: 'GET',
                    url: 'query?query=select * from Account'
                })
            });
            const data = await response.json();
            const qbError = data?.Fault?.Error?.[0];
            if (qbError || !response.ok) {
                const message = qbError?.Detail || qbError?.Message || data?.message || 'Failed to fetch accounts from QuickBooks.';
                setAccountsError(message);
                toast({ variant: 'destructive', title: message });
                return;
            }
            setAccounts(data?.QueryResponse?.Account || []);
        } catch (error) {
            console.error("Error fetching accounts:", error);
            setAccountsError('Failed to fetch accounts.');
            toast({ variant: 'destructive', title: 'Failed to fetch accounts.' });
        } finally {
            setIsLoading(false);
        }
    }, [isQuickBooksLinked, userId, toast]);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    const handleCreateAccount = async () => {
        if (!newAccountName) {
            toast({ variant: 'destructive', title: 'Account name is required.' });
            return;
        }

        const existingSubtype = accounts.find(account => account?.AccountType === newAccountType && account?.AccountSubType)?.AccountSubType;
        const newAccountPayload: Record<string, any> = {
            Name: newAccountName,
            AccountType: newAccountType,
        };
        if (existingSubtype) {
            newAccountPayload.AccountSubType = existingSubtype;
        }

        try {
            const response = await fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    method: 'POST',
                    url: 'account',
                    data: newAccountPayload
                })
            });
            const data = await response.json();
            const qbError = data?.Fault?.Error?.[0];
            if (qbError) {
                throw new Error(qbError.Detail || qbError.Message || 'QuickBooks rejected the account.');
            }
            if (!response.ok) throw new Error(data.message || 'QuickBooks request failed.');
            
            toast({ title: 'Account Created', description: `${newAccountName} has been added to QuickBooks.` });
            
            fetchAccounts();
            setIsDialogOpen(false);
            setNewAccountName('');
            setNewAccountType('Expense');
        } catch (error) {
            console.error("Error creating account:", error);
            toast({ variant: 'destructive', title: 'Failed to create account.' });
        }
    };


    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Chart of Accounts</h2>
                    <p className="text-gray-600">Standardized US GAAP Chart of Accounts for your company.</p>
                </div>
                 {isQuickBooksLinked && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                    </div>
                )}
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2" disabled={!isQuickBooksLinked}>
                <Plus className="w-4 h-4"/>
                Create New Account
            </Button>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                         <div className="flex justify-center items-center p-10">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                            <p className="ml-3 text-gray-500">Loading Chart of Accounts...</p>
                        </div>
                      ) : !accounts || accounts.length === 0 ? (
                          <div className="text-center p-10">
                              <p className="text-gray-500">
                                  {!isQuickBooksLinked
                                      ? 'Connect to QuickBooks to get started.'
                                      : accountsError
                                          ? accountsError
                                          : 'No accounts found in QuickBooks.'}
                              </p>
                          </div>
                      ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Account Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Sub-Type</th>
                                <th className="px-6 py-3 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.Id} className="bg-white border-b hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{account.Name}</td>
                                    <td className="px-6 py-4">
                                         <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{account.AccountType}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{account.AccountSubType}</td>
                                    <td className={`px-6 py-4 text-right font-medium ${account.Classification === 'Asset' ? 'text-green-600' : 'text-gray-800'}`}>
                                        {account.CurrentBalance != null ? `$${account.CurrentBalance.toFixed(2)}` : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <DialogDescription>
                            Add a new account to your chart. This will be synced with QuickBooks.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="account-name" className="text-right">Name</Label>
                            <Input id="account-name" value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="account-type" className="text-right">Type</Label>
                            <Select onValueChange={setNewAccountType} defaultValue={newAccountType}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select an account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accountTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateAccount}>Create Account</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const BookkeepingReports = ({ isQuickBooksLinked, pnlData, balanceSheetData, cashFlowData, isLoading }) => {
    const [showPnl, setShowPnl] = useState(false);
    const [showBalanceSheet, setShowBalanceSheet] = useState(false);
    const [showCashFlow, setShowCashFlow] = useState(false);

     if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                <p className="ml-3 text-gray-500">Fetching reports...</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Financial Reports</h2>
                    <p className="text-gray-600">Generate, view, and export your key financial statements.</p>
                </div>
                 {isQuickBooksLinked && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => setShowPnl(true)} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 text-blue-700 font-semibold transition flex items-center justify-center flex-col" disabled={!pnlData}>
                    <BarChart3 className="w-6 h-6 mb-2" /> P&L Statement
                </button>
                <button onClick={() => setShowBalanceSheet(true)} className={`p-4 rounded-xl border font-semibold transition flex items-center justify-center flex-col ${balanceSheetData ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700' : 'bg-gray-100 border-gray-200 text-gray-400'}`} disabled={!balanceSheetData}>
                    <DollarSign className="w-6 h-6 mb-2" /> Balance Sheet
                </button>
                <button onClick={() => setShowCashFlow(true)} className={`p-4 rounded-xl border font-semibold transition flex items-center justify-center flex-col ${cashFlowData ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700' : 'bg-gray-100 border-gray-200 text-gray-400'}`} disabled={!cashFlowData}>
                    <RefreshCw className="w-6 h-6 mb-2" /> Cash Flow
                </button>
            </div>

            <Dialog open={showPnl} onOpenChange={setShowPnl}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Profit and Loss Statement</DialogTitle>
                        <DialogDescription>
                            Review your company's financial performance for the selected period.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto pr-4">
                        <ProfitAndLossReport data={pnlData} />
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={showBalanceSheet} onOpenChange={setShowBalanceSheet}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Balance Sheet</DialogTitle>
                        <DialogDescription>
                            Review your company's assets, liabilities, and equity.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto pr-4">
                        <ProfitAndLossReport data={balanceSheetData} />
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={showCashFlow} onOpenChange={setShowCashFlow}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Cash Flow Statement</DialogTitle>
                        <DialogDescription>
                            Review cash inflows and outflows for the selected period.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto pr-4">
                        <ProfitAndLossReport data={cashFlowData} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};


const ARAPSection = ({ isQuickBooksLinked, invoices, bills, onNavigate }) => {
    const now = new Date();
    const safeAmount = (value) => {
        const n = Number(value);
        return Number.isFinite(n) ? n : 0;
    };

    const arInvoices = (invoices || []).filter(inv => safeAmount(inv?.Balance ?? inv?.TotalAmt) > 0);
    const arTotal = arInvoices.reduce((sum, inv) => sum + safeAmount(inv?.Balance ?? inv?.TotalAmt), 0);
    const arOverdue = arInvoices.filter(inv => inv?.DueDate && new Date(inv.DueDate) < now).length;
    const arPending = arInvoices.filter(inv => !inv?.DueDate || new Date(inv.DueDate) >= now).length;

    const apBills = (bills || []).filter(bill => safeAmount(bill?.Balance ?? bill?.TotalAmt) > 0);
    const apTotal = apBills.reduce((sum, bill) => sum + safeAmount(bill?.Balance ?? bill?.TotalAmt), 0);
    const apOverdue = apBills.filter(bill => bill?.DueDate && new Date(bill.DueDate) < now).length;
    const apPending = apBills.filter(bill => !bill?.DueDate || new Date(bill.DueDate) >= now).length;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Accounts Receivable (AR) / Accounts Payable (AP)</h2>
                    <p className="text-gray-600">Manage invoices and bills due to and from your business.</p>
                </div>
                {isQuickBooksLinked && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image src="/logo.png" alt="Yourlegal" width={80} height={15} />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Accounts Receivable</h3>
                    <p className="text-3xl font-bold text-green-600">${arTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-sm text-gray-600 mt-1">{arOverdue} overdue invoice{arOverdue === 1 ? '' : 's'}, {arPending} pending.</p>
                    <button
                        type="button"
                        onClick={() => onNavigate?.('bookkeeping/invoicing')}
                        className="mt-3 text-xs text-green-600 font-medium hover:underline"
                    >
                        View Invoices
                    </button>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-md">
                    <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center"><TrendingDown className="w-4 h-4 mr-2" /> Accounts Payable</h3>
                    <p className="text-3xl font-bold text-red-600">${apTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-sm text-gray-600 mt-1">{apOverdue} overdue bill{apOverdue === 1 ? '' : 's'}, {apPending} due soon.</p>
                    <button
                        type="button"
                        onClick={() => onNavigate?.('bookkeeping/transactions')}
                        className="mt-3 text-xs text-red-600 font-medium hover:underline"
                    >
                        View Bills
                    </button>
                </div>
            </div>
        </div>
    );
};

const BookkeepingSection = ({
    activePath,
    onNavigate,
    isQuickBooksLinked,
    userId,
    onQuickBooksConnect,
    bills,
    invoices,
    pnlData,
    balanceSheetData,
    cashFlowData,
    accounts,
    isLoading,
    error,
    bankAccountCount,
    lastSyncAt,
    financialSnapshot,
    onQuickBooksRefresh
}) => {
    let content;
    let subtitle;
    
    switch (activePath) {
        case 'bookkeeping/chart':
            content = <ChartOfAccounts isQuickBooksLinked={isQuickBooksLinked} userId={userId} />;
            subtitle = 'Review and manage your company’s balance sheet and income statement accounts.';
            break;
        case 'bookkeeping/reports':
            content = <BookkeepingReports isQuickBooksLinked={isQuickBooksLinked} pnlData={pnlData} balanceSheetData={balanceSheetData} cashFlowData={cashFlowData} isLoading={isLoading} />;
            subtitle = 'Generate key financial reports for planning and compliance.';
            break;
        case 'bookkeeping/transactions':
             content = <RecentTransactions isQuickBooksLinked={isQuickBooksLinked} transactions={bills || []} isLoading={isLoading} />;
            subtitle = 'Monitor and categorize your recent banking activity.';
            break;
        case 'bookkeeping/invoicing':
            content = <InvoicingSection isQuickBooksLinked={isQuickBooksLinked} invoices={invoices || []} isLoading={isLoading} accounts={accounts || []} onQuickBooksRefresh={onQuickBooksRefresh} />;
            subtitle = 'Manage client billing, track payments, and follow up on overdue invoices.';
            break;
        case 'bookkeeping/ar-ap':
            content = (
                <ARAPSection
                    isQuickBooksLinked={isQuickBooksLinked}
                    invoices={invoices || []}
                    bills={bills || []}
                    onNavigate={onNavigate}
                />
            );
            subtitle = 'Track money owed to you (AR) and money you owe (AP).';
            break;
        case 'bookkeeping':
        case 'bookkeeping/overview':
        default:
            content = (
                <BookkeepingOverview
                    isQuickBooksLinked={isQuickBooksLinked}
                    lastSyncAt={lastSyncAt}
                    bankAccountCount={bankAccountCount}
                    financialSnapshot={financialSnapshot}
                    isQuickBooksLoading={isLoading}
                    onNavigate={onNavigate}
                />
            );
            subtitle = 'An integrated overview of your business’s financial health and activity.';
            break;
    }

    const currentTitle = navItems.find(item => item.path === 'bookkeeping')?.subItems?.find(sub => sub.path === activePath)?.name || 'Overview';

    return (
        <SectionWrapper title={`Bookkeeping: ${currentTitle}`}>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-lg text-gray-600">{subtitle}</p>
                    {isQuickBooksLinked && (
                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                             <span className="text-sm font-semibold text-gray-700">Powered by</span>
                           <Image src="/logo.png" alt="Yourlegal" width={80} height={20} className="h-4 w-auto object-contain"/>
                           
                        </div>
                    )}
                </div>
                 {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">Error:</span> {error}
                    </div>
                )}
                {!isQuickBooksLinked && !isLoading && (
                    <div className="text-center p-10 border-2 border-dashed rounded-lg">
                        <Image src="/logo.png" alt="Yourlegal" width={120} height={24} className="mx-auto mb-4"/>
                        <h3 className="text-lg font-semibold">Connect to QuickBooks</h3>
                        <p className="text-gray-500 mb-4">Link your account to see live bookkeeping data.</p>
                        <Button onClick={() => onQuickBooksConnect?.()}>Connect Now</Button>
                    </div>
                )}
                {isQuickBooksLinked && content}
            </div>
        </SectionWrapper>
    );
};


const BankingSection = ({ isQuickBooksLinked, accounts, bills, invoices, transactions, lastSyncAt, onConnect, onDisconnect, onRefresh, isLoading }) => {
    const [txnPage, setTxnPage] = useState(1);
    const pageSize = 10;
    const bankAccounts = (accounts || []).filter(account => account?.AccountType === 'Bank');
    const primaryAccount = bankAccounts[0];
    const lastSyncLabel = lastSyncAt
        ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(lastSyncAt)
        : 'Not synced yet';

    const totalCash = bankAccounts.reduce((sum, account) => {
        const value = Number(account?.CurrentBalance ?? account?.Balance ?? 0);
        return sum + (Number.isFinite(value) ? value : 0);
    }, 0);

    const quickBooksTransactions = [
        ...(invoices || []).map(invoice => ({
            amount: Number(invoice?.Balance ?? invoice?.TotalAmt ?? 0),
            date: invoice?.TxnDate || invoice?.DueDate || invoice?.MetaData?.CreateTime,
        })),
        ...(bills || []).map(bill => ({
            amount: -Number(bill?.Balance ?? bill?.TotalAmt ?? 0),
            date: bill?.TxnDate || bill?.DueDate || bill?.MetaData?.CreateTime,
        })),
    ];

    const recentCredit = quickBooksTransactions
        .filter(txn => Number(txn?.amount) > 0)
        .sort((a, b) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime());
    const recentDeposit = recentCredit[0]?.amount || 0;

    const uncategorizedCount = (bills || []).filter(
        bill => !bill?.APAccountRef?.name && !bill?.AccountRef?.name
    ).length;
    const formatDate = (value) => {
        if (!value) return 'N/A';
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10);
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsed);
    };
    const accountRows = bankAccounts.map((account) => ({
        id: account?.Id || account?.Name,
        name: account?.Name || account?.FullyQualifiedName || 'Bank Account',
        type: account?.AccountSubType || account?.AccountType || 'Bank',
        number: account?.AcctNum || account?.AccountAlias || 'N/A',
        balance: Number(account?.CurrentBalance ?? account?.Balance ?? 0),
        currency: account?.CurrencyRef?.value || 'USD',
    }));
    const activityRowsAll = [
        ...(invoices || []).map((invoice) => ({
            id: `invoice-${invoice?.Id}`,
            type: 'Invoice',
            counterparty: invoice?.CustomerRef?.name || 'Customer',
            date: invoice?.TxnDate || invoice?.DueDate || invoice?.MetaData?.CreateTime,
            amount: Number(invoice?.Balance ?? invoice?.TotalAmt ?? 0),
        })),
        ...(bills || []).map((bill) => ({
            id: `bill-${bill?.Id}`,
            type: 'Bill',
            counterparty: bill?.VendorRef?.name || 'Vendor',
            date: bill?.TxnDate || bill?.DueDate || bill?.MetaData?.CreateTime,
            amount: -Number(bill?.Balance ?? bill?.TotalAmt ?? 0),
        })),
    ]
        .filter((row) => Number.isFinite(row.amount))
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    const transactionRowsAll = (transactions || [])
        .map((row) => ({
            id: row?.id || `${row?.name}-${row?.date}-${row?.amount}`,
            type: row?.type || 'Transaction',
            counterparty: row?.name || 'N/A',
            date: row?.date,
            amount: Number(row?.amount ?? 0),
            memo: row?.memo || '',
        }))
        .filter((row) => Number.isFinite(row.amount))
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    const tableRowsSource = transactionRowsAll.length > 0 ? transactionRowsAll : activityRowsAll;
    const totalPages = Math.max(1, Math.ceil(tableRowsSource.length / pageSize));
    const safePage = Math.min(txnPage, totalPages);
    const tableRows = tableRowsSource.slice((safePage - 1) * pageSize, safePage * pageSize);

    return (
        <SectionWrapper title="Banking & Finance">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 bg-emerald-50 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border border-emerald-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-1">
                            <CardIcon className="w-6 h-6 mr-2 text-emerald-600" /> Linked Bank Account Status
                        </h2>
                        <p className="text-sm text-gray-600">
                            {isQuickBooksLinked && primaryAccount
                                ? `Primary Account: ${primaryAccount.Name || primaryAccount.FullyQualifiedName || primaryAccount.Id}. `
                                : 'Primary Account: Not linked. '}
                            Last Synced: {lastSyncLabel}.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                        {!isQuickBooksLinked ? (
                            <button className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition" onClick={onConnect}>
                                Link QuickBooks
                            </button>
                        ) : (
                            <>
                                <button
                                    className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition disabled:opacity-60"
                                    onClick={onRefresh}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Refreshing...' : 'Refresh Data'}
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                                    onClick={onDisconnect}
                                >
                                    Disconnect
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {!isQuickBooksLinked && (
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-gray-500">Connect to QuickBooks to see live banking data.</p>
                    </div>
                )}

                {isQuickBooksLinked && (
                    <>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Account Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <MetricCard title="Total Cash" value={`$${totalCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={DollarSign} color="text-emerald-500" bgColor="bg-emerald-50" tooltip="Total across QuickBooks bank accounts." />
                            <MetricCard title="Recent Deposit" value={`$${Number(recentDeposit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={TrendingUp} color="text-indigo-500" bgColor="bg-indigo-50" tooltip="Most recent incoming QuickBooks invoice." />
                            <MetricCard title="Uncategorized" value={`${uncategorizedCount}`} icon={ListChecks} color="text-amber-500" bgColor="bg-amber-50" tooltip="Bills without an assigned account." />
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-6">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700">Bank Accounts</h4>
                                    <span className="text-xs text-gray-500">{accountRows.length} linked</span>
                                </div>
                                {accountRows.length === 0 ? (
                                    <div className="text-sm text-gray-500">No bank accounts available.</div>
                                ) : (
                                    <div className="space-y-3">
                                        {accountRows.map((account) => (
                                            <div key={account.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-gray-100">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{account.name}</p>
                                                    <p className="text-xs text-gray-500">{account.type} • {account.number}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {account.currency}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400">Current Balance</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700">All Transactions</h4>
                                    <p className="text-xs text-gray-500">Full list from QuickBooks transaction report.</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Showing</span>
                                    <span className="font-semibold text-gray-700">
                                        {tableRowsSource.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
                                        -
                                        {Math.min(safePage * pageSize, tableRowsSource.length)}
                                    </span>
                                    <span>of {tableRowsSource.length}</span>
                                </div>
                            </div>
                            {tableRowsSource.length === 0 ? (
                                <div className="p-6 text-sm text-gray-500">No transactions available.</div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                                <tr>
                                                    <th className="px-6 py-3">Date</th>
                                                    <th className="px-6 py-3">Type</th>
                                                    <th className="px-6 py-3">Name</th>
                                                    <th className="px-6 py-3">Memo</th>
                                                    <th className="px-6 py-3 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableRows.map((row) => (
                                                    <tr key={row.id} className="border-b last:border-b-0 bg-white hover:bg-gray-50 transition">
                                                        <td className="px-6 py-4 text-gray-500">{formatDate(row.date)}</td>
                                                        <td className="px-6 py-4 text-gray-700">{row.type}</td>
                                                        <td className="px-6 py-4 font-medium text-gray-900">{row.counterparty}</td>
                                                        <td className="px-6 py-4 text-gray-500">{row.memo || '—'}</td>
                                                        <td className={`px-6 py-4 text-right font-bold ${row.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                            {row.amount >= 0 ? '+' : ''}{Math.abs(row.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex items-center justify-between px-6 py-4 bg-white">
                                        <button
                                            type="button"
                                            onClick={() => setTxnPage((prev) => Math.max(1, prev - 1))}
                                            disabled={safePage <= 1}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-xs text-gray-500">Page {safePage} of {totalPages}</span>
                                        <button
                                            type="button"
                                            onClick={() => setTxnPage((prev) => Math.min(totalPages, prev + 1))}
                                            disabled={safePage >= totalPages}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </SectionWrapper>
    );
};

const ComplianceSection = ({ userId }) => {
    const [complianceEvents, setComplianceEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!userId) return;
        const loadCompliance = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await fetch(`${API_BASE_URL}/compliance/events/me`, { credentials: 'include' });
                const data = await response.json().catch(() => null);
                if (!response.ok || !data?.success) {
                    throw new Error(data?.message || 'Unable to load compliance events.');
                }
                setComplianceEvents(data.events || []);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to load compliance events.');
                setComplianceEvents([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadCompliance();
    }, [userId]);

    const complianceItems = complianceEvents.map((event) => {
        const statusKey = event.status || 'upcoming';
        return {
            description: event.rule?.name || 'Compliance filing',
            notes: event.rule?.description || event.notes,
            type: event.rule?.jurisdiction === 'state' ? 'State' : 'Federal',
            dueDate: event.dueDate,
            statusKey,
            statusLabel: statusKey.replace('_', ' '),
        };
    });

    const hasOverdue = complianceEvents.some((event) => event.status === 'overdue');
    const hasRequests = complianceEvents.some((event) => event.status === 'documents_requested');
    const hasInProgress = complianceEvents.some((event) => event.status === 'in_progress');
    const statusLabel = hasOverdue ? 'RED' : hasRequests || hasInProgress ? 'AMBER' : 'GREEN';
    const statusClass = hasOverdue ? 'text-red-600' : hasRequests || hasInProgress ? 'text-amber-600' : 'text-emerald-600';

    return (
        <SectionWrapper title="Annual Compliance Dates">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 bg-blue-50 rounded-xl mb-8 border border-blue-200">
                    <p className="text-lg font-semibold text-gray-800 flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" /> Compliance Status: <span className={`font-bold ml-2 ${statusClass}`}>{statusLabel}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Track state and federal deadlines assigned by the YourLegal compliance team.
                    </p>
                </div>

                <div className="space-y-4">
                    {isLoading && <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}
                    {errorMessage && !isLoading && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</div>
                    )}
                    {complianceItems && complianceItems.length > 0 ? (
                        complianceItems.map((item, index) => (
                        <div key={index} className="p-5 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition">
                            <div className="flex-grow space-y-1">
                                <p className="text-lg font-bold text-gray-800">{item.description}</p>
                                {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
                                {item.type && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.type === 'Federal' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
                                    {item.type}
                                </span>}
                            </div>
                            <div className="text-right flex-shrink-0 mt-3 sm:mt-0 ml-4">
                                <p className="text-sm font-semibold text-red-600 flex items-center justify-end">
                                    <Clock4 className="w-4 h-4 mr-1" /> {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'N/A'}
                                </p>
                                <p className={`text-xs font-medium mt-1 ${item.statusKey === 'upcoming' ? 'text-amber-500' : (item.statusKey === 'in_progress' ? 'text-blue-500' : item.statusKey === 'overdue' ? 'text-red-600' : 'text-gray-500')}`}>
                                    Status: {item.statusLabel}
                                </p>
                            </div>
                        </div>
                    ))
                    ) : !isLoading && !errorMessage && (
                        <div className="text-center p-8 border-dashed border-2 rounded-md">
                            <p className="text-muted-foreground">No compliance dates found.</p>
                        </div>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
};


const ConsultationSection = () => (
    <SectionWrapper title="Tax Consultation">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 bg-blue-50 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-center border border-blue-200">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Schedule Your Next Review</h2>
                    <p className="text-sm text-gray-600">Meet with a US tax expert to discuss quarterly estimates or year-end strategy.</p>
                </div>
                <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">Book Call ($199)</a>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Past Sessions (Mock)</h3>
            <p className="text-sm text-gray-600">No past sessions found.</p>
        </div>
    </SectionWrapper>
);

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const value = reader.result;
            if (typeof value !== 'string') {
                reject(new Error('Could not read file.'));
                return;
            }
            const payload = value.includes(',') ? value.split(',')[1] : value;
            resolve(payload);
        };
        reader.onerror = () => reject(new Error('Could not read file.'));
        reader.readAsDataURL(file);
    });

const TaxesSection = () => {
    const { toast } = useToast();
    const [filings, setFilings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');
    const [viewFiling, setViewFiling] = useState(null);
    const [uploadFiling, setUploadFiling] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const loadFilings = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/tax-filings/me`, { credentials: 'include' });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) {
                throw new Error(data?.message || 'Unable to load tax filings.');
            }
            setFilings(data.filings || []);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unable to load tax filings.');
            setFilings([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFilings();
    }, [loadFilings]);

    const filteredFilings = useMemo(() => {
        if (!search.trim()) return filings;
        const term = search.toLowerCase();
        return filings.filter((filing) =>
            [filing.filingName, filing.filingType, filing.taxYear, filing.company?.companyName]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(term)
        );
    }, [filings, search]);

    const stats = useMemo(() => {
        const total = filings.length;
        const pending = filings.filter((f) => f.status === 'pending').length;
        const inProgress = filings.filter((f) => f.status === 'in_progress').length;
        const waitingDocs = filings.filter((f) => f.status === 'waiting_for_documents').length;
        const filed = filings.filter((f) => f.status === 'filed').length;
        const overdue = filings.filter((f) => f.status !== 'filed' && f.dueDate && new Date(f.dueDate) < new Date()).length;
        return { total, pending, inProgress, waitingDocs, filed, overdue };
    }, [filings]);

    const statusClass = (status, isOverdue) => {
        if (isOverdue) return 'bg-red-100 text-red-700 border-red-200';
        switch (status) {
            case 'in_progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'waiting_for_documents':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'ready_to_file':
                return 'bg-sky-100 text-sky-700 border-sky-200';
            case 'filed':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    const handleUploadSubmit = async () => {
        if (!uploadFiling || !uploadFile) {
            setUploadError('Select a document to upload.');
            return;
        }
        setIsUploading(true);
        setUploadError('');
        try {
            const fileDataBase64 = await toBase64(uploadFile);
            const response = await fetch(`${API_BASE_URL}/tax-filings/${uploadFiling._id}/documents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    fileName: uploadFile.name,
                    mimeType: uploadFile.type || 'application/octet-stream',
                    fileDataBase64,
                }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) {
                throw new Error(data?.message || 'Upload failed.');
            }
            toast({ title: 'Document uploaded', description: 'Your filing documents have been sent to the team.' });
            setUploadFiling(null);
            setUploadFile(null);
            await loadFilings();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Upload failed.';
            setUploadError(message);
            toast({ variant: 'destructive', title: 'Upload failed', description: message });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <SectionWrapper title="Taxes and Filings">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <p className="text-xs text-gray-500">Total Filings</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <p className="text-xs text-gray-500">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <p className="text-xs text-gray-500">Waiting on Documents</p>
                        <p className="text-2xl font-bold text-amber-600">{stats.waitingDocs}</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Tax Filings</h2>
                            <p className="text-sm text-gray-500">Track annual reports, quarterly payments, and IRS filings.</p>
                        </div>
                        <Input
                            placeholder="Search filings..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="max-w-xs"
                        />
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                        </div>
                    )}

                    {errorMessage && !isLoading && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    {!isLoading && !errorMessage && (
                        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Filing</th>
                                        <th className="px-4 py-3">Tax Year</th>
                                        <th className="px-4 py-3">Due Date</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFilings.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                                                No tax filings found.
                                            </td>
                                        </tr>
                                    )}
                                    {filteredFilings.map((filing) => {
                                        const isOverdue = filing.status !== 'filed' && filing.dueDate && new Date(filing.dueDate) < new Date();
                                        const label = isOverdue ? 'overdue' : (filing.status || 'pending');
                                        const reportDoc = (filing.documents || []).find((doc) => doc?.source === 'legal_docs');
                                        return (
                                            <tr key={filing._id} className="border-t border-gray-100">
                                                <td className="px-4 py-4">
                                                    <p className="font-semibold text-gray-900">{filing.filingName || 'Tax Filing'}</p>
                                                    <p className="text-xs text-gray-500">{filing.company?.companyName || 'Company'}</p>
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">{filing.taxYear || '—'}</td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {filing.dueDate ? new Date(filing.dueDate).toLocaleDateString() : '—'}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${statusClass(filing.status, isOverdue)}`}>
                                                        {label.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-wrap justify-end gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setViewFiling(filing)}>
                                                            View Filing
                                                        </Button>
                                                        <Button size="sm" onClick={() => { setUploadFiling(filing); setUploadFile(null); setUploadError(''); }} disabled={filing.status === 'filed'}>
                                                            Upload Documents
                                                        </Button>
                                                        {reportDoc ? (
                                                            <a
                                                                href={`${API_BASE_URL}/documents/${reportDoc._id}/download`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <Button size="sm" variant="secondary">Download Report</Button>
                                                            </a>
                                                        ) : (
                                                            <Button size="sm" variant="secondary" disabled>Download Report</Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>Total: {stats.total}</span>
                        <span>Pending: {stats.pending}</span>
                        <span>Filed: {stats.filed}</span>
                        <span>Overdue: {stats.overdue}</span>
                    </div>
                </div>
            </div>

            <Dialog open={Boolean(viewFiling)} onOpenChange={(open) => !open && setViewFiling(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{viewFiling?.filingName || 'Tax Filing'}</DialogTitle>
                        <DialogDescription>
                            {viewFiling?.company?.companyName || 'Company'} · Tax Year {viewFiling?.taxYear || '—'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Jurisdiction</p>
                                <p className="font-medium text-gray-900">{viewFiling?.jurisdiction || '—'}</p>
                            </div>
                            <div className="rounded-lg border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Due Date</p>
                                <p className="font-medium text-gray-900">
                                    {viewFiling?.dueDate ? new Date(viewFiling.dueDate).toLocaleDateString() : '—'}
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Status</p>
                                <p className="font-medium text-gray-900">{viewFiling?.status?.replace(/_/g, ' ') || 'pending'}</p>
                            </div>
                            <div className="rounded-lg border border-gray-100 p-3">
                                <p className="text-xs text-gray-500">Assigned Admin</p>
                                <p className="font-medium text-gray-900">{viewFiling?.assignedAdmin?.name || 'Not assigned'}</p>
                            </div>
                        </div>

                        {viewFiling?.requestedDocuments?.length > 0 && (
                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">
                                <p className="font-semibold">Documents Requested</p>
                                <ul className="mt-2 space-y-1">
                                    {viewFiling.requestedDocuments.map((req, index) => (
                                        <li key={index}>{req.message || 'Documents requested.'}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <p className="font-semibold text-gray-800">Documents</p>
                            {viewFiling?.documents?.length ? (
                                <ul className="mt-2 space-y-2">
                                    {viewFiling.documents.map((doc) => (
                                        <li key={doc._id} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2">
                                            <div>
                                                <p className="font-medium text-gray-800">{doc.originalName}</p>
                                                <p className="text-xs text-gray-500">{doc.status || 'pending'}</p>
                                            </div>
                                            <a href={`${API_BASE_URL}/documents/${doc._id}/download`} target="_blank" rel="noreferrer" className="text-xs text-blue-600">
                                                Download
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-xs text-gray-500">No documents uploaded yet.</p>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">Activity Timeline</p>
                            {viewFiling?.timeline?.length ? (
                                <ul className="mt-2 space-y-2">
                                    {viewFiling.timeline.map((entry, index) => (
                                        <li key={index} className="rounded-lg border border-gray-100 px-3 py-2">
                                            <p className="text-sm font-medium text-gray-800">{entry.label}</p>
                                            <p className="text-xs text-gray-500">{entry.message}</p>
                                            <p className="text-[11px] text-gray-400">
                                                {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-xs text-gray-500">No timeline entries yet.</p>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={Boolean(uploadFiling)} onOpenChange={(open) => {
                if (!open) {
                    setUploadFiling(null);
                    setUploadFile(null);
                    setUploadError('');
                }
            }}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Upload Documents</DialogTitle>
                        <DialogDescription>
                            Upload supporting files for {uploadFiling?.filingName || 'this filing'}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Input type="file" onChange={(event) => setUploadFile(event.target.files?.[0] || null)} />
                        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setUploadFiling(null)}>Cancel</Button>
                        <Button onClick={handleUploadSubmit} disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SectionWrapper>
    );
};

import { CompanyDocuments } from '@/components/dashboard/company-documents';

const DocumentsSection = () => (
    <SectionWrapper title="My Documents">
        <CompanyDocuments />
    </SectionWrapper>
);

const SupportSection = ({ navigate }) => {
    const { user } = useAuth();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    const planPricing = {
        'Micro': { monthly: 499, yearly: 499 },
        'Vitals': { monthly: 199, yearly: 2388 },
        'Elite': { monthly: 299, yearly: 3588 },
        'Starter': { monthly: 99, yearly: 1188 },
        'Growth': { monthly: 149, yearly: 1788 },
        'Scale': { monthly: 249, yearly: 2988 }
    };

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/payment/subscription`, {
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success) {
                    setSubscription(data.subscription);
                }
            } catch (error) {
                console.error('Failed to fetch subscription:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    const getPlanDisplayInfo = () => {
        if (!user?.servicePlan) {
            return {
                name: 'No Plan',
                price: 'Contact Support',
                renewal: 'N/A'
            };
        }

        const plan = user.servicePlan;
        const pricing = planPricing[plan] || { yearly: 0 };
        const price = `$${pricing.yearly.toLocaleString()}/year`;

        let renewal = 'N/A';
        if (subscription?.current_period_end) {
            const renewalDate = new Date(subscription.current_period_end * 1000);
            renewal = renewalDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        return {
            name: `${plan} Plan`,
            price,
            renewal: renewal !== 'N/A' ? `Renews on ${renewal}` : renewal
        };
    };

    const planInfo = getPlanDisplayInfo();

    const faqs = [
        { q: "How do I upgrade my plan?", a: "You can upgrade your plan at any time from the 'Billing' section of your settings, or by clicking the 'Upgrade Plan' button on this page." },
        { q: "Where can I find my formation documents?", a: "Your official formation documents, like the Articles of Organization and EIN letter, are available for download in the 'Documents' section of your portal." },
        { q: "How do I contact support for a technical issue?", a: "For technical support, please email us at support@yourlegal.in or use the live chat feature in your portal. For legal or tax questions, please book a consultation." }
    ];

    return (
        <SectionWrapper title="Support & Help">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Plan & Contact */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Current Plan */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4 border-b pb-4">
                            <CardIcon className="w-5 h-5 mr-3 text-indigo-600" />
                            Your Current Plan
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div>
                                <h3 className="text-2xl font-extrabold text-indigo-700">{planInfo.name}</h3>
                                <p className="text-sm text-gray-600">({planInfo.price}) - {planInfo.renewal}</p>
                            </div>
                            <Button onClick={() => navigate('pricing')} className="mt-4 sm:mt-0">Upgrade Plan</Button>
                        </div>
                    </div>
                    {/* Contact Options */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4 border-b pb-4">
                          <HelpCircle className="w-5 h-5 mr-3 text-indigo-600" />
                          Get Assistance
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="mailto:support@yourlegal.in" className="p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition border border-gray-200 text-center">
                                <MailQuestion className="w-10 h-10 mx-auto text-blue-600 mb-2"/>
                                <h4 className="font-bold text-gray-800">Email Support</h4>
                                <p className="text-sm text-gray-500">support@yourlegal.in</p>
                            </a>
                            <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer" className="p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition border border-gray-200 text-center">
                                <Video className="w-10 h-10 mx-auto text-blue-600 mb-2"/>
                                <h4 className="font-bold text-gray-800">Book a Tax Call</h4>
                                <p className="text-sm text-gray-500">Schedule a 1:1 session</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: FAQs */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">
                        Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.q}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </SectionWrapper>
    );
};


const SettingsSection = ({ onLogout, userId, user, isQuickBooksLinked, onQuickBooksConnect, onQuickBooksDisconnect }) => {
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (user) {
        setProfile({
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ').slice(1).join(' ') || '',
            email: user.email || ''
        });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SectionWrapper title="Account Settings">
      <div className="space-y-12">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6 border-b pb-4">
              <UserCog className="w-5 h-5 mr-3 text-indigo-600" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={profile.email} disabled />
                </div>
            </div>
             <div className="mt-6 flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6 border-b pb-4">
              <Lock className="w-5 h-5 mr-3 text-indigo-600" />
              Password & Security
            </h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                </div>
                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                </div>
            </div>
             <div className="mt-6 flex justify-end">
                <Button>Update Password</Button>
            </div>
        </div>
        
        {/* Integrations */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6 border-b pb-4">
              <Link className="w-5 h-5 mr-3 text-indigo-600" />
              Integrations
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Yourlegal" width={24} height={24}/>
                  <div>
                    <p className="font-semibold">QuickBooks</p>
                    <p className="text-sm text-gray-500">Accounting software for real-time bookkeeping.</p>
                  </div>
                </div>
                {isQuickBooksLinked ? (
                  <Button variant="destructive" onClick={onQuickBooksDisconnect}>Disconnect</Button>
                ) : (
                  <Button onClick={onQuickBooksConnect}>Connect to QuickBooks</Button>
                )}
              </div>
            </div>
        </div>


        {/* Logout */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log Out</h2>
            <p className="text-sm text-gray-600 mb-4">
                This will log you out of your YourLegal portal on this device.
            </p>
            <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition flex items-center">
                <X className="w-5 h-5 mr-2" /> Log Out of Portal
            </button>
            <p className="mt-6 text-xs text-gray-400 border-t pt-4">User ID: {userId}</p>
        </div>

      </div>
    </SectionWrapper>
  );
};


const initialComplianceItems = [
    { id: "wyoming-annual-report", description: "Wyoming Annual Report Filing", dueDate: "2025-08-01", type: "State", status: "Upcoming", notes: "Mandatory filing to maintain LLC good standing. Requires $62 fee." },
    { id: "irs-tax-filing", description: "IRS Tax Filing (Form 1120/1065)", dueDate: "2025-03-15", type: "Federal", status: "In Progress", notes: "Due date for S-Corps and Multi-member LLCs (Partnerships)." },
    { id: "quarterly-tax", description: "Estimated Quarterly Tax Payment", dueDate: "2025-01-15", type: "Federal", status: "Upcoming", notes: "Estimated payments for income taxes if US income is generated." },
    { id: "fbar", description: "FBAR (FinCEN Form 114)", dueDate: "2025-04-15", type: "Federal", status: "Upcoming", notes: "Required if total foreign accounts exceed $10,000 at any point during the year." },
    { id: "boi-report", description: "BOI Report (FinCEN)", dueDate: "2025-01-01", type: "Federal", status: "Completed", notes: "Beneficial Ownership Information report (One-time filing for existing companies)." },
];


export default function PortalPage({ onLogout }) {
    const { user } = useAuth();
    const [activePath, setActivePath] = useState('dashboard');
    const { toast } = useToast();
    const resolvedUserId = user?.id || user?._id;
    
    const [isQuickBooksLinked, setIsQuickBooksLinked] = useState(false);
    const [qbBills, setQbBills] = useState([]);
    const [qbInvoices, setQbInvoices] = useState([]);
    const [qbTransactions, setQbTransactions] = useState([]);
    const [qbPnlData, setQbPnlData] = useState(null);
    const [qbBalanceSheetData, setQbBalanceSheetData] = useState(null);
    const [qbCashFlowData, setQbCashFlowData] = useState(null);
    const [qbAccounts, setQbAccounts] = useState([]);
    const [qbLoading, setQbLoading] = useState(false);
    const [qbError, setQbError] = useState<string | null>(null);
    const [qbLastSyncAt, setQbLastSyncAt] = useState<Date | null>(null);
    const [myDocuments, setMyDocuments] = useState([]);
    const [myFormations, setMyFormations] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [userDataLoading, setUserDataLoading] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch(`${QUICKBOOKS_API_BASE}/status`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setIsQuickBooksLinked(data.connected || false);
            } catch (error) {
                setIsQuickBooksLinked(false);
            }
        };
        if (user) {
            checkConnection();
        }
    }, [user]);

    const extractReportRows = (rows: any[] = [], acc: any[] = []) => {
        rows.forEach((row) => {
            if (row?.ColData) {
                acc.push(row.ColData);
            }
            if (row?.Rows?.Row?.length) {
                extractReportRows(row.Rows.Row, acc);
            }
        });
        return acc;
    };

    const parseTransactionReport = (report: any) => {
        const columns = report?.Columns?.Column || [];
        const titles = columns.map((col: any) => col?.ColTitle || col?.Name || '');
        const rows = extractReportRows(report?.Rows?.Row || []);

        return rows
            .map((colData: any[], index: number) => {
                const record: Record<string, string> = {};
                colData.forEach((col, i) => {
                    record[titles[i] || `col_${i}`] = col?.value ?? col?.id ?? '';
                });

                const rawDebit = record.Debit || record['Debit'];
                const rawCredit = record.Credit || record['Credit'];
                const rawAmount = record.Amount || record['Amount'] || record['Amount (Currency)'];

                const debit = rawDebit ? Number(String(rawDebit).replace(/,/g, '')) : 0;
                const credit = rawCredit ? Number(String(rawCredit).replace(/,/g, '')) : 0;
                let amount = rawAmount ? Number(String(rawAmount).replace(/,/g, '')) : 0;

                if (Number.isFinite(credit) || Number.isFinite(debit)) {
                    amount = (Number.isFinite(credit) ? credit : 0) - (Number.isFinite(debit) ? debit : 0);
                }

                const date =
                    record.Date ||
                    record['Txn Date'] ||
                    record['Transaction Date'] ||
                    record['Doc Date'] ||
                    '';
                const type =
                    record.Type ||
                    record['Transaction Type'] ||
                    record['Txn Type'] ||
                    'Transaction';
                const name =
                    record.Name ||
                    record['Name'] ||
                    record['Vendor'] ||
                    record['Customer'] ||
                    record['Account'] ||
                    'N/A';
                const memo = record['Memo/Description'] || record.Memo || record.Description || '';

                return {
                    id: `txn-${index}-${date}-${amount}`,
                    date,
                    type,
                    name,
                    memo,
                    amount: Number.isFinite(amount) ? amount : 0,
                };
            })
            .filter((row) => row.date || row.name || row.amount);
    };

    const loadQuickBooksData = useCallback(async () => {
        if (!isQuickBooksLinked || !user) return;
        setQbLoading(true);
        setQbError(null);
        try {
            const [billsRes, invoicesRes, pnlRes, balanceSheetRes, cashFlowRes, accountsRes, transactionsRes] = await Promise.all([
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Bill' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Invoice' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'reports/ProfitAndLoss' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'reports/BalanceSheet' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'reports/CashFlow' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Account' })
                }),
                fetch(`${QUICKBOOKS_API_BASE}/proxy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ method: 'GET', url: 'reports/TransactionList' })
                })
            ]);

            const billsData = await billsRes.json();
            const invoicesData = await invoicesRes.json();
            const pnlData = await pnlRes.json();
            const balanceSheetData = await balanceSheetRes.json();
            const cashFlowData = await cashFlowRes.json();
            const accountsData = await accountsRes.json();
            const transactionsData = await transactionsRes.json();

            setQbBills(billsData?.QueryResponse?.Bill || []);
            setQbInvoices(invoicesData?.QueryResponse?.Invoice || []);
            setQbPnlData(pnlData || null);
            setQbBalanceSheetData(balanceSheetData || null);
            setQbCashFlowData(cashFlowData || null);
            setQbAccounts(accountsData?.QueryResponse?.Account || []);
            setQbTransactions(parseTransactionReport(transactionsData || {}));
            setQbLastSyncAt(new Date());
        } catch (error) {
            console.error(error);
            setQbError('Failed to fetch data from QuickBooks.');
        } finally {
            setQbLoading(false);
        }
    }, [isQuickBooksLinked, user]);

    useEffect(() => {
        if (!isQuickBooksLinked || !user) {
            setQbBills([]);
            setQbInvoices([]);
            setQbPnlData(null);
            setQbBalanceSheetData(null);
            setQbCashFlowData(null);
            setQbAccounts([]);
            setQbLoading(false);
            setQbError(null);
            setQbLastSyncAt(null);
            return;
        }

        loadQuickBooksData();
    }, [isQuickBooksLinked, user, loadQuickBooksData]);

    useEffect(() => {
        if (!user) {
            setMyDocuments([]);
            setMyFormations([]);
            setMyOrders([]);
            setUserDataLoading(false);
            return;
        }

        const loadUserData = async () => {
            setUserDataLoading(true);
            try {
                const [docsRes, formationsRes, ordersRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/documents/me`, { credentials: 'include' }),
                    fetch(`${API_BASE_URL}/formations/me`, { credentials: 'include' }),
                    fetch(`${API_BASE_URL}/orders/me`, { credentials: 'include' })
                ]);

                const docsData = await docsRes.json();
                const formationsData = await formationsRes.json();
                const ordersData = await ordersRes.json();

                setMyDocuments(docsData?.documents || []);
                setMyFormations(formationsData?.formations || []);
                setMyOrders(ordersData?.orders || []);
            } catch (error) {
                console.error(error);
            } finally {
                setUserDataLoading(false);
            }
        };

        loadUserData();
    }, [user]);

    const handleQuickBooksConnect = async () => {
        if (user) {
            try {
                const response = await fetch(`${QUICKBOOKS_API_BASE}/auth-url`, {
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.authUrl) {
                    window.location.href = data.authUrl;
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Connection Failed',
                    description: 'Unable to connect to QuickBooks',
                });
            }
        }
    };

    const handleQuickBooksDisconnect = async () => {
        try {
            await fetch(`${QUICKBOOKS_API_BASE}/disconnect`, {
                method: 'POST',
                credentials: 'include',
            });
            setIsQuickBooksLinked(false);
            toast({
                title: 'Disconnected',
                description: 'QuickBooks has been disconnected',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to disconnect QuickBooks',
            });
        }
    };

      useEffect(() => {
          if (typeof window !== 'undefined') {
              const params = new URLSearchParams(window.location.search);
              const qbStatus = params.get('qb_status');
              const page = params.get('page');

              if (page === 'settings') {
                  setActivePath('settings');
              }
              if (page === 'banking') {
                  setActivePath('banking');
              }

              if (qbStatus === 'success') {
                  setIsQuickBooksLinked(true);
                  toast({
                      title: 'QuickBooks Connected!',
                      description: 'Your QuickBooks account has been successfully linked.',
                  });
                  window.history.replaceState(null, '', window.location.pathname);
              } else if (qbStatus === 'error') {
                  toast({
                      variant: 'destructive',
                      title: 'QuickBooks Connection Failed',
                      description: 'Something went wrong. Please try connecting again.',
                  });
                  window.history.replaceState(null, '', window.location.pathname);
              }
          }
      }, [toast]);

    const bankAccountCount = useMemo(() => {
        return (qbAccounts || []).filter(account => account?.AccountType === 'Bank').length;
    }, [qbAccounts]);

    const financialSnapshot = useMemo(() => {
        if (!isQuickBooksLinked) return [];
        const now = new Date();
        const months = [];
        for (let i = 3; i >= 0; i -= 1) {
            months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
        }

        const map = new Map();
        months.forEach(d => {
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            map.set(key, {
                month: d.toLocaleString('en-US', { month: 'short' }),
                revenue: 0,
                expense: 0,
            });
        });

        const safeAmount = (value) => {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };

        const addAmount = (dateStr, amount, field) => {
            if (!dateStr) return;
            const d = new Date(dateStr);
            if (Number.isNaN(d.getTime())) return;
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            const row = map.get(key);
            if (row) {
                row[field] += amount;
            }
        };

        (qbInvoices || []).forEach(inv => {
            const amt = safeAmount(inv?.TotalAmt ?? inv?.Balance);
            addAmount(inv?.TxnDate, amt, 'revenue');
        });

        (qbBills || []).forEach(bill => {
            const amt = safeAmount(bill?.TotalAmt ?? bill?.Balance);
            addAmount(bill?.TxnDate, amt, 'expense');
        });

        return months.map(d => {
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            return map.get(key) || {
                month: d.toLocaleString('en-US', { month: 'short' }),
                revenue: 0,
                expense: 0,
            };
        });
    }, [isQuickBooksLinked, qbBills, qbInvoices]);

    const dashboardMetrics = useMemo(() => {
        const pendingDocs = (myDocuments || []).filter(doc => doc?.status === 'pending');
        const formationsNeedingDocs = (myFormations || []).filter(formation => formation?.status === 'documents_required');
        const formationsInProgress = (myFormations || []).filter(formation => ['pending', 'processing', 'filed'].includes(formation?.status));
        const activeOrders = (myOrders || []).filter(order => ['pending', 'confirmed', 'in_progress'].includes(order?.status));

        let complianceValue = 'All Clear';
        let complianceColor = 'text-emerald-500';
        let complianceBg = 'bg-emerald-50';
        let complianceTooltip = 'No pending compliance items detected.';

        if (pendingDocs.length > 0 || formationsNeedingDocs.length > 0) {
            complianceValue = 'Action Required';
            complianceColor = 'text-red-500';
            complianceBg = 'bg-red-50';
            complianceTooltip = 'Pending documents or formation items require your attention.';
        } else if (formationsInProgress.length > 0) {
            complianceValue = 'In Progress';
            complianceColor = 'text-amber-500';
            complianceBg = 'bg-amber-50';
            complianceTooltip = 'Formation tasks are currently in progress.';
        }

        const upcomingDueDates = [
            ...(qbInvoices || []).map(inv => inv?.DueDate).filter(Boolean),
            ...(qbBills || []).map(bill => bill?.DueDate).filter(Boolean)
        ]
            .map(dateStr => new Date(dateStr))
            .filter(date => !Number.isNaN(date.getTime()) && date >= new Date())
            .sort((a, b) => a.getTime() - b.getTime());

        const nextDueDate = upcomingDueDates[0] || null;
        const nextDueLabel = nextDueDate
            ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(nextDueDate)
            : 'Not available';

        const uncategorizedCount = (qbBills || []).reduce((count, bill) => {
            const lines = Array.isArray(bill?.Line) ? bill.Line : [];
            const hasMissingAccount = lines.some(line => !line?.AccountBasedExpenseLineDetail?.AccountRef);
            return count + (hasMissingAccount ? 1 : 0);
        }, 0);

        const totalCash = (qbAccounts || [])
            .filter(account => account?.AccountType === 'Bank')
            .reduce((sum, account) => {
                const value = Number(account?.CurrentBalance ?? account?.CurrentBalanceWithSubAccounts ?? 0);
                return sum + (Number.isFinite(value) ? value : 0);
            }, 0);

        return [
            {
                title: "Compliance Status",
                value: complianceValue,
                icon: ShieldCheck,
                color: complianceColor,
                bgColor: complianceBg,
                tooltip: complianceTooltip
            },
            {
                title: "Tax Deadline",
                value: nextDueLabel,
                icon: Clock4,
                color: nextDueDate ? "text-indigo-500" : "text-gray-400",
                bgColor: nextDueDate ? "bg-indigo-50" : "bg-gray-100",
                tooltip: nextDueDate ? "Next upcoming due date from QuickBooks bills/invoices." : "No upcoming deadlines available."
            },
            {
                title: "Uncategorized Transactions",
                value: `${uncategorizedCount}`,
                icon: PiggyBank,
                color: "text-amber-500",
                bgColor: "bg-amber-50",
                tooltip: "Bills missing account categorization."
            },
            {
                title: "Bank Balance",
                value: `$${totalCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                icon: DollarSign,
                color: "text-blue-500",
                bgColor: "bg-blue-50",
                tooltip: "Current balance across linked bank accounts."
            }
        ];
    }, [myDocuments, myFormations, qbInvoices, qbBills, qbAccounts]);

    const dashboardTasks = useMemo(() => {
        const tasks = [];
        const pendingDocs = (myDocuments || []).filter(doc => doc?.status === 'pending');
        const formationsNeedingDocs = (myFormations || []).filter(formation => formation?.status === 'documents_required');
        const formationsInProgress = (myFormations || []).filter(formation => ['pending', 'processing', 'filed'].includes(formation?.status));
        const activeOrders = (myOrders || []).filter(order => ['pending', 'confirmed', 'in_progress'].includes(order?.status));

        const now = new Date();
        const overdueInvoices = (qbInvoices || []).filter(inv => inv?.Balance > 0 && inv?.DueDate && new Date(inv.DueDate) < now);
        const overdueBills = (qbBills || []).filter(bill => bill?.Balance > 0 && bill?.DueDate && new Date(bill.DueDate) < now);

        if (!isQuickBooksLinked) {
            tasks.push({
                id: 'task_qb_connect',
                title: 'Connect QuickBooks',
                status: 'Action Required',
                due: 'ASAP',
                icon: Link,
                priority: 'Critical'
            });
        }

        if (pendingDocs.length > 0) {
            tasks.push({
                id: 'task_docs_pending',
                title: `Upload pending documents (${pendingDocs.length})`,
                status: 'Pending',
                due: 'ASAP',
                icon: Upload,
                priority: 'High'
            });
        }

        if (formationsNeedingDocs.length > 0) {
            tasks.push({
                id: 'task_formation_docs',
                title: `Provide formation documents (${formationsNeedingDocs.length})`,
                status: 'Action Required',
                due: 'ASAP',
                icon: FileText,
                priority: 'High'
            });
        }

        if (formationsInProgress.length > 0) {
            tasks.push({
                id: 'task_formation_progress',
                title: `Formation in progress (${formationsInProgress.length})`,
                status: 'In Progress',
                due: 'In review',
                icon: Briefcase,
                priority: 'Medium'
            });
        }

        if (overdueInvoices.length > 0) {
            tasks.push({
                id: 'task_overdue_invoices',
                title: `Collect overdue invoices (${overdueInvoices.length})`,
                status: 'Overdue',
                due: 'Past due',
                icon: DollarSign,
                priority: 'High'
            });
        }

        if (overdueBills.length > 0) {
            tasks.push({
                id: 'task_overdue_bills',
                title: `Pay overdue bills (${overdueBills.length})`,
                status: 'Overdue',
                due: 'Past due',
                icon: TrendingDown,
                priority: 'High'
            });
        }

        if (activeOrders.length > 0) {
            tasks.push({
                id: 'task_active_orders',
                title: `Service orders in progress (${activeOrders.length})`,
                status: 'In Progress',
                due: 'Tracking',
                icon: ShoppingCart,
                priority: 'Medium'
            });
        }

        if (tasks.length === 0) {
            tasks.push({
                id: 'task_all_clear',
                title: 'All caught up',
                status: 'Up to date',
                due: 'No pending items',
                icon: CheckCircle,
                priority: 'Low'
            });
        }

        return tasks;
    }, [myDocuments, myFormations, myOrders, qbInvoices, qbBills, isQuickBooksLinked]);




    const handleNavigation = (path) => setActivePath(path);

    const SidebarNav = ({ name, icon: Icon, path }) => {
        const isActive = activePath === path;
        return (
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation(path); }} className={`flex items-center p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{name}</span>
            </a>
        );
    };

    const CollapsibleSidebarNav = ({ name, icon: Icon, path, subItems }) => {
        const isParentActive = activePath.startsWith(path);
        const [isOpen, setIsOpen] = useState(isParentActive);

        useEffect(() => {
            if (isParentActive) {
                setIsOpen(true);
            }
        }, [isParentActive]);

        return (
            <div className="space-y-1">
                <button 
                    onClick={() => {
                        setIsOpen(!isOpen);
                        if (!isOpen && subItems.length > 0) {
                            handleNavigation(subItems[0].path);
                        } else if (!isParentActive) {
                             handleNavigation(path);
                        }
                    }} 
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${isParentActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                    <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">{name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="pl-8 pt-1 space-y-1">
                        {subItems.map(item => (
                            <a key={item.path} href="#" onClick={(e) => { e.preventDefault(); handleNavigation(item.path); }} className={`flex items-center p-2 rounded-lg transition-all duration-200 text-sm ${activePath === item.path ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-500 hover:bg-gray-100'}`}>
                                <item.icon className="w-4 h-4 mr-2" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        );
    };
    
    const renderSection = () => {
        if (activePath.startsWith('bookkeeping')) {
                return (
              <BookkeepingSection
                  activePath={activePath}
                  isQuickBooksLinked={isQuickBooksLinked}
                  onNavigate={handleNavigation}
                  userId={resolvedUserId}
                  onQuickBooksConnect={handleQuickBooksConnect}
                  bills={qbBills}
                  invoices={qbInvoices}
                  pnlData={qbPnlData}
                  balanceSheetData={qbBalanceSheetData}
                  cashFlowData={qbCashFlowData}
                  accounts={qbAccounts}
                  isLoading={qbLoading}
                  error={qbError}
                  bankAccountCount={bankAccountCount}
                  lastSyncAt={qbLastSyncAt}
                  financialSnapshot={financialSnapshot}
                  onQuickBooksRefresh={loadQuickBooksData}
                />
              );
          }

        switch (activePath) {
            case 'dashboard': return <DashboardContent user={user} navigate={handleNavigation} isQuickBooksLinked={isQuickBooksLinked} financialSnapshot={financialSnapshot} isQuickBooksLoading={qbLoading} lastSyncAt={qbLastSyncAt} metrics={dashboardMetrics} tasks={dashboardTasks} isUserDataLoading={userDataLoading} />;
            case 'company': return <CompanySection userId={resolvedUserId} formations={myFormations} documents={myDocuments} isLoading={userDataLoading} />;
            case 'services': return <ServicesSection orders={myOrders} userRegion={user?.region} />;
            case 'banking':
                return (
                    <BankingSection
                        isQuickBooksLinked={isQuickBooksLinked}
                        accounts={qbAccounts}
                        bills={qbBills}
                        invoices={qbInvoices}
                        transactions={qbTransactions}
                        lastSyncAt={qbLastSyncAt}
                        onConnect={handleQuickBooksConnect}
                        onDisconnect={handleQuickBooksDisconnect}
                        onRefresh={loadQuickBooksData}
                        isLoading={qbLoading}
                    />
                );
            case 'consultation': return <ConsultationSection />;
            case 'taxes': return <TaxesSection />;
            case 'documents': return <DocumentsSection />;
            case 'compliance': return <ComplianceSection userId={resolvedUserId} />;
            case 'settings': return <SettingsSection onLogout={onLogout} userId={resolvedUserId} user={user} isQuickBooksLinked={isQuickBooksLinked} onQuickBooksConnect={handleQuickBooksConnect} onQuickBooksDisconnect={handleQuickBooksDisconnect} />;
            case 'support': return <SupportSection navigate={handleNavigation} />;
            default: return <DashboardContent user={user} navigate={handleNavigation} isQuickBooksLinked={isQuickBooksLinked} financialSnapshot={financialSnapshot} isQuickBooksLoading={qbLoading} lastSyncAt={qbLastSyncAt} metrics={dashboardMetrics} tasks={dashboardTasks} isUserDataLoading={userDataLoading} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-inter">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 p-6 shadow-2xl z-20">
                <div className="mb-12">
                    <Image src="/logo.png" alt="YourLegal Logo" width={150} height={35} />
                </div>
                <nav className="flex-grow space-y-2">
                    {navItems.map(item => (
                        item.subItems ? (
                            <CollapsibleSidebarNav key={item.path} {...item} />
                        ) : (
                            <SidebarNav key={item.path} {...item} />
                        )
                    ))}
                </nav>
                <div className="space-y-3 pt-6 border-t border-gray-100 mt-6">
                    <SidebarNav name="Support & Help" icon={LifeBuoy} path="support" />
                    <SidebarNav name="Settings" icon={Settings} path="settings" />
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200 lg:px-10">
                    <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                        {navItems.flatMap(i => i.subItems ? [i, ...i.subItems] : [i]).find(i => i.path === activePath)?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <NotificationsMenu />
                        <User className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition" />
                        <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
                            Logout
                        </button>
                    </div>
                </header>
                {renderSection()}
            </main>
        </div>
    );
};
