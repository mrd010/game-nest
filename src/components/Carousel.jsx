import PropTypes from 'prop-types';
const Carousel = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <button>
        <span className="material-symbols-outlined">west</span>
      </button>
      <button>
        <span className="material-symbols-outlined">east</span>
      </button>
      <div>{children}</div>
    </div>
  );
};
Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
};
export default Carousel;
