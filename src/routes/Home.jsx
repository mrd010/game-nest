import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';
import TabbedCategories from '../components/TabbedCategories';
import { extractRefinedGamesArray } from '../services/extractors';

const Home = () => {
  const { recommendedGames, featuredCategories, trailers } = useLoaderData();

  // remove duplicate games from data
  const refinedCategoriesData = {
    // game which release soon
    coming_soon: extractRefinedGamesArray(featuredCategories.coming_soon.items),
    // games released recently
    new_releases: extractRefinedGamesArray(featuredCategories.new_releases.items),
    // games with most selling worldwide
    top_sellers: extractRefinedGamesArray(featuredCategories.top_sellers.items),
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
      <section>
        <TabbedCategories categoriesData={refinedCategoriesData}></TabbedCategories>
      </section>
    </div>
  );
};
export default Home;
