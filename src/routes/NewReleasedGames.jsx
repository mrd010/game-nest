import { useLoaderData } from 'react-router-dom';
import HomeSectionTitle from '../components/HomeSectionTitle';
import GamesAlbum from '../components/GamesAlbum';
import { extractJustGames } from '../services/extractors';

const numberOfGamesPerPage = 5;

const NewReleasedGames = () => {
  // get data of new release games in 4 category. some categories may be null
  const { viewall, topsellers, specials, dlc } = useLoaderData();

  // check for correctness of data received and filter incorrect data and non game apps from data array
  const allGames =
    viewall && viewall.items && viewall.items.length > 0 ? extractJustGames(viewall.items) : null;
  const topSellerGames =
    topsellers && topsellers.items && topsellers.items.length > 0
      ? extractJustGames(topsellers.items)
      : null;
  const specialGames =
    specials && specials.items && specials.items.length > 0
      ? extractJustGames(specials.items)
      : null;
  const gameDLCS = dlc && dlc.items && dlc.items.length > 0 ? extractJustGames(dlc.items) : null;

  return (
    <>
      <header>
        <h1 className="text-5xl my-2 font-extrabold">What Games to Play Right Now</h1>
        <p className="text-lg">
          Find newly Released and Top Seller games for PC and filter by genre.
        </p>
      </header>
      {/* for each category if data is valid create section for it */}
      {allGames && (
        <section>
          <HomeSectionTitle>New Releases</HomeSectionTitle>
          <GamesAlbum gameIds={allGames} itemsPerPage={numberOfGamesPerPage}></GamesAlbum>
        </section>
      )}
      {topSellerGames && (
        <section>
          <HomeSectionTitle>Top Sellers</HomeSectionTitle>
          <GamesAlbum gameIds={topSellerGames} itemsPerPage={numberOfGamesPerPage}></GamesAlbum>
        </section>
      )}
      {specialGames && (
        <section>
          <HomeSectionTitle>Specials</HomeSectionTitle>
          <GamesAlbum gameIds={specialGames} itemsPerPage={numberOfGamesPerPage}></GamesAlbum>
        </section>
      )}
      {gameDLCS && (
        <section>
          <HomeSectionTitle>DLCs</HomeSectionTitle>
          <GamesAlbum gameIds={gameDLCS} itemsPerPage={numberOfGamesPerPage}></GamesAlbum>
        </section>
      )}
    </>
  );
};
export default NewReleasedGames;
