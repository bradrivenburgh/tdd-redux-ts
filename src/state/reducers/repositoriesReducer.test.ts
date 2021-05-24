import reducer from './repositoriesReducer';
import { ActionType } from '../action-types';

describe('repositoriesReducer', () => {
  it('should return the initial state by default', () => {
    const initialState = {
      loading: false,
      error: null,
      data: [],
    };

    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('returns loading as true on initial search', () => {
    const loadingState = {
      loading: true,
      error: null,
      data: [],
    };
    expect(
      reducer(undefined, { type: ActionType.SEARCH_REPOSITORIES })
    ).toEqual(loadingState);
  });

  it('returns data when search is successful', () => {
    const successState = {
      loading: false,
      error: null,
      data: ['string 1', 'string 2'],
    };

    expect(
      reducer(undefined, {
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: ['string 1', 'string 2'],
      })
    ).toEqual(successState);
  });

  it('returns error string if there was an error', () => {
    const errorState = {
      loading: false,
      error: 'Network Error',
      data: [],
    };

    expect(
      reducer(undefined, {
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: 'Network Error',
      })
    ).toEqual(errorState);
  });
});
