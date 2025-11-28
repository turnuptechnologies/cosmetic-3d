'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const hideFooter = pathname === '/' || pathname.startsWith('/products')|| pathname.startsWith('/about') || pathname.startsWith('/service')

  return (
    <>
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  )
}
