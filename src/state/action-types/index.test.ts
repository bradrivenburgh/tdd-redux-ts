import { ActionType } from './index';

describe('ActionType', () => {
  it('has search, success, and error types', () => {
    enum ActionTypeTest {
      SEARCH_REPOSITORIES = 'search_repositories',
      SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success',
      SEARCH_REPOSITORIES_ERROR = 'search_repositories_error',
    }
    expect(ActionType).toEqual(ActionTypeTest);
  });
});
