import { Lato, Playfair_Display } from 'next/font/google'
import './globals.css'

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
  title: 'Aura Cosmetics',
  description: 'Discover the essence of beauty.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${playfairDisplay.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
};