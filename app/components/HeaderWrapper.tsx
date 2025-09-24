'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const showHeader = pathname.startsWith('/office');

  return (
    <>
      {showHeader && <Header />}
    </>
  );
}
