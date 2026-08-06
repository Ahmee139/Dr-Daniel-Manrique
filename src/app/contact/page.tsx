'use client';

import ContactSection from '@/components/home/ContactSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ContactPage() {
  useScrollReveal([]);

  return (
    <div className="subpage-wrapper contact-page">
      <ContactSection />
    </div>
  );
}
