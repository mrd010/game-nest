import PropTypes from 'prop-types';
import { steamHeaderImage } from '../services/utilities';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { format } from 'date-fns';
import GameScore from './GameScore';

const RecommendedCard = ({
  steamAppID,
  title,
  metacriticScore,
  steamRatingPercent,

  steamRatingText,
  releaseDate,
}) => {
  // game card for each game in recommended games section . links to game page
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isMobile } = useOutletContext();
  // TODO
  return (
    <Link
      to={`/games/${steamAppID}`}
      className="grid grid-rows-[minmax(0,1fr)_auto_auto] p-3 h-full drop-shadow-sm  bg-gradient-to-b from-amber-300 from-25% to-25% to-gray-100 shadow-md rounded-md"
    >
      {/* header */}
      <div className="grid grid-rows-[124px_minmax(0,1fr)_auto] gap-3 sm:gap-1 pb-2">
        <div className="size-full relative rounded-md bg-gray-100">
          {!imageLoaded && <div className="image-loader rounded-md"></div>}
          <LazyLoadImage
            src={steamHeaderImage(steamAppID)}
            alt={`${title} image`}
            className="h-[124px] w-full rounded-md"
            onLoad={() => setImageLoaded(true)}
          ></LazyLoadImage>
        </div>
        <h3 className="text-2xl md:text-xl sm:text-lg sm:line-clamp-1 font-bold">{title}</h3>
        <div className="grid grid-flow-row">
          <span className="text-lg md:text-base">Release Date</span>
          <span className="uppercase text-sm text-gray-500/80">
            {format(new Date(releaseDate), 'PPP')}
          </span>
        </div>
      </div>
      {/* other details */}
      <GameScore>
        <GameScore.GameScoreTitle>Metascore</GameScore.GameScoreTitle>
        <GameScore.GameScoreRateMeta score={Number(metacriticScore)}></GameScore.GameScoreRateMeta>
      </GameScore>
      <GameScore>
        <GameScore.GameScoreTitle>Steam Score</GameScore.GameScoreTitle>
        <GameScore.GameScoreRateSteam
          score={Number(steamRatingPercent)}
        ></GameScore.GameScoreRateSteam>
      </GameScore>
      <span className="text-sm text-right text-gray-400 font-bold sm:absolute sm:top-5 sm:right-5 sm:tracking-tighter sm:text-xs sm:text-gray-900 sm:bg-gray-50 sm:rounded-full sm:px-2">
        {steamRatingText}
      </span>
    </Link>
  );
};

RecommendedCard.propTypes = {
  steamAppID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  metacriticScore: PropTypes.string,
  steamRatingPercent: PropTypes.string,
  steamRatingText: PropTypes.string,
  releaseDate: PropTypes.number,
};
export default RecommendedCard;
