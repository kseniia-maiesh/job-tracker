import type { AppState, AppAction } from '../types/types'

export const initialState: AppState = {
  jobs: [],
  filters: {
    status: '',
    employment_type: ''
  },
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1,
    pageSize: 12,
  },
  loading: false,
  error: null,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_JOBS':
      const totalPages = Math.ceil(action.payload.count / state.pagination.pageSize)
      return {
        ...state,
        jobs: action.payload.results,
        pagination: {
          ...state.pagination,
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          totalPages,
        },
      }

    case 'SET_FILTER':
      const newFilters = {
        ...state.filters,
        ...action.payload,
      }
      return {
        ...state,
        filters: newFilters,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'SET_PAGE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      }

    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id
            ? action.payload
            : job
        ),
      };

    case 'ADD_JOB':
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
        pagination: {
          ...state.pagination,
          count: state.pagination.count + 1,
        },
      }

    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
        pagination: {
          ...state.pagination,
          count: state.pagination.count - 1,
        },
      }

    default:
      return state
  }
}
