import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import App from './app'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DataPonte Data Control',
  description: 'Keep control of your data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#2d2c2f] text-gray-100`}>
        <App>
          {children}
        </App>
        </body>
    </html>
  )
}
