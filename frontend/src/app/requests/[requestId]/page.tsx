'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { API_URL, REQUESTS_POLL_INTERVAL_MS } from '../../../constants'
import type { Request, RequestStatus } from '../../../types/request'
import { PiArrowLeftFill } from 'react-icons/pi'

const statusLabels: Record<RequestStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  error: 'Error',
  cancelled: 'Cancelled',
}

const statusStyles: Record<RequestStatus, string> = {
  pending: 'bg-slate-100 text-slate-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  error: 'bg-red-100 text-red-700',
  cancelled: 'bg-amber-100 text-amber-700',
}

function isFinished(status: RequestStatus) {
  return (
    status === 'completed' ||
    status === 'error' ||
    status === 'cancelled'
  )
}

export default function RequestDetailPage() {
  const params = useParams<{ requestId: string }>()
  const requestId = params.requestId
  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let refreshTimeout: number | undefined
    let controller: AbortController | undefined

    async function loadRequest() {
      const requestController = new AbortController()
      controller = requestController

      try {
        const response = await fetch(`${API_URL}/requests/${requestId}`, {
          cache: 'no-store',
          signal: requestController.signal,
        })

        if (!response.ok) {
          throw new Error('Could not load request')
        }

        const data: Request = await response.json()

        if (isMounted) {
          setRequest(data)
          setError(null)

          if (!isFinished(data.status)) {
            refreshTimeout = window.setTimeout(
              loadRequest,
              REQUESTS_POLL_INTERVAL_MS,
            )
          }
        }
      } catch {
        if (isMounted && !requestController.signal.aborted) {
          setError('Could not load this request from the API.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRequest()

    return () => {
      isMounted = false
      controller?.abort()

      if (refreshTimeout !== undefined) {
        window.clearTimeout(refreshTimeout)
      }
    }
  }, [requestId])

  async function handleCancel() {
    if (!request || isCancelling) {
      return
    }

    setIsCancelling(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/requests/${request.id}/cancel`,
        { method: 'POST' },
      )

      if (!response.ok) {
        throw new Error('Could not cancel request')
      }

      const cancelledRequest: Request = await response.json()
      setRequest(cancelledRequest)
    } catch {
      setError('Could not cancel this request.')
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
     <Link
        className="text-sm font-semibold items-center text-center flex gap-2"
        href="/"
      >
        <PiArrowLeftFill/> Return
      </Link>

      {isLoading && (
        <p className="mt-10 animate-pulse text-slate-500">Loading request...</p>
      )}

      {!isLoading && error && !request && (
        <p className="mt-10 text-red-600" role="alert">
          {error}
        </p>
      )}

      {request && (
        <>
          <section className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
                Process progress
              </h1>
              <p className="mt-3 break-all font-mono text-sm text-slate-500">
                {request.id}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${statusStyles[request.status]}`}
            >
              {statusLabels[request.status]}
            </span>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Progress</span>
              <span>{request.progress}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${request.progress}%` }}
              />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-sm font-semibold text-slate-900">Numbers</p>
              <p className="mt-2 text-sm text-slate-600">
                {request.numbers.join(', ')}
              </p>
            </div>

            {request.result !== null && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-sm font-semibold text-slate-900">Result</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {request.result}
                </p>
              </div>
            )}

            {request.status === 'error' && (
              <p className="mt-5 text-sm font-medium text-red-600">
                The request finished with an error. Check the logs below.
              </p>
            )}

            {request.status === 'cancelled' && (
              <p className="mt-5 text-sm font-medium text-amber-700">
                This request was cancelled.
              </p>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-950">logs</h2>
            <ul className="mt-4 space-y-3">
              {request.logs.map((log, index) => (
                <li
                  className="border-l-2 border-slate-200 pl-3 text-sm text-slate-600"
                  key={`${log}-${index}`}
                >
                  {log}
                </li>
              ))}
            </ul>
          </section>

          {(request.status === 'pending' || request.status === 'processing') && (
            <button
              className="mt-6 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isCancelling}
              onClick={handleCancel}
              type="button"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel request'}
            </button>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </main>
  )
}
