'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  ChevronLeft,
  Lightbulb,
  Server,
  Home,
  TestTube2,
  AlertTriangle,
} from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

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

const TipBox = ({ children }) => (
    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800">{children}</span>
        </p>
    </div>
);

export default function FiveDeductionsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "5 Deductions You’re Missing Out On",
    "description": "Maximize your startup’s runway by capturing these key expense categories.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/5-deductions.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "YourLegal AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yourlegal.ai/logo.png"
      }
    }
  };

  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/usa" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to USA Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Tax Savings</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              5 Deductions You’re Missing Out On
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your startup’s runway by capturing these key expense categories.
            </p>
          </header>

          <article>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              For early-stage founders and growing startups, cash flow is everything. While revenue growth often gets the spotlight, tax-efficient expense management can materially extend your runway—sometimes by months. Many startups unknowingly leave money on the table by missing legitimate tax deductions they are entitled to claim. Below are five commonly overlooked deductions that can significantly reduce your taxable income when handled correctly.
            </p>

            <BlogSection title="1. Founder & Executive Compensation Expenses" icon={Users}>
                <p>Many founders assume their own compensation isn’t deductible—this is only partially true.</p>
                <h4 className="font-bold mt-6 mb-2">What You Can Deduct:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Salaries paid to founders and executives</li>
                    <li>Employer payroll taxes</li>
                    <li>Bonuses and performance incentives</li>
                    <li>Health insurance premiums (through the company)</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">Common Mistake:</h4>
                <p>Not formalizing payroll or misclassifying payments as “draws” or informal transfers.</p>
                <TipBox>Proper payroll setup and documentation are critical to claim these deductions without IRS scrutiny.</TipBox>
            </BlogSection>

            <BlogSection title="2. Professional Services & Advisory Fees" icon={BookOpen}>
                <p>Startups rely heavily on external expertise—but often fail to deduct these costs correctly.</p>
                <h4 className="font-bold mt-6 mb-2">Deductible Professional Fees Include:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Accounting and bookkeeping services</li>
                    <li>Tax preparation and compliance</li>
                    <li>Legal fees (contracts, incorporation, IP)</li>
                    <li>CFO or financial advisory services</li>
                    <li>Compliance and regulatory consulting</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">Common Mistake:</h4>
                <p>Capitalizing expenses that should be deducted or failing to categorize them properly.</p>
                <TipBox>Separate one-time capital costs from recurring professional services for accurate deduction treatment.</TipBox>
            </BlogSection>

            <BlogSection title="3. Software, SaaS, and Technology Tools" icon={Server}>
                <p>Most modern startups are software-driven—and these costs add up quickly.</p>
                <h4 className="font-bold mt-6 mb-2">Common Deductible SaaS Expenses:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Accounting software (QuickBooks, Xero)</li>
                    <li>CRM tools (HubSpot, Salesforce)</li>
                    <li>Cloud infrastructure (AWS, GCP, Azure)</li>
                    <li>Project management tools (Jira, Asana, Notion)</li>
                    <li>Security and compliance software</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">Common Mistake:</h4>
                <p>Treating SaaS subscriptions as general overhead without categorization.</p>
                <TipBox>SaaS costs are typically fully deductible operating expenses, not assets.</TipBox>
            </BlogSection>
            
            <BlogSection title="4. Home Office & Remote Work Expenses" icon={Home}>
                <p>With remote-first teams becoming standard, many startups overlook distributed work deductions.</p>
                <h4 className="font-bold mt-6 mb-2">Deductible Categories:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Home office allocation (if applicable)</li>
                    <li>Internet and phone expenses</li>
                    <li>Remote work stipends</li>
                    <li>Coworking space memberships</li>
                    <li>Office supplies and equipment</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">Common Mistake:</h4>
                <p>Assuming remote work expenses are “personal” and not reimbursable or deductible.</p>
                <TipBox>Use an accountable plan or reimbursement policy to ensure compliance and deductibility.</TipBox>
            </BlogSection>

            <BlogSection title="5. Research, Development & Product Costs" icon={TestTube2}>
                 <p>If your startup is building, testing, or improving a product, you may qualify for significant deductions or credits.</p>
                <h4 className="font-bold mt-6 mb-2">Deductible R&D Costs:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Engineering and developer salaries</li>
                    <li>Product design and prototyping</li>
                    <li>Testing and QA expenses</li>
                    <li>Cloud infrastructure used for development</li>
                    <li>Certain contractor costs</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">Bonus Opportunity:</h4>
                <p>Eligible startups may also qualify for R&D tax credits, which can offset payroll taxes.</p>
                <TipBox>Proper documentation is essential—poor records can invalidate R&D claims.</TipBox>
            </BlogSection>
            
            <BlogSection title="Why Startups Miss These Deductions" icon={AlertTriangle}>
                <p>Most missed deductions come down to:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Poor bookkeeping</li>
                    <li>Incorrect expense categorization</li>
                    <li>Mixing personal and business spending</li>
                    <li>Lack of proactive tax planning</li>
                    <li>Filing without professional review</li>
                </ul>
                <p className="mt-4">Early mistakes compound over time, leading to higher tax liabilities and reduced runway.</p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Tax deductions are not about aggressive tax avoidance—they’re about claiming what the law already allows. By identifying and properly documenting these five expense categories, startups can reduce taxable income, improve cash flow, and extend operational runway. In a capital-constrained environment, smart tax management can be a competitive advantage.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

