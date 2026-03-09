
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileText, User, Building, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "An EIN (Employer Identification Number) is a tax ID for a business entity, like a Social Security Number for a company. An ITIN (Individual Taxpayer Identification Number) is a tax ID for an individual who is not eligible for an SSN, such as a non-resident. A US company needs an EIN to operate. A non-resident founder does *not* need an ITIN to get an EIN for their company." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of the difference between an EIN and an ITIN. Who is it for? Non-resident founders of US companies. When is it relevant? During the company formation process and when preparing to file US tax returns." },
        { title: "Decision Summary", content: "Who should act? All founders must obtain an EIN for their US company. Non-resident founders who need to file a personal US tax return (e.g., as a member of an LLC) will also need to obtain an ITIN. Who can ignore? Founders of C-Corps who do not take a salary may not need an ITIN initially, but their company always needs an EIN." }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": aiBlocks.map(block => ({
            "@type": "Question",
            "name": block.title.replace(":", ""),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": block.content
            }
        }))
    };
    
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
                <div className="space-y-4">
                    {aiBlocks.map((block, index) => (
                        <div key={index}>
                            <h4 className="font-semibold text-gray-700">{block.title}</h4>
                            <p className="text-gray-600">{block.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-blue-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function EinItinExplainedPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "EIN vs. ITIN: A Guide for Non-Resident Founders",
    "description": "A clear explanation of the difference between an Employer Identification Number (EIN) for your business and an Individual Taxpayer Identification Number (ITIN) for you as a founder.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/ein-itin-explained.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/ein-itin-explained" },
    "keywords": "ein vs itin, do i need an itin for an ein, get ein without ssn, itin for non-resident founder, ein for foreign owned llc"
  };

  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax IDs</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              EIN vs. ITIN: A Non-Resident Founder's Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              One is for your business, the other is for you. Understanding the difference is crucial for US tax compliance. We break it down.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For non-resident founders launching a US company, the world of American tax identification numbers can be confusing. The two most common acronyms you'll encounter are EIN and ITIN. Many founders mistakenly believe they are interchangeable or that they need an ITIN to get an EIN. This is incorrect and can lead to significant delays.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide will clearly define both tax IDs, explain their different purposes, and clarify what you need as a foreign founder.
            </p>

            <BlogSection title="What is an EIN (Employer Identification Number)?" icon={Building}>
                <p>An EIN is a nine-digit number assigned by the Internal Revenue Service (IRS) to a business entity. Think of it as a Social Security Number (SSN) for your company.</p>
                <h4 className="font-bold mt-6 mb-2">Who needs one?</h4>
                <p>Essentially, every business entity. Your US company (whether an LLC or C-Corp) **must** have an EIN to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Open a US business bank account.</li>
                    <li>Hire employees in the US.</li>
                    <li>File federal business tax returns.</li>
                </ul>
                <p className="mt-4">Getting an EIN is a mandatory step in the <Link href="/blog/us-company-formation-process" className="text-blue-600 hover:underline">US company formation process</Link>.</p>
            </BlogSection>
            
            <BlogSection title="What is an ITIN (Individual Taxpayer Identification Number)?" icon={User}>
                <p>An ITIN is a nine-digit tax processing number, also issued by the IRS, but it's for **individuals**, not businesses. It serves as a tax ID for foreign nationals and others who have a US tax filing requirement but are not eligible to get a Social Security Number (SSN).</p>

                <h4 className="font-bold mt-6 mb-2">Who needs one?</h4>
                 <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>A non-resident who needs to file a personal US tax return.</li>
                    <li>A foreign spouse or dependent of a US citizen or resident alien.</li>
                </ul>
                <p className="mt-4">The key takeaway is that an ITIN is a personal tax ID, used when an individual has to interact with the IRS for their own tax obligations.</p>
            </BlogSection>
            
            <BlogSection title="The Crucial Point: You DO NOT Need an ITIN to Get an EIN" icon={AlertTriangle}>
                <p className="font-bold">This is the most common point of confusion for non-resident founders.</p>
                <p>You can apply for an EIN for your US company without having a personal US tax ID (like an SSN or ITIN). The process is different and more manual—it requires filing Form SS-4 via fax or mail—but it is a standard procedure.</p>
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-800 flex items-center mb-2">Warning!</h4>
                    <p className="text-red-700">Do not wait to get an ITIN before applying for your EIN. The ITIN application process is long and can only be done when you are filing a tax return. Waiting will delay your ability to open a bank account by months.</p>
                </div>
                 <p className="mt-4">Our <Link href="/usa/company-formation" className="text-blue-600 hover:underline">company formation service</Link> specializes in obtaining EINs for non-residents without an SSN or ITIN.</p>
            </BlogSection>

            <BlogSection title="So, Will You Ever Need an ITIN?" icon={FileText}>
                 <p>Possibly, but it depends on your company structure and how you take money out of it.</p>
                 <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>If you have a C-Corp:</strong> You might not need an ITIN for a long time. The C-Corp is a separate taxpayer. You only need an ITIN if you start paying yourself a salary (which creates a personal tax filing requirement) or receive dividends that are subject to US tax.</li>
                    <li><strong>If you have an LLC:</strong> You will likely need an ITIN eventually. Because an LLC is a pass-through entity, its profits are taxed on your personal return. To file that personal US tax return, you will need to apply for an ITIN.</li>
                 </ul>
                 <p className="mt-4">The ITIN application (Form W-7) is typically submitted at the same time you file your first personal tax return. Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax services</Link> can guide you through this process when the time comes.</p>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Bottom Line</h3>
                 <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>**EIN** = For your BUSINESS. It's mandatory and urgent.</li>
                    <li>**ITIN** = For YOU, the INDIVIDUAL. It's only needed if you have a personal US tax filing obligation.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                   Focus on getting your EIN first. It's the key that unlocks your ability to operate in the US. Let a professional service handle the complexities of the application process so you can get your bank account open and start building your business.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

