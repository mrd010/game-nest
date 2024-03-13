import PropTypes, { bool } from 'prop-types';
import VideoPlayer from './VideoPlayer';
import { useRef } from 'react';
const VideoPlayerOverlay = ({ isOpen, hqUrl, lqUrl, onClose }) => {
  const outsidePlayer = useRef(null);
  return (
    <div
      ref={outsidePlayer}
      className={`fixed left-0 grid place-items-center top-0 bg-gray-900/90 z-50 w-full origin-left transition-transform duration-300 h-screen ${isOpen ? 'scale-x-100' : 'scale-x-0'}`}
      style={{
        margin: 0,
      }}
      onClick={(e) => {
        if (e.target === outsidePlayer.current) {
          onClose();
        }
      }}
    >
      <button
        onClick={onClose}
        className="text-gray-50 grid scale-150 absolute top-5 right-5 opacity-80 hover:opacity-100"
      >
        <span className="material-symbols-rounded">close</span>
      </button>
      {isOpen && (
        <div className={`aspect-video w-[1000px] drop-shadow-lg shadow-md`}>
          <VideoPlayer hqUrl={hqUrl} lqUrl={lqUrl} previewImage={false}></VideoPlayer>
        </div>
      )}
    </div>
  );
};
VideoPlayerOverlay.propTypes = {
  isOpen: bool.isRequired,
  hqUrl: PropTypes.string,
  lqUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
export default VideoPlayerOverlay;
