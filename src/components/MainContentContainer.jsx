import PropTypes from 'prop-types';
const MainContentContainer = ({ className = '', children }) => {
  return (
    <div
      className={`px-10 xl:px-6 xs:px-4 relative py-20 lg:py-8 lg:bg-transparent my-2 rounded-md bg-zinc-100 space-y-16 lg:space-y-10 md:space-y-4 ${className}`}
    >
      {children}
    </div>
  );
};
MainContentContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
export default MainContentContainer;
