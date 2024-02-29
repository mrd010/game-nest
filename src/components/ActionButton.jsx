import PropTypes from 'prop-types';
const ActionButton = ({ isDisabled, onClick, children }) => {
  return (
    <button
      className="rounded-full bg-gray-200 [&:hover:not(:disabled)]:bg-gray-800 [&:hover:not(:disabled)]:text-gray-50 hover:opacity-100 size-8 place-items-center grid transition-colors disabled:opacity-25 transition-opacity"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
ActionButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ActionButton;
