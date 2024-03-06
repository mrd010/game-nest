import PropTypes from 'prop-types';
import { getCleanUrl } from '../services/utilities';
import VideoListItem from './VideoListItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from './ButtonLink';

const VideoSlideShow = ({ videoList }) => {
  const firstVideo = videoList[0].target.id;
  // component displaying video list and video player
  const [selectedId, setSelectedId] = useState(firstVideo);
  console.log(videoList);

  const currentVideo = videoList.find((video) => video.target.id === selectedId);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto]">
      {/* playing video */}
      <div className="grid grid-rows-[]">
        {/* player */}
        <div className="bg-gray-900 size-full"></div>
        {/* video details */}
        <div>
          <h3 className="font-bold text-3xl hover:text-yellow-600">
            <Link to={`games/${selectedId}`}>{currentVideo.target.name}</Link>
          </h3>
          <p>{currentVideo.name}</p>
        </div>
      </div>
      {/* video list */}
      <div className="grid grid-rows-6 gap-4">
        {videoList.map((video) => (
          <VideoListItem
            key={video.target.id}
            gameName={video.target.name}
            name={video.name}
            thumbnail={getCleanUrl(video.thumbnail)}
            onSelect={() => setSelectedId(video.target.id)}
          ></VideoListItem>
        ))}
        <div className="w-full">
          <ButtonLink
            text="More Videos"
            link="videos"
            className="w-full block text-center text-lg py-3"
          ></ButtonLink>
        </div>
      </div>
    </div>
  );
};
VideoSlideShow.propTypes = {
  videoList: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      webm: PropTypes.exact({ 480: PropTypes.string.isRequired, max: PropTypes.string.isRequired }),
      target: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    })
  ),
};
export default VideoSlideShow;
