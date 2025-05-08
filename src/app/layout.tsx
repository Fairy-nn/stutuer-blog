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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      <body className='flex min-h-dvh flex-col bg-pink-50 dark:bg-gray-900'>
        <ThemeProvider attribute="class" defaultTheme="light">
          {/* Gradient decoration */}
          <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-200 to-purple-100 rounded-bl-full opacity-50 dark:from-pink-800 dark:to-purple-900 dark:opacity-20 -z-10" />
          
          <div className="flex flex-col md:flex-row min-h-dvh">
            {/* Sidebar */}
            <aside className="md:w-64 lg:w-72 md:min-h-dvh md:fixed md:left-0 md:top-0 border-r border-pink-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 z-10 transition-all duration-300">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="mb-8 text-center">
                  <Link href="/" className="inline-block">
                    <h1 className="text-3xl font-serif font-bold text-pink-600 dark:text-pink-400 hover:scale-105 transform transition-transform duration-300">stutuer</h1>
                  </Link>
                </div>
                
                {/* Navigation */}
                <nav className="mb-8 space-y-4">
                  <Link href="/posts" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800 rounded-lg transition-colors hover:text-pink-600 dark:hover:text-pink-400">
                    <IconBook className="mr-2" size={20} />
                    <span>Blog</span>
                  </Link>
                  <Link href="/categories" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800 rounded-lg transition-colors hover:text-pink-600 dark:hover:text-pink-400">
                    <IconFolders className="mr-2" size={20} />
                    <span>Categories</span>
                  </Link>
                  <Link href="/tags" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800 rounded-lg transition-colors hover:text-pink-600 dark:hover:text-pink-400">
                    <IconTags className="mr-2" size={20} />
                    <span>Tags</span>
                  </Link>
                </nav>
                
                {/* Theme toggle */}
                <div className="mb-6 flex justify-center">
                  <ThemeToggle />
                </div>
                
                {/* Footer */}
                <div className="mt-auto text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <div className="flex justify-center gap-4 mb-2">
                    <a href="https://github.com/stutuer" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors hover:scale-110 transform">
                      <IconBrandGithub size={22} />
                    </a>
                    <a href="https://twitter.com/stutuer" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors hover:scale-110 transform">
                      <IconBrandTwitter size={22} />
                    </a>
                    <a href="https://instagram.com/stutuer" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors hover:scale-110 transform">
                      <IconBrandInstagram size={22} />
                    </a>
                  </div>
                  <p className="text-center">© {new Date().getFullYear()} stutuer</p>
                  <p className="text-center text-xs">Powered by Fumadocs and Vercel</p>
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
    default: 'stutuer - 个人博客'
  },
  description: 'stutuer的个人博客，分享编程、设计和生活的点滴思考',
  keywords: ['博客', '技术博客', '个人网站', 'Next.js', 'React', '前端开发'],
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
    locale: 'zh_CN',
    siteName: 'stutuer',
    title: 'stutuer - 个人博客',
    description: 'stutuer的个人博客，分享编程、设计和生活的点滴思考',
    images: '/api/og',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'stutuer - 个人博客',
    description: 'stutuer的个人博客，分享编程、设计和生活的点滴思考',
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
    { media: '(prefers-color-scheme: light)', color: '#fff1f2' }, // pink-50
    { media: '(prefers-color-scheme: dark)', color: '#171717' }, // gray-900
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
