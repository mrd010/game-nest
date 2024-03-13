import PropTypes, { bool } from 'prop-types';
import VideoPlayer from './VideoPlayer';
const VideoPlayerOverlay = ({ isOpen, hqUrl, lqUrl, onClose }) => {
  return (
    <div
      className={`fixed left-0 grid place-items-center top-0 bg-gray-900/90 z-50 w-full origin-left transition-transform duration-300 h-screen ${isOpen ? 'scale-x-100' : 'scale-x-0'}`}
      style={{
        margin: 0,
      }}
    >
      <button onClick={onClose} className="text-gray-50 grid scale-150 absolute top-5 right-5">
        <span className="material-symbols-rounded">close</span>
      </button>
      {isOpen && (
        <div className={`aspect-video w-[1000px]`}>
          <VideoPlayer hqUrl={hqUrl} lqUrl={lqUrl} previewImage={false}></VideoPlayer>
        </div>
      )}
    </div>
  );
};
VideoPlayerOverlay.propTypes = {
  isOpen: bool.isRequired,
  hqUrl: PropTypes.string.isRequired,
  lqUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default VideoPlayerOverlay;
