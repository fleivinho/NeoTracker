export type RequestStatus = 'pending' | 'processing' | 'completed' | 'error'

export interface Request {
  id: string
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
