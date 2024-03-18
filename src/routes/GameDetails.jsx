import { useLoaderData } from 'react-router-dom';
import MainContentContainer from '../components/MainContentContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HomeSectionTitle from '../components/HomeSectionTitle';
import { useEffect } from 'react';
import { getCleanUrl } from '../services/utilities';

const GameDetails = () => {
  const gameData = useLoaderData();
  console.log(gameData);

  const bgUrl = `url('${getCleanUrl(gameData.background)}')`;
  useEffect(() => {
    document.querySelector('#root').style.backgroundImage = bgUrl;
  }, [bgUrl]);
  return (
    <MainContentContainer className="bg-opacity-5">
      <header>
        <div>
          <LazyLoadImage></LazyLoadImage>
        </div>
        <div>
          <span>Free</span>
          <h1>Game Name</h1>
          <div>
            <span>Release Date</span>
            <span>Platforms</span>
          </div>
          <div>
            <span>Metacritic score</span>
            <span>Steam score</span>
          </div>
          <div>
            <span>Recommendations</span>
          </div>
        </div>
      </header>
      <section>
        <HomeSectionTitle>Details</HomeSectionTitle>
        <div>
          <p>
            Description : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, rerum natus
            impedit cum rem, accusamus nostrum, iure dolores similique veniam tempora corporis
            voluptatibus dignissimos officiis labore? Laudantium molestias accusamus modi?
          </p>
        </div>
        <div>
          <div>Developers</div>
          <div>Publishers</div>
          <div>Website</div>
          <div>Genres</div>
        </div>
      </section>
      <section>
        <div></div>
      </section>
    </MainContentContainer>
  );
};
export default GameDetails;
