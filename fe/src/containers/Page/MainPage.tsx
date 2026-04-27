import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { appReducer, initialState } from '../../state/reducer';
import { loadDetails } from '../../state/actions';

const MainPage = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
    loadDetails(dispatch, state.pagination.currentPage, state.filters);
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
};

export default MainPage;