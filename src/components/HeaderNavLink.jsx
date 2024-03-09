import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const HeaderNavLink = ({ text, link, children }) => {
  const [opened, setOpened] = useState(false);
  const timer = useRef(null);
  // links in header of page which navigates to different main pages of app
  return (
    <div
      className="relative grid items-center"
      onMouseLeave={() => {
        clearTimeout(timer.current);
        setOpened(false);
      }}
    >
      <Link
        to={link}
        className={`font-semibold py-2 px-4 rounded-md transition-colors hover:bg-gray-50 hover:text-gray-950 ${opened ? 'bg-gray-50 text-gray-950' : 'bg-transparent text-gray-50'}`}
        onMouseEnter={() => {
          timer.current = setTimeout(() => {
            setOpened(true);
          }, 300);
        }}
      >
        {text}
      </Link>
      {children && (
        <div
          className={`absolute z-10 w-max p-2 text-gray-800 bg-gray-100 shadow-2xl rounded-b border-x-[3px] top-full left-0 grid grid-flow-row transition-opacity ${opened ? 'opacity-100' : 'opacity-0'}`}
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
