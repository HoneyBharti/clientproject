import type { Metadata } from 'next';

// SEO INTENT: Exclude the help center from search engine indexing.
// This content is for existing customers and does not target acquisition keywords.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
