import Link from 'next/link'
import ApiHealth from './components/api-health'
import RequestList from './components/requests/request-list'

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <section className="mt-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="mt-2 text-3xl md:text-6xl font-bold tracking-tight text-slate-950">
              Recent requests
            </h1>
            <p className="mt-3 max-w-xl text-slate-600">
              A quick look at the latest processes running through your
              workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ApiHealth />
            <Link
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              href="/requests"
            >
              See all
            </Link>
          </div>
        </div>

        <RequestList limit={3} />
      </section>
    </main>
  )
}
