import { useLoaderData } from 'react-router-dom';
import HomeSectionTitle from '../components/HomeSectionTitle';
import GamesAlbum from '../components/GamesAlbum';
import { extractJustGames } from '../services/extractors';

const NewReleasedGames = () => {
  const { viewall, topsellers, specials, dlc } = useLoaderData();

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
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl my-2 font-extrabold">What Games to Play Right Now</h1>
        <p className="text-lg">
          Find newly Released and Top Seller games for PC and filter by genre.
        </p>
      </header>
      {viewall && (
        <section>
          <HomeSectionTitle>New Releases</HomeSectionTitle>
          <GamesAlbum gameIds={allGames} itemsPerPage={10}></GamesAlbum>
        </section>
      )}
    </div>
  );
};
export default NewReleasedGames;
