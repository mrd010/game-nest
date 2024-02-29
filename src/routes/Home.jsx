import { useLoaderData } from 'react-router-dom';
import Carousel from '../components/Carousel';
import RecommendedCard from '../components/RecommendedCard';

const Home = () => {
  const { recommendedGames, featuredCategories, trailers } = useLoaderData();
  console.log(recommendedGames);

  return (
    <div>
      <section className="my-5">
        {recommendedGames.length && (
          <Carousel title="Recommended Games">
            {recommendedGames.map((game) => (
              <RecommendedCard key={game.steamAppID} {...game}></RecommendedCard>
            ))}
          </Carousel>
        )}
      </section>
    </div>
  );
};
export default Home;
