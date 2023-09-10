import Head from 'next/head'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Collectibles',
  description: 'Collectibles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <head>
      <meta name="p:domain_verify" content="8cf098b022e42f2e24bf7f17d13fe01c"/>
     </head>
      <body className={inter.className}>
        <NavBar></NavBar>
        {children}</body>
    </html>
  )
}
