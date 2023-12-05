import type { Metadata } from 'next';

import { GlobalNav } from '../ui/globalNav';
import './globals.css';
import ProviderWrapper from '../redux/provider';

export const metadata: Metadata = {
  title: 'Kevin Kingdon',
  description: "Kevin Kingdon's Personal Site",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark h-[100vh] min-w-[300px]">
        <body className="overflow-hidden h-[100vh] w-[100-vw] bg-gray-1100 bg-white pb-36">
            <ProviderWrapper>
              <>
                <GlobalNav />
                <div className="w-full h-full overflow-hidden">
                  {children}
                </div>
              </>
            </ProviderWrapper>
        </body>
    </html>
  )
}
