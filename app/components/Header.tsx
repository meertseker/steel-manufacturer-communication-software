import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-6 flex flex-col items-center shadow-lg">
      <div className="flex items-center justify-center mb-5">
        <Image src="/logohd.png" alt="Kaya Celik Logo" width={60} height={60} />
        <span className="ml-4 text-2xl font-extrabold tracking-wide">Kaya Çelik Sipariş Yönetimi</span>
      </div>
      <div className="flex justify-center gap-8">
        <Link href="/office/order-entry" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Sipariş Girişi
        </Link>
        <Link href="/office/order-management" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Sipariş Yönetimi
        </Link>
        <Link href="/office/production-monitoring" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Ofis - Üretim Takibi
        </Link>
      </div>
    </header>
  );
}
