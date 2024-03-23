import { useLoaderData } from 'react-router-dom';
import { extractJustGames } from '../services/extractors';
import GamesInGenreSection from '../components/GamesInGenreSection';
import MainContentHeader from '../components/MainContentHeader';

const GenreGames = () => {
  const { name, data } = useLoaderData();

  return (
    <>
      <MainContentHeader
        title={`${name} Games`}
        desc={`Find newly Released, Top Seller and Upcoming games in ${name} genre`}
      ></MainContentHeader>
      {data ? (
        Object.values(data).map(
          (categoryData) =>
            categoryData.items &&
            categoryData.items.length > 0 && (
              <GamesInGenreSection
                key={name + categoryData.name}
                name={categoryData.name}
                items={extractJustGames(categoryData.items)}
              ></GamesInGenreSection>
            )
        )
      ) : (
        <h4>No Games found yet</h4>
      )}
    </>
  );
};
export default GenreGames;
