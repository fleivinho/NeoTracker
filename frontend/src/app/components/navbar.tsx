'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiFolderSimpleFill, PiGraduationCapBold, PiHouseFill } from 'react-icons/pi'

export default function NavBar() {

  const pathname = usePathname() ?? ''
  const isHomeActive = pathname === '/'
  const isRequestsActive = pathname.startsWith('/requests')

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          className="flex items-center gap-2 font-semibold text-white"
          href="/"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
            <PiGraduationCapBold size={19} />
          </span>
          <span>NeoTracker</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            className={[
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition duration-200',
              isHomeActive ? 'scale-115' : 'text-white hover:scale-115',
            ].join(' ')}
            href="/"
          >
            <PiHouseFill size={17} />
            <span>Home</span>
          </Link>

          <Link

            className={[
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition duration-200',
              isRequestsActive ? 'scale-115' : 'text-white hover:scale-115',
            ].join(' ')}
            href="/requests"
          >
            <PiFolderSimpleFill size={17} />
            <span>Requests</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
