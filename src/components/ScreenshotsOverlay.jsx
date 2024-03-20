import PropTypes from 'prop-types';
import ModalOverlayContainer from './ModalOverlayContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCleanUrl } from '../services/utilities';
const ScreenshotsOverlay = ({ isOpen, activeImageUrl, onClose }) => {
  return (
    <ModalOverlayContainer isOpen={isOpen} onClose={onClose}>
      {activeImageUrl && (
        <div className="absolute size-3/4 grid content-center">
          {/* main frame */}
          <LazyLoadImage
            src={getCleanUrl(activeImageUrl)}
            alt="Current Showing Screenshot"
            className="rounded h-full"
          ></LazyLoadImage>
          {/* controls */}
          {/* previous image */}
          <button className="scale-[250%] absolute top-1/2 right-full opacity-60 transition-opacity hover:opacity-100 translate-x-1 mx-6">
            <span className="material-symbols-rounded">arrow_back_ios</span>
          </button>
          {/* next image */}
          <button className="scale-[250%] absolute top-1/2 left-full opacity-60 transition-opacity hover:opacity-100 translate-x-1 mx-6">
            <span className="material-symbols-rounded">arrow_forward_ios</span>
          </button>
        </div>
      )}
    </ModalOverlayContainer>
  );
};
ScreenshotsOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeImageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
export default ScreenshotsOverlay;
