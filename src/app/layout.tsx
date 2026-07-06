import type { Metadata } from 'next';
import { Inter, Oswald, Playfair_Display, Space_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'DROP. As It Should Be.',
  description: 'Premium canned still water.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
