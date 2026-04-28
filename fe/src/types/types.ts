export interface DetailItem {
  id: number
  name: string
  description: string
  type: number
  type_name: string
  status: number
  status_name: string
  source: string
  origin_country: string
  image_url: string
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
  jobs: DetailItem[]
  filters: FilterState
  pagination: PaginationInfo
  loading: boolean
  error: string | null
}

export interface DetailFormData {
  name: string
  description: string
  type: number | null
  status: number | null
  source: string
  origin_country: string
  image_url: string
}

export type AppAction =
  | { type: 'SET_JOBS'; payload: { results: DetailItem[]; count: number; next: string | null; previous: string | null } }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'ADD_JOB'; payload: DetailItem }
  | { type: 'DELETE_JOB'; payload: number }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_JOB'; payload: DetailItem }
  | { type: 'UPDATE_JOB_STATUS'; payload: { id: number; status: string } }
