import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const CategoriesSideNav = ({ categoryList }) => {
  return (
    <nav className={`w-[300px]`}>
      <ul className="divide-y-2  sticky top-0">
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
          <li key={category.id}>
            <NavLink
              to={category.id}
              className={({ isActive, isPending, isTransitioning }) =>
                `text-lg w-full px-6 inline-block py-1 transition-[padding] text-gray-800/75 hover:bg-gradient-to-r from-transparent to-transparent via-15% ${isActive ? 'via-yellow-300/80 bg-gradient-to-r font-bold pl-10' : isPending || isTransitioning ? 'via-gray-400/30 bg-gradient-to-r font-bold' : 'via-gray-500/10'}`
              }
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
