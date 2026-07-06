import type { Metadata } from 'next';
import { Inter, Oswald, Playfair_Display, Space_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dropwater.in'),
  title: {
    default: 'DROP. As It Should Be.',
    template: '%s | DROP.',
  },
  description: 'Premium canned still water. Infused with mint, clove, or natural minerals. Phasing out single-use plastics forever.',
  keywords: ['Premium Canned Water', 'Canned Still Water', 'Aluminum Canned Water', 'DROP Water', 'Mint Water', 'Clove Water', 'Eco Friendly Water'],
  authors: [{ name: 'DROP team' }],
  creator: 'DROP',
  publisher: 'DROP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'DROP. As It Should Be.',
    description: 'Premium canned still water. Phasing out single-use plastics forever.',
    url: 'https://www.dropwater.in',
    siteName: 'DROP',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DROP. As It Should Be.',
    description: 'Premium canned still water. Phasing out single-use plastics forever.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
