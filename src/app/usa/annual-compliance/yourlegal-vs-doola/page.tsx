
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For annual compliance, YourLegal offers proactive management integrated with tax services, ensuring all state reports (like Delaware Franchise Tax) and federal informational filings (BOI report) are handled seamlessly. Doola provides a reliable but more basic service focused on filing the state annual report, acting as a standalone compliance agent." },
        { title: "Direct Question Answer", content: "What is this about? A comparison of YourLegal's integrated annual compliance service versus Doola's. Who is it for? Founders who need to ensure their US company stays in good standing with state authorities. When is it relevant? Annually, as state filings are a recurring legal obligation." },
        { title: "Decision Summary", content: "Who should act? Founders who want a single 'set it and forget it' solution for all state and federal compliance should choose YourLegal. Who can ignore? Founders who only need a simple annual report filed and are comfortable managing their tax and other compliance separately might find Doola sufficient." }
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
        { feature: 'State Annual Report Filing', doola: 'Yes', yourlegal: 'Yes', yourlegalAdvantage: false },
        { feature: 'State Franchise Tax Payment', doola: 'Yes', yourlegal: 'Yes', yourlegalAdvantage: false },
        { feature: 'Registered Agent Service', doola: 'Yes', yourlegal: 'Yes', yourlegalAdvantage: false },
        { feature: 'BOI Report Filing (FinCEN)', doola: 'Add-on Service', yourlegal: 'Included in Compliance Plans', yourlegalAdvantage: true },
        { feature: 'Integration with Tax Filing', doola: 'No', yourlegal: 'Yes, Seamless', yourlegalAdvantage: true },
        { feature: 'Proactive Deadline Monitoring', doola: 'Yes', yourlegal: 'Yes, fully automated', yourlegalAdvantage: true },
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

export default function YourLegalVsDoolaAnnualCompliance() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/usa/annual-compliance" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Annual Compliance
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Competitor Comparison</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              YourLegal vs. Doola: Annual Compliance
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              While both services file your state reports, YourLegal's integrated platform provides a more holistic and seamless compliance experience.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Annual compliance is the recurring, mandatory process of keeping your company in good standing with the state. This typically involves filing an Annual Report and paying franchise tax. Both YourLegal and Doola offer services to handle this critical task. However, the scope and integration of these services differ significantly.
            </p>

            <ComparisonSection />

            <BlogSection title="Key Differences Explained">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">A Holistic View of Compliance</h3>
                    <p>
                        Doola's compliance service is primarily focused on the state-level filing: the Annual Report. This is an essential task, but it's only one piece of the compliance puzzle.
                    </p>
                    <p className="mt-2">
                        YourLegal's Vitals and Elite plans treat compliance holistically. We understand that your state filing is interconnected with your federal tax obligations and other informational returns. Our service not only handles your state Annual Report but also includes the filing of your federal tax return and the mandatory FinCEN BOI Report, all managed through one platform.
                    </p>
                </div>
            </BlogSection>

             <div className="text-center mt-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">The Verdict</h2>
                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mx-auto">
                    <p>
                        <strong>Choose Doola if...</strong> you only need a simple, reliable service to file your state's Annual Report and are happy to manage your tax and other federal filings separately.
                    </p>
                    <p>
                        <strong>Choose YourLegal if...</strong> you want a comprehensive "peace of mind" solution. Our integrated platform manages all your state and federal compliance obligations together, reducing risk and administrative burden for a truly all-in-one experience.
                    </p>
                </div>
                 <Button asChild size="lg" className="mt-8">
                    <Link href="/usa/pricing">Explore Our All-in-One Compliance Plans</Link>
                </Button>
            </div>

          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
