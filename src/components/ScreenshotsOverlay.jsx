import PropTypes from 'prop-types';
import ModalOverlayContainer from './ModalOverlayContainer';
import { getCleanUrl } from '../services/utilities';
import CarouselItemsIndicator from './CarouselItemsIndicator';
import { useDrag } from '@use-gesture/react';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
const ScreenshotsOverlay = ({
  isOpen,
  activeImageUrl,
  onClose,
  onNext,
  onPrev,
  numberOfImages,
  currentImageIndex,
}) => {
  const { isHandheldDevice } = useOutletContext();
  // for show new image after old one vanishes
  const [show, setShow] = useState(false);

  const imageElement = useRef(null);
  // next image transition
  const handleNextImageTransition = () => {
    // first get out of screen old image
    if (imageElement.current) {
      imageElement.current.classList.add('opacity-0');
      if (isHandheldDevice) {
        imageElement.current.classList.add('-translate-x-1/4');
      } else {
        imageElement.current.classList.add('translate-x-1/4');
      }
    }
    // then go to next image
    setTimeout(() => {
      setShow(false);
      onNext();
    }, 300);
  };

  // prev image transition
  const handlePrevImageTransition = () => {
    // first get out of screen old image
    if (imageElement.current) {
      imageElement.current.classList.add('opacity-0');
      if (isHandheldDevice) {
        imageElement.current.classList.add('translate-x-1/4');
      } else {
        imageElement.current.classList.add('-translate-x-1/4');
      }
    }
    // then go to next image
    setTimeout(() => {
      setShow(false);
      onPrev();
    }, 300);
  };

  // after get new image and vanish old one show new one
  const timerId = useRef(null);
  useEffect(() => {
    timerId.current = setTimeout(() => {
      setShow(true);
    }, 200);
    () => clearTimeout(timerId.current);
  }, [currentImageIndex]);

  // change image based on direction
  const handleChangeImage = (direction) => {
    if (direction === -1) {
      handlePrevImageTransition();
    } else if (direction === 1) {
      handleNextImageTransition();
    }
  };

  // enable gesture on mobile devices
  const bind = useDrag(
    ({ swipe: [dx] }) => {
      handleChangeImage(-1 * dx);
    },
    { enabled: isHandheldDevice }
  );

  return (
    <ModalOverlayContainer isOpen={isOpen} onClose={onClose}>
      {activeImageUrl && (
        <div {...bind()} className="absolute w-3/4 lg:w-[90%] grid content-center touch-none">
          {/* main frame */}
          <img
            ref={imageElement}
            src={getCleanUrl(activeImageUrl)}
            alt="Current Showing Screenshot"
            key={activeImageUrl}
            width={1920}
            height={1080}
            className={`rounded transition-all duration-300  ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          ></img>
          {/* controls */}
          {/* previous image */}
          {!isHandheldDevice && (
            <button
              onClick={handlePrevImageTransition}
              className="scale-[250%] absolute top-1/2 right-full opacity-60 transition-opacity hover:opacity-100 sm:opacity-100 mx-6 sm:mx-0 grid place-items-center -translate-y-1/2 sm:scale-150 sm:right-auto sm:left-5"
            >
              <span className="material-symbols-rounded translate-x-[3px]">arrow_back_ios</span>
            </button>
          )}
          {/* next image */}
          {!isHandheldDevice && (
            <button
              onClick={handleNextImageTransition}
              className="scale-[250%] absolute top-1/2 left-full opacity-60 transition-opacity hover:opacity-100 sm:opacity-100 mx-6 sm:mx-0 grid place-items-center -translate-y-1/2 sm:scale-150  sm:left-auto sm:right-5"
            >
              <span className="material-symbols-rounded translate-x-[3px]">arrow_forward_ios</span>
            </button>
          )}
          {/* images index indicator for mobile */}
          <div className="invert py-4">
            <CarouselItemsIndicator
              count={numberOfImages}
              current={currentImageIndex}
            ></CarouselItemsIndicator>
          </div>
        </div>
      )}
    </ModalOverlayContainer>
  );
};
ScreenshotsOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeImageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  numberOfImages: PropTypes.number.isRequired,
  currentImageIndex: PropTypes.number,
};
export default ScreenshotsOverlay;
