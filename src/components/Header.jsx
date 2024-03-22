import { Link } from 'react-router-dom';
import HeaderNavLink from './HeaderNavLink';
import HeaderSearch from './HeaderSearch';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';

const Header = ({ categories }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  // a query to check if device is not desktop
  const isHandheldDevice = useMediaQuery('only screen and (max-width:1023px)');

  const handleOpenMenu = () => {
    setMenuIsOpen(true);
  };
  const handleCloseMenu = () => {
    setMenuIsOpen(false);
  };

  // top header of app
  return (
    <header className="bg-gray-950 text-gray-50 min-w-min z-[100]">
      <div className="grid grid-cols-[auto_auto_1fr] items-center content-center mx-auto w-[1280px] justify-between gap-8 xl:w-full">
        {/* hamburger button for handheld devices */}
        {isHandheldDevice && (
          <button onClick={handleOpenMenu} className="scale-150 px-4 grid place-items-center">
            <span className="material-symbols-rounded">menu</span>
          </button>
        )}
        {/* header title - app title */}
        <div className="mr-10 p-4">
          <h1>
            <Link className="text-4xl font-extrabold" to="/home">
              Game<span className="text-yellow-400">Nest</span>
            </Link>
          </h1>
        </div>
        {/* app nav menu */}
        <nav
          className={`grid grid-cols-3 h-full lg:fixed lg:top-0 lg:left-0 lg:h-screen w-80 lg:bg-gray-900 lg:flex lg:flex-col lg:transition-all ${!menuIsOpen ? ' lg:-translate-x-96 lg:opacity-0' : 'lg:translate-x-0 lg:opacity-100'}`}
        >
          {/* x button */}
          {isHandheldDevice && (
            <button
              className="self-end m-4 scale-150 grid place-items-center"
              onClick={handleCloseMenu}
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          )}
          <HeaderNavLink
            text="Home"
            link="/home"
            isHandheldDevice={isHandheldDevice}
          ></HeaderNavLink>
          <HeaderNavLink text="Games" link="/browse" isHandheldDevice={isHandheldDevice}>
            {
              // sub menu - appears on hover
              categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/browse/${cat}`}
                  className="text-gray-800/85 lg:text-gray-100/85 p-1 lg:pr-10 relative font-light text-lg hover:pl-4 transition-[padding] hover:font-bold after:content-[' '] after:w-full after:h-1 after:bg-yellow-400 after:absolute after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-75 after:transition-transform after:origin-left after:scale-y-50 after:duration-200"
                >
                  {cat}
                </Link>
              ))
            }
          </HeaderNavLink>
          <HeaderNavLink
            text="Videos"
            link="/videos"
            isHandheldDevice={isHandheldDevice}
          ></HeaderNavLink>
        </nav>

        {/* search bar */}
        <div className="px-2">
          <HeaderSearch></HeaderSearch>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
