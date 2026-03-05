'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, AlertTriangle, FileWarning, Clock, UserX, Landmark } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "The most common IRS penalties for businesses include Failure to File, Failure to Pay, and Failure to Deposit payroll taxes. For foreign-owned entities, the most severe is the $25,000 penalty for not filing Form 5472. These penalties are often automatic and accrue interest, making timely and accurate compliance critical." },
        { title: "Direct Question Answer", content: "What is this about? An overview of the most frequent and costly penalties the IRS imposes on businesses for tax non-compliance. Who is it for? All US business owners, with a special focus on the high-stakes penalties for non-resident founders. When is it relevant? Primarily during and after tax season, but the habits that prevent them are relevant all year." },
        { title: "Decision Summary", content: "Who should act? Every business owner must be aware of these penalties and take proactive steps, such as using professional tax services, to avoid them. Who can ignore? No one. IRS penalties are a serious financial risk to any business." }
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

const PenaltyBlock = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-red-700 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2' })}
        {title}
    </h3>
    <div className="border-l-4 border-red-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function IrsPenaltiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Founder's Guide to Common IRS Penalties for Businesses",
    "description": "Understanding the most common and costly IRS penalties—from Failure to File to the $25,000 Form 5472 penalty—is the first step to avoiding them.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/common-irs-penalties.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/common-irs-penalties-for-businesses" },
    "keywords": "common irs penalties, failure to file penalty, failure to pay penalty, form 5472 penalty, irs penalties for business, payroll tax penalty"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Founder's Guide to Common IRS Penalties for Businesses
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The IRS isn't a passive observer. It has an automated system of penalties designed to enforce compliance. Knowing what they are is the key to avoiding them.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For busy founders, tax compliance can often feel like a distant problem—something to be dealt with "later." This is a dangerous mindset. The Internal Revenue Service (IRS) has a robust and largely automated system for penalizing non-compliance. These penalties are not just small fines; they can be substantial, accrue interest daily, and, in some cases, pose a serious threat to a startup's financial health.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Understanding the most common penalties is not about fear-mongering; it's about risk management. By knowing the pitfalls, you can take proactive steps to ensure your company never has to pay them.
            </p>

            <BlogSection title="The Most Common & Costly IRS Penalties" icon={AlertTriangle}>
                <PenaltyBlock title="1. Failure to File" icon={Clock}>
                    <p><strong>What it is:</strong> This penalty is applied when you do not file your tax return by the due date (including extensions).</p>
                    <p><strong>How it works:</strong> The penalty is typically 5% of the unpaid tax for each month or part of a month that a return is late, up to a maximum of 25%. If the return is over 60 days late, the minimum penalty is either $435 or 100% of the unpaid tax, whichever is less. Importantly, this applies even if you are due a refund—though the penalty is based on unpaid tax, failing to file prevents you from claiming that refund.</p>
                </PenaltyBlock>

                 <PenaltyBlock title="2. Failure to Pay" icon={FileWarning}>
                    <p><strong>What it is:</strong> This penalty is applied when you do not pay the taxes reported on your return by the due date.</p>
                    <p><strong>How it works:</strong> The penalty is 0.5% of the unpaid taxes for each month or part of a month the taxes remain unpaid, also capped at 25% of your unpaid tax liability. This penalty runs concurrently with interest on the underpayment.</p>
                </PenaltyBlock>

                <PenaltyBlock title="3. Failure to Deposit (Payroll Taxes)" icon={UserX}>
                    <p><strong>What it is:</strong> This applies to businesses with employees when they fail to deposit federal income taxes withheld and both the employer and employee share of FICA and FUTA taxes on time.</p>
                    <p><strong>How it works:</strong> The penalty is tiered, ranging from 2% for deposits made 1-5 days late, up to 15% for amounts still unpaid more than 10 days after the first IRS notice. This is a high-priority area for the IRS because these are "trust fund" taxes—money held in trust for the government. Failure to deposit can lead to aggressive collection actions.</p>
                </PenaltyBlock>

                 <PenaltyBlock title="The Nuclear Option: Form 5472 Penalty for Foreign Owners" icon={FileWarning}>
                    <p><strong>What it is:</strong> As detailed in our guide to <Link href="/blog/us-accounting-risks-for-foreign-owners" className="text-blue-600 hover:underline">risks for foreign owners</Link>, this is a special and severe penalty for failing to file the required informational return for a foreign-owned US company.</p>
                    <p><strong>How it works:</strong> The penalty for failing to file Form 5472 is not a percentage; it's a flat <strong>$25,000</strong>. This is per form, per year. If the IRS notifies you of the failure and you do not comply, an additional $25,000 penalty can be assessed for each 30-day period of continued failure. It's designed to be punitive and is a massive risk for uninformed non-resident founders.</p>
                </PenaltyBlock>
            </BlogSection>
            
            <BlogSection title="How to Avoid Penalties: The Compliance Shield" icon={Landmark}>
                <p>Avoiding IRS penalties comes down to one thing: a proactive and professional approach to tax compliance.</p>
                 <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Maintain Clean Books:</strong> Accurate bookkeeping is the foundation. Without it, you cannot prepare an accurate tax return. See our <Link href="/blog/us-bookkeeping-requirements" className="text-blue-600 hover:underline">Bookkeeping Requirements Guide</Link>.</li>
                    <li><strong>Know Your Deadlines:</strong> Use a compliance calendar to track all federal and state filing deadlines. Our Vitals plan includes a compliance calendar customized for your business.</li>
                    <li><strong>File an Extension if Needed:</strong> If you cannot file on time, always file an extension (e.g., Form 7004 for businesses). This gives you an automatic six-month extension to *file*, but it is <strong>not</strong> an extension to *pay*. You must still estimate and pay your tax liability by the original due date.</li>
                    <li><strong>Use a Professional Tax Service:</strong> The US tax code is incredibly complex. A professional tax service ensures your returns are prepared correctly and all required informational forms are included.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h3>
                <p className="text-gray-700 mb-4">
                    This guide is part of our comprehensive coverage of US tax compliance. YourLegal provides an all-in-one platform to handle these complex requirements for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/tax-compliance" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Tax Compliance Services
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
