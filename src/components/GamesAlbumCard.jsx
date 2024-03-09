import PropTypes from 'prop-types';
const GamesAlbumCard = ({ id }) => {
  return <div>{id}</div>;
};
GamesAlbumCard.propTypes = {
  id: PropTypes.number.isRequired,
};
export default GamesAlbumCard;
