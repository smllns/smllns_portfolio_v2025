import type { Metadata } from 'next';
import { Holtwood_One_SC, Roboto } from 'next/font/google';
import './globals.css';
import PageTransition from '@/components/PageTransition';
import CustomCursor from '@/components/CustomCursor';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import InertiaPlugin from 'gsap/InertiaPlugin';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import gsap from 'gsap';
gsap.registerPlugin(
  ScrollTrigger,
  Draggable,
  SplitText,
  InertiaPlugin,
  DrawSVGPlugin
);

const holtwood = Holtwood_One_SC({
  variable: '--font-holtwood',
  subsets: ['latin'],
  weight: ['400'],
});
const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Smllns portfolio',
  description: 'Smllns Portfolio - React | Next.js | Tailwind CSS',
  metadataBase: new URL('https://smllns-portfolio.vercel.app'),
  openGraph: {
    title: 'Smllns Portfolio',
    description: 'Smllns Portfolio - React | Next.js | Tailwind CSS',
    url: 'https://smllns-portfolio.vercel.app/',
    siteName: 'Smllns Portfolio',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smllns Portfolio',
    description: 'Smllns Portfolio - React | Next.js | Tailwind CSS',
    images: ['/preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        />
      </head>
      <body className={`${roboto.variable} ${holtwood.variable} antialiased  `}>
        {children}
        <PageTransition />
        <CustomCursor />
      </body>
    </html>
  );
}
