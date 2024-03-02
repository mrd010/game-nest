import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';
import TabbedCategories from '../components/TabbedCategories';
import TabListPreviewPanel from '../components/TabListGamePreview';
import { getRefinedGamesArray } from '../services/manipulators';
import { useState } from 'react';

const Home = () => {
  const { recommendedGames, featuredCategories, trailers } = useLoaderData();

  // remove duplicate games from data
  const refinedCategoriesData = {
    // game which release soon
    coming_soon: getRefinedGamesArray(featuredCategories.coming_soon.items),
    // games released recently
    new_releases: getRefinedGamesArray(featuredCategories.new_releases.items),
    // games with most selling worldwide
    top_sellers: getRefinedGamesArray(featuredCategories.top_sellers.items),
  };

  // control active game (selected by user) in featured categories (coming soon, new releases, top sellers)
  const [selectedGameInCats, setSelectedGameInCats] = useState(null);
  const handleChangeActiveGameInCats = (steamId) => {
    setSelectedGameInCats(steamId);
  };

  return (
    <div>
      <section className="my-5">
        {recommendedGames.length && (
          <Carousel title="Recommended Games" itemWidth={290}>
            {recommendedGames.map((game) => (
              // create carousel with recommended games (games released recently and have high meta score)
              <RecommendedCard key={game.steamAppID} {...game}></RecommendedCard>
            ))}
          </Carousel>
        )}
      </section>
      <section className="grid grid-cols-2 gap-4">
        <TabbedCategories
          categoriesData={refinedCategoriesData}
          onSelectGame={handleChangeActiveGameInCats}
          selectedGameId={selectedGameInCats}
        ></TabbedCategories>
        <TabListPreviewPanel id={selectedGameInCats}></TabListPreviewPanel>
      </section>
    </div>
  );
};
export default Home;
