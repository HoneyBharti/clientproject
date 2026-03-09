
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Shield, Landmark, Scale, Info } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Choose Delaware for a C-Corp if you plan to raise venture capital, due to its robust corporate law and investor preference. Choose Wyoming for an LLC if your priorities are low costs, asset protection, and privacy, making it ideal for online businesses, holding companies, and solo entrepreneurs." },
        { title: "Direct Question Answer", content: "What is this about? A comparison of Delaware and Wyoming as states for company incorporation. Who is it for? Founders choosing a US state to register their business. When is it relevant? This is the first critical decision in the company formation process." },
        { title: "Decision Summary", content: "Who should act? Founders seeking VC funding should choose Delaware for their C-Corp. Founders prioritizing low costs and privacy for their LLC should choose Wyoming. Who can ignore? Founders whose business requires a physical presence in another state (e.g., California) may need to register there instead." }
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

const StateCard = ({ state, icon, description, pros, cons, bestFor, compliance, className }) => (
  <div className={`p-8 rounded-2xl border ${className}`}>
    <div className="flex items-center mb-4">
      {React.createElement(icon, { className: 'w-8 h-8 mr-3' })}
      <h3 className="text-3xl font-extrabold text-gray-900">{state}</h3>
    </div>
    <p className="italic text-gray-600 mb-6">{description}</p>
    <div className="space-y-4 mb-6">
        <h4 className="font-bold text-lg text-gray-800">Pros:</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {pros.map((pro, i) => <li key={i}>{pro}</li>)}
        </ul>
        <h4 className="font-bold text-lg text-gray-800">Cons:</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {cons.map((con, i) => <li key={i}>{con}</li>)}
        </ul>
    </div>
     <div className="bg-white/70 p-4 rounded-lg mt-auto">
        <p className="font-bold text-gray-900">Best For:</p>
        <p className="text-sm text-gray-800">{bestFor}</p>
        <p className="font-bold text-gray-900 mt-2">Annual Compliance:</p>
        <p className="text-sm text-gray-800">{compliance}</p>
    </div>
  </div>
);


export default function DelawareVsWyomingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Delaware vs. Wyoming for Incorporation: Which State Is Right for You?",
    "description": "A comprehensive comparison of Delaware and Wyoming for company formation, covering costs, privacy, legal systems, and investor preferences for both LLCs and C-Corps.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/delaware-vs-wyoming.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/delaware-vs-wyoming-incorporation" },
    "keywords": "delaware vs wyoming llc, delaware vs wyoming c-corp, best state to incorporate, wyoming vs delaware for non-residents, delaware court of chancery, wyoming privacy"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Formation Strategy</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Delaware vs. Wyoming: Which State Is Right for Your Business?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              This is the first major decision for any founder forming a US company. Your choice has lasting consequences for fundraising, privacy, and cost. We break it down.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              When forming a US company, you are not required to register it in the state where you live or operate. You can choose any of the 50 states. For decades, two states have dominated as the preferred choice for entrepreneurs, especially non-residents: Delaware and Wyoming. Each offers distinct advantages, and the right choice depends entirely on your business type and long-term goals.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              The decision often boils down to a simple question: **Are you planning to raise venture capital?** If the answer is yes, Delaware is almost always the right choice. If not, Wyoming's benefits are hard to ignore. Let's dive into a detailed comparison.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <StateCard 
                    state="Delaware"
                    icon={Landmark}
                    description="The undisputed heavyweight champion for venture-backed startups and publicly traded companies."
                    pros={["Gold standard for VCs", "Highly developed corporate law (Court of Chancery)", "Flexible and predictable legal framework"]}
                    cons={["Higher annual franchise tax for C-Corps", "Higher annual tax for LLCs ($300)", "No owner privacy on public record"]}
                    bestFor="C-Corporations seeking venture capital."
                    compliance="Annual Report & Franchise Tax due March 1st (C-Corps). Annual Tax due June 1st (LLCs)."
                    className="bg-blue-50 border-blue-200"
                />
                 <StateCard 
                    state="Wyoming"
                    icon={Shield}
                    description="The top choice for privacy, asset protection, and low costs, especially for LLCs."
                    pros={["Excellent owner privacy (anonymity)", "Very low annual fees (around $62)", "Strong asset protection laws for LLCs", "No state corporate or personal income tax"]}
                    cons={["Less familiar to VCs", "Corporate law is less developed than Delaware's"]}
                    bestFor="LLCs, holding companies, and online businesses not seeking VC funding."
                    compliance="Annual Report and license tax due on the first day of your company's anniversary month."
                    className="bg-red-50 border-red-200"
                />
            </div>

            <BlogSection title="Deep Dive: Why VCs Demand Delaware C-Corps" icon={Landmark}>
                <p>Venture capitalists are creatures of habit and precedent. They invest millions of dollars based on complex legal agreements. They need absolute predictability. Delaware provides this through:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>The Court of Chancery:</strong> This is a unique court that exclusively handles business disputes. Its judges are experts in corporate law, and their decisions create a vast, predictable body of legal precedent that lawyers and investors rely on. This reduces legal risk.</li>
                    <li><strong>Standardization:</strong> The "Delaware C-Corp" is the default structure for high-growth startups. All major VC law firms have standardized term sheets, stock purchase agreements, and other legal documents based on Delaware law. Using a different state introduces non-standard terms, increasing legal fees and friction during a deal.</li>
                    <li><strong>Flexibility for Complex Structures:</strong> Delaware law is designed to easily accommodate the complex capital structures of venture-backed companies, such as issuing preferred stock to investors with special rights.</li>
                </ul>
                <p className="mt-4">If your goal is to raise money from institutional investors, choosing a Delaware C-Corp is not just a suggestion; it's a requirement. Read more about entity choice in our <Link href="/blog/llc-vs-c-corp" className="text-blue-600 hover:underline">LLC vs C-Corp guide</Link>.</p>
            </BlogSection>

             <BlogSection title="Deep Dive: Why Wyoming is King for LLCs" icon={Shield}>
                <p>If you are not seeking VC funding, the advantages of Delaware largely disappear, and Wyoming's benefits become much more compelling, especially for LLCs.</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Anonymity & Privacy:</strong> Wyoming is one of the few states that does not require the names of an LLC's members or managers to be listed on the public record. For founders who value privacy, this is a massive advantage.</li>
                    <li><strong>Low Costs:</strong> Wyoming has one of the lowest annual renewal fees in the country (around $62). Delaware's annual tax for an LLC is a flat $300. Over a decade, this is a significant cost saving.</li>
                    <li><strong>Strong Asset Protection:</strong> Wyoming law provides robust "charging order" protection for single-member LLCs, making it more difficult for a personal creditor of the owner to seize the LLC's assets.</li>
                </ul>
                <p className="mt-4">For online businesses, e-commerce stores, consulting firms, and holding companies, a Wyoming LLC offers the best combination of cost, privacy, and protection in the US.</p>
            </BlogSection>
            
            <BlogSection title="The YourLegal Verdict" icon={Scale}>
                <p>The choice is strategic and should be based on your business's future. Don't overcomplicate it:</p>
                 <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>Planning to raise venture capital? **Choose a Delaware C-Corp.**</li>
                    <li>Running an online business, a holding company, or a service business and value privacy and low costs? **Choose a Wyoming LLC.**</li>
                </ul>
                <p>At YourLegal, our <Link href="/usa/company-formation" className="text-blue-600 hover:underline">formation packages</Link> are designed to set you up correctly in either state, ensuring you have the right foundation for your specific goals.</p>
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

