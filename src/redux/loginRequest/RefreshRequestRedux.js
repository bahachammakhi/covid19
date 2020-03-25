import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  refreshRequest: ['data'],
  refreshSuccess: ['response'],
  refreshFailure: ['error'],
});

export const refreshTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  token: null,
};
const refreshRequest = (state, { data }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const refreshSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
  token: response.token,
});

const refreshFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REFRESH_REQUEST]: refreshRequest,
  [Types.REFRESH_SUCCESS]: refreshSuccess,
  [Types.REFRESH_FAILURE]: refreshFailure,
});
