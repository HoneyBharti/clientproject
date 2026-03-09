
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Globe, Shield, FileText, Banknote, Building } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Non-US residents can legally form and 100% own a US company (LLC or C-Corp). The key challenges are obtaining a US business address (provided by a Registered Agent service), applying for an EIN from the IRS without an SSN (which is a complex process), and opening a US bank account remotely. Using a specialized formation service is essential to navigate these hurdles." },
        { title: "Direct Question Answer", content: "What is this about? A guide for non-US residents on the specific requirements and challenges of forming a US company. Who is it for? International entrepreneurs, digital nomads, and foreign businesses looking to enter the US market. When is it relevant? During the planning and execution phase of forming a US entity." },
        { title: "Decision Summary", content: "Who should act? Any non-resident planning to start a US company must use a formation service that specializes in their unique needs, particularly EIN acquisition and remote bank account opening. Who can ignore? US residents, who face a much simpler process." }
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

export default function NonResidentFormationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Non-Resident's Guide to US Company Formation",
    "description": "An essential guide for international founders on the specific challenges and solutions for forming a US LLC or C-Corp, including EINs, bank accounts, and addresses.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-formation-non-resident.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-company-formation-for-non-residents" },
    "keywords": "us company formation for non-residents, form us company foreigner, get ein without ssn, us bank account for non-residents, delaware llc for foreigners"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Global Founder Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              US Company Formation for Non-Residents: A Complete Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              You don't need to live in the US to own a US company. This guide breaks down the key requirements, challenges, and solutions for international founders.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              The United States actively encourages foreign investment and makes it surprisingly straightforward for non-residents to form and own a US company. You do not need a visa, a US address, or a Social Security Number to get started. However, the process for a non-resident founder has several unique hurdles that domestic founders don't face.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Understanding these specific challenges and how to overcome them is the key to a successful launch. Our <Link href="/usa/company-formation" className="text-blue-600 hover:underline">US Company Formation</Link> service is designed from the ground up to solve these problems for global entrepreneurs.
            </p>

            <BlogSection title="Key Principles for Non-Resident Founders" icon={Globe}>
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong>100% Foreign Ownership is Allowed:</strong> You can own 100% of the shares in a US C-Corporation or 100% of the membership interests in an LLC.</li>
                    <li><strong>No US Residency or Visa Required:</strong> You do not need to be a resident or have a visa to form or own the company.</li>
                    <li><strong>You Can Manage from Abroad:</strong> You can legally operate and manage your US company from your home country.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="The 3 Big Hurdles for Non-Residents (and Their Solutions)" icon={Shield}>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">1. The US Address Requirement</h3>
                <p><strong>The Hurdle:</strong> Every US company must have a Registered Agent with a physical address in its state of formation to receive official legal notices. You cannot use a PO Box.</p>
                <p><strong>The Solution:</strong> This is solved by using a commercial Registered Agent service. All of our formation packages include one year of Registered Agent service, instantly satisfying this requirement. We also provide a unique business mailing address for your regular mail.</p>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-8">2. Obtaining an Employer Identification Number (EIN)</h3>
                <p><strong>The Hurdle:</strong> An EIN is your federal tax ID number, and it is essential for opening a bank account. The online IRS application requires a US Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN), which most non-residents don't have.</p>
                <p><strong>The Solution:</strong> Non-residents must apply by faxing or mailing Form SS-4 to the IRS. This is a complex, slow process prone to errors. Our team specializes in this. We prepare and submit the SS-4 application correctly on your behalf, acting as your Third-Party Designee to communicate with the IRS and secure your EIN as quickly as possible. Learn more in our <Link href="/blog/ein-itin-explained" className="text-blue-600 hover:underline">EIN Guide</Link>.</p>

                <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-8">3. Opening a US Business Bank Account</h3>
                <p><strong>The Hurdle:</strong> Most traditional US banks require founders to visit a branch in person to open an account. For a non-resident, this is a major obstacle.</p>
                <p><strong>The Solution:</strong> We partner with modern banking platforms and fintechs that are built for global founders and allow for remote account opening. With your new company documents and EIN, we provide support and introductions to help you apply for an account with these partners, allowing you to manage your US finances from anywhere.</p>
                
                <section className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Banking Support Through Our Partner, Mercury</h3>
                    <div className="text-center">
                        <p className="text-gray-600 text-sm mb-4">
                            YourLegal partners with Mercury to help eligible businesses access modern business banking services in the United States. As part of our company formation and compliance support, we assist founders with the Mercury account application process.
                        </p>
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/partners/mercury-logo.svg"
                                alt="Mercury Bank logo"
                                width={120}
                                height={32}
                            />
                        </div>
                        <p className="text-gray-700 font-semibold text-xs">
                            Important: All bank account applications are reviewed, approved, or rejected solely by Mercury. YourLegal does not control or influence approval decisions.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Mercury is a financial technology company, not a bank. Banking services are provided by Mercury’s partner banks. Account approval is subject to Mercury’s internal compliance and risk review processes.
                        </p>
                    </div>
                </section>
            </BlogSection>
            
            <BlogSection title="Ongoing Compliance: The Biggest Post-Formation Challenge" icon={FileText}>
                <p>Forming the company is just the first step. The biggest challenge for non-residents is ongoing compliance. The IRS has strict reporting requirements for foreign-owned US companies.</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Form 5472:</strong> Foreign-owned single-member LLCs must file this annual information return. The penalty for non-compliance is **$25,000**.</li>
                    <li><strong>Annual Reports & Franchise Tax:</strong> You must file annual reports and pay franchise taxes to your state of formation to keep your company in good standing.</li>
                </ul>
                <p>Our <Link href="/usa/pricing" className="text-blue-600 hover:underline">Vitals and Elite plans</Link> are specifically designed to handle these complex filings, ensuring you remain compliant and avoid devastating penalties.</p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h3>
                <p className="text-gray-700 mb-4">
                    This guide is part of our comprehensive coverage of US business formation. YourLegal provides an all-in-one platform to handle these complex requirements for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/company-formation" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Company Formation Service
                    </Link>
                    <Link href="/usa" className="font-semibold text-gray-600 hover:underline">
                        &rarr; Back to USA Overview
                    </Link>
                </div>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

