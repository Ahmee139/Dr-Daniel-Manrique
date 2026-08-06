import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultation',
  description:
    'Request a private consultation with Dr. Daniel Manrique, M.D. in Orlando, Florida.',
};

export default function ConsultationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
