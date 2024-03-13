import { useLoaderData } from 'react-router-dom';
import MainContentHeader from '../components/MainContentHeader';
import MainContentContainer from '../components/MainContentContainer';

const Trailers = () => {
  const trailers = useLoaderData();
  console.log(trailers);
  return (
    <MainContentContainer>
      <MainContentHeader
        title={'Recent Videos'}
        desc={'Watch the most recent videos from games for pc.'}
      ></MainContentHeader>
    </MainContentContainer>
  );
};

export default Trailers;
