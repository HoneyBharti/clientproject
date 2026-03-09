import type { Metadata } from 'next';

// SEO INTENT: Exclude this page from search engine indexing as it provides no SEO value.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
