import PropTypes from 'prop-types';
import News from './News';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import { getNews } from '../services/dataFetchers';
const NewsSection = ({ importantGameIds }) => {
  // container for game news
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(false);

  // stringify array for not triggering deps
  const stringifiedIds = JSON.stringify(importantGameIds);

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

  return (
    <>
      {!error && (
        <Carousel itemWidth={230} steps={4} title="News">
          {newsData
            ? newsData.map(
                (news) =>
                  news.title.length > 20 && (
                    <News
                      key={news.appid}
                      appId={news.appid}
                      title={news.title}
                      url={news.url}
                    ></News>
                  )
              )
            : [...Array(6)].map((v, index) => <News key={index}></News>)}
        </Carousel>
      )}
    </>
  );
};
NewsSection.propTypes = {
  importantGameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default NewsSection;
