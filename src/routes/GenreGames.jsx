import { useLoaderData } from 'react-router-dom';
import { extractJustGames } from '../services/extractors';
import GamesInGenreSection from '../components/GamesInGenreSection';

const GenreGames = () => {
  const { id, name, data } = useLoaderData();

  return (
    <div className="space-y-20">
      <header>
        <h1 className="text-5xl my-2 font-extrabold">{name} Games</h1>
        <p className="text-lg">
          Find newly Released, Top Seller and Upcoming games in {name} genre
        </p>
      </header>
      {data ? (
        Object.values(data).map(
          (categoryData) =>
            categoryData.items &&
            categoryData.items.length > 0 && (
              <GamesInGenreSection
                key={categoryData.name}
                name={categoryData.name}
                items={extractJustGames(categoryData.items)}
              ></GamesInGenreSection>
            )
        )
      ) : (
        <h4>No Games found yet</h4>
      )}
    </div>
  );
};
export default GenreGames;
