import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
const VideoPlayerOverlay = ({ hqUrl, lqUrl }) => {
  return (
    <div>
      <div>
        <span className="material-symbols-rounded">close</span>
      </div>
      <VideoPlayer hqUrl={hqUrl} lqUrl={lqUrl}></VideoPlayer>
    </div>
  );
};
VideoPlayerOverlay.propTypes = {
  hqUrl: PropTypes.string.isRequired,
  lqUrl: PropTypes.string.isRequired,
};
export default VideoPlayerOverlay;
