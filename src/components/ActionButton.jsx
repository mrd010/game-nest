import PropTypes from 'prop-types';
const ActionButton = ({ children }) => {
  return (
    <button className="rounded-full bg-gray-200 hover:bg-gray-800 hover:text-gray-50 hover:opacity-100 size-8 place-items-center grid transition-colors">
      {children}
    </button>
  );
};
ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ActionButton;
