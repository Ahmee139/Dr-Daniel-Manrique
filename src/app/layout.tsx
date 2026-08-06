import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import SiteShell from '@/components/SiteShell';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Dr. Daniel Manrique, M.D. | Facial Plastic & Reconstructive Surgery',
    template: '%s | Dr. Daniel Manrique, M.D.',
  },
  description:
    'Double fellowship-trained specialist in Otorhinolaryngology-Head & Neck Surgery and Facial Plastic, Reconstructive & Cosmetic Surgery in Orlando, Florida.',
  keywords: [
    'facial plastic surgery',
    'rhinoplasty',
    'blepharoplasty',
    'otolaryngology',
    'Orlando plastic surgeon',
    'Daniel Manrique',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={montserrat.className}>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
