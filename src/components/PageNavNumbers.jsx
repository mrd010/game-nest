import PropTypes from 'prop-types';
const PageNavNumbers = ({ currentPageNumber, totalPageNumbers, onSelect }) => {
  console.log(totalPageNumbers);
  return (
    <div className="flex flex-row flex-nowrap gap-1">
      {[...Array(totalPageNumbers)].map((x, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`border-[1px] h-8 w-16 font-bold rounded-[4px] hover:text-gray-900 transition-colors border-gray-700/80 ${index === currentPageNumber ? 'bg-yellow-400 text-gray-900' : 'text-gray-900/60'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
PageNavNumbers.propTypes = {
  currentPageNumber: PropTypes.number,
  totalPageNumbers: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default PageNavNumbers;
