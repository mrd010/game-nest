import { useLoaderData } from 'react-router-dom';
import MainContentHeader from '../components/MainContentHeader';
import MainContentContainer from '../components/MainContentContainer';
import VideoListItem from '../components/VideoListItem';
import { getCleanUrl } from '../services/utilities';

const Trailers = () => {
  const trailers = useLoaderData();
  console.log(trailers);

  const handleVideoOpen = () => {};
  return (
    <MainContentContainer>
      {/* header */}
      <MainContentHeader
        title={'Recent Videos'}
        desc={'Watch the most recent videos of games for pc'}
      ></MainContentHeader>
      {/* videos mini */}
      <section className="grid grid-cols-4 gap-x-10 gap-y-16">
        {trailers.map((trailerData) => (
          <VideoListItem
            key={`${trailerData.target.id}${trailerData.name}`}
            gameName={trailerData.target.name}
            name={trailerData.name}
            thumbnail={getCleanUrl(trailerData.thumbnail)}
            onSelect={handleVideoOpen}
            iconCentered
            className="grid grid-rows-[auto_auto] gap-2 content-start"
          ></VideoListItem>
        ))}
      </section>
    </MainContentContainer>
  );
};

export default Trailers;
