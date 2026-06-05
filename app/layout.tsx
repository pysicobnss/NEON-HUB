import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ 
  variable: '--font-orbitron', 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Neon Games Hub',
  description: 'O seu portal de jogos com tema neon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${orbitron.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
