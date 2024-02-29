import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import { useEffect, useRef, useState } from 'react';

const Carousel = ({ title, itemWidth, children }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const carousel = useRef(null);
  const handleScrollChange = (direction) => {
    setCurrentPosition((p) => Math.min(Math.max(0, p + direction), children.length - 3));
  };

  console.log(currentPosition);

  useEffect(() => {
    carousel.current.scrollLeft = currentPosition * (itemWidth + 16);
  }, [itemWidth, currentPosition]);
  return (
    <div className="grid grid-cols-[1fr_auto] grid-row-2 gap-5">
      <h2 className="text-2xl font-bold border-b-[1px] pb-2 border-gray-900/50">{title}</h2>
      <div className="flex flex-row gap-2 justify-self-end self-end">
        <ActionButton isDisabled={currentPosition <= 0} onClick={() => handleScrollChange(-3)}>
          <span className="material-symbols-rounded">arrow_back</span>
        </ActionButton>
        <ActionButton
          isDisabled={currentPosition >= children.length - 3}
          onClick={() => handleScrollChange(3)}
        >
          <span className="material-symbols-rounded">arrow_forward</span>
        </ActionButton>
      </div>
      {children && (
        <div
          className="grid grid-flow-col auto-cols-max gap-4 scroll-smooth col-span-2 overflow-x-auto pb-2  carousel"
          ref={carousel}
        >
          {children}
        </div>
      )}
    </div>
  );
};
Carousel.propTypes = {
  title: PropTypes.string,
  itemWidth: PropTypes.number.isRequired,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
};
export default Carousel;
