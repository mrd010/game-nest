import PropTypes from 'prop-types';
const MainContentContainer = ({ children }) => {
  return (
    <div className="px-10 relative py-20 my-2 rounded-md bg-zinc-100 space-y-16">{children}</div>
  );
};
MainContentContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
export default MainContentContainer;
