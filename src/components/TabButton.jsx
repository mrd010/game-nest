import PropTypes from 'prop-types';
const TabButton = ({ onSelect, isSelected, children }) => {
  return (
    <button
      onClick={onSelect}
      className={`px-1 py-3 w-36 opacity-40 transition-opacity ${isSelected ? 'opacity-100 font-bold' : ''}`}
    >
      {children}
    </button>
  );
};
TabButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
export default TabButton;
