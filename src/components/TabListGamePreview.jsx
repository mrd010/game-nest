import PropTypes from 'prop-types';
import { useState } from 'react';
const TabListGamePreview = ({ id }) => {
  const [gameData, setGameData] = useState(null);
  return (
    <>
      {gameData ? (
        <div>
          <img src={gameData.header_image} alt={gameData.name} />
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
