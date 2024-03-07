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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { secondsToMinutesPlus } from '../services/utilities';

const VideoPlayer = ({ lqUrl, hqUrl, previewImage }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [percentPlayed, setPercentPlayed] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useRef(null);

  const handlePlayPause = (status) => {
    setIsPlaying(status);
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
          url={highQuality ? hqUrl : lqUrl}
          light={previewImage ? previewImage : true}
          muted={isMuted}
          volume={volume}
          playing={isPlaying}
          playIcon={<LazyLoadImage src={playBigIcon} className="icon-white w-40"></LazyLoadImage>}
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
          onProgress={({ played, playedSeconds }) => {
            if (!isSeeking) {
              setTimePlayed(playedSeconds);
              setPercentPlayed(played);
            }
          }}
          onStart={() => player.current.seekTo(percentPlayed)}
        ></ReactPlayer>
      </div>
      {/* controls */}
      {isLoading && (
        <div className="absolute w-full h-full grid place-items-center">
          <div className="video-loader"></div>
        </div>
      )}
      {isStarted && (
        <div className="absolute bottom-0 w-full flex flex-col p-2 video-controls transition-opacity opacity-75 group-hover:opacity-100 bg-gray-900/50">
          <div className="px-2 video-track bg-transparent flex flex-nowrap gap-4 items-center">
            {/* seeking bar */}
            <input
              type="range"
              className="w-full bg-transparent range transition-opacity hover:opacity-100 opacity-70"
              value={Math.floor(percentPlayed * 100)}
              onMouseDown={() => setIsSeeking(true)}
              onMouseUp={(e) => {
                setIsSeeking(false);
                player.current.seekTo(parseFloat(e.target.value / 100));
              }}
              onChange={(e) => {
                setPercentPlayed(parseFloat(e.target.value / 100));
              }}
            />
            {/* current time */}
            <span className="font-bold text-lg">
              {secondsToMinutesPlus(Math.floor(timePlayed))}
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
