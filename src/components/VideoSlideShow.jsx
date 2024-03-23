import PropTypes from 'prop-types';
import { getCleanUrl } from '../services/utilities';
import VideoListItem from './VideoListItem';
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import AvailableOSs from './AvailableOSs';
import VideoPlayer from './VideoPlayer';

const VideoSlideShow = ({ videoList }) => {
  const firstVideo = videoList[0].target.id;
  // component displaying video list and video player
  const [selectedId, setSelectedId] = useState(firstVideo);

  const currentVideo = videoList.find((video) => video.target.id === selectedId);

  const { isHandheldDevice } = useOutletContext();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-10 xl:grid-rows-[auto_minmax(0,1fr)] xl:grid-cols-1 mb">
      {/* playing video */}
      <div className="grid grid-rows-[minmax(0,1fr)_auto] xl:gap-4 xl:flex xl:flex-col-reverse">
        {/* player */}
        <VideoPlayer
          lqUrl={getCleanUrl(currentVideo.webm['480'])}
          hqUrl={getCleanUrl(currentVideo.webm['max'])}
          previewImage={getCleanUrl(currentVideo.target.large_capsule_image)}
          key={selectedId}
        ></VideoPlayer>

        {/* video details */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] h-24 xl:h-auto border-[1px] xl:border-none to-yellow-300 from-amber-500 xl:bg-gradient-to-br rounded-md border-gray-900">
          <div className="flex flex-col flex-nowrap gap-1 m-4 ">
            <h3 className="font-bold text-3xl xl:text-4xl lg:text-2xl lg:underline">
              <Link to={`/games/${selectedId}`} className="hover:text-yellow-600">
                {currentVideo.target.name}
              </Link>
            </h3>
            {currentVideo.name.length >= 10 &&
              currentVideo.target.name.toLowerCase() !== currentVideo.name.toLowerCase() &&
              !currentVideo.name.includes('_') && <p className="xl:text-lg">{currentVideo.name}</p>}
          </div>
          <div className="self-center px-5">
            <AvailableOSs
              mac={currentVideo.target.mac_available}
              linux={currentVideo.target.linux_available}
              win={currentVideo.target.windows_available}
              iconSize={isHandheldDevice ? 24 : 32}
            ></AvailableOSs>
          </div>
        </div>
      </div>
      {/* video list */}
      <div className="grid gap-4 xl:flex xl:flex-col">
        <div className="grid grid-rows-4 gap-4 xl:grid-cols-4 xl:grid-rows-1">
          {videoList.map((video) => (
            <VideoListItem
              key={video.target.id}
              gameName={video.target.name}
              name={video.name}
              thumbnail={getCleanUrl(video.thumbnail)}
              onSelect={() => setSelectedId(video.target.id)}
              className="grid grid-cols-[200px_200px] gap-4 xl:grid-cols-1 xl:grid-rows-[auto_1fr] xl:gap-2 xl:items-start"
            ></VideoListItem>
          ))}
        </div>
        <div className="w-full self-center">
          <ButtonLink
            text="More Videos"
            link="/videos"
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
