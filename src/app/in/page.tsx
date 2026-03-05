
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
        <div className="p-3 bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
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
          <th className="p-4 font-semibold border-b text-center">Proprietorship / Partnership</th>
          <th className="p-4 font-semibold border-b text-center">Private Limited Company (Pvt Ltd)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b"><td className="p-4 font-medium">Taxation</td><td className="p-4 text-center">Taxed at individual marginal rates (profits &gt; INR 2.5 Lakhs)</td><td className="p-4 text-center">Taxed at a flat corporate tax rate (15-25%)</td></tr>
        <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Liability</td><td className="p-4 text-center">Unlimited personal liability</td><td className="p-4 text-center">Limited liability for shareholders</td></tr>
        <tr className="border-b"><td className="p-4 font-medium">Foreign Ownership</td><td className="p-4 text-center">Difficult for non-residents</td><td className="p-4 text-center">Up to 100% ownership allowed, subject to FDI policy</td></tr>
        <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Compliance</td><td className="p-4 text-center">Simpler filings (ITR)</td><td className="p-4 text-center">Higher (MCA filings, statutory audit, etc.)</td></tr>
      </tbody>
    </table>
  </div>
);

const faqs = [
    { q: "What is a Private Limited Company?", a: "A Private Limited (Pvt. Ltd.) Company is the most popular corporate entity for businesses in India. It is a separate legal entity and offers limited liability protection to its shareholders." },
    { q: "Is a local Indian director mandatory?", a: "Yes, every Indian company must have at least one director who is a resident of India (defined as staying in India for at least 182 days in the previous year). We can provide a professional nominee director to fulfill this requirement." },
    { q: "When is GST registration required?", a: "GST registration is mandatory for businesses with an aggregate turnover exceeding ₹20 lakhs for services or ₹40 lakhs for goods. It is also mandatory for e-commerce operators and those making inter-state sales, regardless of turnover." },
    { q: "What is FDI and does it apply to my business?", a: "Foreign Direct Investment (FDI) policy dictates the rules for foreign ownership. Most sectors, including IT and e-commerce marketplaces, fall under the 'Automatic Route', allowing 100% FDI without prior government approval." },
    { q: "What are the main annual compliance requirements?", a: "Key annual tasks include holding board meetings, filing an Annual Return (Form MGT-7) and Financial Statements (Form AOC-4) with the Ministry of Corporate Affairs (MCA), and filing an annual Income Tax Return." }
];

const BlogSection = () => {
    const posts = [
        { title: "A Foreigner's Guide to India's FDI Policy", date: "Jan 05, 2025", category: "India", excerpt: "Navigate the 'automatic' vs 'approval' routes and understand sectoral caps for your investment in India.", path: "/blog/india-fdi-policy", image: "https://picsum.photos/seed/india%20flag/600/400", imageHint: "india flag" },
        { title: "Understanding Goods & Services Tax (GST) in India", date: "Jan 02, 2025", category: "India", excerpt: "A guide to GST slabs, registration, input tax credit (ITC), and monthly filing requirements.", path: "/blog/india-gst-guide", image: "https://picsum.photos/seed/india%20market/600/400", imageHint: "india market" },
        { title: "Guide to Incorporating a Private Limited Company in India", date: "Dec 30, 2024", category: "India", excerpt: "A step-by-step guide on documents, requirements, and the process of registering a Pvt Ltd company with the MCA.", path: "/blog/india-pvt-ltd-guide", image: "https://picsum.photos/seed/india%20contract/600/400", imageHint: "india contract" }
    ];

    return (
        <section id="blog" className="py-20 bg-orange-50/20 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for India</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in India.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-orange-600 font-semibold hover:underline mt-auto">Read More →</a>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our India Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your Indian business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/in/industries" className="block p-8 bg-orange-50/50 rounded-2xl border border-orange-100 hover:shadow-xl hover:border-orange-200 transition">
                    <Briefcase className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for Tech, SaaS, E-commerce, and manufacturing companies in India.</p>
                </Link>
                <Link href="/in/tax-compliance" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Landmark className="w-8 h-8 text-blue-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key MCA, GST, and Income Tax regulations for your Indian company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/in/company-formation', icon: Building, description: 'Pvt. Ltd. setup with resident director.' },
        { name: 'Annual Compliance', path: '/in/annual-compliance', icon: FileCheck, description: 'MCA annual returns & board resolutions.' },
        { name: 'Tax Compliance', path: '/in/tax-compliance', icon: Landmark, description: 'Income Tax, GST, & TDS filings.' },
        { name: 'Bookkeeping', path: '/in/bookkeeping', icon: Briefcase, description: 'Ind AS compliant record keeping.' },
        { name: 'Accounting', path: '/in/accounting', icon: BookOpen, description: 'Financial statements & audit support.' },
        { name: 'Virtual CFO', path: '/in/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership for India.' },
        { name: 'Payroll', path: '/in/payroll', icon: Users, description: 'PF, ESI, and TDS compliance.' },
        { name: 'Cross-Border Accounting', path: '/in/cross-border-accounting', icon: Globe, description: 'Manage multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in India</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your Indian business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-orange-600 mb-3" />
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


export default function IndiaPage() {
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
            <section className="bg-gradient-to-r from-orange-50 via-gray-50 to-green-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">India Company Formation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Your all-in-one solution for launching and managing an Indian company. We handle incorporation, compliance, GST, and tax so you can succeed in one of the world's fastest-growing markets.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">Get a Free India Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate in India?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={TrendingUp} title="Fast-Growing Economy" description="Tap into one of the world's largest and fastest-growing economies with a massive domestic market." />
                            <FeatureCard icon={Globe} title="Skilled Talent Pool" description="Access a vast pool of skilled, English-speaking tech and business talent at a competitive cost." />
                            <FeatureCard icon={ShieldCheck} title="Pro-Business Reforms" description="Benefit from government initiatives like 'Make in India' and simplified FDI policies in most sectors." />
                            <FeatureCard icon={Banknote} title="Expanding Digital Market" description="With over 800 million internet users, India offers an unparalleled opportunity for digital businesses." />
                        </div>
                    </section>

                    <ServicesGrid />

                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">India Company Formation Process (Pvt. Ltd.)</h2>
                        <div className="bg-white p-8 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Private Limited (Pvt. Ltd.) Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="DIN & DSC" description="We obtain Director Identification Numbers (DIN) and Digital Signature Certificates (DSC) for all proposed directors." />
                                    <ProcessStep number="2" title="Name Approval (RUN)" description="We file the 'Reserve Unique Name' application with the Ministry of Corporate Affairs (MCA) to secure your company name." />
                                    <ProcessStep number="3" title="File SPICe+ Form" description="We prepare and file the main e-form for incorporation, including the Memorandum and Articles of Association (MoA & AoA)." />
                                    <ProcessStep number="4" title="Launch & Register" description="Receive your Certificate of Incorporation (CIN), PAN, and TAN, and get full support for bank account and GST registration." />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included in Our Package</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Director Identification Number (DIN) & DSC</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Company Name Reservation</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Drafting of MoA & AoA</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>MCA Incorporation Filing & Fees</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>PAN and TAN Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Business Bank Account Assistance</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>GST Registration</li>
                                </ul>
                                 <Button asChild className="mt-6 w-full">
                                    <Link href="/in/process">View Detailed Process</Link>
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
                                <Link href="/in/pricing">View Detailed Pricing</Link>
                            </Button>
                        </div>
                    </section>
                    
                    <DeepDiveSection />
                    
                    <FounderReviews />

                    <BlogSection />

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
