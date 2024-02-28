import { Link } from 'react-router-dom';
import HeaderNavLink from './HeaderNavLink';
import HeaderProfile from './HeaderProfile';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  return (
    <header className="bg-gray-950 text-gray-50">
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center p-3 mx-auto w-[1280px] justify-between gap-8">
        <div className="mr-10">
          <h1>
            <Link className="text-4xl font-extrabold">
              Game<span className="text-yellow-400">Nest</span>
            </Link>
          </h1>
        </div>
        <nav className="grid grid-cols-3 items-center">
          <HeaderNavLink text="Home" link="home"></HeaderNavLink>
          <HeaderNavLink text="Games" link="games"></HeaderNavLink>
        </nav>
        <div>
          <HeaderSearch></HeaderSearch>
        </div>
        <div>
          <HeaderProfile></HeaderProfile>
        </div>
      </div>
    </header>
  );
};

export default Header;
