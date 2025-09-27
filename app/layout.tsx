import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAYA CELIK",
  description: "Yardimci Yazilim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`}
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="flex flex-col h-screen">
          {/* <TopHeader /> */}
          <div className="flex flex-1">
            {/* <Sidebar /> */}
            <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: 'var(--background)' }}>
              {children}
            </main>
          </div>
        </div>
        {/* Global Loading Spinner Placeholder */}
        <div id="global-loading-spinner" style={{ display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '5px' }}>
          Yükleniyor...
        </div>
        {/* Global Toast Notification Placeholder */}
        <div id="global-toast-notification" style={{ display: 'none', position: 'fixed', top: '20px', right: '20px', zIndex: 9999, padding: '10px 20px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>
          Başarılı!
        </div>
      </body>
    </html>
  );
}
