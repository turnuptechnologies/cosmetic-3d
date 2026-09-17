import { Lato, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '../components/Header'
import LayoutWrapper from '../components/LayoutWrapper'
import { LoaderProvider } from '../lib/LoaderContext'
import PageLoader from './PageLoader'
import { Sound } from '../components/Sound'
import CookieConsent from '../components/CookieConsent'
import MotionProvider from '../components/MotionProvider'
import {
  SITE_URL,
  SITE_NAME,
  ORG_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  CONTACT,
  SOCIAL_LINKS,
  JsonLd,
} from '../lib/seo'

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    site: '@COSMETICLABSx',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: [{ url: '/fav.png', type: 'image/png' }],
    apple: '/fav.png',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: ORG_NAME,
  alternateName: 'CosmeticChemist.com',
  url: SITE_URL,
  logo: `${SITE_URL}/new-full-logo.png`,
  description: DEFAULT_DESCRIPTION,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: CONTACT.locality,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: CONTACT.country,
  },
  sameAs: SOCIAL_LINKS,
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${playfairDisplay.variable} font-sans bg-black`}
      >
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[3000] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        <MotionProvider>
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
        </MotionProvider>

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
