import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/Components/Header'
import Providers from '@/Components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Entertainment List',
  description: 'A place to keep track of your favorite movies, shows, and more, with rates and reviews.',
}

export const fetchCache = 'default-cache'

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/e61d350a25.js" crossOrigin="anonymous" defer></script>
      </head>
      <Providers>
        <body className={`${inter.className} main-scroll max-w-screen py-5 px-3 sm:px-5 flex flex-col gap-5`}>
          <Header />
          <main className='w-full min-h-[65vh]'>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
