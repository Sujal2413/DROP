import type { Metadata, Viewport } from 'next';
import { Inter, Oswald, Playfair_Display, Space_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dropwater.in'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Drop Water | Premium Canned Water',
    template: '%s | Drop Water',
  },
  description: 'Drop Water - Premium canned still water. Infused with mint, clove, or natural minerals. Phasing out single-use plastics forever.',
  keywords: ['Drop Water', 'drop water', 'DROP Water', 'Premium Canned Water', 'Canned Still Water', 'Aluminum Canned Water', 'Mint Water', 'Clove Water', 'Eco Friendly Water'],
  authors: [{ name: 'Drop Water team' }],
  creator: 'Drop Water',
  publisher: 'Drop Water',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Drop Water | Premium Canned Water. As It Should Be.',
    description: 'Drop Water - Premium canned still water. Phasing out single-use plastics forever.',
    url: 'https://www.dropwater.in',
    siteName: 'Drop Water',
    images: [
      {
        url: 'https://www.dropwater.in/assets/new-can-variant-1.png',
        width: 1200,
        height: 630,
        alt: 'DROP. Premium Canned Water',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drop Water | Premium Canned Water',
    description: 'Drop Water - Premium canned still water. Phasing out single-use plastics forever.',
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

export const viewport: Viewport = {
  themeColor: '#0F1112',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness', 'Brand'],
              name: 'Drop Water',
              alternateName: 'DROP',
              url: 'https://www.dropwater.in',
              logo: 'https://www.dropwater.in/apple-touch-icon.png',
              telephone: '+918976127355',
              email: 'contactus@dropwater.in',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bandra West',
                addressLocality: 'Mumbai',
                postalCode: '400050',
                addressCountry: 'IN'
              },
              sameAs: [
                'https://www.instagram.com/dropwaterco',
                'https://x.com/dropofficialw',
                'https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr'
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
