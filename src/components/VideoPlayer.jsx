import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
const VideoPlayer = ({ url, previewImage }) => {
  return (
    <div>
      <ReactPlayer url={url}></ReactPlayer>
    </div>
  );
};
VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  previewImage: PropTypes.string,
};
export default VideoPlayer;
