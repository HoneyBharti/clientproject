'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef, useActionState } from 'react';
import Image from 'next/image';
import { 
    LayoutGrid, Building, Folder, Calendar, PiggyBank, Sparkles, Users, Settings, User, CheckCircle, Hourglass, 
    ChevronRight, Bell, Mail, Bot, LifeBuoy, X, FileText, Upload, Clock, Briefcase, DollarSign, Zap, PhoneCall, 
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
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';


// =====================================================================
// --- DASHBOARD PORTAL COMPONENTS ---
// =====================================================================

// Mock Data for the Enhanced Dashboard
const mockMetrics = [
    { title: "Compliance Status", value: "Green: All Clear", icon: ShieldCheck, color: "text-emerald-500", bgColor: "bg-emerald-50", tooltip: "All state and federal deadlines are met." },
    { title: "Tax Deadline", value: "Jan 15, 2026", icon: Clock4, color: "text-indigo-500", bgColor: "bg-indigo-50", tooltip: "Next estimated tax payment date." },
    { title: "Uncategorized Transactions", value: "8", icon: PiggyBank, color: "text-amber-500", bgColor: "bg-amber-50", tooltip: "Action required in Bookkeeping." },
    { title: "Mock Bank Balance", value: "$12,450.00", icon: DollarSign, color: "text-blue-500", bgColor: "bg-blue-50", tooltip: "Current balance in linked accounts." },
];

const mockTasks = [
    { id: 1, title: "Review Initial Formation Documents", status: "Pending", due: "Due in 1 day", icon: FileText, priority: "High" },
    { id: 2, title: "Connect Mercury Bank Account", status: "Action Required", due: "ASAP", icon: Link, priority: "Critical" },
    { id: 3, title: "Approve Q4 Bookkeeping Summary", status: "Due Soon", due: "Oct 31", icon: Briefcase, priority: "Medium" },
];

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

const FinancialSnapshot = ({ isQuickBooksLinked }) => {
    // Mock data for a visual snapshot (not a real chart library)
    const mockData = [
        { month: 'Jul', revenue: 5000, expense: 1500 },
        { month: 'Aug', revenue: 7500, expense: 2200 },
        { month: 'Sep', revenue: 9000, expense: 2500 },
        { month: 'Oct', revenue: 11000, expense: 3000 },
    ];
    
    // Simple bar chart visualization using divs
    const maxRevenue = Math.max(...mockData.map(d => d.revenue));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" /> Financial Snapshot
                </h3>
                {isQuickBooksLinked && (
                     <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
                    </div>
                )}
            </div>
            <p className="text-sm text-gray-500 mb-4 -mt-2">Last 4 Months Performance</p>
            <div className="flex justify-between text-sm text-gray-500 mb-4 border-b pb-2">
                <p>Month</p>
                <p>Revenue / Expense</p>
            </div>
            <div className="space-y-4">
                {mockData.map((data, index) => (
                    <div key={index} className="space-y-1">
                        <p className="text-xs font-medium text-gray-700">{data.month}</p>
                        <div className="flex items-center space-x-2">
                            {/* Revenue Bar */}
                            <div className="relative h-4 flex-grow rounded-full bg-gray-100">
                                <div 
                                    className="h-full bg-emerald-500 rounded-full" 
                                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                                ></div>
                                <span className="absolute right-0 top-0.5 text-xs text-emerald-800 font-bold pr-2">${(data.revenue/1000).toFixed(1)}K</span>
                            </div>
                            {/* Expense Dot */}
                            <div className="w-1/4 relative h-4 rounded-full">
                                <span className="absolute left-0 text-xs text-red-500 font-bold">${(data.expense/1000).toFixed(1)}K</span>
                                <div className="w-2 h-2 rounded-full bg-red-500 absolute right-0 top-1/2 -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-around text-xs mt-6 pt-4 border-t border-gray-100">
                <span className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span> Revenue</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Expenses</span>
            </div>
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

const DashboardContent = ({ user, navigate, isQuickBooksLinked }) => {
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
            {mockMetrics.map((metric, index) => (
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
                        {mockTasks.map(task => (
                            <TaskItem key={task.id} {...task} />
                        ))}
                    </div>
                </div>
                
                {/* Financial Snapshot */}
                <FinancialSnapshot isQuickBooksLinked={isQuickBooksLinked} />

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

// Services List Data
const servicesList = [
    { id: 'tm', title: 'Trademark Registration', price: 499, description: 'Protect your brand name and logo with a US Federal Trademark.', icon: Award, category: 'IP Protection' },
    { id: 'scorp', title: 'S-Corp Election (Form 2553)', price: 149, description: 'Reduce self-employment taxes by electing S-Corp status with the IRS.', icon: FileText, category: 'Tax Strategy' },
    { id: 'cgs', title: 'Certificate of Good Standing', price: 99, description: 'Official state document proving your business is compliant.', icon: ShieldCheck, category: 'Compliance' },
    { id: 'foreign', title: 'Foreign Qualification', price: 249, description: 'Register your existing LLC to do business in another state.', icon: Globe, category: 'Expansion' },
    { id: 'amend', title: 'Articles of Amendment', price: 199, description: 'Change your company name, address, or member structure.', icon: Settings, category: 'Legal' },
    { id: 'ein_foreign', title: 'ITIN Application', price: 300, description: 'Individual Taxpayer Identification Number for non-US residents.', icon: User, category: 'Tax ID' },
];

const ServicesSection = () => {
    const [purchasing, setPurchasing] = useState(null); // ID of service being purchased
    const [purchasedServices, setPurchasedServices] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleBuyClick = (service) => {
        setPurchasing(service);
        setShowPaymentModal(true);
    };

    const confirmPurchase = () => {
        // Simulate API call and payment processing
        setTimeout(() => {
            setPurchasedServices([...purchasedServices, purchasing.id]);
            setShowPaymentModal(false);
            setPurchasing(null);
            // In a real app, we would show a success toast here
        }, 1500);
    };

    return (
        <SectionWrapper title="Additional Services & Compliance Add-ons">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <p className="text-gray-600 mb-8">Scale your business with our premium legal and tax services. Secure, one-click compliance.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {servicesList.map(service => {
                        const isPurchased = purchasedServices.includes(service.id);
                        return (
                            <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold uppercase rounded-md">{service.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 mb-6 flex-grow">{service.description}</p>
                                
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xl font-bold text-gray-900">${service.price}</span>
                                    {isPurchased ? (
                                        <button disabled className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-sm flex items-center cursor-default">
                                            <CheckCircle className="w-4 h-4 mr-1" /> Purchased
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleBuyClick(service)}
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
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><purchasing.icon className="w-6 h-6" /></div>
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
                                <button onClick={confirmPurchase} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center">
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

const CompanySection = ({ userId }) => {
    const company = {
        name: 'ACME Innovations LLC',
        formationState: 'Wyoming',
        registeredAgent: 'YourLegal RA Services Inc.',
        ein: '88-1234567',
        incorporationDate: new Date().toISOString()
    };
    const isLoading = false;

    const formationSteps = [
        { label: 'Name Check', status: 'completed', date: 'Aug 10, 2024', details: 'ACME Innovations LLC Available' },
        { label: 'Filing Prep', status: 'completed', date: 'Aug 11, 2024', details: 'Articles of Organization drafted' },
        { label: 'State Filing', status: 'completed', date: 'Aug 12, 2024', details: 'Submitted to WY SOS' },
        { label: 'Approved', status: 'completed', date: 'Aug 15, 2024', details: 'Filing ID: 2024-000123' },
    ];

    const einSteps = [
        { label: 'SS-4 Application', status: 'completed', date: 'Aug 15, 2024', details: 'Form 100% Complete' },
        { label: 'IRS Submission', status: 'completed', date: 'Aug 16, 2024', details: 'Digital submission accepted' },
        { label: 'Processing', status: 'in progress', date: 'Pending', details: 'IRS Reference #123456' },
        { label: 'Allotment', status: 'pending', date: 'Est. 1-2 days', details: 'Waiting for EIN assignment' },
    ];
    
    const complianceSteps = [
        { label: 'Operating Agreement', status: 'in progress', date: 'Action Required', details: 'Sign & Upload' },
        { label: 'Initial Resolutions', status: 'pending', date: 'After Formation', details: 'Banking authorization' },
        { label: 'BOI Report', status: 'pending', date: 'Within 90 days', details: 'File with FinCEN' },
        { label: 'Good Standing', status: 'current', date: 'Active', details: 'Next Report: Aug 2025' },
    ];

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
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Active / Good Standing</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Legal Entity Name</p>
                                    <p className="text-gray-900 font-medium">{company.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Formation State</p>
                                    <p className="text-gray-900 font-medium flex items-center"><MapPin className="w-3 h-3 mr-1 text-gray-400"/> {company.formationState}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Filing Date</p>
                                    <p className="text-gray-900 font-medium">{company.incorporationDate ? new Date(company.incorporationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Employer ID (EIN)</p>
                                    <p className="text-gray-900 font-medium font-mono">{company.ein}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Registered Agent</p>
                                    <p className="text-gray-900 font-medium">{company.registeredAgent}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">123 Capitol Ave, Cheyenne, WY 82001</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Mailing Address</p>
                                    <p className="text-gray-900 font-medium">123 Innovation Dr, Suite 400</p>
                                    <p className="text-gray-500 text-xs mt-0.5">San Francisco, CA 94105</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Authorized Members</p>
                                    <div className="flex items-center mt-1">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2">JD</div>
                                        <span className="text-gray-900">John Doe (100%)</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Internal ID</p>
                                    <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{userId || 'USR-78901'}</code>
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
                                <li className="flex items-center text-sm text-gray-700 bg-white p-2 rounded shadow-sm cursor-pointer hover:bg-gray-50">
                                    <FileText className="w-4 h-4 mr-2 text-red-500"/> Articles of Org.pdf
                                </li>
                                <li className="flex items-center text-sm text-gray-700 bg-white p-2 rounded shadow-sm cursor-pointer hover:bg-gray-50">
                                    <FileText className="w-4 h-4 mr-2 text-red-500"/> EIN CP-575.pdf
                                </li>
                                <li className="flex items-center text-sm text-gray-500 bg-white/60 p-2 rounded shadow-sm cursor-not-allowed">
                                    <Hourglass className="w-4 h-4 mr-2 text-gray-400 animate-spin"/> Operating Agreement (In Progress)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timelines */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Formation & Compliance History</h2>
                <Timeline title="Formation Progress" steps={formationSteps} />
                <Timeline title="EIN Application & Allotment" steps={einSteps} />
                <Timeline title="Initial Compliance Setup" steps={complianceSteps} />
                </>
                )}
            </div>
        </SectionWrapper>
    );
};

// Sub-components for Bookkeeping
const BookkeepingOverview = ({ isQuickBooksLinked }) => (
    <>
        <div className="p-6 bg-indigo-50 rounded-xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-indigo-200">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Bank Feed Status</h2>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">Last Synced: 5 minutes ago (3 accounts connected)</p>
                    {isQuickBooksLinked && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">via QuickBooks</span>}
                </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition mt-3 sm:mt-0">View Transactions</button>
        </div>
        <FinancialSnapshot isQuickBooksLinked={isQuickBooksLinked} />
    </>
);


// --- New Components for Bookkeeping ---

const RecentTransactions = ({ isQuickBooksLinked, transactions, isLoading }) => {
    
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
                                <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
                            </div>
                        )}
                        <div className="space-x-2">
                            <button className="text-sm text-gray-600 font-medium px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">Filter</button>
                            <button className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100">Export CSV</button>
                        </div>
                    </div>
                </div>
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
                            {transactions.map((tx) => (
                                <React.Fragment key={tx.Id}>
                                    <tr className="bg-white border-b hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-gray-500">{tx.TxnDate}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{tx.Line[0].Description || 'N/A'}</td>
                                         <td className="px-6 py-4 text-gray-500">{tx.VendorRef?.name || 'N/A'}</td>
                                        <td className={`px-6 py-4 text-right font-bold ${tx.TotalAmt > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                            {tx.TotalAmt > 0 ? '+' : ''}{tx.TotalAmt.toFixed(2)}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const InvoicingSection = ({ isQuickBooksLinked, invoices, isLoading }) => {
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                <p className="ml-3 text-gray-500">Fetching invoices from QuickBooks...</p>
            </div>
        )
    }

    const overdueAmount = invoices?.filter(inv => inv.Balance > 0 && new Date(inv.DueDate) < new Date()).reduce((acc, inv) => acc + inv.Balance, 0) || 0;
    const dueSoonAmount = invoices?.filter(inv => inv.Balance > 0 && new Date(inv.DueDate) >= new Date()).reduce((acc, inv) => acc + inv.Balance, 0) || 0;

    return (
        <div className="space-y-6">
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
                        <p className="text-2xl font-bold text-green-600">$0.00</p>
                    </div>
                </div>
                 <button className="px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center whitespace-nowrap">
                    <Plus className="w-5 h-5 mr-2" /> {isQuickBooksLinked ? 'Create in QuickBooks' : 'Create Invoice'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Invoice History</h3>
                    {isQuickBooksLinked && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
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
                                            {inv.Balance === 0 ? 'Paid' : (new Date(inv.DueDate) < new Date() ? 'Overdue' : 'Sent')}
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
        </div>
    );
};

const ChartOfAccounts = ({ isQuickBooksLinked, userId }) => {
    const { toast } = useToast();
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountType, setNewAccountType] = useState('Expense');

    const accountTypes = ["Bank", "AccountsReceivable", "OtherCurrentAsset", "FixedAsset", "OtherAsset", "AccountsPayable", "CreditCard", "OtherCurrentLiability", "LongTermLiability", "OtherLiability", "Equity", "Income", "OtherIncome", "CostOfGoodsSold", "Expense", "OtherExpense"];


    const fetchAccounts = useCallback(async () => {
        if (!isQuickBooksLinked || !userId) return;
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/quickbooks/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    method: 'GET',
                    url: 'query?query=select * from Account'
                })
            });
            const data = await response.json();
            setAccounts(data?.QueryResponse?.Account || []);
        } catch (error) {
            console.error("Error fetching accounts:", error);
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

        const newAccountPayload = {
            Name: newAccountName,
            AccountType: newAccountType,
        };

        try {
            const response = await fetch('http://localhost:5000/api/quickbooks/proxy', {
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
            if (!response.ok) throw new Error(data.message);
            
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
                        <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
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
                            <p className="text-gray-500">No accounts found. Connect to QuickBooks to get started.</p>
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

const BookkeepingReports = ({ isQuickBooksLinked, pnlData, isLoading }) => {
    const [showPnl, setShowPnl] = useState(false);

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
                        <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => setShowPnl(true)} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 text-blue-700 font-semibold transition flex items-center justify-center flex-col" disabled={!pnlData}>
                    <BarChart3 className="w-6 h-6 mb-2" /> P&L Statement
                </button>
                <button className="p-4 bg-gray-100 rounded-xl border border-gray-200 text-gray-400 font-semibold transition flex items-center justify-center flex-col" disabled>
                    <DollarSign className="w-6 h-6 mb-2" /> Balance Sheet
                </button>
                <button className="p-4 bg-gray-100 rounded-xl border border-gray-200 text-gray-400 font-semibold transition flex items-center justify-center flex-col" disabled>
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
        </div>
    );
};


const ARAPSection = ({ isQuickBooksLinked }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Accounts Receivable (AR) / Accounts Payable (AP)</h2>
                <p className="text-gray-600">Manage invoices and bills due to and from your business.</p>
            </div>
            {isQuickBooksLinked && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={80} height={15} />
                </div>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-md">
                <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Accounts Receivable</h3>
                <p className="text-3xl font-bold text-green-600">$4,000.00</p>
                <p className="text-sm text-gray-600 mt-1">1 overdue invoice, 3 pending.</p>
                <button className="mt-3 text-xs text-green-600 font-medium hover:underline">View Invoices</button>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-md">
                <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center"><TrendingDown className="w-4 h-4 mr-2" /> Accounts Payable</h3>
                <p className="text-3xl font-bold text-red-600">$1,200.00</p>
                <p className="text-sm text-gray-600 mt-1">2 vendor bills due next week.</p>
                <button className="mt-3 text-xs text-red-600 font-medium hover:underline">View Bills</button>
            </div>
        </div>
    </div>
);

const BookkeepingSection = ({ activePath, isQuickBooksLinked, userId, onQuickBooksConnect }) => {
    const [bills, setBills] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [pnlData, setPnlData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isQuickBooksLinked && userId) {
            const loadData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const [billsRes, invoicesRes, pnlRes] = await Promise.all([
                        fetch('http://localhost:5000/api/quickbooks/proxy', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Bill' })
                        }),
                        fetch('http://localhost:5000/api/quickbooks/proxy', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ method: 'GET', url: 'query?query=select * from Invoice' })
                        }),
                        fetch('http://localhost:5000/api/quickbooks/proxy', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ method: 'GET', url: 'reports/ProfitAndLoss' })
                        })
                    ]);

                    const billsData = await billsRes.json();
                    const invoicesData = await invoicesRes.json();
                    const pnlData = await pnlRes.json();

                    setBills(billsData?.QueryResponse?.Bill || []);
                    setInvoices(invoicesData?.QueryResponse?.Invoice || []);
                    setPnlData(pnlData || null);

                } catch (e: any) {
                    setError('Failed to fetch data from QuickBooks.');
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            };
            loadData();
        } else {
            setBills([]);
            setInvoices([]);
            setPnlData(null);
        }
    }, [isQuickBooksLinked, userId]);
    
    let content;
    let subtitle;
    
    switch (activePath) {
        case 'bookkeeping/chart':
            content = <ChartOfAccounts isQuickBooksLinked={isQuickBooksLinked} userId={userId} />;
            subtitle = 'Review and manage your company’s balance sheet and income statement accounts.';
            break;
        case 'bookkeeping/reports':
            content = <BookkeepingReports isQuickBooksLinked={isQuickBooksLinked} pnlData={pnlData} isLoading={isLoading} />;
            subtitle = 'Generate key financial reports for planning and compliance.';
            break;
        case 'bookkeeping/transactions':
             content = <RecentTransactions isQuickBooksLinked={isQuickBooksLinked} transactions={bills || []} isLoading={isLoading} />;
            subtitle = 'Monitor and categorize your recent banking activity.';
            break;
        case 'bookkeeping/invoicing':
            content = <InvoicingSection isQuickBooksLinked={isQuickBooksLinked} invoices={invoices || []} isLoading={isLoading} />;
            subtitle = 'Manage client billing, track payments, and follow up on overdue invoices.';
            break;
        case 'bookkeeping/ar-ap':
            content = <ARAPSection isQuickBooksLinked={isQuickBooksLinked} />;
            subtitle = 'Track money owed to you (AR) and money you owe (AP).';
            break;
        case 'bookkeeping':
        case 'bookkeeping/overview':
        default:
            content = <BookkeepingOverview isQuickBooksLinked={isQuickBooksLinked} />;
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
                           <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={20} height={20} className="w-5 h-5"/>
                            <span className="text-sm font-semibold text-gray-700">Powered by QuickBooks</span>
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
                        <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={120} height={24} className="mx-auto mb-4"/>
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


const BankingSection = () => (
    <SectionWrapper title="Banking & Finance">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 bg-emerald-50 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border border-emerald-200">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-1">
                        <CardIcon className="w-6 h-6 mr-2 text-emerald-600" /> Linked Bank Account Status
                    </h2>
                    <p className="text-sm text-gray-600">Primary Account: Mercury - **** 1234. Last Synced: 5 minutes ago.</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition">Manage Accounts</button>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <MetricCard title="Total Cash" value="$12,450.00" icon={DollarSign} color="text-emerald-500" bgColor="bg-emerald-50" tooltip="Total across all linked accounts." />
                <MetricCard title="Recent Deposit" value="$2,500.00" icon={TrendingUp} color="text-indigo-500" bgColor="bg-indigo-50" tooltip="Client payment received (Yesterday)." />
                <MetricCard title="Uncategorized" value="8" icon={ListChecks} color="text-amber-500" bgColor="bg-amber-50" tooltip="Transactions requiring your review." />
            </div>
        </div>
    </SectionWrapper>
);

const ComplianceSection = ({ userId }) => {
    const complianceItems = initialComplianceItems;
    const isLoading = false;
    
    return (
        <SectionWrapper title="Annual Compliance Dates">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 bg-blue-50 rounded-xl mb-8 border border-blue-200">
                    <p className="text-lg font-semibold text-gray-800 flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" /> Compliance Status: <span className="text-emerald-600 font-bold ml-2">GREEN</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        All critical state and federal deadlines are currently on track. Resolve the items below to maintain 100% good standing.
                    </p>
                </div>

                <div className="space-y-4">
                    {isLoading && <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}
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
                                    <Clock4 className="w-4 h-4 mr-1" /> {new Date(item.dueDate).toLocaleDateString()}
                                </p>
                                <p className={`text-xs font-medium mt-1 ${item.status === 'Upcoming' ? 'text-amber-500' : (item.status === 'In Progress' ? 'text-blue-500' : 'text-gray-500')}`}>
                                    Status: {item.status}
                                </p>
                            </div>
                        </div>
                    ))
                    ) : !isLoading && (
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

const TaxesSection = () => (
    <SectionWrapper title="Taxes and Filings">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tax Events</h2>
            <TaskItem title="IRS Form 1120/1065 Preparation" status="In Progress" due="Due March 15" icon={Hourglass} priority="Medium" />
            <TaskItem title="Wyoming Annual Report Filing" status="Action Required" due="Due August 1" icon={FileText} priority="Critical" />
        </div>
    </SectionWrapper>
);

import { CompanyDocuments } from '@/components/dashboard/company-documents';

const DocumentsSection = () => (
    <SectionWrapper title="My Documents">
        <CompanyDocuments />
    </SectionWrapper>
);

const SupportSection = ({ navigate }) => {
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
                                <h3 className="text-2xl font-extrabold text-indigo-700">Vitals Plan</h3>
                                <p className="text-sm text-gray-600">($1,999/year) - Renews on Aug 15, 2025</p>
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
                  <Image src="/quickbooks-logo.svg" alt="QuickBooks" width={24} height={24}/>
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
    
    const [isQuickBooksLinked, setIsQuickBooksLinked] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/quickbooks/status', {
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

    const handleQuickBooksConnect = async () => {
        if (user) {
            try {
                const response = await fetch('http://localhost:5000/api/quickbooks/auth-url', {
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
            await fetch('http://localhost:5000/api/quickbooks/disconnect', {
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
                userId={user?.uid}
                onQuickBooksConnect={handleQuickBooksConnect}
              />
            );
        }

        switch (activePath) {
            case 'dashboard': return <DashboardContent user={user} navigate={handleNavigation} isQuickBooksLinked={isQuickBooksLinked} />;
            case 'company': return <CompanySection userId={user?.uid} />;
            case 'services': return <ServicesSection />;
            case 'banking': return <BankingSection />;
            case 'consultation': return <ConsultationSection />;
            case 'taxes': return <TaxesSection />;
            case 'documents': return <DocumentsSection />;
            case 'compliance': return <ComplianceSection userId={user?.uid} />;
            case 'settings': return <SettingsSection onLogout={onLogout} userId={user?.uid} user={user} isQuickBooksLinked={isQuickBooksLinked} onQuickBooksConnect={handleQuickBooksConnect} onQuickBooksDisconnect={handleQuickBooksDisconnect} />;
            case 'support': return <SupportSection navigate={handleNavigation} />;
            default: return <DashboardContent user={user} navigate={handleNavigation} isQuickBooksLinked={isQuickBooksLinked} />;
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
                        <Bell className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition" />
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

