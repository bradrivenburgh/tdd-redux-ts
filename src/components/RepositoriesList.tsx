import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState(''); // set value of input
  const { searchRepositories } = useActions();
  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  ); // gets state from store; select state we need

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRepositories(term);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <form aria-label='form' onSubmit={onSubmit}>
        <input value={term} onChange={onChange} />
        <button>Search</button>
      </form>
      {error && <h3>Error: {error}</h3>}
      {loading && <h3>Loading...</h3>}
      <ul>
        {!error &&
          !loading &&
          data.map((name) => {
            return <li key={name}>{name}</li>;
          })}
      </ul>
    </div>
  );
};

export default RepositoriesList;
