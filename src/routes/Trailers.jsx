import { useLoaderData } from 'react-router-dom';
import MainContentHeader from '../components/MainContentHeader';
import MainContentContainer from '../components/MainContentContainer';
import VideoListItem from '../components/VideoListItem';
import { getCleanUrl } from '../services/utilities';
import { useState } from 'react';
import VideoPlayerOverlay from '../components/VideoPlayerOverlay';

const Trailers = () => {
  const trailers = useLoaderData();

  // state when video selected and overlay should open
  const [currentVideo, setCurrentVideo] = useState(null);

  // extract video urls
  const videoUrls = currentVideo && currentVideo.webm;
  const lowQualityVideo = videoUrls && videoUrls['480'];
  const highQualityVideo = videoUrls && videoUrls['max'];

  // on select video set video as active video
  const handleVideoOpen = (id, name) => {
    const video = trailers.find((trailer) => trailer.name === name && trailer.target.id === id);
    if (video) {
      setCurrentVideo(video);
    }
  };

  // close overlay when x button pressed
  const handleVideoClose = () => {
    setCurrentVideo(null);
  };

  return (
    <MainContentContainer>
      {/* header */}
      <MainContentHeader
        title={'Recent Videos'}
        desc={'Watch the most recent videos of games for pc'}
      ></MainContentHeader>
      {/* videos mini */}
      <section className="grid grid-cols-4 lg:grid-cols-3 gap-x-10 gap-y-16 xl:gap-y-10 lg:gap-y-8">
        {trailers.map((trailerData) => (
          <VideoListItem
            key={`${trailerData.target.id}${trailerData.name}`}
            id={trailerData.target.id}
            gameName={trailerData.target.name}
            name={trailerData.name}
            thumbnail={getCleanUrl(trailerData.thumbnail)}
            onSelect={handleVideoOpen}
            iconCentered
            className="grid grid-rows-[auto_auto] gap-2 content-start"
          ></VideoListItem>
        ))}
      </section>
      <VideoPlayerOverlay
        isOpen={!!currentVideo}
        hqUrl={highQualityVideo}
        lqUrl={lowQualityVideo}
        onClose={handleVideoClose}
      ></VideoPlayerOverlay>
    </MainContentContainer>
  );
};

export default Trailers;
