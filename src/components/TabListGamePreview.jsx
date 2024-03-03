import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import SysReq from './SysReq';
import { decode } from 'html-entities';
import { extractGameData, extractPriorityMinReq } from '../services/extractors';
import { steamHeaderImage } from '../services/utilities';
import { useEffect, useState } from 'react';
import MiniCategoriesList from './MiniCategoriesList';
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
      {gameData && gameData.type === 'game' && (
        // if data loaded
        <div className="grid grid-rows-[230px_150px_60px_50px_260px] drop-shadow-sm items-start">
          <div className="relative rounded-md overflow-hidden">
            <img
              width={460}
              height={215}
              src={steamHeaderImage(gameData.steam_appid)}
              alt={gameData.name}
              onLoad={() => setIsImageLoaded(true)}
              className="rounded-sm w-full"
            />
            {!isImageLoaded && <div className="image-loader rounded-sm"></div>}
          </div>
          <div className="pb-2 grid grid-flow-row h-full ">
            <h3 className="text-2xl font-extrabold my-2">{gameData.name}</h3>
            <p className="text-justify text-sm text-gray-500/90   overflow-y-auto">
              {decode(gameData.short_description)}
            </p>
          </div>
          <div className="border-y-[1px] py-2 grid grid-cols-2">
            {gameData.developers && gameData.developers.length && (
              <div className="flex flex-col">
                <span className="font-bold">Developer</span>
                <span className="text-sm text-gray-500/90">{gameData.developers[0]}</span>
              </div>
            )}
            {gameData.publishers && gameData.publishers.length && (
              <div className="flex flex-col">
                <span className="font-bold">Publisher</span>
                <span className="text-sm text-gray-500/90">{gameData.publishers[0]}</span>
              </div>
            )}
          </div>
          <div className="flex items-start justify-end flex-wrap gap-1 justify-self-end py-2">
            <MiniCategoriesList categoryList={gameData.categories}></MiniCategoriesList>
          </div>
          <div className="grid grid-rows-[auto_minmax(0,1fr)] self-stretch">
            <h4 className="text-lg p-2 font-bold">System Requirements</h4>
            <SysReq
              platform={minSysReq.platform}
              title="minimum"
              systemReqData={minSysReq.specs}
            ></SysReq>
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
