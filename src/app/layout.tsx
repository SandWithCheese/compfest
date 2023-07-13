import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SEA Cinema',
  description: 'SEA Cinema',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`pt-8 pb-24 px-4 md:px-32 ${inter.className}`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar/>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
