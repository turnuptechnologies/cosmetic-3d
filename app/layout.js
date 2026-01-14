import { Lato, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '../components/Header'
import LayoutWrapper from '../components/LayoutWrapper'
import { LoaderProvider } from '../lib/LoaderContext'
import PageLoader from './PageLoader'
import { Sound } from '../components/Sound'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
})

export const metadata = {
  title: 'Cosmetic Chemistry',
  description:
    'Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products',
  icons: {
    icon: [
      { url: 'fav.png', media: '(prefers-color-scheme: light)' },
      { url: 'fav.png', media: '(prefers-color-scheme: dark)' },
      { url: 'fav.png', type: 'image/svg+xml' },
    ],
    apple: 'fav.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${playfairDisplay.variable} font-sans bg-black`}
      >
        <Header />


        {/* Wrapper determines when to show footer */}
        <div className="flex flex-col min-h-screen">
          <LayoutWrapper>
            <Sound />
            {/* <LoaderProvider> */}
            {/* <PageLoader> */}
            {children}
            {/* </PageLoader> */}
            {/* </LoaderProvider> */}
          </LayoutWrapper>
        </div>

        <Analytics />
      </body>
    </html>
  )
}
