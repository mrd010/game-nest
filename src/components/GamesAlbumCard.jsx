import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';

const GamesAlbumCard = ({ gameData }) => {
  return (
    <div className="grid gap-2">
      {gameData ? (
        <>
          <LazyLoadImage src={steamHeaderImage(gameData.appid)}></LazyLoadImage>
          <h4>{gameData.name}</h4>
          <p>{gameData.strSnippet}</p>
          <p>{gameData.rgDevelopers[0].name}</p>
          <p>{gameData.rgPublishers[0].name}</p>
        </>
      ) : (
        <>
          <ContentLoader size="100px"></ContentLoader>
          <ContentLoader size="20px"></ContentLoader>
        </>
      )}
    </div>
  );
};
GamesAlbumCard.propTypes = {
  gameData: PropTypes.shape({
    appid: PropTypes.string,
    name: PropTypes.string,
    strSnippet: PropTypes.string,
    rgDevelopers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    rgPublishers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  }),
};
export default GamesAlbumCard;
