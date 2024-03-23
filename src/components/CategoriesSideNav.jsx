import PropTypes from 'prop-types';
import { NavLink, useOutletContext } from 'react-router-dom';
import { toKebabCase } from '../services/utilities';
const CategoriesSideNav = ({ categoryList, subCategories }) => {
  const isHandheldDevice = useOutletContext();
  return (
    <nav
      className={`w-[300px] xl:w-max lg:w-full lg:sticky lg:py-4 lg:border-b-2 lg:bg-gray-50 lg:top-0 lg:z-[60] `}
    >
      <ul className="divide-y-2 lg:divide-none sticky top-4 lg:flex lg:flex-row lg:no-scrollbar lg:overflow-x-auto lg:gap-2">
        {/* main nav link (default page) */}
        <li className={`text-xl px-6 lg:px-0 hover:text-yellow-600`}>
          <NavLink
            to="/browse/new releases"
            className={`inline-block w-full py-4 transition-all font-bold lg:text-gray-800/75 lg:rounded-full lg:py-1
            lg:transition-none lg:text-nowrap lg:px-6`}
          >
            New Releases
          </NavLink>
        </li>
        {/* categories nav link */}
        {categoryList.map((category) => (
          <li key={category} className="">
            <NavLink
              to={`/browse/${category}`}
              className={({ isActive, isPending, isTransitioning }) =>
                `text-lg lg:text-base lg:rounded-full lg:border-[2px] w-full px-6 inline-block py-2 lg:py-1 transition-[padding] lg:transition-none text-gray-800/75 hover:bg-gradient-to-r from-transparent to-transparent via-10% lg:text-nowrap ${isActive ? 'via-yellow-200/90 lg:via-yellow-300/85 bg-gradient-to-r font-bold peer py-4 lg:py-2 is-active lg:bg-yellow-400 lg:border-amber-400/80' : isPending || isTransitioning ? 'via-gray-400/30 bg-gradient-to-r font-bold' : 'via-gray-500/10'}`
              }
            >
              {category}
            </NavLink>
            {!isHandheldDevice && subCategories && (
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
