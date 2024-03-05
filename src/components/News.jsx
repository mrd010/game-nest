import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import ContentLoader from './ContentLoader';

const News = ({ appId, title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="w-[230px] group relative grid grid-rows-[107.5px_1fr] gap-2"
    >
      <div className="">
        {appId ? (
          <LazyLoadImage className="rounded-md" src={steamHeaderImage(appId)}></LazyLoadImage>
        ) : (
          <ContentLoader size="100%"></ContentLoader>
        )}
      </div>
      <div className="grid gap-1">
        {title && url ? (
          <h3 className="font-bold line-clamp-3 hover:text-yellow-600 drop-shadow-sm shadow-gray-900">
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
      <div className="absolute  scale-125 top-3 opacity-0 group-hover:opacity-100 right-2 text-gray-100/90">
        <span className="material-symbols-rounded">open_in_new</span>
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
