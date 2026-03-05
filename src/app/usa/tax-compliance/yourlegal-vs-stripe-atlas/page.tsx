
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For tax compliance, YourLegal provides an integrated service where our in-house accounting data flows seamlessly to our tax team for accurate filings. Stripe Atlas does not offer tax services; it relies on referrals to third-party firms, creating a disconnected process for founders." },
        { title: "Direct Question Answer", content: "What is this about? A comparison of YourLegal's integrated tax compliance service versus Stripe Atlas's referral model. Who is it for? Founders needing to file mandatory annual US tax returns. When is it relevant? Annually, as tax season approaches." },
        { title: "Decision Summary", content: "Who should act? Founders who value an efficient, all-in-one platform for both bookkeeping and tax should choose YourLegal. Who can ignore? Founders who are comfortable finding and managing a separate CPA firm for their taxes after forming with Stripe Atlas." }
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
        { feature: 'Tax Preparation & Filing Service', stripe: 'No (Partner Referral)', yourlegal: 'Yes, Core Service', yourlegalAdvantage: true },
        { feature: 'Form 5472 for Foreign Owners', stripe: 'No (Handled by partner)', yourlegal: 'Yes, fully managed', yourlegalAdvantage: true },
        { feature: 'Data Integration', stripe: 'Manual (Requires export/import)', yourlegal: 'Seamless & Integrated', yourlegalAdvantage: true },
        { feature: 'Single Point of Contact', stripe: 'No', yourlegal: 'Yes', yourlegalAdvantage: true },
        { feature: 'All-in-One Platform', stripe: 'No', yourlegal: 'Yes', yourlegalAdvantage: true },
    ];

    return (
        <div className="my-12 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 font-semibold border-b">Feature</th>
                        <th className="p-4 font-semibold border-b text-center">Stripe Atlas</th>
                        <th className="p-4 font-semibold border-b text-center bg-blue-50">YourLegal</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4 font-medium text-gray-700">{item.feature}</td>
                            <td className="p-4 text-center">{item.stripe === 'No' ? <X className="mx-auto text-red-500"/> : item.stripe}</td>
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


export default function YourLegalVsStripeAtlasTax() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/usa/tax-compliance" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Tax Compliance
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Competitor Comparison</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              YourLegal vs. Stripe Atlas: Tax Compliance
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your tax return is only as good as the bookkeeping it's based on. YourLegal's integrated approach provides a more reliable solution than a referral marketplace.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Filing US tax returns is a mandatory and complex process for every company. While Stripe Atlas provides referrals to tax partners, it doesn't offer an integrated solution. YourLegal, by contrast, has built its tax compliance service on top of its core bookkeeping product, creating a seamless and efficient workflow that reduces risk for founders.
            </p>

            <ComparisonSection />

            <BlogSection title="Key Differences Explained">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Integrated Data vs. Data Silos</h3>
                    <p>
                        A tax return is the end product of a year's worth of financial data. If you use Stripe Atlas, you will need to engage one of their partners for bookkeeping and another for tax. This means your tax preparer receives a year's worth of data from another firm, which they must then re-analyze and trust. This process is inefficient and increases the risk of errors.
                    </p>
                    <p className="mt-2">
                        YourLegal's Vitals and Elite plans are different. Our tax team works directly from the clean, reconciled books prepared by our own bookkeeping team throughout the year. The data is consistent, reliable, and requires no manual handoff. This integration is particularly crucial for complex filings like Form 5472, where our bookkeepers are already tagging relevant transactions for the tax team.
                    </p>
                </div>
            </BlogSection>

             <div className="text-center mt-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">The Verdict</h2>
                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mx-auto">
                    <p>
                        <strong>Choose Stripe Atlas if...</strong> you are comfortable sourcing and managing separate bookkeeping and tax firms and handling the coordination between them.
                    </p>
                    <p>
                        <strong>Choose YourLegal if...</strong> you want an all-in-one platform where your financial data flows seamlessly from daily transactions to your final tax return, all managed by a single, accountable partner. This integrated approach saves time, reduces risk, and ensures a higher quality, more defensible tax filing.
                    </p>
                </div>
                 <Button asChild size="lg" className="mt-8">
                    <Link href="/usa/pricing">Explore Our Integrated Tax & Bookkeeping Plans</Link>
                </Button>
            </div>

          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
