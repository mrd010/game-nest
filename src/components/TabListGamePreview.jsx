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
const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data, isLoading, hasError } = useData(id ? `/api/appdetails?appids=${id}` : null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // if data fetched and data is for this id and it fetched with succuss set game data
  const gameData = extractGameData(data);

  // extract min game sys req for base platform
  const minSysReq = extractPriorityMinReq(gameData);

  console.log(gameData);

  const newId = gameData && gameData.steam_appid;
  useEffect(() => {
    if (id !== newId) {
      setIsImageLoaded(false);
    }
  }, [id, newId]);

  return (
    <>
      {gameData && ['game', 'demo'].includes(gameData.type) && (
        // if data loaded and exists
        <div className="grid grid-rows-[230px_150px_60px_50px_260px] drop-shadow-sm items-start">
          <div className="relative rounded-sm">
            <img
              width={460}
              height={215}
              src={steamHeaderImage(gameData.steam_appid)}
              alt={gameData.name}
              onLoad={() => setIsImageLoaded(true)}
              className="rounded-md w-full"
            />
            {(!isImageLoaded || isLoading) && <div className="content-loader rounded-sm"></div>}
            {isImageLoaded && gameData.is_free && (
              <div className="absolute top-0 right-0 z-10 -translate-y-4">
                <FreeGameLabel></FreeGameLabel>
              </div>
            )}
          </div>
          <div className="pb-2 grid grid-rows-[auto_minmax(0,1fr)]">
            <div className="relative my-2">
              {isLoading ? (
                <ContentLoader size="32px"></ContentLoader>
              ) : (
                <h3 className="text-2xl font-extrabold line-clamp-1">{gameData.name}</h3>
              )}
            </div>
            <div className="relative">
              {isLoading ? (
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
                  {isLoading ? (
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
                  {isLoading ? (
                    <ContentLoader size="20px" length={15}></ContentLoader>
                  ) : (
                    <span className="text-sm text-gray-500/90">{gameData.publishers[0]}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-start justify-end flex-wrap gap-1 justify-self-end py-2">
            {isLoading ? (
              <>
                <ContentLoader size="16px" length={5}></ContentLoader>
                <ContentLoader size="16px" length={6}></ContentLoader>
                <ContentLoader size="16px" length={4}></ContentLoader>
                <ContentLoader size="16px" length={8}></ContentLoader>
                <ContentLoader size="16px" length={3}></ContentLoader>
              </>
            ) : (
              <MiniCategoriesList categoryList={gameData.categories}></MiniCategoriesList>
            )}
          </div>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] items-start">
            <h4 className="text-lg p-2 font-bold">System Requirements</h4>
            {isLoading ? (
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
    </>
  );
};
TabListGamePreview.propTypes = {
  id: PropTypes.number,
};
export default TabListGamePreview;
