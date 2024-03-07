import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

// icons
import hqIcon from '../assets/icons/player-icons/high_quality.svg';
import lqIcon from '../assets/icons/player-icons/sd.svg';
import pauseIcon from '../assets/icons/player-icons/pause.svg';
import playIcon from '../assets/icons/player-icons/play.svg';
import playBigIcon from '../assets/icons/player-icons/play_circle.svg';
import replayIcon from '../assets/icons/player-icons/replay.svg';
import muteIcon from '../assets/icons/player-icons/volume_off.svg';
import volumeIcon from '../assets/icons/player-icons/volume_up.svg';
import fsIcon from '../assets/icons/player-icons/fullscreen.svg';

const VideoPlayer = ({ lqUrl, hqUrl, previewImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const [volume, setVolume] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [played, setPlayed] = useState(0);

  const player = useRef(null);

  return (
    <div>
      <ReactPlayer
        ref={player}
        url={highQuality ? hqUrl : lqUrl}
        light={previewImage ? previewImage : true}
        muted={isMuted}
        volume={volume}
        playing={isPlaying}
        playIcon={<img src={playBigIcon} className="icon-white w-28"></img>}
      ></ReactPlayer>
      {/* controls */}
      <div>
        <div>
          <input type="range" name="" id="" />
        </div>
        <div className="flex flex-nowrap">
          <button>
            <img src={isPlaying ? playIcon : pauseIcon} className="icon-white" />
          </button>
          <button>
            <img src={isMuted ? muteIcon : volumeIcon} className="icon-white" />
          </button>
          <input type="range" name="" id="" className="mr-auto" />

          <button>
            <img src={lqIcon} className="icon-white" />
          </button>
          <button>
            <img src={hqIcon} className="icon-white" />
          </button>
          <button>
            <img src={fsIcon} className="icon-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
VideoPlayer.propTypes = {
  lqUrl: PropTypes.string.isRequired,
  hqUrl: PropTypes.string.isRequired,
  previewImage: PropTypes.string,
};
export default VideoPlayer;
