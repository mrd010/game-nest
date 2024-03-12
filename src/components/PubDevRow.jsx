import PropTypes from 'prop-types';
const PubDevRow = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const Title = ({ children }) => {
  return <span className="font-bold">{children}</span>;
};

const Value = ({ children }) => {
  return <span className="text-sm text-gray-600/95">{children}</span>;
};

const Values = ({ values }) => {
  return (
    <div className="flex flex-row gap-1">
      {values.map((value, index) => (
        <Value key={index}>
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
  children: PropTypes.node.isRequired,
};
Values.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PubDevRow;
