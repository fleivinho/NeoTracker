import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './styles/globals.css'
import Footer from './components/footer'
import NavBar from './components/navbar'

export const metadata: Metadata = {
  title: 'NeoTracker',
  description: 'Process Tracker frontend',
}

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-950">
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
