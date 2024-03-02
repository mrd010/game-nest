import PropTypes from 'prop-types';
import { getMetascoreColor, steamHeaderImage } from '../services/utilities';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { format } from 'date-fns';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  // TODO
  return (
    <Link className="grid grid-rows-[1fr_auto_auto] p-3 drop-shadow-sm shadow-md bg-gradient-to-b from-amber-300 from-25% to-25% to-gray-100 rounded-md w-[290px]">
      <div className="grid grid-rows-[124px_1fr_auto] gap-3 border-b-[1px] mb-2 pb-2">
        <div className="size-full relative rounded-md bg-gray-100">
          {!imageLoaded && <div className="image-loader rounded-md absolute top-0 left-0"></div>}
          <LazyLoadImage
            src={steamHeaderImage(steamAppID)}
            alt={`${title} image`}
            className="h-[124px] w-full rounded-md"
            onLoad={() => setImageLoaded(true)}
          ></LazyLoadImage>
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="grid grid-flow-row ">
          <span className="text-lg">Release Date</span>
          <span className="uppercase text-sm text-gray-500/80">
            {format(new Date(releaseDate), 'PPP')}
          </span>
        </div>
      </div>
      <div className="border-b-[1px] mb-2 pb-2 grid items-center grid-cols-[minmax(0,1fr)_40px]">
        <span className="uppercase text-2xl text-gray-500/80">Metascore</span>
        {metacriticScore ? (
          <span
            style={{ backgroundColor: getMetascoreColor(Number(metacriticScore)) }}
            className="rounded-md p-1 text-2xl size-10 text-center"
          >
            {metacriticScore}
          </span>
        ) : (
          <span>?</span>
        )}
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
