import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import './global.css';
import 'katex/dist/katex.css';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IconBook, IconTags, IconFolders, IconBrandGithub, IconBrandTwitter, IconBrandInstagram, IconArrowUp } from '@tabler/icons-react';
import ScrollToTop from '@/components/ScrollToTop';
import localFont from 'next/font/local';
import { LuRabbit } from "react-icons/lu";

// 引入 Inter 
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// 引入 Knewave
import { Knewave } from 'next/font/google';
const knewave = Knewave({ weight: '400', subsets: ['latin'] });

// Crimson Text
import { Crimson_Text } from 'next/font/google';
const crimsonText = Crimson_Text({ weight: '600', subsets: ['latin'] });

// const MiSans = localFont({
//   src: [
//     {
//       path: '../../public/MiSansVF.ttf',
//       weight: '100 900',  // 可变字体的范围
//       style: 'normal',
//     },
//   ],
//   variable: '--font-misans',
// });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      <body className={`${inter.className} flex min-h-dvh flex-col bg-zinc-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col md:flex-row min-h-dvh">
            {/* Sidebar */}
            <aside className="md:w-64 lg:w-72 md:min-h-dvh md:fixed flex flex-col justify-between md:left-0 md:top-0 border-r border-zinc-200 dark:border-gray-800 p-4 z-10 transition-all duration-300">
                <div className="flex flex-col h-full mx-4 my-2">
                  <div className="mb-8">
                    <Link href="/" className="flex items-center justify-start">
                      <LuRabbit className="text-4xl mr-2 font-bold text-zinc-900 dark:text-zinc-100 hover:scale-105 transform transition-transform duration-300" />
                      <h1 className={`${crimsonText.className} text-4xl font-bold text-zinc-900 dark:text-zinc-100 hover:scale-105 transform transition-transform duration-300`}>stutuer</h1>
                    </Link>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="mb-8 space-y-4">
                    <Link href="/posts" className="flex font-serif items-center py-2 text-lg text-gray-700 dark:text-gray-300">
                      <IconBook className="mr-2" size={20} />
                      <span>Blog</span>
                    </Link>
                    <Link href="/categories" className="flex font-serif items-center py-2 text-lg text-gray-700 dark:text-gray-300">
                      <IconFolders className="mr-2" size={20} />
                      <span>Categories</span>
                    </Link>
                    <Link href="/tags" className="flex items-center font-serif py-2 text-lg text-gray-700 dark:text-gray-300">
                      <IconTags className="mr-2" size={20} />
                      <span>Tags</span>
                    </Link>
                  </nav>
                </div>
                

                <div className="mt-auto text-sm text-gray-500 dark:text-gray-400">          
                  <p className="text-center text-xs">Powered by <a href="https://fumadocs.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Fumadocs</a> and <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Vercel</a></p>
                  <div className="flex justify-between items-center gap-4 my-4 w-full">
                    <ThemeToggle />
                    <a href="https://github.com/Fairy-nn" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-zinc-500 dark:hover:text-zinc-100 transition-colors">
                      <IconBrandGithub size={22} />
                    </a>
                  </div>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 p-6 md:ml-64 lg:ml-72">
              {children}
            </main>
            
            {/* Scroll to top button */}
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    template: '%s | stutuer',
    default: 'stutuer - Personal Blog'
  },
  description: 'stutuer\'s personal blog, sharing thoughts on programming, design, and life',
  keywords: ['blog', 'tech blog', 'personal website', 'Next.js', 'React', 'frontend development'],
  authors: [{ name: 'stutuer' }],
  creator: 'stutuer',
  publisher: 'stutuer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'stutuer',
    title: 'stutuer - Personal Blog',
    description: 'stutuer\'s personal blog, sharing thoughts on programming, design, and life',
    images: '/api/og',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'stutuer - Personal Blog',
    description: 'stutuer\'s personal blog, sharing thoughts on programming, design, and life',
    images: '/api/og',
    creator: '@stutuer',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss.xml',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff1f2' }, // zinc-50
    { media: '(prefers-color-scheme: dark)', color: '#171717' }, // gray-900
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
