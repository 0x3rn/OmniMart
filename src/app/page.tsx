import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  alternates: { canonical: 'https://omnimart.corstack.dev/' },
};

export default function Page() { return <HomeContent />; }
