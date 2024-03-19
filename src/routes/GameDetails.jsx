import { useLoaderData } from 'react-router-dom';
import MainContentContainer from '../components/MainContentContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HomeSectionTitle from '../components/HomeSectionTitle';
import { useEffect } from 'react';
import { getCleanUrl, steamLargerImage } from '../services/utilities';
import GameScore from '../components/GameScore';
import PubDevRow from '../components/PubDevRow';
import MiniCategoriesList from '../components/MiniCategoriesList';

const GameDetails = () => {
  const gameData = useLoaderData();
  console.log(gameData);

  // url for whole page background
  const bgUrl = `url('${getCleanUrl(gameData.background)}')`;
  useEffect(() => {
    document.querySelector('#root').style.backgroundImage = bgUrl;
  }, [bgUrl]);

  return (
    <MainContentContainer className="bg-opacity-5 text-gray-50">
      {/* header of page */}
      <header className="grid grid-cols-2 gap-6">
        {/* game header image left */}
        <div>
          <LazyLoadImage
            src={steamLargerImage(gameData.steam_appid)}
            alt={gameData.name}
            width={616}
            height={353}
            className="rounded-md"
          ></LazyLoadImage>
        </div>
        {/* game header info right */}
        <div className="grid grid-rows-[minmax(0,1fr)_auto_auto] p-4 gap-6">
          {gameData.is_free && <span>Free</span>}
          {/* game name */}
          <h1 className="text-5xl font-extrabold line-clamp-2 drop-shadow">{gameData.name}</h1>
          <div className="grid grid-cols-2">
            {/* release date */}
            <div className="flex flex-nowrap flex-col">
              <h3 className="text-xl font-bold">Release Date</h3>
              <span className="text-3xl text-gray-50/60 font-light">
                {gameData.release_date ? gameData.release_date.date : 'TBA'}
              </span>
            </div>
            {/* supported platforms */}
            {gameData.platforms && (
              <div className="flex flex-col rounded-full">
                <h3 className="text-xl font-bold px-3">Platforms</h3>
                <ul className="flex flex-nowrap flex-row divide-x-2 divide-gray-200/30">
                  {
                    // display all platforms and colorize those available
                    Object.entries(gameData.platforms).map((platform) => (
                      <li
                        key={platform[0]}
                        className={`px-3 text-3xl font-light ${platform[1] ? 'text-gray-50' : 'text-gray-50/25'}`}
                      >
                        {platform[0]}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
          {/* scores */}
          <div className="grid grid-cols-[auto_1fr] gap-x-4  grid-rows-[auto_minmax(0,1fr)] items-center">
            {/* meta score number */}
            {gameData.metacritic && (
              <>
                <div className="row-span-2">
                  <GameScore.GameScoreRateMeta
                    score={gameData.metacritic.score}
                    className="text-5xl size-20 font-bold"
                  ></GameScore.GameScoreRateMeta>
                </div>
                {/* meta link */}
                <a
                  href={gameData.metacritic.url}
                  target="_blank"
                  className="font-bold my-1 grid grid-flow-col items-start justify-start gap-1 hover:text-yellow-400/85 active:text-yellow-400/85"
                >
                  <span className="text-2xl">Metacritic</span>
                  <span className="material-symbols-rounded scale-75">open_in_new</span>
                </a>
              </>
            )}
            {/* recommendations */}
            {gameData.recommendations && (
              <p className="text-lg text-gray-50/60 self-start">
                Recommended by{' '}
                <span className="text-gray-50 font-bold text-xl">
                  {gameData.recommendations.total}
                </span>{' '}
                people
              </p>
            )}
          </div>
        </div>
      </header>
      {/* game details */}
      {(gameData.short_description ||
        gameData.developers ||
        gameData.publishers ||
        gameData.genres) && (
        <section>
          <HomeSectionTitle>Details</HomeSectionTitle>
          <div className="grid grid-cols-2 grid-rows-2 py-4 gap-x-4 divide-x-2 divide-gray-200/15">
            {/* game description */}
            {gameData.short_description && (
              <div className="row-span-full pb-2">
                <p className="text-lg font-light">{gameData.short_description}</p>
              </div>
            )}
            {/* game developers and publishers */}
            <div className="grid grid-cols-2 pl-4 pb-2">
              {gameData?.developers.length && (
                <PubDevRow>
                  <PubDevRow.Title>
                    Developer{gameData.developers.length > 1 && 's'}
                  </PubDevRow.Title>
                  <PubDevRow.Values
                    values={gameData.developers}
                    className="text-gray-50/60"
                  ></PubDevRow.Values>
                </PubDevRow>
              )}
              {gameData?.publishers.length && (
                <PubDevRow>
                  <PubDevRow.Title>
                    Publisher{gameData.publishers.length > 1 && 's'}
                  </PubDevRow.Title>
                  <PubDevRow.Values
                    values={gameData.publishers}
                    className="text-gray-50/60"
                  ></PubDevRow.Values>
                </PubDevRow>
              )}
            </div>
            {/* game genre links to their pages */}
            {gameData?.genres.length && (
              <div className="pl-4 flex flex-col flex-nowrap gap-1 pb-2">
                <PubDevRow.Title>Genres</PubDevRow.Title>
                <div className="flex flex-row gap-1">
                  <MiniCategoriesList categoryList={gameData.genres}></MiniCategoriesList>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      <section>
        <div></div>
      </section>
    </MainContentContainer>
  );
};
export default GameDetails;
