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
import { Link } from 'react-router-dom';
import ErrorOverlay from './ErrorOverlay';

const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data, isLoading, hasError, retry, resetError } = useData(
    id ? `/api/appdetails?appids=${id}` : null
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // if data fetched and data is for this id and it fetched with succuss set game data
  const { status, gameData } = extractGameData(data);

  // extract min game sys req for base platform
  const minSysReq = extractPriorityMinReq(gameData);

  const newId = gameData && gameData.steam_appid;
  useEffect(() => {
    if (id !== newId) {
      setIsImageLoaded(false);
    }
  }, [id, newId]);

  console.log(gameData);

  return (
    <>
      {status === 'has_data' && (
        // if data loaded and exists
        <div className="grid grid-rows-[230px_150px_60px_60px_300px] drop-shadow-sm items-start">
          {hasError && (
            <div className="absolute bottom-0 left-0 w-full z-50">
              <ErrorOverlay onDismiss={resetError} onRefresh={retry}></ErrorOverlay>
            </div>
          )}
          <div className="relative rounded-sm">
            <img
              width={460}
              height={215}
              src={steamHeaderImage(id)}
              onLoad={() => setIsImageLoaded(true)}
              className="rounded-md w-full"
            />
            {(!isImageLoaded || isLoading || hasError) && (
              <div className="content-loader rounded-sm"></div>
            )}
            {isImageLoaded && gameData.is_free && (
              <div className="absolute top-0 right-0 z-10 -translate-y-4">
                <FreeGameLabel></FreeGameLabel>
              </div>
            )}
          </div>
          <div className="pb-2 grid justify-items-start grid-rows-[auto_minmax(0,1fr)]">
            <div className="relative my-2">
              {isLoading || hasError ? (
                <ContentLoader size="32px"></ContentLoader>
              ) : (
                <Link to={`games/${gameData.steam_appid}`}>
                  <h3 className="text-2xl font-extrabold line-clamp-1 hover:text-yellow-500">
                    {gameData.name}
                  </h3>
                </Link>
              )}
            </div>
            <div className="relative">
              {isLoading || hasError ? (
                <div className="grid grid-flow-row gap-1">
                  <ContentLoader size="20px"></ContentLoader>
                  <ContentLoader size="20px"></ContentLoader>
                  <ContentLoader size="20px"></ContentLoader>
                  <ContentLoader size="20px" length={35}></ContentLoader>
                </div>
              ) : (
                <p className="text-justify text-sm text-gray-500/90 overflow-y-auto line-clamp-4">
                  {decode(gameData.short_description)}
                </p>
              )}
            </div>
          </div>
          <div className="border-y-[1px] py-2 grid grid-cols-2">
            {gameData.developers && gameData.developers.length && (
              <div className="flex flex-col">
                <span className="font-bold">Developer</span>
                <div>
                  {isLoading || hasError ? (
                    <ContentLoader size="20px" length={15}></ContentLoader>
                  ) : (
                    <span className="text-sm text-gray-500/90">{gameData.developers[0]}</span>
                  )}
                </div>
              </div>
            )}
            {gameData.publishers && gameData.publishers.length && (
              <div className="flex flex-col">
                <span className="font-bold">Publisher</span>
                <div>
                  {isLoading || hasError ? (
                    <ContentLoader size="20px" length={15}></ContentLoader>
                  ) : (
                    <span className="text-sm text-gray-500/90">{gameData.publishers[0]}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-start h-full overflow-hidden justify-end flex-wrap gap-1 justify-self-end py-2">
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
                <MiniCategoriesList categoryList={gameData.genres}></MiniCategoriesList>
              )
            )}
          </div>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] items-start">
            <h4 className="text-lg p-2 font-bold">System Requirements</h4>
            {isLoading || hasError ? (
              <ContentLoader size="150px"></ContentLoader>
            ) : (
              <SysReq
                platform={minSysReq.platform}
                title="minimum"
                systemReqData={minSysReq.specs}
              ></SysReq>
            )}
          </div>
        </div>
      )}
      {status === 'not_fetched' && isLoading && (
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full grid place-items-center z-30">
            <div className="page-loader"></div>
          </div>
        </div>
      )}
      {status === 'no_data' && (
        <div className="grid place-items-center">
          <img src={noDataImg} className="select-none" />
        </div>
      )}
    </>
  );
};
TabListGamePreview.propTypes = {
  id: PropTypes.number,
};
export default TabListGamePreview;
