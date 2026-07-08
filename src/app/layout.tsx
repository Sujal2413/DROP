import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
              '@type': 'Organization',
              name: 'DROP',
              url: 'https://www.dropwater.in',
              logo: 'https://www.dropwater.in/apple-touch-icon.png',
              sameAs: [
                'https://www.instagram.com/dropwaterco',
                'https://x.com/dropofficialw',
                'https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr'
              ]
            })
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-6FS7R0VS7Y`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6FS7R0VS7Y');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
