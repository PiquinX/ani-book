import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/Components/Header'
import Providers from '@/Components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ani & Book',
  description: 'A place to keep track of your favorite animes and books with rates and reviews.',
}

export const fetchCache = 'default-cache'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <Providers>
        <body className={`${inter.className} overflow-x-hidden main-scroll max-w-screen py-5 px-3 sm:px-5 flex flex-col gap-5 bg-black text-white`}>
          <Header />
          <main className='w-full min-h-[65vh] text-gray-400'>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
