import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
const PageNavNumbers = ({ currentPageNumber, totalPageNumbers, onSelect }) => {
  // component which shows currently active page

  return (
    <div className="flex flex-row flex-nowrap gap-2 items-center">
      {/* previous button */}
      <div className="scale-90 mx-4">
        <ActionButton
          onClick={() => {
            if (currentPageNumber > 0) {
              onSelect(currentPageNumber - 1);
            }
          }}
          isDisabled={currentPageNumber === 0}
        >
          <span className="material-symbols-rounded">navigate_before</span>
        </ActionButton>
      </div>
      {
        // create numbered buttons from 1 to number of pages
        [...Array(totalPageNumbers)].map((x, index) => {
          if (index >= currentPageNumber - 2 && index <= currentPageNumber + 2) {
            return (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className={`size-8 font-bold rounded-full select-none transition-all ${index === currentPageNumber ? 'bg-yellow-300 text-gray-900 scale-125' : 'text-gray-50 bg-gray-900 opacity-20 hover:opacity-75'}`}
              >
                {index + 1}
              </button>
            );
          }
          if (index === currentPageNumber - 3 || index === currentPageNumber + 3) {
            return (
              <span key={index} className="material-symbols-rounded select-none text-gray-600/75">
                more_horiz
              </span>
            );
          }
        })
      }
      {/* next button */}
      <div className="scale-90 mx-4">
        <ActionButton
          onClick={() => {
            if (currentPageNumber < totalPageNumbers - 1) {
              onSelect(currentPageNumber + 1);
            }
          }}
          isDisabled={currentPageNumber === totalPageNumbers - 1}
        >
          <span className="material-symbols-rounded">navigate_next</span>
        </ActionButton>
      </div>
    </div>
  );
};
PageNavNumbers.propTypes = {
  currentPageNumber: PropTypes.number,
  totalPageNumbers: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default PageNavNumbers;
