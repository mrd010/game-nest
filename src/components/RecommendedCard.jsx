import PropTypes from 'prop-types';
import { steamHeaderImage } from '../services/utilities';

const RecommendedCard = ({
  id,
  title,
  metaScore,
  steamScore,
  steamCount,
  steamRatingText,
  releaseDate,
}) => {
  return (
    <div>
      <div>
        <img src={steamHeaderImage(id)} alt={`${title} image`} />
        <h3>{title}</h3>
        <span>Released on {releaseDate}</span>
      </div>
      <div>
        <span>Metascore</span>
        <span>{metaScore}</span>
      </div>
      <div>
        <span>Steam Score</span>
        <span>{steamScore}%</span>
        <span>{steamRatingText}</span>
        <span>Based on {steamCount} Ratings</span>
      </div>
    </div>
  );
};

RecommendedCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  metaScore: PropTypes.number.isRequired,
  steamScore: PropTypes.number.isRequired,
  steamCount: PropTypes.number.isRequired,
  steamRatingText: PropTypes.string.isRequired,
  releaseDate: PropTypes.instanceOf(Date),
};
export default RecommendedCard;
