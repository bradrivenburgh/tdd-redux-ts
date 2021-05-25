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
            scope: 'unscoped',
            version: '17.0.2',
            description:
              'React is a JavaScript library for building user interfaces.',
            keywords: ['react'],
            date: '2021-03-22T21:56:19.536Z',
            links: {
              npm: 'https://www.npmjs.com/package/react',
              homepage: 'https://reactjs.org/',
              repository: 'https://github.com/facebook/react',
              bugs: 'https://github.com/facebook/react/issues',
            },
            publisher: { username: 'gaearon', email: 'dan.abramov@gmail.com' },
            maintainers: [
              { username: 'sebmarkbage', email: 'sebastian@calyptus.eu' },
              { username: 'gaearon', email: 'dan.abramov@gmail.com' },
              { username: 'acdlite', email: 'npm@andrewclark.io' },
              { username: 'brianvaughn', email: 'briandavidvaughn@gmail.com' },
              { username: 'fb', email: 'opensource+npm@fb.com' },
              { username: 'trueadm', email: 'dg@domgan.com' },
              { username: 'sophiebits', email: 'npm@sophiebits.com' },
              { username: 'lunaruan', email: 'lunaris.ruan@gmail.com' },
            ],
          },
          score: {
            final: 0.5839988295515375,
            detail: {
              quality: 0.5244079859960027,
              popularity: 0.8857421916744859,
              maintenance: 0.3333333333333333,
            },
          },
          searchScore: 100000.63,
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
