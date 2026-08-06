import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Procedures',
  description:
    'Cosmetic, functional, reconstructive, and integrative facial procedures by Dr. Daniel Manrique, M.D.',
};

export default function ProceduresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
