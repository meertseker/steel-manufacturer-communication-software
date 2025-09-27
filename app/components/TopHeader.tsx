import Image from 'next/image';
import Link from 'next/link';

export default function TopHeader() {
  return (
    <header className="w-full border-b border-gray-200 p-4 flex items-center justify-between shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
      <div className="flex items-center">
        <Image src="/logohd.png" alt="Kaya Celik Logo" width={32} height={32} />
        <span className="ml-3 text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>Kaya Çelik</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm" style={{ color: 'var(--text-body)' }}>Kullanıcı Adı</span>
        <Link href="/logout" className="text-sm hover:underline" style={{ color: 'var(--accent-blue)' }}>
          Çıkış Yap
        </Link>
      </div>
    </header>
  );
}
