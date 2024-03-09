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
        <div className="mr-10 p-4">
          <h1>
            <Link className="text-4xl font-extrabold">
              Game<span className="text-yellow-400">Nest</span>
            </Link>
          </h1>
        </div>
        <nav className="grid grid-cols-3 gap-5 h-full">
          <HeaderNavLink text="Home" link="home"></HeaderNavLink>
          <HeaderNavLink text="Games" link="games">
            {categories.map((cat) =>
              cat.id === cat.name ? (
                <Link key={cat.id} to={`/games/${cat.id}`}>
                  {cat.name}
                </Link>
              ) : null
            )}
          </HeaderNavLink>
        </nav>
        <div>
          <HeaderSearch></HeaderSearch>
        </div>
        <div>
          <HeaderProfile isLoggedIn={false}></HeaderProfile>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.exact({ id: PropTypes.string, name: PropTypes.string }))
    .isRequired,
};

export default Header;
