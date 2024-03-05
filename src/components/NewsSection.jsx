import PropTypes from 'prop-types';
import News from './News';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import { getNews } from '../services/dataFetchers';
const NewsSection = ({ importantGameIds }) => {
  // container for game news
  const [newsData, setNewsData] = useState(null);

  // stringify array for not triggering deps
  const stringifiedIds = JSON.stringify(importantGameIds);

  console.log(stringifiedIds);

  useEffect(() => {
    const fetchNewsData = async () => {
      const fetchedData = await getNews(stringifiedIds);
      fetchedData.sort((a, b) => b.newsitems[0].date - a.newsitems[0].date);
      setNewsData(fetchedData);
    };

    fetchNewsData();
  }, [stringifiedIds]);

  console.log(newsData);
  return (
    <>
      <Carousel itemWidth={230} steps={4} title="News">
        {newsData
          ? newsData.map((news) => {
              const newsItem = news.newsitems[0];
              return (
                <News
                  key={news.appid}
                  appId={newsItem.appid}
                  title={newsItem.title}
                  url={newsItem.url}
                ></News>
              );
            })
          : [...Array(6)].map((v, index) => <News key={index}></News>)}
      </Carousel>
    </>
  );
};
NewsSection.propTypes = {
  importantGameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default NewsSection;
