import HeaderNavLink from './HeaderNavLink';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  return (
    <header>
      <div>
        <h1>
          Game<span>Nest</span>
        </h1>
      </div>
      <nav>
        <HeaderNavLink text="Home" link="home"></HeaderNavLink>
        <HeaderNavLink text="Games" link="games"></HeaderNavLink>
      </nav>
      <div>
        <HeaderSearch></HeaderSearch>
      </div>
    </header>
  );
};

export default Header;
