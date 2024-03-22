import { useLoaderData, useOutletContext } from 'react-router-dom';
import { extractJustGames } from '../services/extractors';
import GamesInGenreSection from '../components/GamesInGenreSection';
import { useCallback, useEffect } from 'react';
import MainContentHeader from '../components/MainContentHeader';

const GenreGames = () => {
  const { name, data } = useLoaderData();
  // function to send sub categories like:(new releases,top sellers ,...) to side nav
  const setCurrentSubCats = useOutletContext();
  const subCategories = data && Object.values(data).map((sub) => sub.name);

  // prevent from infinite render
  const changeSubCategories = useCallback(
    () => setCurrentSubCats(subCategories),
    [subCategories, setCurrentSubCats]
  );

  // send sub categories to side nav after load
  useEffect(() => {
    changeSubCategories();
  }, [changeSubCategories]);

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
                key={categoryData.name}
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
