import PropTypes from 'prop-types';
const CarouselItemsIndicator = ({ count, current }) => {
  return (
    <div className="flex flex-row flex-nowrap gap-2 justify-center">
      {[...Array(count)].map((v, index) => (
        <div
          key={index}
          className={`size-2 rounded-full bg-gray-900 transition-opacity ${current === index ? 'opacity-100' : ' opacity-25'}`}
        ></div>
      ))}
    </div>
  );
};
CarouselItemsIndicator.propTypes = {
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};
export default CarouselItemsIndicator;
