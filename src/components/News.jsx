import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import ContentLoader from './ContentLoader';

const News = ({ appId, title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="group h-full relative grid grid-rows-[107.5px_minmax(0,1fr)] gap-2 sm:grid-rows-1 sm:grid-cols-2"
    >
      <div>
        {appId ? (
          <LazyLoadImage className="rounded-md" src={steamHeaderImage(appId)}></LazyLoadImage>
        ) : (
          <ContentLoader size="100%"></ContentLoader>
        )}
      </div>
      <div className="grid gap-1">
        {title && url ? (
          <h3 className="line-clamp-3 font-bold shadow-gray-900 text-balance sm:text-pretty drop-shadow-sm hover:text-yellow-600 md:text-sm sm:py-2 sm:line-clamp-4 xs:text-xs">
            {title}
          </h3>
        ) : (
          <>
            <ContentLoader size="22px"></ContentLoader>
            <ContentLoader size="22px"></ContentLoader>
            <ContentLoader size="22px" length={10}></ContentLoader>
          </>
        )}
      </div>
    </a>
  );
};
News.propTypes = {
  appId: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
};
export default News;
