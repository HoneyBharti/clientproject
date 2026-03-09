
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Scale, Server, ShoppingCart, Briefcase, Building } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "US accounting rules have industry-specific nuances. SaaS requires revenue recognition under ASC 606. E-commerce focuses on inventory accounting (COGS) and multi-state sales tax. Construction uses percentage-of-completion methods. Real estate involves complex depreciation and capital gains rules. General GAAP is not enough; industry expertise is critical." },
        { title: "Direct Question Answer", content: "What is this about? An overview of the unique accounting and tax rules for key US industries like SaaS, E-commerce, Construction, and Real Estate. Who is it for? Business owners and founders in these sectors. When is it relevant? From day one of operations, as these rules dictate how revenue, costs, and assets are recorded for financial and tax reporting." },
        { title: "Decision Summary", content: "Who should act? Founders in these industries must use specialized accounting services to ensure compliance and optimize financials. Who can ignore? Only businesses in very simple service industries with no inventory or complex contracts might not need deep industry specialization, but it is still highly recommended." }
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

const IndustryRule = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2 text-indigo-600' })}
        {title}
    </h3>
    <div className="border-l-4 border-indigo-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function IndustrySpecificAccountingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Guide to Industry-Specific Accounting Rules in the USA",
    "description": "An overview of the unique accounting and tax rules for major US industries, including SaaS (ASC 606), E-commerce, Construction, and Real Estate.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/industry-specific-accounting.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-industry-specific-accounting-rules" },
    "keywords": "industry specific accounting rules usa, saas accounting standards, e-commerce inventory accounting, construction accounting usa, real estate depreciation rules, asc 606 revenue recognition"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US GAAP Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Founder's Guide to Industry-Specific Accounting Rules in the USA
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              US GAAP provides the foundation, but many industries have their own complex layers of rules. Understanding them is key to compliance and profitability.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              While US Generally Accepted Accounting Principles (GAAP) provide a common framework for all businesses, they are not a one-size-fits-all solution. Different industries have unique business models, revenue streams, and cost structures that necessitate specialized accounting rules and treatments. Applying generic accounting principles to a specialized industry is a recipe for non-compliance, inaccurate financial reporting, and missed tax opportunities.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              For founders, understanding the specific accounting nuances of your industry is critical. It impacts everything from how you recognize revenue to how you value your assets and manage your taxes. This guide explores the unique accounting rules for several key industries.
            </p>

            <BlogSection title="Key Industry Nuances" icon={Scale}>
                <IndustryRule title="SaaS & Technology" icon={Server}>
                    <p><strong>The Core Challenge:</strong> Recognizing recurring subscription revenue over time, not when cash is received.</p>
                    <p><strong>The Governing Rule:</strong> ASC 606 (Revenue from Contracts with Customers) is the primary standard. It requires companies to recognize revenue as the service is delivered to the customer. For an annual SaaS contract, this means recognizing 1/12th of the contract value each month.</p>
                    <p><strong>Other Key Considerations:</strong>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                             <li><strong>Capitalization of Software Development Costs (ASC 350-40):</strong> Certain costs incurred during the development of internal-use software must be capitalized as an asset and amortized, rather than expensed immediately.</li>
                             <li><strong>R&D Tax Credits:</strong> Meticulous tracking of engineering salaries and development costs is essential to claim valuable federal and state R&D tax credits.</li>
                         </ul>
                    </p>
                    <p className="font-bold mt-3">Learn More: See our detailed guide on <Link href="/blog/us-tax-compliance-for-saas-companies" className="text-blue-600 hover:underline">SaaS Compliance</Link> and our <Link href="/usa/industries/saas" className="text-blue-600 hover:underline">SaaS industry page</Link>.</p>
                </IndustryRule>

                 <IndustryRule title="E-commerce & Retail" icon={ShoppingCart}>
                    <p><strong>The Core Challenge:</strong> Accurately tracking inventory and the associated Cost of Goods Sold (COGS).</p>
                    <p><strong>The Governing Rule:</strong> Inventory accounting is governed by rules that dictate how to value inventory (e.g., LIFO, FIFO, or weighted-average cost) and how to calculate COGS, which is the direct cost of the products you sell.</p>
                     <p><strong>Other Key Considerations:</strong>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                             <li><strong>Multi-State Sales Tax:</strong> The concept of "economic nexus" requires online sellers to collect and remit sales tax in states where they exceed certain sales thresholds, a major compliance burden.</li>
                             <li><strong>Platform Reconciliation:</strong> Reconciling payouts from platforms like Amazon and Shopify, which have complex fee structures, is a major bookkeeping challenge.</li>
                         </ul>
                    </p>
                    <p className="font-bold mt-3">Learn More: Explore our dedicated <Link href="/usa/industries/ecommerce" className="text-blue-600 hover:underline">E-commerce industry page</Link>.</p>
                </IndustryRule>
                
                <IndustryRule title="Construction" icon={Building}>
                    <p><strong>The Core Challenge:</strong> Recognizing revenue from long-term projects that can span multiple years.</p>
                    <p><strong>The Governing Rule:</strong> The Percentage-of-Completion Method is standard. Under this method, revenue is recognized in proportion to the costs incurred during the period. This requires meticulous project accounting to track costs against the total estimated project cost.</p>
                     <p><strong>Other Key Considerations:</strong>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                             <li><strong>Job Costing:</strong> Detailed tracking of all costs—labor, materials, subcontractors—for each individual job is essential for profitability analysis.</li>
                             <li><strong>Retainage:</strong> Clients often hold back a portion of payment ("retainage") until the project is fully completed. This creates a specific type of accounts receivable that must be tracked.</li>
                         </ul>
                    </p>
                </IndustryRule>
                
                <IndustryRule title="Real Estate" icon={Briefcase}>
                    <p><strong>The Core Challenge:</strong> The treatment of property as a long-term, depreciable asset.</p>
                    <p><strong>The Governing Rule:</strong> Depreciation is a non-cash expense that allows investors to deduct a portion of a property's cost over its useful life (27.5 years for residential, 39 for commercial). This is a powerful tax benefit.</p>
                     <p><strong>Other Key Considerations:</strong>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                             <li><strong>Capital Expenditures vs. Repairs:</strong> A new roof is a capital expenditure that must be depreciated over many years. Fixing a leaky faucet is a repair that can be expensed immediately. Knowing the difference is critical for tax compliance.</li>
                             <li><strong>1031 Exchanges:</strong> This section of the tax code allows investors to defer capital gains tax by reinvesting the proceeds from a property sale into a new "like-kind" property. The rules are extremely strict.</li>
                         </ul>
                    </p>
                    <p className="font-bold mt-3">Learn More: See our detailed guide on <Link href="/usa/industries/real-estate" className="text-blue-600 hover:underline">Real Estate accounting</Link>.</p>
                </IndustryRule>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Industry Specialization Matters</h3>
                <p className="text-gray-700">
                   Choosing an accounting firm isn't just about finding someone who can use QuickBooks. It's about finding a partner who understands the specific economic engine of your business. An accountant who specializes in your industry will not only ensure compliance but will also provide strategic advice on KPIs, tax incentives, and operational efficiencies that are relevant to you. This expertise can be the difference between simply surviving and truly thriving.
                </p>
                 <div className="mt-6">
                    <Button asChild>
                        <Link href="/usa/industries">Explore Our Industry Solutions</Link>
                    </Button>
                </div>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

