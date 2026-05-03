export interface JobItem {
  id: number
  company: string
  position: string
  status: string
  salary: number
  employment_type: string
  notes: string
  created_at: string
  user: number
}

export interface FilterState {
  employment_type: string
  status: string
}

export interface PaginationInfo {
  count: number
  next: string | null
  previous: string | null
  currentPage: number
  totalPages: number
  pageSize: number
}

export interface AppState {
  jobs: JobItem[]
  filters: FilterState
  pagination: PaginationInfo
  loading: boolean
  error: string | null
}

export interface JobFormData {
  name: string
  description: string
  type: number | null
  status: number | null
  source: string
  origin_country: string
  image_url: string
}

export type AppAction =
  | { type: 'SET_JOBS'; payload: { results: JobItem[]; count: number; next: string | null; previous: string | null } }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'ADD_JOB'; payload: JobItem }
  | { type: 'DELETE_JOB'; payload: number }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_JOB'; payload: JobItem }
  | { type: 'UPDATE_JOB_STATUS'; payload: { id: number; status: string } }
