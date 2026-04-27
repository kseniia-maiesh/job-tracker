import type { Dispatch } from 'react';
import type { AppAction, DetailFormData, FilterState } from '../types/types';
import { api } from '../services/api';

export const loadDetails = async (
  dispatch: Dispatch<AppAction>,
  page: number = 1,
  filters: FilterState,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (filters.status) params.append('status', filters.status.toString());
    if (filters.employment_type) params.append('employment_type', filters.employment_type);

    const response = await api.get(`/?${params.toString()}`);

    dispatch({
      type: 'SET_JOBS',
      payload: {
        results: response.data.results || [],
        count: response.data.count || 0,
        next: response.data.next || null,
        previous: response.data.previous || null,
      },
    });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: 'Failed to load jobs' });
    console.error('Error loading jobs:', error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const setFilter = (
  dispatch: Dispatch<AppAction>,
  filters: Partial<FilterState>,
) => {
  dispatch({ type: 'SET_FILTER', payload: filters });
};

export const resetFilters = (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: 'RESET_FILTERS' });
};

export const setPage = (dispatch: Dispatch<AppAction>, page: number) => {
  dispatch({ type: 'SET_PAGE', payload: page });
};

export const createDetail = async (
  dispatch: Dispatch<AppAction>,
  formData: DetailFormData,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await api.post('/', formData);
    dispatch({ type: 'ADD_JOB', payload: response.data });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to create job';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error creating job:', error);
    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const updateDetail = async (
  dispatch: Dispatch<AppAction>,
  id: number,
  formData: DetailFormData,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await api.patch(`/${id}/`, formData);

    dispatch({ type: 'UPDATE_JOB', payload: response.data });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to update job';

    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error updating job:', error);

    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const deletejob = async (
  dispatch: Dispatch<AppAction>,
  jobId: number,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    await api.delete(`/${jobId}/`);
    dispatch({ type: 'DELETE_JOB', payload: jobId });

    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to delete job';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error deleting job:', error);
    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const toggleTheme = (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: 'TOGGLE_THEME' });
};
