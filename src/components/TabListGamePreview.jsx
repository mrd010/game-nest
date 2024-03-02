import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import { extractGameSysReq, steamHeaderImage } from '../services/utilities';
const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data, isLoading, hasError } = useData(id ? `/api/appdetails?appids=${id}` : null);
  // if data fetched and data is for this id and it fetched with succuss set game data
  const gameData = data && Object.values(data)[0].success && Object.values(data)[0].data;

  // extract game sys req from received html code
  const allOSSysRequirements = extractGameSysReq(gameData);

  return (
    <>
      {gameData ? (
        // if data loaded
        <div>
          <img src={steamHeaderImage(id)} alt={gameData.name} />
          <h3>{gameData.name}</h3>
          <p>{gameData.short_description}</p>
        </div>
      ) : (
        // if no data loaded yet show notifier empty
        <div className="bg-gray-200 rounded-md grid place-content-center">
          <h3 className="text-center text-2xl italic font-bold p-2">No Preview!</h3>
          <p className="text-center p-2 grid grid-flow-col items-center">
            <span className="material-symbols-rounded  m-3 translate-y-[0.7px]">
              keyboard_backspace
            </span>
            select a game from list to preview
          </p>
        </div>
      )}
    </>
  );
};
TabListGamePreview.propTypes = {
  id: PropTypes.number,
};
export default TabListGamePreview;
