import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const MiniCategoriesList = ({ categoryList }) => {
  return (
    <>
      {categoryList.map((cat) => (
        <Link key={cat.id} to={`/categories/${cat.id}`}>
          {cat.description}
        </Link>
      ))}
    </>
  );
};
MiniCategoriesList.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
export default MiniCategoriesList;
