import PropTypes from 'prop-types';
import { steamHeaderImage } from '../services/utilities';

const RecommendedCard = ({
  steamAppID,
  title,
  metacriticScore,
  steamRatingPercent,
  steamRatingCount,
  steamRatingText,
  releaseDate,
}) => {
  return (
    <div>
      <div>
        <img src={steamHeaderImage(steamAppID)} alt={`${title} image`} />
        <h3>{title}</h3>
        <span>Released on {Date(releaseDate)}</span>
      </div>
      <div>
        <span>Metacritic Score</span>
        {metacriticScore ? <span>{metacriticScore}</span> : <span>?</span>}
      </div>
      <div>
        <span>Steam Score</span>
        {steamRatingPercent ? <span>{steamRatingPercent}%</span> : <span>?</span>}
        {steamRatingPercent && (
          <>
            <span>{steamRatingText}</span>
            <span>Based on {steamRatingCount} Ratings</span>
          </>
        )}
      </div>
    </div>
  );
};

RecommendedCard.propTypes = {
  steamAppID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  metacriticScore: PropTypes.string,
  steamRatingPercent: PropTypes.string,
  steamRatingCount: PropTypes.string,
  steamRatingText: PropTypes.string,
  releaseDate: PropTypes.number,
};
export default RecommendedCard;
