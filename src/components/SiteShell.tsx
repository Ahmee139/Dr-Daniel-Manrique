'use client';

import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RefreshToHome from '@/components/RefreshToHome';
import { PageTransitionProvider } from '@/context/PageTransitionContext';

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <PageTransitionProvider>
      <RefreshToHome />
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
    </PageTransitionProvider>
  );
}
