import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamThumbnail } from '../services/utilities';
import { Link } from 'react-router-dom';
const DealCard = (props) => {
  return (
    <div className="border-2">
      <LazyLoadImage src={steamThumbnail(props.steamAppID)} alt={props.title}></LazyLoadImage>
      <h4>
        <Link to={`games/${props.steamAppID}`}>{props.title}</Link>
      </h4>
      <Link to={`https://www.metacritic.com/${props.metacriticLink}`}>Metacritic</Link>
      <span>{props.metacriticScore}</span>
      <span className="material-symbols-rounded">open_in_new</span>
      <span>{props.normalPrice}</span>
      <span>{props.salePrice}</span>
      <span>-{props.savings.split('.')[0]}</span>
      <Link to={`deals/${props.dealID}`}></Link>
    </div>
  );
};
DealCard.propTypes = {
  dealID: PropTypes.string.isRequired,
  dealRating: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  metacriticLink: PropTypes.string.isRequired,
  metacriticScore: PropTypes.string.isRequired,
  normalPrice: PropTypes.string.isRequired,
  salePrice: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired,
  steamAppID: PropTypes.string.isRequired,
  storeID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default DealCard;
