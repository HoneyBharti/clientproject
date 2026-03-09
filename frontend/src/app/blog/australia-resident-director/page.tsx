'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, UserCheck, Shield, FileText, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-yellow-800' })}
      {title}
      </h2>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
);

export default function AustraliaResidentDirector() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Resident Director Requirement in Australia Explained",
    "description": "A deep dive into the legal requirement for a resident director and how our nominee service can help you comply.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/australia-resident-director.jpg",
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
          <Link href="/australia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Australia Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-yellow-800 tracking-wide uppercase">Australia Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The Resident Director Requirement in Australia Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A deep dive into the legal requirement for a resident director and how our nominee service can help you comply.
            </p>
          </header>

          <article>
            <BlogSection title="The Legal Mandate" icon={UserCheck}>
              <p>
                The Australian Corporations Act 2001 mandates that any proprietary (Pty Ltd) company must have at least one director who is "ordinarily resident" in Australia. This means the director's primary place of residence is in Australia.
              </p>
              <p>
                For foreign founders living overseas, this is a major hurdle to incorporation. You cannot legally register an Australian company without fulfilling this requirement.
              </p>
            </BlogSection>

            <BlogSection title="What is a Nominee Director Service?" icon={Shield}>
              <p>
                A nominee director is a qualified Australian resident who is appointed to your company's board for the sole purpose of meeting the statutory requirement. This is a standard and legal practice for non-resident founders.
              </p>
              <h4 className="font-bold mt-6 mb-2">Key Aspects of the Role:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Non-Executive:</strong> The nominee has no involvement in the day-to-day operations, management, or finances of your business.</li>
                <li><strong>No Authority:</strong> They are not signatories on the company bank account and hold no executive power.</li>
                <li><strong>Compliance Focus:</strong> Their role is to ensure the company meets its basic compliance obligations with ASIC.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="The Nominee Service Agreement" icon={FileText}>
                <p>
                    To protect both parties, a formal service agreement is signed. This legal document clearly defines the nominee's limited, non-executive role and indemnifies them against business activities, as long as the company operates legally.
                </p>
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">
                        The agreement also includes a requirement for a security deposit. This deposit is fully refundable and is held to cover any potential penalties if the company fails to meet its compliance duties.
                    </p>
                </div>
            </BlogSection>

            <BlogSection title="Is it a Long-Term Solution?" icon={AlertTriangle}>
                <p>
                    While a nominee director service is essential for incorporation, it's typically a temporary bridge. The long-term goal for most founders is to either obtain a residency visa and appoint themselves as the director, or hire a local executive-level employee in Australia who can take on the directorship.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-yellow-50 border-t-4 border-yellow-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The resident director requirement is a strict but manageable aspect of Australian corporate law. Using a professional nominee service is the standard, accepted method for foreign entrepreneurs to launch their Australian venture quickly and compliantly.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

