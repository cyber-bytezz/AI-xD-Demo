import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvoider } from '@/components/modal-provoider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-xD',
  description: 'AI-PlatForm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvoider/>
          {children}</body>
      </html>
    </ClerkProvider>
  )
}
