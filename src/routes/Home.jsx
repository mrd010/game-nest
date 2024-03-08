import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';
import TabbedCategories from '../components/TabbedCategories';
import {
  extractImportantGameIds,
  extractRefinedGamesArray,
  getRefinedTrailers,
} from '../services/extractors';
import NewsSection from '../components/NewsSection';
import VideoSlideShow from '../components/VideoSlideShow';
import HomeSectionTitle from '../components/HomeSectionTitle';

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

  const refinedTrailersData = trailers.status === 1 ? getRefinedTrailers(trailers.movies) : null;

  const importantGamesIds = extractImportantGameIds(
    recommendedGames,
    refinedCategoriesData.top_sellers
  );

  return (
    <div className="flex flex-col flex-nowrap gap-10">
      {/* recommended games */}
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
      {/* game news */}
      <section className="h-[280px]">
        <NewsSection importantGameIds={importantGamesIds}></NewsSection>
      </section>
      {/* featured categories */}
      <section className="border-t-[1px] border-gray-900/50 py-1">
        <TabbedCategories categoriesData={refinedCategoriesData}></TabbedCategories>
      </section>
      {/* videos if available*/}
      {refinedTrailersData && (
        <section className="flex flex-col gap-5 h-[750px]">
          <HomeSectionTitle>Latest Videos</HomeSectionTitle>
          <VideoSlideShow videoList={refinedTrailersData.slice(0, 4)}></VideoSlideShow>
        </section>
      )}
    </div>
  );
};
export default Home;
