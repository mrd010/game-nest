import PropTypes from 'prop-types';
const PubDevRow = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const Title = ({ children }) => {
  return <span className="font-bold">{children}</span>;
};

const Value = ({ children }) => {
  return <span className="text-sm text-gray-500/90">{children}</span>;
};

PubDevRow.Title = Title;
PubDevRow.Value = Value;

PubDevRow.propTypes = {
  children: PropTypes.node.isRequired,
};
Title.propTypes = {
  children: PropTypes.node.isRequired,
};
Value.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PubDevRow;
