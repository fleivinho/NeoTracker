import Link from 'next/link'
import { PiArrowRight, PiCheckCircle, PiClock, PiWarningCircle } from 'react-icons/pi'
import type { Request, RequestStatus } from '../../../types/request'

export type RequestCardProps = Pick<
  Request,
  'id' | 'progress' | 'result' | 'status'
> & {
  numbers: number[]
  updatedAt: string
}

const statusStyles: Record<
  RequestStatus,
  { icon: typeof PiClock; label: string; badge: string }
> = {
  pending: {
    icon: PiClock,
    label: 'Pending',
    badge: 'bg-slate-100 text-slate-700',
  },
  processing: {
    icon: PiClock,
    label: 'Processing',
    badge: 'bg-blue-100 text-blue-700',
  },
  completed: {
    icon: PiCheckCircle,
    label: 'Completed',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  error: {
    icon: PiWarningCircle,
    label: 'Error',
    badge: 'bg-red-100 text-red-700',
  },
}

export default function RequestCard({
  id,
  numbers,
  result,
  status,
  updatedAt,
}: RequestCardProps) {
  const { badge, icon: StatusIcon, label } = statusStyles[status]

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-slate-400">{id}</p>
          <p className="mt-2 text-sm text-slate-600">
            Numbers: {numbers.join(', ')}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}
        >
          <StatusIcon size={14} />
          {label}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-400">Updated</p>
          <p className="mt-1 text-sm text-slate-600">{updatedAt}</p>
        </div>
        {result !== null && (
          <div className="text-right">
            <p className="text-xs text-slate-400">Result</p>
            <p className="mt-1 font-semibold text-slate-900">{result}</p>
          </div>
        )}
      </div>

      <Link
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
        href={`/requests/${id}`}
      >
        View details
        <PiArrowRight size={16} />
      </Link>
    </article>
  )
}
