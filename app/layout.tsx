import Providers from '../providers/providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavSettings } from '@/components/nav-settings/nav-settings';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'SLAM ENGLISH',
  description: 'Learn English words',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} h-full antialiased`}
    >
      <body className="h-full flex flex-col">
        <Providers>
          {children}
          <NavSettings />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
