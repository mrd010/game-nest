import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { toKebabCase } from '../services/utilities';
const CategoriesSideNav = ({ categoryList, subCategories }) => {
  return (
    <nav className={`w-[300px]`}>
      <ul className="divide-y-2  sticky top-4">
        {/* main nav link (default page) */}
        <li className={`text-xl px-6 hover:text-yellow-600  `}>
          <NavLink
            to="/games/new releases"
            className={`inline-block w-full py-4 transition-all font-bold`}
          >
            New Releases
          </NavLink>
        </li>
        {/* categories nav link */}
        {categoryList.map((category) => (
          <li key={category}>
            <NavLink
              to={`/browse/${category}`}
              className={({ isActive, isPending, isTransitioning }) =>
                `text-lg w-full px-6 inline-block py-2 transition-[padding] text-gray-800/75 hover:bg-gradient-to-r from-transparent to-transparent via-10% ${isActive ? 'via-yellow-200/90 bg-gradient-to-r font-bold peer py-4 is-active' : isPending || isTransitioning ? 'via-gray-400/30 bg-gradient-to-r font-bold' : 'via-gray-500/10'}`
              }
            >
              {category}
            </NavLink>
            {subCategories && (
              <nav className="flex-col hidden flex-nowrap peer-[.is-active]:flex pl-6">
                {subCategories.map((subCat) => (
                  <a
                    className="py-2 px-4 text-sm text-gray-800/80 rounded-sm font-bold opacity-50 hover:opacity-100 hover:border-l-4 border-yellow-300/80"
                    key={subCat}
                    href={`#${toKebabCase(subCat)}`}
                  >
                    {subCat}
                  </a>
                ))}
              </nav>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
CategoriesSideNav.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  subCategories: PropTypes.arrayOf(PropTypes.string),
};
export default CategoriesSideNav;
