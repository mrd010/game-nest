import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const MiniCategoriesList = ({ categoryList }) => {
  // gets category list and generate a list of items
  return (
    <>
      {categoryList.map((cat) => (
        <Link
          key={cat.id}
          to={`/categories/${cat.id}`}
          className="text-xs opacity-85 font-bold bg-gray-950 text-gray-100 p-1 rounded shadow-sm hover:opacity-100"
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
export default MiniCategoriesList;
