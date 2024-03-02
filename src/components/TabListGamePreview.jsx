import PropTypes from 'prop-types';
import { useData } from '../hooks/useData';
import { steamHeaderImage } from '../services/utilities';
const TabListGamePreview = ({ id }) => {
  const { data } = useData(id ? `/api/appdetails?appids=${id}` : null);
  const gameData = data && data[id] && data[id].success ? data[id].data : null;
  console.log(data);

  return (
    <>
      {gameData ? (
        <div>
          <img width={460} height={215} src={steamHeaderImage(id)} alt={gameData.name} />
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
