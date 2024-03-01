import PropTypes from 'prop-types';
const TabButton = ({ onSelect, children }) => {
  return (
    <button onClick={onSelect} className="">
      {children}
    </button>
  );
};
TabButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default TabButton;
