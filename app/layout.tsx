import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ava - AI Sales Command Center',
  description: 'Automated Virtual Agent - Sensor Tech Internal AI Sales Command Center',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  )
}

