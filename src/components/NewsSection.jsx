import PropTypes from 'prop-types';
import News from './News';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import { getNews } from '../services/dataFetchers';
import { useOutletContext } from 'react-router-dom';
import HomeSectionTitle from './HomeSectionTitle';

const MAX_NEWSITEMS_IN_MOBILE = 5;
const NewsSection = ({ importantGameIds }) => {
  // container for game news
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(false);

  const { isSmallMobile } = useOutletContext();

  // stringify array for not triggering deps
  const stringifiedIds = JSON.stringify(importantGameIds);

  // fetch data
  useEffect(() => {
    let ignore = false;
    const fetchNewsData = async () => {
      try {
        const fetchedData = await getNews(stringifiedIds);
        // sort news by date

        fetchedData.sort((a, b) => b.date - a.date);

        if (!ignore) {
          setNewsData(fetchedData);
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    };

    fetchNewsData();
    return () => (ignore = true);
  }, [stringifiedIds]);

  const newsCards = newsData
    ? newsData.map((news) =>
        news.title.length > 20 ? (
          <div key={news.appid} className="w-[250px] sm:w-auto px-2">
            <News appId={news.appid} title={news.title} url={news.url}></News>
          </div>
        ) : null
      )
    : [...Array(6)].map((v, index) => (
        <div key={index} className="w-[250px] sm:w-auto px-2">
          <News></News>
        </div>
      ));

  return (
    <>
      {!error && !isSmallMobile && (
        <Carousel itemWidth={250} steps={4} title="News">
          {newsCards}
        </Carousel>
      )}
      {!error && isSmallMobile && (
        <div>
          <HomeSectionTitle>News</HomeSectionTitle>
          <div className="grid grid-flow-row gap-4 my-2">
            {newsCards.slice(0, MAX_NEWSITEMS_IN_MOBILE)}
          </div>
        </div>
      )}
    </>
  );
};
NewsSection.propTypes = {
  importantGameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default NewsSection;
