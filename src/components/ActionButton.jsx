import PropTypes from 'prop-types';
const ActionButton = ({ isDisabled, onClick, children, theme = 'light' }) => {
  // custom button for actions like scroll left and right
  return (
    <button
      className={`rounded-full select-none ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-900/50'} [&:hover:not(:disabled)]:bg-gray-900 [&:hover:not(:disabled)]:text-gray-50 hover:opacity-100 size-9 place-items-center grid transition-colors disabled:opacity-25`}
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
  theme: PropTypes.oneOf(['dark', 'light']),
};
export default ActionButton;
