import type { Metadata } from 'next';

// SEO INTENT: Exclude the careers page from search engine indexing.
// While important for recruiting, it does not contribute to our core topical authority for customers.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
