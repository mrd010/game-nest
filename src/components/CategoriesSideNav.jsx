import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const CategoriesSideNav = ({ categoryList }) => {
  return (
    <nav className="w-[300px]">
      <ul className="divide-y-2">
        {/* main nav link (default page) */}
        <li className={`text-xl px-6 hover:text-yellow-600  `}>
          <NavLink
            to="new releases"
            className={`inline-block w-full py-4 transition-all font-bold`}
          >
            New Releases
          </NavLink>
        </li>
        {/* categories nav link */}
        {categoryList.map((category) => (
          <li
            key={category.id}
            className="px-6 hover:bg-gradient-to-r from-transparent to-transparent via-gray-500/10 via-15%"
          >
            <NavLink
              to={category.id}
              className={`text-lg w-full inline-block py-2 transition-transform text-gray-800/75`}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
CategoriesSideNav.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.exact({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired })
  ).isRequired,
};
export default CategoriesSideNav;
