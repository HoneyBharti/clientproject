
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, DollarSign, FileText, Landmark, User, Scale } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "US company formation costs consist of three parts: 1) One-time state filing fees (e.g., $100 for WY, $160 for DE C-Corp), 2) Annual recurring state fees (e.g., ~$60 for WY, $175+ for DE C-Corp), and 3) Professional service fees for handling the process. Total initial cost through a service is typically $500-$1000." },
        { title: "Direct Question Answer", content: "What is this about? A breakdown of the costs involved in forming and maintaining a US company. Who is it for? Founders budgeting for their new US business. When is it relevant? During the initial planning and formation phase." },
        { title: "Decision Summary", content: "Who should act? All founders must budget for these mandatory costs. Who can ignore? No one. These fees are a legal requirement for forming and maintaining a company." }
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

const CostCard = ({ title, state, fee, description }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-800">{state}</p>
        <p className="text-4xl font-extrabold text-blue-600 my-2">${fee}</p>
        <p className="text-xs text-gray-600">{description}</p>
    </div>
);

export default function FormationCostsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "US Company Formation Costs: A Founder's Guide to Fees",
    "description": "A detailed breakdown of the costs to form and maintain a US company, including state filing fees, annual franchise taxes, and registered agent fees for Delaware and Wyoming.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-formation-costs.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/formation-costs-in-the-united-states" },
    "keywords": "us company formation cost, delaware llc cost, wyoming c-corp fees, state filing fees, registered agent cost, us incorporation cost"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Formation Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Founder's Guide to US Company Formation Costs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              What does it *really* cost to form and maintain a US company? This guide breaks down the one-time state fees, recurring annual costs, and service fees.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Budgeting is critical for any new venture. When forming a US company, founders need a clear understanding of not just the initial setup cost, but also the recurring annual expenses required to keep the company legally active. These costs can be broken down into three main categories: one-time state filing fees, annual recurring state fees, and professional service fees.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
             This guide provides a transparent breakdown of these costs, focusing on the two most popular states for non-resident founders: <Link href="/blog/delaware-vs-wyoming-incorporation" className="text-blue-600 hover:underline">Delaware and Wyoming</Link>.
            </p>

            <BlogSection title="Category 1: One-Time State Filing Fees" icon={FileText}>
                <p>This is the fee you pay directly to the Secretary of State to legally create your company. It is a one-time cost paid during the <Link href="/blog/us-company-formation-process" className="text-blue-600 hover:underline">formation process</Link>.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CostCard title="LLC Filing Fee" state="Wyoming" fee="100" description="Fee to file Articles of Organization." />
                    <CostCard title="C-Corp Filing Fee" state="Wyoming" fee="100" description="Fee to file Articles of Incorporation." />
                    <CostCard title="LLC Filing Fee" state="Delaware" fee="90" description="Fee to file Certificate of Formation. (Note: A county fee of ~$70 is often added)." />
                    <CostCard title="C-Corp Filing Fee" state="Delaware" fee="90" description="Fee to file Certificate of Incorporation. (Note: A county fee of ~$70 is often added)." />
                </div>
            </BlogSection>
            
            <BlogSection title="Category 2: Annual Recurring State Fees" icon={Landmark}>
                <p>This is the ongoing cost to keep your company in "good standing" with the state. This is paid every year as part of your <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">annual compliance</Link> filing.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CostCard title="Annual Report & License Tax" state="Wyoming LLC & C-Corp" fee="62" description="Minimum fee. Based on assets in WY." />
                    <CostCard title="Annual Tax" state="Delaware LLC" fee="300" description="Flat tax, regardless of income or activity." />
                    <CostCard title="Annual Franchise Tax" state="Delaware C-Corp" fee="175+" description="Minimum fee for corps with 5,000 shares or less. Increases with more shares." />
                </div>
            </BlogSection>

            <BlogSection title="Category 3: Professional Service Fees" icon={User}>
                <p>These are fees paid to a service provider like YourLegal to handle the formation and ongoing compliance on your behalf.</p>
                 <ul className="list-disc pl-5 mt-4 space-y-3">
                    <li><strong>Formation Service Fee:</strong> A one-time fee for preparing and filing your documents, obtaining your EIN, and providing legal templates. Our package starts at $499, which is significantly more cost-effective than hiring a traditional law firm.</li>
                    <li><strong>Registered Agent Fee:</strong> A mandatory annual cost for having a registered agent in your state of formation. This service is typically $100-$200 per year. **Your first year is included in our formation package.**</li>
                    <li><strong>Annual Compliance/Tax Service Fee:</strong> An annual fee for preparing and filing your state Annual Report and federal/state tax returns. This varies widely but is bundled into our <Link href="/usa/pricing" className="text-blue-600 hover:underline">Vitals and Elite plans</Link> for cost predictability.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Putting It All Together: A Sample First-Year Cost</h3>
                 <p className="text-gray-700">
                  For a non-resident founder forming a **Wyoming LLC** with our Micro plan, a typical first-year cost would be:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-700">
                    <li>YourLegal Formation Fee: $499 (includes first year Registered Agent)</li>
                    <li>Wyoming State Filing Fee: $100</li>
                    <li><strong>Total Initial Outlay: ~$599</strong></li>
                </ul>
                <p className="text-gray-700 mt-2">The annual cost thereafter would be the state annual fee (~$62) plus your Registered Agent and compliance service fees.</p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

