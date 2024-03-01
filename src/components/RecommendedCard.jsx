import PropTypes from 'prop-types';
import { steamHeaderImage } from '../services/utilities';
import { Link } from 'react-router-dom';

const RecommendedCard = ({
  steamAppID,
  title,
  metacriticScore,
  steamRatingPercent,
  steamRatingCount,
  steamRatingText,
  releaseDate,
}) => {
  // game card for each game in recommended games section . links to game page

  // TODO
  return (
    <Link className="gap-2 p-3 drop-shadow-sm shadow-md bg-gradient-to-b from-amber-300 from-25% to-25% to-gray-100 rounded-md w-[290px]">
      <div className="flex flex-col flex-nowrap gap-2">
        <img src={steamHeaderImage(steamAppID)} alt={`${title} image`} className="rounded-md" />
        <h3 className="text-2xl font-bold ">{title}</h3>
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
    </Link>
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
