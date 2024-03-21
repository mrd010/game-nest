import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import SearchResult from './SearchResult';
import { getSearchResults } from '../services/dataFetchers';

const HeaderSearch = () => {
  // search nar in header of app. searches whole steam database for games and navigates to that game page in app
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // get data when user stops typing for a period of time and query is at least 3 letters long
  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    const getData = async () => {
      const data = await getSearchResults(debouncedQuery, 3);
      setSearchResults(data);
    };

    getData();
  }, [debouncedQuery]);

  // control search input
  const handleChangeInput = (e) => {
    setQuery(e.target.value);
  };

  // clear search and search results when change pages
  const { state } = useNavigation();
  useEffect(() => {
    if (state === 'loading') {
      setQuery('');
      setSearchResults(null);
    }
  }, [state]);

  return (
    <div className="relative group">
      {/* search form */}
      <Form action="/search" className="relative z-20 text-gray-950">
        {/* search input */}
        <input
          type="search"
          name="search"
          placeholder="Search for games"
          className="w-full rounded-3xl p-2 pl-4 border-none outline-none text-lg bg-gray-50"
          onChange={handleChangeInput}
          autoComplete="off"
          value={query}
        />
        {/* search button */}
        <button
          type="submit"
          className="absolute right-0 top-0 opacity-75 p-2 text-2xl scale-125 hover:opacity-100 transition-opacity"
        >
          <span className="material-symbols-rounded">search</span>
        </button>
      </Form>
      {/* search results */}
      {searchResults && (
        <ul className="hidden grid-flow-row overflow-hidden absolute top-[50%] w-full z-10 bg-gray-50 text-gray-900 rounded-b-3xl shadow-lg pt-6 group-focus-within:grid">
          {searchResults.map((result) => (
            <SearchResult key={result.appid} {...result}></SearchResult>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
