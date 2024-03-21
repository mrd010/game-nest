import { useLoaderData } from 'react-router-dom';
import MainContentContainer from '../components/MainContentContainer';
import MainContentHeader from '../components/MainContentHeader';
import GamesAlbum from '../components/GamesAlbum';

const ITEMS_PER_PAGE = 5;

const SearchResultsPage = () => {
  // get searched query and results
  const { searchResults, query } = useLoaderData();

  //   results game ids
  const gameIds = searchResults && searchResults.map((result) => result.appid);

  return (
    <MainContentContainer>
      <MainContentHeader
        title={searchResults ? 'Search Results' : 'No Results Found'}
        desc={
          searchResults
            ? `Results found containing "${query}" expression.`
            : `Cant't find any games matching expression "${query}".`
        }
      ></MainContentHeader>
      <GamesAlbum gameIds={gameIds} itemsPerPage={ITEMS_PER_PAGE}></GamesAlbum>
    </MainContentContainer>
  );
};

export default SearchResultsPage;
