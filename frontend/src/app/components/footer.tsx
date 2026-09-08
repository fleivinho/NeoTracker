import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-blue-500 bg-blue-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span>NeoTracker by Flávio Soares</span>
        </Link>

        <div className="flex flex-col items-start gap-1 text-sm text-blue-100 sm:items-end">
          <a
            className="transition-colors hover:text-white"
            href="https://github.com/fleivinho"
            rel="noreferrer"
            target="_blank"
          >
            github.com/fleivinho
          </a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
