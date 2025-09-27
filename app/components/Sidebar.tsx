'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaPlus, FaListAlt, FaClock } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/office/order-entry', label: 'Sipariş Girişi', icon: FaPlus },
    { href: '/office/order-management', label: 'Sipariş Yönetimi', icon: FaListAlt },
    { href: '/office/production-monitoring', label: 'Üretim Takibi', icon: FaClock },
  ];

  return (
    <aside className="w-[200px] text-white flex flex-col shadow-lg" style={{ backgroundColor: 'var(--sidebar-background)' }}>
      <div className="flex items-center justify-center h-16 shadow-md" style={{ backgroundColor: 'var(--sidebar-background)' }}>
        <Image src="/logohd.png" alt="Kaya Celik Logo" width={32} height={32} />
        <span className="ml-2 text-lg font-semibold">Kaya Çelik</span>
      </div>
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-2 transition-colors duration-200 text-gray-200 hover:text-white
              ${pathname.startsWith(item.href)
                ? 'text-white' 
                : 'hover:bg-gray-700'
              }`}
            style={pathname.startsWith(item.href) ? { backgroundColor: 'var(--accent-blue)' } : {}}
          >
            <item.icon className="mr-3" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
