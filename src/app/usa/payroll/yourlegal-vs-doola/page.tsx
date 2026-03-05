
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For payroll, YourLegal provides an integrated service where payroll data flows seamlessly into our bookkeeping and tax products. Doola's payroll service is a referral to a third-party provider, which can create a disconnected experience for accounting and tax integration." },
        { title: "Direct Question Answer", content: "What is this about? A comparison of YourLegal's integrated payroll service versus Doola's partner-based approach. Who is it for? Founders hiring US employees and deciding on a long-term payroll and finance partner. When is it relevant? Before hiring the first employee, when choosing a payroll system." },
        { title: "Decision Summary", content: "Who should act? Founders who value an all-in-one system where payroll, bookkeeping, and taxes are managed on a single platform should choose YourLegal. Who can ignore? Founders who only need a standalone payroll provider and are comfortable managing the integration with their separate accounting firm themselves." }
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

const ComparisonSection = () => {
    const features = [
        { feature: 'Service Model', doola: 'Partner Referral (e.g., Gusto)', yourlegal: 'Managed Service on Gusto/Rippling', yourlegalAdvantage: true },
        { feature: 'Federal & State Tax Filings', doola: 'Yes (via partner)', yourlegal: 'Yes, fully managed', yourlegalAdvantage: false },
        { feature: 'Multi-State Payroll', doola: 'Yes (via partner)', yourlegal: 'Yes, fully managed', yourlegalAdvantage: false },
        { feature: 'Integration with Bookkeeping', doola: 'Requires manual setup', yourlegal: 'Seamless & Automated', yourlegalAdvantage: true },
        { feature: 'Integration with Tax Services', doola: 'Requires data handoff', yourlegal: 'Seamless & Integrated', yourlegalAdvantage: true },
        { feature: 'Single Point of Contact', doola: 'No (Doola + Payroll Partner)', yourlegal: 'Yes', yourlegalAdvantage: true },
    ];

    return (
        <div className="my-12 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 font-semibold border-b">Feature</th>
                        <th className="p-4 font-semibold border-b text-center">Doola</th>
                        <th className="p-4 font-semibold border-b text-center bg-blue-50">YourLegal</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4 font-medium text-gray-700">{item.feature}</td>
                            <td className="p-4 text-center">{item.doola}</td>
                            <td className={`p-4 text-center font-semibold ${item.yourlegalAdvantage ? 'bg-green-50 text-green-800' : 'bg-white'}`}>
                                <div className="flex items-center justify-center">
                                    {item.yourlegalAdvantage ? <Check className="w-5 h-5 mr-1" /> : ''}
                                    {item.yourlegal}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const BlogSection = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export default function YourLegalVsDoolaPayroll() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/usa/payroll" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Payroll
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Competitor Comparison</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              YourLegal vs. Doola: Payroll Services
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Payroll data doesn't live in a silo. YourLegal's integrated service ensures it connects seamlessly to your books and taxes.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Hiring US employees requires a compliant payroll system. Both YourLegal and Doola solve this by leveraging best-in-class third-party payroll providers like Gusto. The core difference is not the underlying software, but the service model and integration. Doola acts as a referral, setting you up with a partner. YourLegal provides a managed service, integrating payroll directly into your all-in-one financial platform.
            </p>

            <ComparisonSection />

            <BlogSection title="Key Differences Explained">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Integrated Financial Workflow</h3>
                    <p>
                        When payroll is a separate, referred service, your payroll data exists in a silo. Your bookkeeper must then manually import or journal this data into your accounting system each month. This is an inefficient, error-prone process.
                    </p>
                    <p className="mt-2">
                        YourLegal's managed service ensures your payroll system is <span className="font-bold">natively integrated</span> with your bookkeeping software from day one. Payroll runs automatically sync with your books, ensuring your financial statements always reflect your labor costs accurately and in real-time. This is crucial for accurate financial reporting and tax planning.
                    </p>
                </div>
            </BlogSection>

             <div className="text-center mt-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">The Verdict</h2>
                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mx-auto">
                    <p>
                        <strong>Choose Doola if...</strong> you want a simple introduction to a payroll provider and are comfortable managing the integration with your separate accounting and tax firms yourself.
                    </p>
                    <p>
                        <strong>Choose YourLegal if...</strong> you want a "done-for-you" solution where payroll is a seamless part of a unified financial ecosystem. Our integrated approach saves time, reduces errors, and provides a more accurate and holistic view of your business finances.
                    </p>
                </div>
                 <Button asChild size="lg" className="mt-8">
                    <Link href="/usa/pricing">Explore Our Integrated Plans</Link>
                </Button>
            </div>

          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
