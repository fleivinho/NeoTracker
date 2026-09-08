import Link from 'next/link'
import RequestCard, {
  type RequestCardProps,
} from './components/requests/request-card'
import ApiHealth from './components/api-health'

const recentRequests: RequestCardProps[] = [
  {
    id: 'req-8f42',
    numbers: [10, 20, 5],
    progress: 70,
    result: null,
    status: 'processing',
    updatedAt: 'Today, 10:42',
  },
  {
    id: 'req-7c31',
    numbers: [4, 12, 8],
    progress: 100,
    result: 24,
    status: 'completed',
    updatedAt: 'Today, 09:18',
  },
  {
    id: 'req-6b20',
    numbers: [100, 25],
    progress: 0,
    result: null,
    status: 'pending',
    updatedAt: 'Yesterday, 16:05',
  },
]

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Recent requests
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Track the progress of your latest background processes.
          </p>
          <div className="mt-5">
            <ApiHealth />
          </div>
        </div>

        <Link
          className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          href="/requests/new"
        >
          New request
        </Link>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {recentRequests.length < 1 && <>
          <p className='animate-pulse'>Nothing here...</p>
        </>}

        {recentRequests.map((request) => (
          <RequestCard key={request.id} {...request} />
        ))}
      </section>
    </main>
  )
}
