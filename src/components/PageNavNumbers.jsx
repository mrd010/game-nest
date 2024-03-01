import PropTypes from 'prop-types';
const PageNavNumbers = ({ currentPageNumber, totalPageNumbers, onSelect }) => {
  console.log(totalPageNumbers);
  return (
    <div>
      {[...Array(totalPageNumbers)].map((x, index) => (
        <button key={index} onClick={() => onSelect(index)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};
PageNavNumbers.propTypes = {
  currentPageNumber: PropTypes.number,
  totalPageNumbers: PropTypes.number.isRequired,
};
export default PageNavNumbers;
