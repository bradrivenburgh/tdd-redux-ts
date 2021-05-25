import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ActionType } from '../action-types';
import { searchRepositories } from '../action-creators';
const fetchMock = require('node-fetch');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates REPOSITORIES_SEARCH /_ERROR actions', () => {
    fetchMock.mock('https://registry.npmjs.org/-/v1/search?text=react', {
      body: { package: ['do something'] },
      headers: { 'content-type': 'application/json' },
    });
    fetchMock.catch();

    const expectedActions = [
      { type: ActionType.SEARCH_REPOSITORIES },
      {
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: "Cannot read property 'map' of undefined",
      },
    ];

    const store = mockStore({
      loading: false,
      error: null,
      data: [],
    });

    return store.dispatch<any>(searchRepositories('react')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates REPOSITORIES_SEARCH /_SUCCESS actions', () => {
    const jsonData = {
      objects: [
        {
          package: {
            name: 'react',
          },
        },
      ],
    };

    fetchMock.mock('https://registry.npmjs.org/-/v1/search?text=react', {
      body: jsonData,
      headers: { 'content-type': 'application/json' },
    });
    fetchMock.catch();

    const expectedActions = [
      { type: ActionType.SEARCH_REPOSITORIES },
      {
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: ['react'],
      },
    ];

    const store = mockStore({
      loading: false,
      error: null,
      data: [],
    });

    return store.dispatch<any>(searchRepositories('react')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
