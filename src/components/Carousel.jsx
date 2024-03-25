import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import { useEffect, useRef, useState } from 'react';
import HomeSectionTitle from './HomeSectionTitle';
import { useOutletContext } from 'react-router-dom';

const Carousel = ({
  title,
  itemWidth,
  steps,
  children,
  disabledSidesBlur = false,
  theme = 'light',
}) => {
  // carousel component which scrolls horizontally through its children with left and right buttons

  // item currently is showing in left of carousel
  const [currentPosition, setCurrentPosition] = useState(0);
  const carousel = useRef(null);

  // device type
  const { isHandheldDevice } = useOutletContext();

  // real children count of carousel
  const nodeChildrenCount = children.filter((child) => child !== null).length;

  const handleScrollChange = (direction) => {
    // when pressed arrow buttons change position between 0 and max items - steps -1
    // note: steps is number of items scrolling with each scroll
    setCurrentPosition((p) => Math.min(Math.max(0, p + direction), nodeChildrenCount - steps - 1));
  };

  useEffect(() => {
    // after set of position scroll container to that position
    carousel.current.scrollLeft = currentPosition * itemWidth;
  }, [itemWidth, currentPosition]);
  return (
    <div
      className={`grid grid-cols-[1fr_auto] lg:grid-cols-1 grid-row-2 relative gap-x-5 gap-y-5 lg:gap-x-0 ${!isHandheldDevice && !disabledSidesBlur && currentPosition > 0 ? 'before:content-[" "] before:absolute before:bottom-2 before:left-0 before:z-50 before:h-[calc(100%_-_60px)] before:w-10 before:bg-gradient-to-l before:from-transparent before:to-gray-50 before:to-80%' : ''}${!isHandheldDevice && !disabledSidesBlur && currentPosition < nodeChildrenCount - steps - 1 ? 'after:content-[" "] after:w-8 after:right-0 after:bottom-2 after:h-[calc(100%_-_60px)] after:bg-gradient-to-r after:to-80% after:from-transparent after:to-gray-50 after:absolute after:z-50' : ''}`}
    >
      <HomeSectionTitle>{title}</HomeSectionTitle>
      {!isHandheldDevice && (
        <div className="flex flex-row gap-3 justify-self-end self-end">
          <ActionButton
            isDisabled={currentPosition <= 0}
            onClick={() => handleScrollChange(-steps)}
            theme={theme}
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </ActionButton>
          <ActionButton
            isDisabled={currentPosition >= nodeChildrenCount - steps - 1}
            onClick={() => handleScrollChange(steps)}
            theme={theme}
          >
            <span className="material-symbols-rounded">arrow_forward</span>
          </ActionButton>
        </div>
      )}
      {children && (
        <div
          className="grid grid-flow-col auto-cols-max scroll-smooth col-span-2 overflow-hidden lg:overflow-x-auto pb-4 sm:pb-0 carousel"
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
  steps: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  disabledSidesBlur: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
};
export default Carousel;
