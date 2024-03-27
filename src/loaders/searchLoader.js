import { getSearchResults } from '../services/dataFetchers';

export const searchLoader = async ({ request }) => {
  // get query from search parameters
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  //   search for query and return data if query is 3> length
  if (query.length < 3) {
    throw new Error('No Data for sacredly cats');
  }
  const searchResults = await getSearchResults(query, 0);
  return { searchResults, query };
};
