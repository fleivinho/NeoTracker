'use client'

import { useEffect, useState } from 'react'
import { API_URL, REQUESTS_POLL_INTERVAL_MS } from '../../../constants'
import type { Request } from '../../../types/request'
import RequestCard from './request-card'

type RequestListProps = {
  limit?: number
}

export default function RequestList({ limit }: RequestListProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let refreshTimeout: number | undefined
    let controller: AbortController | undefined

    async function loadRequests() {
      const requestController = new AbortController()
      controller = requestController

      try {
        const response = await fetch(`${API_URL}/requests`, {
          cache: 'no-store',
          signal: requestController.signal,
        })

        if (!response.ok) {
          throw new Error('Could not load requests')
        }

        const data: Request[] = await response.json()

        if (isMounted) {
          setRequests(data)
          setError(null)
        }
      } catch {
        if (isMounted && !requestController.signal.aborted) {
          setError('Could not load requests from the API.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
          refreshTimeout = window.setTimeout(
            loadRequests,
            REQUESTS_POLL_INTERVAL_MS,
          )
        }
      }
    }

    loadRequests()

    return () => {
      isMounted = false
      controller?.abort()

      if (refreshTimeout !== undefined) {
        window.clearTimeout(refreshTimeout)
      }
    }
  }, [])

  const visibleRequests = limit
    ? requests.slice(-limit).reverse()
    : [...requests].reverse()

  return (
    <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {isLoading && (
        <p className="animate-pulse text-slate-500">Loading requests...</p>
      )}

      {!isLoading && error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && visibleRequests.length === 0 && (
        <p className="text-slate-500">Nothing here...</p>
      )}

      {!isLoading &&
        !error &&
        visibleRequests.map((request) => (
          <RequestCard key={request.id} {...request} />
        ))}
    </section>
  )
}

