import PropTypes from 'prop-types';
const ContentLoader = ({ width = '100%', height = '100%' }) => {
  return (
    <div className="relative" style={{ width: width, height: height }}>
      <div className="content-loader rounded-sm"></div>
    </div>
  );
};
ContentLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
export default ContentLoader;
