import PropTypes from 'prop-types';
import ModalOverlayContainer from './ModalOverlayContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCleanUrl } from '../services/utilities';
import CarouselItemsIndicator from './CarouselItemsIndicator';
const ScreenshotsOverlay = ({
  isOpen,
  activeImageUrl,
  onClose,
  onNext,
  onPrev,
  numberOfImages,
  currentImageIndex,
}) => {
  return (
    <ModalOverlayContainer isOpen={isOpen} onClose={onClose}>
      {activeImageUrl && (
        <div className="absolute w-3/4 sm:w-[90%] grid content-center">
          {/* main frame */}
          <LazyLoadImage
            src={getCleanUrl(activeImageUrl)}
            alt="Current Showing Screenshot"
            key={activeImageUrl}
            width={1920}
            height={1080}
            className="rounded"
          ></LazyLoadImage>
          {/* controls */}
          {/* previous image */}
          <button
            onClick={onPrev}
            className="scale-[250%] absolute top-1/2 right-full opacity-60 transition-opacity hover:opacity-100 sm:opacity-100 mx-6 sm:mx-0 grid place-items-center -translate-y-1/2 sm:scale-150 sm:right-auto sm:left-5"
          >
            <span className="material-symbols-rounded translate-x-[3px]">arrow_back_ios</span>
          </button>
          {/* next image */}
          <button
            onClick={onNext}
            className="scale-[250%] absolute top-1/2 left-full opacity-60 transition-opacity hover:opacity-100 sm:opacity-100 mx-6 sm:mx-0 grid place-items-center -translate-y-1/2 sm:scale-150  sm:left-auto sm:right-5"
          >
            <span className="material-symbols-rounded translate-x-[3px]">arrow_forward_ios</span>
          </button>
          {/* images index indicator */}
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
