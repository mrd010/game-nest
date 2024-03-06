import PropTypes from 'prop-types';
const VideoSlideShow = ({ videoList }) => {
  console.log(videoList);
  return <div></div>;
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
