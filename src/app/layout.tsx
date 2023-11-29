import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { GlobalNav } from '../ui/globalNav';
import './globals.css'
import ProviderWrapper from '../redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark h-[100vh] min-w-[300px]">
        <body className="overflow-hidden bg-gray-1100 bg-white pb-36">
            <ProviderWrapper>
              <>
                <GlobalNav />
                <div className="w-full h-[calc(100vh-5rem)]">
                  {children}
                </div>
              </>
            </ProviderWrapper>
            <Script src="./node_modules/flowbite/dist/flowbite.min.js"/>
        </body>
    </html>
  )
}
