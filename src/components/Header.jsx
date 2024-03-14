import { Link } from 'react-router-dom';
import HeaderNavLink from './HeaderNavLink';
import HeaderProfile from './HeaderProfile';
import HeaderSearch from './HeaderSearch';
import PropTypes from 'prop-types';

const Header = ({ categories }) => {
  // top header of app
  return (
    <header className="bg-gray-950 text-gray-50 min-w-min">
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center content-center mx-auto w-[1280px] justify-between gap-8">
        {/* header title - app title */}
        <div className="mr-10 p-4">
          <h1>
            <Link className="text-4xl font-extrabold">
              Game<span className="text-yellow-400">Nest</span>
            </Link>
          </h1>
        </div>
        {/* app nav menu */}
        <nav className="grid grid-cols-3 h-full">
          <HeaderNavLink text="Home" link="home"></HeaderNavLink>
          <HeaderNavLink text="Games" link="games">
            {
              // sub menu - appears on hover
              categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/browse/${cat}`}
                  className="text-gray-800/85 p-1 relative font-light text-lg hover:pl-4 transition-[padding] hover:font-bold after:content-[' '] after:w-full after:h-1 after:bg-yellow-400 after:absolute after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-75 after:transition-transform after:origin-left after:scale-y-50 after:duration-200"
                >
                  {cat}
                </Link>
              ))
            }
          </HeaderNavLink>
          <HeaderNavLink text="Videos" link={'/videos'}></HeaderNavLink>
        </nav>
        {/* search bar */}
        <div>
          <HeaderSearch></HeaderSearch>
        </div>
        {/* profile section - its login button or profile icon */}
        <div>
          <HeaderProfile isLoggedIn={false}></HeaderProfile>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
