import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const MiniCategoriesList = ({ categoryList }) => {
  return (
    <>
      {categoryList.map((cat) => (
        <Link
          key={cat.id}
          to={`/categories/${cat.id}`}
          className="text-xs opacity-85 font-bold bg-gray-950 text-gray-100 p-1 rounded hover:opacity-100"
        >
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
