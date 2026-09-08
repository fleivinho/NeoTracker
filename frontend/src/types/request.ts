export type RequestStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'error'
  | 'cancelled'

export interface Request {
  id: string
  numbers: number[]
  status: RequestStatus
  progress: number
  logs: string[]
  result: number | null
}

export interface CreateRequestPayload {
  numbers: number[]
}

export interface CreateRequestResponse {
  id: string
  status: RequestStatus
}
