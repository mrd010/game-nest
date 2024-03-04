import PropTypes from 'prop-types';
const ErrorOverlay = ({ onDismiss, onRefresh }) => {
  return (
    <div className="bg-yellow-400 p-2 rounded-md grid grid-cols-2 relative">
      <span className="material-symbols-rounded absolute top-3 left-3">error</span>
      <p className="col-span-2 text-center my-2">An Error has occurred while getting data!</p>
      <button
        onClick={onDismiss}
        className="drop-shadow-md hover:text-gray-50 p-1 focus:text-gray-50 font-bold text-lg"
      >
        Dismiss
      </button>
      <button
        onClick={onRefresh}
        className="drop-shadow-md hover:text-gray-50 p-1 focus:text-gray-50 font-bold text-lg"
      >
        Refresh
      </button>
    </div>
  );
};
ErrorOverlay.propTypes = {
  onDismiss: PropTypes.func,
  onRefresh: PropTypes.func,
};
export default ErrorOverlay;
