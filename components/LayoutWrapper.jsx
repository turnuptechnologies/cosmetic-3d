'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const hideFooter = pathname === '/' // Hide on homepage

  return (
    <>
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  )
}
