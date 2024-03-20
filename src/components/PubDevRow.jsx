import PropTypes from 'prop-types';
const PubDevRow = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const Title = ({ children }) => {
  return <span className="font-bold">{children}</span>;
};

const Value = ({ children, className = 'text-gray-600/95 text-sm' }) => {
  return <span className={`${className}`}>{children}</span>;
};

const Values = ({ values, className }) => {
  return (
    <div className="flex flex-row gap-1">
      {values.map((value, index) => (
        <Value key={index} className={className}>
          {value}
          {values.length > 1 && index < values.length - 1 ? ',' : ''}
        </Value>
      ))}
    </div>
  );
};

PubDevRow.Title = Title;
PubDevRow.Value = Value;
PubDevRow.Values = Values;

PubDevRow.propTypes = {
  children: PropTypes.node.isRequired,
};
Title.propTypes = {
  children: PropTypes.node.isRequired,
};
Value.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Values.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default PubDevRow;
