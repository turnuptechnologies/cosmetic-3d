import { Lato, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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

const GTM_ID = 'GTM-W83V8D9N'

// Google Tag Manager bootstrap. Consent Mode defaults analytics to denied (granted only if the
// visitor already accepted, using the key CookieConsent stores), so Google tags honour the banner;
// CookieConsent sends the 'consent update' when the visitor chooses. Production only, so local
// and preview builds don't pollute the live container.
const gtmBootstrap = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  var analyticsConsent = 'denied';
  try { if (localStorage.getItem('cc-cookie-consent') === 'granted') analyticsConsent = 'granted'; } catch (e) {}
  gtag('consent', 'default', {
    analytics_storage: analyticsConsent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');
`

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
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script dangerouslySetInnerHTML={{ __html: gtmBootstrap }} />
        )}
      </head>
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
        {/* UserWay accessibility widget */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="YcvRipONor"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
