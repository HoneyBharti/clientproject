'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, UserCheck, Shield, FileText, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-red-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function SingaporeNomineeDirector() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Nominee Director in Singapore: A Must-Know",
    "description": "An essential guide for foreign founders on fulfilling the local director requirement.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/singapore-nominee-director.jpg",
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
          <Link href="/singapore" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Singapore Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-red-600 tracking-wide uppercase">Singapore Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The Nominee Director in Singapore: A Must-Know
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An essential guide for foreign founders on fulfilling the local director requirement.
            </p>
          </header>

          <article>
            <BlogSection title="What is the Local Director Requirement?" icon={UserCheck}>
              <p>
                Under Section 145(1) of the Singapore Companies Act, every company incorporated in Singapore must have at least one director who is "ordinarily resident" in Singapore. This means a Singapore Citizen, Permanent Resident, or an EntrePass holder who can prove their local residency.
              </p>
              <p>
                For foreign entrepreneurs who do not have a local resident to appoint, this poses a significant challenge to incorporation. This is where the Nominee Director service comes in.
              </p>
            </BlogSection>

            <BlogSection title="The Role of a Nominee Director" icon={Shield}>
              <p>
                A Nominee Director is a qualified Singapore resident appointed to your company's board to satisfy the statutory requirement. It's crucial to understand that this is a non-executive role.
              </p>
              <h4 className="font-bold mt-6 mb-2">Key Characteristics of a Nominee Director:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>They do not get involved in the operational, financial, or managerial aspects of your business.</li>
                <li>They do not have any authority over your corporate bank account.</li>
                <li>Their primary function is to ensure the company remains compliant with Singaporean laws, such as timely filing of annual returns.</li>
                <li>The role is purely to fulfill a legal requirement, allowing foreign founders to maintain 100% control over their company.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="The Nominee Director Agreement" icon={FileText}>
                <p>
                    When you engage a nominee director service, you will sign a legal agreement that clearly outlines the scope and limitations of their role. This agreement is designed to protect both you and the nominee.
                </p>
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">
                        This agreement typically includes a clause requiring you to appoint a local resident executive director (such as yourself, after obtaining an Employment Pass) within a specified period, after which the nominee can resign.
                    </p>
                </div>
            </BlogSection>

            <BlogSection title="Risks and Responsibilities" icon={AlertTriangle}>
                <p>
                    While the role is non-executive, a Nominee Director is still legally considered a director and is subject to the same statutory duties under the Companies Act. Because they take on personal liability for your company's compliance, the service provider will require a security deposit.
                </p>
                <p className="mt-4">
                    This security deposit is refundable and is held to cover any potential fines or penalties incurred by your company due to non-compliance. Maintaining good corporate governance is the best way to ensure your deposit is returned in full.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-red-50 border-t-4 border-red-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The Nominee Director service is a vital and standard solution that enables global entrepreneurs to access the Singaporean market. It is a bridge that allows you to incorporate your company legally while you make arrangements to relocate or hire a local executive director.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
