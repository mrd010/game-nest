import { useLoaderData, useOutletContext } from 'react-router-dom';
import MainContentContainer from '../components/MainContentContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HomeSectionTitle from '../components/HomeSectionTitle';
import { useEffect, useState } from 'react';
import { getCleanUrl, steamLargerImage } from '../services/utilities';
import GameScore from '../components/GameScore';
import PubDevRow from '../components/PubDevRow';
import MiniCategoriesList from '../components/MiniCategoriesList';
import { extractGameSysReq } from '../services/extractors';
import Carousel from '../components/Carousel';
import { getGamesMiniData } from '../services/dataFetchers';
import GameDLCCard from '../components/GameDLCCard';
import SimpleCarousel from '../components/SimpleCarousel';
import VideoListItem from '../components/VideoListItem';
import VideoPlayerOverlay from '../components/VideoPlayerOverlay';
import ScreenshotsOverlay from '../components/ScreenshotsOverlay';
import FreeGameLabel from '../components/FreeGameLabel';
import AvailableOSs from '../components/AvailableOSs';

const GameDetails = () => {
  const gameData = useLoaderData();
  const initialDlcData = gameData.dlc ?? null;
  const [dlcsInfo, setDlcsInfo] = useState(initialDlcData);
  const [modalContent, setModalContent] = useState(null);

  const { isHandheldDevice } = useOutletContext();

  // url for whole page background
  const bgUrl = `url('${getCleanUrl(gameData.background)}')`;
  useEffect(() => {
    document.getElementById('main').classList.add('dark-bg');
    document.getElementById('main').style.backgroundImage = bgUrl;
    return () => {
      document.getElementById('main').classList.remove('dark-bg');
      document.getElementById('main').style.backgroundImage = 'none';
    };
  }, [bgUrl]);

  // list of platforms game runs on
  const supportedPlatforms = Object.entries(gameData.platforms)
    .filter((platform) => platform[1])
    .map((platform) => platform[0]);
  supportedPlatforms.sort();

  // all system requirements
  const systemRequirements = extractGameSysReq(gameData);

  // get dlc infos
  const stringifiedDLCsIds = gameData?.dlc ? JSON.stringify(gameData.dlc) : null;
  useEffect(() => {
    let ignore = false;
    const getDlcsInfo = async () => {
      if (stringifiedDLCsIds) {
        const dlcsData = await getGamesMiniData(stringifiedDLCsIds);
        if (dlcsData && !ignore) {
          setDlcsInfo(dlcsData);
        }
      }
    };

    getDlcsInfo();
    return () => (ignore = true);
  }, [stringifiedDLCsIds]);

  // select video or image for opening
  const handleModalOverlayOpen = (type, id) => {
    setModalContent({ type, id });
  };
  const handleClosingModal = () => {
    setModalContent(null);
  };

  // change screenshot image with next and prev buttons in overlay
  const handleNextScreenshot = () => {
    if (modalContent.type === 'image') {
      // next image is rotatable. next id after last id is 0
      const nextId = modalContent.id < gameData.screenshots.length - 1 ? modalContent.id + 1 : 0;
      setModalContent({ type: 'image', id: nextId });
    }
  };
  const handlePrevScreenshot = () => {
    if (modalContent.type === 'image') {
      // prev image is rotatable. prev id before first id is last id
      const prevId = modalContent.id > 0 ? modalContent.id - 1 : gameData.screenshots.length - 1;
      setModalContent({ type: 'image', id: prevId });
    }
  };

  // current video selected for play in overlay player if selected item is from videos
  const currentVideo =
    modalContent?.type === 'video'
      ? gameData?.movies?.find((movie) => movie.id === modalContent.id)
      : null;

  // current image if selected item is from screenshots
  const currentImage =
    modalContent?.type === 'image'
      ? gameData?.screenshots?.find((image) => image.id === modalContent.id)
      : null;

  return (
    <MainContentContainer className="bg-opacity-10 text-gray-50 xl:w-full">
      {/* header of page */}
      <header className="grid grid-cols-2 gap-6 xl:gap-2 lg:flex lg:flex-col relative">
        {/* game header image left */}
        <div>
          <LazyLoadImage
            src={steamLargerImage(gameData.steam_appid)}
            alt={gameData.name}
            width={616}
            height={353}
            className="rounded-md xl:w-full"
          ></LazyLoadImage>
        </div>
        {/* game header info right */}
        <div className="grid grid-rows-[minmax(0,1fr)_auto_auto] lg:grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto] p-4 gap-6 xl:gap-4">
          {gameData.is_free && (
            <div className="absolute -top-2 left-2 lg:top-0 opacity-85 lg:left-4 scale-125 lg:scale-150">
              <FreeGameLabel></FreeGameLabel>
            </div>
          )}
          {/* game name */}
          <h1 className="text-5xl xl:text-4xl font-extrabold line-clamp-2 lg:line-clamp-1 drop-shadow lg:col-span-2">
            {gameData.name}
          </h1>
          <div className="grid grid-cols-2 lg:items-center lg:gap-1">
            {/* release date */}
            <div className="flex flex-nowrap flex-col lg:flex-row lg:gap-2">
              <h3 className="text-xl xl:text-lg lg:text-xl font-bold">Release Date</h3>
              <span className="text-3xl xl:text-xl text-gray-50/60 font-light">
                {gameData.release_date ? gameData.release_date.date : 'TBA'}
              </span>
            </div>
            {/* supported platforms */}
            {gameData.platforms && (
              <div className="flex flex-col rounded-full lg:items-start lg:gap-2">
                <h3 className="text-xl xl:text-lg lg:hidden font-bold px-3 ">Platforms</h3>
                {!isHandheldDevice ? (
                  <ul className="flex flex-nowrap flex-row divide-x-2 divide-gray-200/30">
                    {
                      // display all platforms and colorize those available
                      Object.entries(gameData.platforms).map((platform) => (
                        <li
                          key={platform[0]}
                          className={`px-3 text-3xl xl:text-xl font-light ${platform[1] ? 'text-gray-50' : 'text-gray-50/25'}`}
                        >
                          {platform[0]}
                        </li>
                      ))
                    }
                  </ul>
                ) : (
                  <div className="bg-gray-50 rounded-full">
                    <AvailableOSs
                      linux={gameData.platforms?.linux}
                      win={gameData.platforms?.windows}
                      mac={gameData.platforms?.mac}
                      iconSize={25}
                    ></AvailableOSs>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* scores */}
          <div className="grid grid-cols-[auto_1fr] lg:grid-cols-1 gap-x-4 lg:gap-x-0 grid-rows-[auto_minmax(0,1fr)] items-center">
            {/* meta score number */}
            {gameData.metacritic && (
              <>
                <div className="row-span-2">
                  <GameScore.GameScoreRateMeta
                    score={gameData.metacritic.score}
                    className="text-5xl lg:text-6xl size-20 lg:size-24 font-bold"
                  ></GameScore.GameScoreRateMeta>
                </div>
                {/* meta link */}
                <a
                  href={getCleanUrl(gameData.metacritic.url)}
                  target="_blank"
                  className="font-bold my-1 grid grid-flow-col items-start justify-start gap-1 lg:gap-0 hover:text-yellow-400/85 active:text-yellow-400/85"
                >
                  <span className="text-2xl lg:text-xl lg:tracking-tighter">Metacritic</span>
                  <span className="material-symbols-rounded scale-75 lg:scale-50">open_in_new</span>
                </a>
              </>
            )}
            {/* recommendations */}
            {gameData.recommendations && (
              <p className="text-lg text-gray-50/60 self-start lg:absolute lg:left-4 lg:bottom-4">
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
            <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3 pl-4 pb-2">
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
      {/* system requirements */}
      <section>
        <HomeSectionTitle>System Requirements</HomeSectionTitle>
        <div className="grid grid-cols-3 lg:grid-cols-2 grid-rows-[auto_auto] lg:grid-rows-1 grid-flow-col-dense gap-8 py-4 lg:gap-4">
          {Object.entries(systemRequirements).map((sysRequirement) => {
            const isLinuxOrMac = ['linux', 'mac'].includes(sysRequirement[0]);
            return (
              // container for all sys req
              <div
                key={sysRequirement[0]}
                className={`px-6 py-4 bg-gradient-to-tl from-gray-900/20 to-slate-950/30 rounded-2xl ${isLinuxOrMac ? 'row-span-1 lg:hidden' : 'row-span-2'}`}
              >
                {/* title */}
                <h4
                  className={`font-extrabold font-sans tracking-wider text-slate-50 capitalize ${isLinuxOrMac ? 'text-lg my-2' : 'text-xl my-3'}`}
                >
                  {sysRequirement[0]}
                </h4>
                {/* sys req list */}
                <ul className="flex flex-col flex-nowrap divide-y-2 divide-gray-200/10">
                  {sysRequirement[1].map((row, index) => (
                    <div
                      className={`flex flex-col py-1 ${isLinuxOrMac ? 'text-sm' : 'text-base'}`}
                      key={index}
                    >
                      <PubDevRow.Title>{row[0]}</PubDevRow.Title>
                      <PubDevRow.Value
                        className={`text-gray-50/70 ${isLinuxOrMac ? 'text-sm' : 'text-base'}`}
                      >
                        {row[1]}
                      </PubDevRow.Value>
                    </div>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      {/* game dlcs */}
      {gameData?.dlc && (
        <section>
          {/* dlc list */}
          <Carousel title={'DLCs'} itemWidth={385} steps={2} disabledSidesBlur theme="dark">
            {dlcsInfo.map((dlc, index) =>
              dlc?.status === 1 ? (
                // card for each dlc - not a link
                <GameDLCCard
                  key={dlc.appid}
                  appid={dlc.appid}
                  name={dlc.name}
                  width={385}
                ></GameDLCCard>
              ) : (
                <div key={index} className="w-[385px] h-[252px] p-2">
                  <div className="content-loader"></div>
                </div>
              )
            )}
          </Carousel>
        </section>
      )}
      {/* screenshots slider */}
      {gameData?.screenshots?.length && (
        <section className="xl:w-full">
          <HomeSectionTitle>Screenshots</HomeSectionTitle>
          <SimpleCarousel className="h-[190px] w-full">
            {gameData.screenshots.map((image) => (
              <button
                key={image.id}
                onClick={() => handleModalOverlayOpen('image', image.id)}
                className="mx-2 ring-yellow-400 hover:ring-2 transition-shadow rounded"
              >
                <img
                  src={getCleanUrl(image.path_thumbnail)}
                  width={600}
                  height={338}
                  className="h-[150px] w-full rounded"
                ></img>
              </button>
            ))}
          </SimpleCarousel>
        </section>
      )}
      {/* trailers and videos section */}
      {gameData?.movies?.length && (
        <section>
          <HomeSectionTitle>Videos</HomeSectionTitle>
          <SimpleCarousel className="gap-4 h-[250px]">
            {gameData.movies.map((video) => (
              <VideoListItem
                key={video.id}
                name={video.name}
                thumbnail={getCleanUrl(video.thumbnail)}
                iconCentered
                id={video.id}
                onSelect={() => handleModalOverlayOpen('video', video.id)}
                className="grid grid-rows-[auto_auto] text-gray-50 gap-2 w-[300px]"
              ></VideoListItem>
            ))}
          </SimpleCarousel>
        </section>
      )}
      {/* video player overlay appears when selecting a video */}
      <VideoPlayerOverlay
        isOpen={modalContent?.type === 'video'}
        onClose={handleClosingModal}
        hqUrl={currentVideo?.webm['max']}
        lqUrl={currentVideo?.webm['480']}
      ></VideoPlayerOverlay>
      {/* screenshots carousel appears when selecting an image */}
      <ScreenshotsOverlay
        isOpen={modalContent?.type === 'image'}
        onClose={handleClosingModal}
        activeImageUrl={currentImage?.path_full}
        onPrev={handlePrevScreenshot}
        onNext={handleNextScreenshot}
      ></ScreenshotsOverlay>
    </MainContentContainer>
  );
};
export default GameDetails;
