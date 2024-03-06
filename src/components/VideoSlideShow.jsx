import PropTypes from 'prop-types';
import { getCleanUrl } from '../services/utilities';
import VideoListItem from './VideoListItem';
const VideoSlideShow = ({ videoList }) => {
  console.log(videoList);
  return (
    <div>
      <div></div>
      <div className="w-[450px] grid grid-rows-5 gap-4">
        {videoList.map((video) => (
          <VideoListItem
            key={video.target.id}
            gameName={video.target.name}
            name={video.name}
            thumbnail={getCleanUrl(video.thumbnail)}
            width={200}
          ></VideoListItem>
        ))}
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
