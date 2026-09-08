import Link from 'next/link'
import RequestList from '../components/requests/request-list'

export default function RequestsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-2 text-3xl md:text-6xl font-bold tracking-tight text-slate-950">
            All requests
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Follow every process from the moment it starts until it is finished.
          </p>
        </div>

        <Link
          className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          href="/requests/new "
        >
          New request
        </Link>
      </section>

      <RequestList />
    </main>
  )
}

