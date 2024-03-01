import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';
import TabbedCategories from '../components/TabbedCategories';
import TabListPreviewPanel from '../components/TabListPreviewPanel';

const Home = () => {
  const { recommendedGames, featuredCategories, trailers } = useLoaderData();

  return (
    <div>
      <section className="my-5">
        {recommendedGames.length && (
          <Carousel title="Recommended Games" itemWidth={290}>
            {recommendedGames.map((game) => (
              <RecommendedCard key={game.steamAppID} {...game}></RecommendedCard>
            ))}
          </Carousel>
        )}
      </section>
      <section className="grid grid-cols-2">
        <TabbedCategories
          categoriesData={{
            coming_soon: featuredCategories.coming_soon.items,
            new_releases: featuredCategories.new_releases.items,
            top_sellers: featuredCategories.top_sellers.items,
          }}
        ></TabbedCategories>
        <TabListPreviewPanel></TabListPreviewPanel>
      </section>
    </div>
  );
};
export default Home;
