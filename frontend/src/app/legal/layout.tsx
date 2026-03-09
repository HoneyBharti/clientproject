import type { Metadata } from 'next';

// SEO INTENT: Exclude all legal pages (privacy, terms) from search engine indexing
// as they are standard legal documents and provide no unique SEO content value.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
