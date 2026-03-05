
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Users,
  ShieldCheck,
  TrendingUp,
  Globe,
  Briefcase,
  Landmark,
  FileCheck,
  Building,
  BookOpen,
  Banknote
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const ComparisonTable = () => (
  <div className="my-12 overflow-x-auto">
    <table className="w-full min-w-[600px] text-left border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-4 font-semibold border-b">Feature</th>
          <th className="p-4 font-semibold border-b text-center">Mainland Company</th>
          <th className="p-4 font-semibold border-b text-center">Free Zone Company</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b"><td className="p-4 font-medium">Ownership</td><td className="p-4 text-center">Up to 100% Foreign Ownership</td><td className="p-4 text-center">100% Foreign Ownership</td></tr>
        <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Business Scope</td><td className="p-4 text-center">Trade anywhere in UAE & internationally</td><td className="p-4 text-center">Trade within Free Zone & internationally</td></tr>
        <tr className="border-b"><td className="p-4 font-medium">Office Requirement</td><td className="p-4 text-center">Physical office required</td><td className="p-4 text-center">Flexi-desk or office options</td></tr>
        <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Corporate Tax</td><td className="p-4 text-center">9% on profits &gt; AED 375,000</td><td className="p-4 text-center">0% for 'Qualifying Income'</td></tr>
        <tr className="border-b"><td className="p-4 font-medium">VAT</td><td className="p-4 text-center">5% if threshold is met</td><td className="p-4 text-center">5% if threshold is met</td></tr>
      </tbody>
    </table>
  </div>
);

const faqs = [
    { q: "Free Zone vs Mainland – which is better for my business?", a: "It depends on your business activity. If you plan to trade directly with the Dubai/UAE market, a Mainland company is essential. For international trade, consulting, or holding activities, a Free Zone is often more cost-effective and straightforward." },
    { q: "Do I need to register for VAT from day one?", a: "VAT registration is mandatory only if your taxable supplies and imports exceed AED 375,000 per year. You can register voluntarily if your turnover exceeds AED 187,500. We can advise on the best strategy for you." },
    { q: "Is the 9% corporate tax applicable to all free zone companies?", a: "Not necessarily. A 'Qualifying Free Zone Person' can benefit from a 0% corporate tax rate on 'Qualifying Income'. This depends on your activities and who you transact with. Our tax advisors can help you determine your status." },
    { q: "How long does the company formation process take in the UAE?", a: "The timeline varies by jurisdiction, but it typically takes 1-2 weeks once all documents are submitted correctly. We streamline this process to ensure the fastest possible setup." },
    { q: "Can non-residents open a UAE company and bank account?", a: "Yes. The UAE allows 100% foreign ownership in most business activities. We provide full assistance with the company formation and bank account opening process for non-resident founders." },
    { q: "Is bookkeeping mandatory in the UAE?", a: "Yes. The UAE Commercial Companies Law requires all companies to maintain proper accounting records for at least five years. This is also essential for VAT and Corporate Tax compliance." },
];

const BlogSection = () => {
    const posts = [
        { title: "Dubai Free Zone vs. Mainland: Key Differences", date: "Nov 05, 2024", category: "UAE", excerpt: "Understand the pros and cons of setting up in a Dubai free zone versus on the mainland for your business.", path: "/blog/dubai-freezone-vs-mainland", image: "https://picsum.photos/seed/dubai%20skyline/600/400", imageHint: "dubai skyline" },
        { title: "A Guide to UAE Corporate Tax for Foreigners", date: "Nov 02, 2024", category: "UAE", excerpt: "Learn how the 9% corporate tax works and if your free zone company can qualify for a 0% rate.", path: "/blog/dubai-corporate-tax", image: "https://picsum.photos/seed/dubai%20tax%20docs/600/400", imageHint: "dubai tax docs" },
        { title: "UAE VAT Guide: Registration and Filing", date: "Oct 30, 2024", category: "UAE", excerpt: "A complete guide to understanding the 5% VAT, registration thresholds, and filing obligations in the UAE.", path: "/blog/dubai-vat-guide", image: "https://picsum.photos/seed/dubai%20receipt/600/400", imageHint: "dubai receipt" }
    ];
    return (
        <section id="blog" className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for Dubai</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in the UAE.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-blue-600 font-semibold hover:underline mt-auto">Read More →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DeepDiveSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Dubai Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your UAE business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/dubai/industries" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, trading, and holding companies in the UAE.</p>
                </Link>
                <Link href="/dubai/tax-compliance" className="block p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition">
                    <Landmark className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key Free Zone, Mainland, and Federal Tax Authority regulations for your UAE company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/dubai/company-formation', icon: Building, description: 'Free Zone & Mainland LLC setup.' },
        { name: 'Annual Compliance', path: '/dubai/annual-compliance', icon: FileCheck, description: 'Trade License & lease renewals.' },
        { name: 'Tax Compliance', path: '/dubai/tax-compliance', icon: Landmark, description: 'VAT, Corporate Tax & ESR filings.' },
        { name: 'Bookkeeping', path: '/dubai/bookkeeping', icon: Briefcase, description: 'FTA-compliant record keeping.' },
        { name: 'Accounting', path: '/dubai/accounting', icon: BookOpen, description: 'IFRS-compliant financial reporting.' },
        { name: 'Virtual CFO', path: '/dubai/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership.' },
        { name: 'Payroll', path: '/dubai/payroll', icon: Users, description: 'WPS-compliant salary processing.' },
        { name: 'Cross-Border Accounting', path: '/dubai/cross-border-accounting', icon: Globe, description: 'Handle multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in Dubai</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your UAE business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HubspotCtaSection = () => (
    <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to Get Started?</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions about our plans, partnerships, or unique business needs? Our team is here to help. Fill out the form, and we'll be in touch shortly.
                    </p>
                     <div className="mt-6">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">Schedule a Free Consultation</Button>
                        </a>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Contact Sales</h3>
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
        </div>
    </section>
);

const TrustedBySection = () => (
    <section className="py-12 bg-white border-b border-t border-gray-200 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                Trusted by founders from world-class companies and startups
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-gray-400">
                <p className="font-bold text-2xl">Forbes</p>
                <p className="font-bold text-2xl">TechCrunch</p>
                <p className="font-bold text-2xl">Bloomberg</p>
                <p className="font-bold text-2xl">Y Combinator</p>
                <p className="font-bold text-2xl">Sequoia</p>
            </div>
        </div>
    </section>
);


export default function DubaiPage() {
    const router = useRouter();
    const FounderReviews = () => {
        const reviews = [
            {
                quote: "As a non-resident founder, setting up in the US was daunting. YourLegal handled everything—formation, EIN, banking—flawlessly. Their platform is my command center for compliance.",
                name: "Elena V.",
                title: "Founder, SaaS Startup",
                avatar: "https://picsum.photos/seed/elena/100/100"
            },
            {
                quote: "The tax compliance service is a lifesaver. Instead of worrying about IRS deadlines and state filings, I can focus entirely on growing my business. The peace of mind is invaluable.",
                name: "Kenji T.",
                title: "Founder, E-commerce Brand",
                avatar: "https://picsum.photos/seed/kenji/100/100"
            },
            {
                quote: "Incredible service. We were incorporated in Delaware in under 48 hours, and our dashboard had all the legal documents we needed for our seed round. Highly recommended for any serious startup.",
                name: "Priya S.",
                title: "CEO, Fintech Company",
                avatar: "https://picsum.photos/seed/priya/100/100"
            }
        ];
    
        return (
            <section className="py-20 bg-gray-50 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Trusted by Global Founders</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from entrepreneurs who chose YourLegal to launch and manage their businesses.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                                <p className="text-gray-600 italic mb-6 flex-grow">"{review.quote}"</p>
                                <div className="flex items-center">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" data-ai-hint={index === 1 ? "man face" : "woman face"} />
                                    <div>
                                        <p className="font-bold text-gray-900">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-yellow-50 via-amber-50 to-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-900">Dubai Company Formation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">End-to-end solutions for international founders. We handle your UAE setup, bookkeeping, VAT, and corporate tax, so you can focus on growth.</p>
                    <div className="mt-10 flex justify-center gap-4">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get Free Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    {/* Why Dubai Section */}
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Set Up a Company in Dubai / UAE?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard icon={Globe} title="Strategic Global Hub" description="Centrally located between East and West, providing unmatched access to global markets." />
                            <FeatureCard icon={Banknote} title="Favorable Tax Environment" description="0% personal income tax and a competitive 9% corporate tax rate on profits &gt; AED 375,000." />
                            <FeatureCard icon={Users} title="100% Foreign Ownership" description="Maintain full control of your business in both Mainland and Free Zone jurisdictions for most activities." />
                            <FeatureCard icon={Building} title="World-Class Infrastructure" description="Benefit from modern logistics, transport, and digital infrastructure to support your business." />
                            <FeatureCard icon={ShieldCheck} title="Stable & Pro-Business" description="A secure and welcoming environment with a government focused on ease of doing business." />
                            <FeatureCard icon={TrendingUp} title="Diverse Economic Hub" description="Ideal for startups, holding companies, trading, e-commerce, and professional services." />
                        </div>
                    </section>

                    <ServicesGrid />

                    {/* UAE Formation Services */}
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">UAE Company Formation Services</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Mainland */}
                            <div className="bg-white p-8 rounded-xl border">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mainland Company Formation</h3>
                                <p className="mb-6 text-gray-600">Ideal for businesses that need to trade directly within the UAE market, work with government entities, or require a physical office location in Dubai.</p>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="Activity & Trade Name" description="We help you select your business activities and get your company name approved by the Department of Economic Development (DED)." />
                                    <ProcessStep number="2" title="Approvals & MOA" description="Obtain initial approvals and draft your Memorandum of Association (MOA)." />
                                    <ProcessStep number="3" title="License & Visas" description="Receive your official trade license and begin the process for your establishment card and visas." />
                                    <ProcessStep number="4" title="Bank Account Support" description="We provide expert assistance to navigate the corporate bank account opening process." />
                                </div>
                                <Button asChild className="mt-6 w-full">
                                    <Link href="/dubai/process">View Detailed Process</Link>
                                </Button>
                            </div>
                            {/* Free Zone */}
                             <div className="bg-white p-8 rounded-xl border">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Zone Company Formation</h3>
                                <p className="mb-6 text-gray-600">The most popular choice for international entrepreneurs, offering 100% ownership, tax exemptions, and simplified setup procedures.</p>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="Jurisdiction & License" description="We advise on the best Free Zone (e.g., DMCC, Meydan, IFZA) and license type (Trading, Service) for your business." />
                                    <ProcessStep number="2" title="Structure & Documents" description="Finalize your shareholding structure and prepare all required application documents." />
                                    <ProcessStep number="3" title="Registration & Office" description="Complete the company registration and secure your flexi-desk or office space." />
                                    <ProcessStep number="4" title="Visas & Banking" description="We manage your visa applications and introduce you to our banking partners." />
                                </div>
                                <Button asChild className="mt-6 w-full">
                                    <Link href="/dubai/process">View Detailed Process</Link>
                                </Button>
                            </div>
                        </div>
                        <ComparisonTable />
                    </section>

                    <section className="animate-fade-in-up">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing Plans</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                                Choose the plan that fits your needs, from simple formation to full-service compliance and tax.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/dubai/pricing">View Detailed Pricing</Link>
                            </Button>
                        </div>
                    </section>
                    
                    <DeepDiveSection />
                    
                    <FounderReviews />

                    <BlogSection />
                    
                    {/* FAQ */}
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto">
                             <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </section>
                    
                    <HubspotCtaSection />
                </div>
            </div>

            <AppFooter />
        </div>
    );
};
