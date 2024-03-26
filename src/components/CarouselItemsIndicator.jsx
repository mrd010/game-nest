import PropTypes from 'prop-types';
const CarouselItemsIndicator = ({ count, current }) => {
  return (
    <div className="flex flex-row flex-nowrap gap-2 justify-center">
      {[...Array(count)].map((v, index) => (
        <div key={index} className={`size-2 rounded-full bg-gray-900/15`}>
          <div
            className={`size-full rounded-full z-10 transition-transform bg-gray-900/80 duration-300 ${current === index ? 'scale-125' : 'scale-0'}`}
          ></div>
        </div>
      ))}
    </div>
  );
};
CarouselItemsIndicator.propTypes = {
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};
export default CarouselItemsIndicator;
