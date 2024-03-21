import { getSearchResults } from '../services/dataFetchers';

export const searchLoader = async ({ request }) => {
  // get query from search parameters
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  //   search for query and return data
  const searchResults = await getSearchResults(query, 0);
  return searchResults;
};
