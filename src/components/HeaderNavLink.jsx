import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const HeaderNavLink = ({ text, link, children }) => {
  const [opened, setOpened] = useState(false);
  const timer = useRef(null);

  const handleShowMenu = () => {
    timer.current = setTimeout(() => {
      setOpened(true);
    }, 500);
  };

  const handleCloseMenu = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setOpened(false);
  };

  // links in header of page which navigates to different main pages of app
  return (
    <div className="relative grid items-center pr-8" onMouseLeave={handleCloseMenu}>
      <Link
        to={link}
        className={`font-semibold text-lg py-2 px-4 text-center rounded-md transition-colors hover:bg-gray-50 hover:text-gray-950 ${opened ? 'bg-gray-50 text-gray-950' : 'bg-transparent text-gray-50'}`}
        onMouseEnter={handleShowMenu}
        onClick={handleCloseMenu}
      >
        {text}
      </Link>
      {children && opened && (
        <div
          className={`absolute z-10 w-max text-gray-800 bg-gray-100 shadow-2xl rounded-b border-x-[3px] top-full -left-5 grid grid-rows-10 gap-x-10 p-6 grid-flow-col auto-cols-[200px]`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default HeaderNavLink;
