import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import SysReq from './SysReq';
import { decode } from 'html-entities';
import { extractGameData, extractPriorityMinReq } from '../services/extractors';
import { steamHeaderImage } from '../services/utilities';
import { useEffect, useState } from 'react';
import MiniCategoriesList from './MiniCategoriesList';
import FreeGameLabel from './FreeGameLabel';
import ContentLoader from './ContentLoader';
import noDataImg from '../assets/img/no_data.png';
import { Link, useOutletContext } from 'react-router-dom';
import ErrorOverlay from './ErrorOverlay';
import PubDevRow from './PubDevRow';

const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data, isLoading, hasError, retry, resetError } = useData(
    id ? `/api/appdetails?appids=${id}` : null
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // list of all game genres loaded
  const { categories } = useOutletContext();

  // if data fetched and data is for this id and it fetched with succuss set game data
  const { status, gameData } = extractGameData(data);

  // extract min game sys req for base platform
  const minSysReq = extractPriorityMinReq(gameData);

  // if a new game data is loading
  useEffect(() => {
    if (isLoading) {
      setIsImageLoaded(false);
    }
  }, [isLoading]);

  return (
    <>
      {status === 'has_data' && (
        // if data loaded and exists
        <div className="grid grid-rows-[240px_150px_60px_40px_280px] drop-shadow-sm items-start">
          {/* Error overlay */}
          {hasError && (
            <div className="absolute bottom-0 left-0 w-full z-50">
              <ErrorOverlay onDismiss={resetError} onRefresh={retry}></ErrorOverlay>
            </div>
          )}
          {/* header containing game picture and free game label */}
          <div className="relative rounded-sm">
            <img
              width={460}
              height={215}
              src={steamHeaderImage(gameData.steam_appid)}
              onLoad={() => setIsImageLoaded(true)}
              className="rounded-md w-full shadow-md"
            />
            {
              // if is fetching data or fetched data and image url not loaded yet show loader
              (!isImageLoaded || isLoading || hasError) && (
                <div className="content-loader rounded-sm"></div>
              )
            }
            {isImageLoaded && gameData.is_free && (
              <div className="absolute top-0 right-0 z-10 -translate-y-4">
                <FreeGameLabel></FreeGameLabel>
              </div>
            )}
          </div>
          <div className="pb-2 grid grid-rows-[auto_minmax(0,1fr)]">
            <div className="relative my-2 grid">
              {/* game title */}
              {isLoading || hasError ? (
                <div>
                  <ContentLoader size="32px"></ContentLoader>
                </div>
              ) : (
                <Link
                  className=" hover:text-yellow-600 justify-self-start"
                  to={`/games/${gameData.steam_appid}`}
                >
                  <h3 className="text-2xl font-extrabold line-clamp-1">{gameData.name}</h3>
                </Link>
              )}
            </div>
            <div className="relative">
              {/* game description */}
              {isLoading || hasError ? (
                <div className="grid grid-flow-row gap-1">
                  <ContentLoader size="16px"></ContentLoader>
                  <ContentLoader size="16px"></ContentLoader>
                  <ContentLoader size="16px"></ContentLoader>
                  <ContentLoader size="16px" length={35}></ContentLoader>
                </div>
              ) : (
                <p className="text-justify text-sm text-gray-500/90 overflow-y-auto line-clamp-4">
                  {decode(gameData.short_description)}
                </p>
              )}
            </div>
          </div>
          <div className="border-y-[1px] py-2 grid grid-cols-2">
            {
              // if data exists and game data has developers show main developer
              gameData.developers && gameData.developers.length && (
                <PubDevRow className="flex flex-col">
                  <PubDevRow.Title className="font-bold">Developer</PubDevRow.Title>
                  <div>
                    {isLoading || hasError ? (
                      <ContentLoader size="20px" length={15}></ContentLoader>
                    ) : (
                      <PubDevRow.Value className="text-sm text-gray-500/90">
                        {gameData.developers[0]}
                      </PubDevRow.Value>
                    )}
                  </div>
                </PubDevRow>
              )
            }
            {
              // if data exists and game data has publishers show main publisher
              gameData.publishers && gameData.publishers.length && (
                <PubDevRow className="flex flex-col">
                  <PubDevRow.Title className="font-bold">Publisher</PubDevRow.Title>
                  <div>
                    {isLoading || hasError ? (
                      <ContentLoader size="20px" length={15}></ContentLoader>
                    ) : (
                      <PubDevRow.Value className="text-sm text-gray-500/90">
                        {gameData.publishers[0]}
                      </PubDevRow.Value>
                    )}
                  </div>
                </PubDevRow>
              )
            }
          </div>
          <div className="flex items-start h-full overflow-hidden justify-end flex-nowrap gap-1 justify-self-end py-3">
            {/* game genre categories */}
            {isLoading || hasError ? (
              <>
                <ContentLoader size="16px" length={5}></ContentLoader>
                <ContentLoader size="16px" length={6}></ContentLoader>
                <ContentLoader size="16px" length={4}></ContentLoader>
                <ContentLoader size="16px" length={8}></ContentLoader>
                <ContentLoader size="16px" length={3}></ContentLoader>
              </>
            ) : (
              gameData.genres && (
                <MiniCategoriesList
                  categoryList={gameData.genres.filter((genre) =>
                    categories.includes(genre.description)
                  )}
                ></MiniCategoriesList>
              )
            )}
          </div>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] items-start">
            {minSysReq.specs && <h4 className="text-lg p-2 font-bold">System Requirements</h4>}
            {isLoading || hasError ? (
              <ContentLoader size="150px"></ContentLoader>
            ) : (
              <>
                {minSysReq.specs && (
                  <SysReq
                    platform={minSysReq.platform}
                    title="minimum"
                    systemReqData={minSysReq.specs}
                  ></SysReq>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {
        // if first time a game selected and is loading its data shows page loader
        status === 'not_fetched' && isLoading && (
          <div className="relative h-full">
            <div className="absolute top-0 left-0 w-full h-full grid place-items-center z-30">
              <div className="page-loader"></div>
            </div>
          </div>
        )
      }
      {
        // if not selected a game yet
        status === 'not fetched' && !isLoading && <div className="h-full w-full"></div>
      }
      {
        // if data provided is bad or no data exists for current id
        status === 'no_data' && (
          <div className="grid place-items-center h-full">
            <img src={noDataImg} className="select-none" />
          </div>
        )
      }
    </>
  );
};
TabListGamePreview.propTypes = {
  id: PropTypes.number,
};
export default TabListGamePreview;
