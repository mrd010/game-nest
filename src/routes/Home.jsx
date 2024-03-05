import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';
import TabbedCategories from '../components/TabbedCategories';
import { extractImportantGameIds, extractRefinedGamesArray } from '../services/extractors';
import NewsSection from '../components/NewsSection';

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

  const importantGamesIds = extractImportantGameIds(
    recommendedGames,
    refinedCategoriesData.top_sellers
  );

  return (
    <div className="flex flex-col flex-nowrap gap-10">
      <section className="my-5">
        {recommendedGames.length && (
          <Carousel title="Recommended Games" itemWidth={290} steps={3}>
            {recommendedGames.map((game) => (
              // create carousel with recommended games (games released recently and have high meta score)
              <RecommendedCard key={game.steamAppID} {...game}></RecommendedCard>
            ))}
          </Carousel>
        )}
      </section>
      <section className="h-[280px]">
        <NewsSection importantGameIds={importantGamesIds}></NewsSection>
      </section>
      <section className="border-t-[1px] border-gray-900/50 py-1">
        <TabbedCategories categoriesData={refinedCategoriesData}></TabbedCategories>
      </section>
    </div>
  );
};
export default Home;
