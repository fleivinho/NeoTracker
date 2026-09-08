'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../../../constants'
import type {
  CreateRequestPayload,
  CreateRequestResponse,
} from '../../../types/request'
import { PiArrowLeftFill } from 'react-icons/pi'

function parseNumbers(value: string): number[] | null {
  const values = value.split(/[\s,]+/).filter(Boolean)

  if (values.length === 0) {
    return null
  }

  const numbers = values.map(Number)

  if (numbers.some((number) => !Number.isInteger(number))) {
    return null
  }

  return numbers
}

export default function NewRequestPage() {
  const router = useRouter()
  const [numbersInput, setNumbersInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numbers = parseNumbers(numbersInput)

    if (!numbers) {
      setError('Enter one or more whole numbers.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const payload: CreateRequestPayload = { numbers }

    try {
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Could not create request')
      }

      const createdRequest: CreateRequestResponse = await response.json()
      router.push(`/requests/${createdRequest.id}`)
    } catch {
      setError('Could not create the request. Check if the API is available.')
      setIsSubmitting(false)
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

      <div className="mt-8">
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-blue-600">
          Start a new process
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Enter the numbers that should be processed. You can separate them by
          commas, spaces, or new lines.
        </p>
      </div>

      <form
        className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        onSubmit={handleSubmit}
      >
        <label
          className="text-sm font-semibold text-slate-900"
          htmlFor="numbers"
        >
          Numbers
        </label>
        <textarea
          className="mt-3 min-h-36 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          disabled={isSubmitting}
          id="numbers"
          onChange={(event) => setNumbersInput(event.target.value)}
          placeholder="10, 20, 30"
          value={numbersInput}
        />

        {error && (
          <p className="mt-3 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Creating request...' : 'Create request'}
        </button>
      </form>
    </main>
  )
}

