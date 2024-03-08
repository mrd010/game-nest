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
import muteIcon from '../assets/icons/player-icons/volume_off.svg';
import volumeIcon from '../assets/icons/player-icons/volume_up.svg';
import fsIcon from '../assets/icons/player-icons/fullscreen.svg';
import screenfull from 'screenfull';
import { secondsToMinutesPlus } from '../services/utilities';

const VideoPlayer = ({ lqUrl, hqUrl, previewImage }) => {
  // video player with custom controls
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  // using percent for seeking and using seconds for displaying time
  // seconds format
  const [timePlayed, setTimePlayed] = useState(0);
  // percent format
  const [percentPlayed, setPercentPlayed] = useState(0);
  // seeking state is when we are holding slider for seeking video time
  const [isSeeking, setIsSeeking] = useState(false);
  // when video is buffering
  const [isLoading, setIsLoading] = useState(false);

  const player = useRef(null);

  const handlePlayPause = (status) => {
    setIsPlaying(status);
  };

  const handleFullscreen = () => {
    screenfull.request(document.querySelector('.react-player'));
  };

  return (
    <div className="relative text-gray-50 grid aspect-video group rounded-md overflow-hidden">
      <div
        onClick={() => {
          if (isStarted) {
            handlePlayPause(!isPlaying);
          }
        }}
        className="bg-gray-900 w-full"
      >
        <ReactPlayer
          ref={player}
          className="react-player"
          url={highQuality ? hqUrl : lqUrl}
          light={previewImage ? previewImage : true}
          muted={isMuted}
          volume={volume}
          playing={isPlaying}
          playIcon={<img src={playBigIcon} className="icon-white w-40"></img>}
          width={'100%'}
          height={'100%'}
          // ----------------------
          onClickPreview={() => {
            setIsPlaying(true);
            setIsStarted(true);
          }}
          onPlay={() => handlePlayPause(true)}
          onPause={() => handlePlayPause(false)}
          onBuffer={() => setIsLoading(true)}
          onBufferEnd={() => setIsLoading(false)}
          // on video progress get and set played video time in percent and in seconds

          onProgress={({ played, playedSeconds }) => {
            // if we are not in seek mode we don't want to update video
            if (!isSeeking) {
              setTimePlayed(playedSeconds);
              setPercentPlayed(played);
            }
          }}
          // usually wont need. its just for when changing quality videos we want to resume from current time
          onStart={() => player.current.seekTo(percentPlayed)}
        ></ReactPlayer>
      </div>
      {/* controls */}
      {isLoading && (
        // video loader
        <div className="absolute w-full h-full grid place-items-center">
          <div className="video-loader"></div>
        </div>
      )}
      {/* only show controls when video started */}
      {isStarted && (
        <div className="absolute bottom-0 w-full flex flex-col p-2 video-controls transition-opacity opacity-75 group-hover:opacity-100 bg-gray-900/50">
          <div className="px-2 video-track bg-transparent flex flex-nowrap gap-4 items-center">
            {/* seeking bar */}
            <input
              type="range"
              className="w-full bg-transparent range transition-opacity hover:opacity-100 opacity-70"
              value={Math.ceil(percentPlayed * 100)}
              onMouseDown={() => setIsSeeking(true)}
              onMouseUp={(e) => {
                setIsSeeking(false);
                // when finish seeking move video to selected percent played
                player.current.seekTo(parseFloat(e.target.value / 100));
              }}
              onChange={(e) => {
                // save percent time while seeking and move video time to this time when seeking ends
                setPercentPlayed(parseFloat(e.target.value / 100));
              }}
            />
            {/* current time */}
            <span className="font-bold text-lg">
              {
                // convert seconds to 00:00 format
                secondsToMinutesPlus(Math.floor(timePlayed))
              }
            </span>
          </div>
          <div className="flex flex-nowrap gap-4">
            {/* play pause */}
            <button
              onClick={() => handlePlayPause(!isPlaying)}
              className="transition-opacity hover:opacity-100 opacity-70"
            >
              <img src={!isPlaying ? playIcon : pauseIcon} className="icon-white size-10" />
            </button>
            {/* volume */}
            <div className="flex flex-nowrap gap-1 w-36 items-center mr-auto volume transition-opacity hover:opacity-100 opacity-70">
              {/* volume mute button */}
              <button onClick={() => setIsMuted(!isMuted)}>
                <img
                  src={isMuted || volume === 0 ? muteIcon : volumeIcon}
                  className="icon-white size-8"
                />
              </button>
              {/* volume range */}
              <input
                type="range"
                value={volume * 100}
                onChange={(e) => {
                  // on volume change get out of muted state
                  setIsMuted(false);
                  setVolume(e.target.value / 100);
                }}
                className="win10-thumb"
              />
            </div>

            <div className="flex flex-nowrap gap-1 transition-opacity hover:opacity-100 opacity-70">
              {/* low quality button*/}
              <button
                onClick={() => setHighQuality(false)}
                className={!highQuality ? 'opacity-100' : 'opacity-40'}
              >
                <img src={lqIcon} className="icon-white size-8" />
              </button>
              {/* high quality button */}
              <button
                onClick={() => setHighQuality(true)}
                className={highQuality ? 'opacity-100' : 'opacity-40'}
              >
                <img src={hqIcon} className="icon-white size-8" />
              </button>
            </div>
            <button onClick={handleFullscreen}>
              <img src={fsIcon} className="icon-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
VideoPlayer.propTypes = {
  lqUrl: PropTypes.string.isRequired,
  hqUrl: PropTypes.string.isRequired,
  previewImage: PropTypes.string,
};
export default VideoPlayer;
