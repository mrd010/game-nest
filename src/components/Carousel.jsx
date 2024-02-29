import PropTypes from 'prop-types';
const Carousel = ({ title, children }) => {
  return (
    <div className="grid grid-cols-2 grid-row-2 gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div>
        <button>
          <span className="material-symbols-rounded">arrow_back</span>
        </button>
        <button>
          <span className="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
      {children && (
        <div className="grid grid-flow-col auto-cols-[300px] gap-5 overflow-x-auto scroll-smooth col-span-2">
          {children}
        </div>
      )}
    </div>
  );
};
Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
};
export default Carousel;
