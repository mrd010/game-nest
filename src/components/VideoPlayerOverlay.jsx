import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import ModalOverlayContainer from './ModalOverlayContainer';
const VideoPlayerOverlay = ({ isOpen, hqUrl, lqUrl, onClose }) => {
  return (
    <ModalOverlayContainer isOpen={isOpen} onClose={onClose}>
      <div className={`aspect-video w-[1000px] drop-shadow-lg shadow-md`}>
        <VideoPlayer hqUrl={hqUrl} lqUrl={lqUrl} previewImage={false}></VideoPlayer>
      </div>
    </ModalOverlayContainer>
  );
};
VideoPlayerOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hqUrl: PropTypes.string,
  lqUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
export default VideoPlayerOverlay;
