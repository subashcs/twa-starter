import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import BottomNavigation from '@/components/BottomNavigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'MiniCombat',
  description: 'Twa minicombat game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='bg-black flex justify-center'>
          <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
            {children}
            <BottomNavigation />
          </div>
        </div>
      </body>
    </html>
  );
}
