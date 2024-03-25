import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import { useEffect, useRef, useState } from 'react';
import HomeSectionTitle from './HomeSectionTitle';
import { useOutletContext } from 'react-router-dom';
import { useDrag } from '@use-gesture/react';

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
  const { isMobile } = useOutletContext();

  // real children count of carousel
  const nodeChildrenCount = children.filter((child) => child !== null).length;

  const handleScrollChange = (direction) => {
    if (direction === 0) {
      return;
    }
    // when pressed arrow buttons change position between 0 and max items - steps -1
    // note: steps is number of items scrolling with each scroll
    if (isMobile) {
      setCurrentPosition((p) => Math.min(Math.max(0, p + direction), nodeChildrenCount - 1));
    } else {
      setCurrentPosition((p) =>
        Math.min(Math.max(0, p + direction), nodeChildrenCount - steps - 1)
      );
    }
  };

  useEffect(() => {
    // after set of position scroll container to that position
    carousel.current.scrollLeft = currentPosition * itemWidth;
  }, [itemWidth, currentPosition]);

  // gestures for mobile devices
  useDrag(
    ({ swipe: [sx] }) => {
      console.log(sx);
      handleScrollChange(-sx);
    },
    {
      target: carousel,
      enabled: isMobile,
      axis: 'x',
    }
  );

  return (
    <div
      className={`grid grid-cols-[1fr_auto] md:grid-cols-1 relative gap-x-5 gap-y-5 md:gap-x-0 ${!disabledSidesBlur && currentPosition > 0 ? 'before:content-[" "] before:absolute before:bottom-2 before:left-0 before:z-50 before:h-[calc(100%_-_60px)] before:w-10 before:bg-gradient-to-l before:from-transparent before:to-gray-50 before:to-80%' : ''}${!disabledSidesBlur && currentPosition < nodeChildrenCount - steps - 1 ? 'after:content-[" "] after:w-8 after:right-0 after:bottom-2 after:h-[calc(100%_-_60px)] after:bg-gradient-to-r after:to-80% after:from-transparent after:to-gray-50 after:absolute after:z-50' : ''}`}
    >
      <HomeSectionTitle>{title}</HomeSectionTitle>
      {!isMobile && (
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
        <>
          <div
            className="grid grid-flow-col auto-cols-max scroll-smooth col-span-2 overflow-hidden pb-4 md:pb-0 carousel touch-none"
            ref={carousel}
          >
            {children}
          </div>
          <div className="flex flex-row flex-nowrap gap-2 justify-center">
            {[...Array(nodeChildrenCount)].map((v, index) => (
              <div
                key={index}
                className={`size-2  rounded-full bg-gray-900 transition-opacity ${currentPosition === index ? 'opacity-100' : ' opacity-25'}`}
              ></div>
            ))}
          </div>
        </>
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
