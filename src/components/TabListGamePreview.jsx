import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import SysReq from './SysReq';
import { decode } from 'html-entities';
import { extractGameData, extractPriorityMinReq } from '../services/extractors';
import { steamHeaderImage } from '../services/utilities';
import { useEffect, useState } from 'react';
import MiniCategoriesList from './MiniCategoriesList';
import ButtonLink from './ButtonLink';
const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data, isLoading, hasError } = useData(id ? `/api/appdetails?appids=${id}` : null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // if data fetched and data is for this id and it fetched with succuss set game data
  const gameData = extractGameData(data);

  // extract min game sys req for base platform
  const minSysReq = extractPriorityMinReq(gameData);

  console.log(gameData);

  useEffect(() => {
    if (id) {
      setIsImageLoaded(false);
    }
  }, [id]);

  return (
    <>
      {gameData && (
        // if data loaded
        <div>
          <div className="relative">
            <img
              width={460}
              height={215}
              src={steamHeaderImage(gameData.steam_appid)}
              alt={gameData.name}
              onLoad={() => setIsImageLoaded(true)}
            />
            {!isImageLoaded && <div className="image-loader rounded-md"></div>}
          </div>
          <h3>{gameData.name}</h3>
          <p>{decode(gameData.short_description)}</p>
          <div>
            <h4>System Requirements</h4>
            <SysReq
              platform={minSysReq.platform}
              title="minimum"
              systemReqData={minSysReq.specs}
            ></SysReq>
          </div>
          <div>
            <MiniCategoriesList categoryList={gameData.categories}></MiniCategoriesList>
          </div>
          <div></div>
          <div>
            <ButtonLink text="More Info" link={`/games/${gameData.steam_appid}`}></ButtonLink>
          </div>
          <div>
            {gameData.developers && gameData.developers.length && (
              <p>
                <span>Developer:</span>
                <span>{gameData.developers[0]}</span>
              </p>
            )}
            {gameData.publishers && gameData.publishers.length && (
              <p>
                <span>Publisher:</span>
                <span>{gameData.publishers[0]}</span>
              </p>
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
