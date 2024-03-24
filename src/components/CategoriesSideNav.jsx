import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const CategoriesSideNav = ({ categoryList }) => {
  return (
    <nav
      className={`w-[300px] xl:w-max lg:w-full lg:sticky lg:py-2 lg:border-b-2 lg:bg-gray-50 lg:top-0 lg:z-[60] `}
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
          <li key={category}>
            <NavLink
              to={`/browse/${category}`}
              className={({ isActive, isPending, isTransitioning }) =>
                `text-lg lg:text-base lg:rounded-full lg:border-[2px] w-full px-6 inline-block py-2 lg:py-1 transition-[padding] lg:transition-none text-gray-800/75 hover:bg-gradient-to-r from-transparent to-transparent via-10% lg:text-nowrap ${isActive ? 'via-yellow-200/90 lg:via-yellow-300/85 bg-gradient-to-r font-bold peer py-4 lg:py-1 is-active lg:bg-yellow-400 lg:border-amber-400/80' : isPending || isTransitioning ? 'via-gray-400/30 bg-gradient-to-r font-bold' : 'via-gray-500/10'}`
              }
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
CategoriesSideNav.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default CategoriesSideNav;
