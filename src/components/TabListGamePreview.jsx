import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import { steamHeaderImage } from '../services/utilities';
const TabListGamePreview = ({ id }) => {
  // if a game selected fetch its data else data is empty
  const { data } = useData(id ? `/api/appdetails?appids=${id}` : null);
  // if data fetched and data is for this id and it fetched with succuss set game data
  const gameData = data && data[id] && data[id].success ? data[id].data : null;

  return (
    <>
      {gameData ? (
        <div>
          <img src={steamHeaderImage(id)} alt={gameData.name} />
          <h3>{gameData.name}</h3>
          <p>{gameData.short_description}</p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
TabListGamePreview.propTypes = {
  id: PropTypes.number,
};
export default TabListGamePreview;
