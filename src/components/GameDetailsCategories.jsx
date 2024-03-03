import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const GameDetailsCategories = ({ categoryList }) => {
  return (
    <div>
      {categoryList.map((cat) => (
        <Link key={cat} to={cat}>
          {cat}
        </Link>
      ))}
    </div>
  );
};
GameDetailsCategories.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string),
};
export default GameDetailsCategories;
