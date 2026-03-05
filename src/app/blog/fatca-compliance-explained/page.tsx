'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, FileText, Globe, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "FATCA (Foreign Account Tax Compliance Act) is a US law requiring foreign financial institutions (FFIs) to report information about financial accounts held by US taxpayers to the IRS. It also requires US taxpayers holding foreign financial assets above certain thresholds to report them on Form 8938. The goal is to combat offshore tax evasion." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of FATCA and its reporting requirements. Who is it for? US taxpayers (citizens, residents, and certain entities) with foreign financial assets, and foreign financial institutions. When is it relevant? Annually, when filing US tax returns." },
        { title: "Decision Summary", content: "Who should act? Any US person or entity with significant foreign assets must understand their Form 8938 filing obligation. Who can ignore? Non-US persons with no US tax obligations and US persons with no foreign assets can generally ignore FATCA, but must still comply with FBAR rules if applicable." }
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

export default function FatcaCompliancePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "FATCA Compliance Explained: A Guide for US Taxpayers",
    "description": "An essential guide to the Foreign Account Tax Compliance Act (FATCA), explaining Form 8938 reporting for foreign assets and how it differs from FBAR.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/fatca-compliance.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/fatca-compliance-explained" },
    "keywords": "fatca compliance explained, what is fatca, form 8938 filing requirements, fatca vs fbar, foreign account tax compliance act"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Cross-Border Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              FATCA Compliance Explained: A Guide for US Taxpayers
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              If you're a US taxpayer with foreign assets, FATCA imposes strict reporting rules. Understanding Form 8938 is key to avoiding significant penalties.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              The Foreign Account Tax Compliance Act (FATCA) is a landmark piece of US legislation enacted in 2010 to combat offshore tax evasion by US citizens and residents. It creates a global reporting regime, compelling foreign banks and financial institutions to report on the accounts of their US clients to the IRS. For individuals and businesses with international ties, understanding FATCA is a critical piece of the <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">US tax compliance</Link> puzzle.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide will explain the two main components of FATCA and clarify who needs to report what.
            </p>

            <BlogSection title="Part 1: Reporting by Foreign Financial Institutions (FFIs)" icon={Landmark}>
                <p>The first part of FATCA requires Foreign Financial Institutions (FFIs)—such as foreign banks, brokerages, and investment funds—to enter into an agreement with the IRS. Under this agreement, they must:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Identify financial accounts held by US taxpayers or by foreign entities in which US taxpayers hold a substantial ownership interest.</li>
                    <li>Report information about these accounts, including the account holder's name, address, US Taxpayer Identification Number (TIN), account balance, and income, to the IRS annually.</li>
                </ul>
                <p>Most countries have signed Intergovernmental Agreements (IGAs) with the US, which facilitates this reporting through their own national tax authorities. This is why when you open a bank account outside the US, you are often asked to certify whether you are a "US Person."</p>
            </BlogSection>
            
            <BlogSection title="Part 2: Reporting by US Taxpayers (Form 8938)" icon={FileText}>
                <p>The second part of FATCA directly affects US taxpayers themselves. If you are a US person and hold foreign financial assets with an aggregate value above a certain threshold, you must report these assets to the IRS by filing <a href="https://www.irs.gov/forms-pubs/about-form-8938" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 8938</a>, "Statement of Specified Foreign Financial Assets," with your annual income tax return.</p>
                
                <h3 className="font-bold mt-6 mb-2">Who is a "US Person"?</h3>
                <p>This includes US citizens, US residents (Green Card holders or those who meet the Substantial Presence Test), and certain US entities like domestic corporations and partnerships.</p>
                
                <h3 className="font-bold mt-6 mb-2">What are "Specified Foreign Financial Assets"?</h3>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Financial accounts maintained by a foreign financial institution (bank accounts, brokerage accounts).</li>
                    <li>Stock or securities issued by a non-US person.</li>
                    <li>Any other financial instrument or contract held for investment that has a non-US issuer or counterparty.</li>
                </ul>
                
                 <h3 className="font-bold mt-6 mb-2">Filing Thresholds:</h3>
                 <p>The requirement to file Form 8938 depends on where you live and your filing status. For a single taxpayer living in the US, you must file if the total value of your specified foreign financial assets is more than $50,000 on the last day of the tax year or more than $75,000 at any time during the year. These thresholds are higher for married couples and for taxpayers living abroad.</p>
            </BlogSection>

            <BlogSection title="FATCA vs. FBAR: What's the Difference?" icon={AlertTriangle}>
                <p>This is a major source of confusion. FATCA (Form 8938) reporting is separate from, and in addition to, the FBAR (FinCEN Form 114) filing requirement. They are filed with different government agencies and have different rules.</p>
                 <div className="my-6 overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 font-semibold border-b">Feature</th>
                                <th className="p-4 font-semibold border-b text-center">FBAR (FinCEN 114)</th>
                                <th className="p-4 font-semibold border-b text-center">FATCA (Form 8938)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Purpose</td>
                                <td className="p-4">To combat money laundering and other financial crimes.</td>
                                <td className="p-4">To combat tax evasion.</td>
                            </tr>
                            <tr className="border-b bg-gray-50">
                                <td className="p-4">Filed with</td>
                                <td className="p-4">FinCEN (Financial Crimes Enforcement Network)</td>
                                <td className="p-4">IRS (Internal Revenue Service)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Threshold</td>
                                <td className="p-4">Foreign accounts aggregate value &gt; $10,000.</td>
                                <td className="p-4">Foreign assets aggregate value &gt; $50,000 (varies).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <p>It is very common for a US taxpayer to have an obligation to file *both* an FBAR and Form 8938. See our <Link href="/blog/us-annual-compliance-checklist" className="text-blue-600 hover:underline">annual compliance checklist</Link> for more details.</p>
            </BlogSection>
            
             <BlogSection title="Penalties for Non-Compliance" icon={AlertTriangle}>
                <p>The penalties for failing to file Form 8938 are severe.</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>A <strong>$10,000 penalty</strong> for failure to file.</li>
                    <li>An additional penalty of up to <strong>$50,000</strong> for continued failure after IRS notification.</li>
                    <li>An underpayment penalty of 40% of the tax attributable to non-disclosed assets.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Takeaway: Disclosure is Key</h3>
                <p className="text-gray-700">
                    FATCA has created a global financial system where "hiding" offshore assets is virtually impossible. For US taxpayers with international financial ties, the only safe strategy is full disclosure. 
                </p>
                <p className="text-gray-700 mt-4">
                  Working with a tax professional who understands international reporting requirements is essential to ensure you meet all your FATCA and FBAR obligations and avoid the severe penalties for non-compliance. Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">US tax compliance</Link> service is designed to handle these complex reporting requirements.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
