import PropTypes from 'prop-types';
const PageNavNumbers = ({ currentPageNumber, totalPageNumbers, onSelect }) => {
  // component which shows currently active page

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      {
        // create numbered buttons from 1 to number of pages
        [...Array(totalPageNumbers)].map((x, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`size-10 text-lg font-bold bg-gray-900 rounded-full transition-opacity duration-75 ${index === currentPageNumber ? 'bg-yellow-300 text-gray-900' : 'text-gray-50 opacity-20 hover:opacity-75'}`}
          >
            {index + 1}
          </button>
        ))
      }
    </div>
  );
};
PageNavNumbers.propTypes = {
  currentPageNumber: PropTypes.number,
  totalPageNumbers: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default PageNavNumbers;
