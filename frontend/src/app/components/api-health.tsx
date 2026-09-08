'use client'

import { useEffect, useState } from 'react'

type ApiStatus = 'checking' | 'available' | 'unavailable'

const API_URL = 'http://localhost:8000'

const statusStyles: Record<
  ApiStatus,
  { dot: string; label: string; text: string }
> = {
  checking: {
    dot: 'bg-slate-400 animate-pulse',
    label: 'Checking API...',
    text: 'text-slate-500',
  },
  available: {
    dot: 'bg-emerald-500',
    label: 'API available',
    text: 'text-emerald-700',
  },
  unavailable: {
    dot: 'bg-red-500',
    label: 'API unavailable',
    text: 'text-red-700',
  },
}

export default function ApiHealth() {
  const [status, setStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    let isMounted = true

    async function checkApi() {
      try {
        const response = await fetch(`${API_URL}/health`, {
          cache: 'no-store',
        })

        if (isMounted) {
          setStatus(response.ok ? 'available' : 'unavailable')
        }
      } catch {
        if (isMounted) {
          setStatus('unavailable')
        }
      }
    }

    checkApi()

    return () => {
      isMounted = false
    }
  }, [])

  const { dot, label, text } = statusStyles[status]

  return (
    <div
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2"
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      <span className={`text-sm font-medium ${text}`}>{label}</span>
    </div>
  )
}
