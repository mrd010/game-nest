import { Link } from 'react-router-dom';
import HeaderNavLink from './HeaderNavLink';
import HeaderProfile from './HeaderProfile';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  return (
    <header>
      <div>
        <h1>
          <Link>
            Game<span>Nest</span>
          </Link>
        </h1>
      </div>
      <nav>
        <HeaderNavLink text="Home" link="home"></HeaderNavLink>
        <HeaderNavLink text="Games" link="games"></HeaderNavLink>
      </nav>
      <div>
        <HeaderSearch></HeaderSearch>
      </div>
      <div>
        <HeaderProfile></HeaderProfile>
      </div>
    </header>
  );
};

export default Header;
