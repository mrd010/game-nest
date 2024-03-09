import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const CategoriesSideNav = ({ categoryList }) => {
  return (
    <nav>
      <div>
        <NavLink to="new releases">New Releases</NavLink>
      </div>
      <div>
        {categoryList.map((category) => (
          <NavLink key={category} to={category}>
            {category}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
CategoriesSideNav.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.exact({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired })
  ).isRequired,
};
export default CategoriesSideNav;
