import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const HeaderNavLink = ({ text, link, children, isHandheldDevice }) => {
  const [opened, setOpened] = useState(false);

  // a timer for delaying menu open
  const timer = useRef(null);

  const handleShowMenu = () => {
    // delay opening menu
    timer.current = setTimeout(() => {
      setOpened(true);
    }, 500);
  };

  const handleCloseMenu = () => {
    // if a timer set to open menu after a a while, first clear it and then close menu
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setOpened(false);
  };

  // links in header of page which navigates to different main pages of app
  return (
    <div className="relative grid items-center pr-8 lg:p-0" onMouseLeave={handleCloseMenu}>
      {/* main link */}
      <Link
        to={link}
        className={`font-semibold text-lg lg:text-4xl py-2 lg:py-6 px-4 lg:px-20 text-center rounded-md transition-colors hover:bg-gray-50 hover:text-gray-950 ${opened ? 'bg-gray-50 text-gray-950' : 'bg-transparent text-gray-50'}`}
        onMouseEnter={() => {
          if (!isHandheldDevice) {
            handleShowMenu();
          }
        }}
        onClick={() => {
          if (!isHandheldDevice) {
            handleCloseMenu();
          }
        }}
      >
        {text}
      </Link>
      {/* sub menu - items come from parent*/}
      {children && opened && !isHandheldDevice && (
        <div
          className={`absolute lg:static z-20 w-max lg:w-full text-gray-800 lg:text-gray-50 bg-gray-100 lg:bg-gray-800 shadow-2xl lg:shadow-none rounded-b lg rounded-none border-x-[3px] lg:border-none top-full -left-5 grid gap-x-10 p-6 pb-10 grid-flow-col auto-cols-[200px] lg:flex lg:flex-col lg:py-2 px-6`}
          style={{ gridTemplateRows: `repeat(${Math.ceil(children.length / 2)},minmax(0,1fr))` }}
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
  isHandheldDevice: PropTypes.bool,
};

export default HeaderNavLink;
