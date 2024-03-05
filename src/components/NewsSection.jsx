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

  useEffect(() => {
    const fetchNewsData = async () => {
      const fetchedData = await getNews(stringifiedIds);

      fetchedData.sort((a, b) => b.date - a.date);
      setNewsData(fetchedData);
    };

    fetchNewsData();
  }, [stringifiedIds]);

  console.log(newsData);

  return (
    <>
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
    </>
  );
};
NewsSection.propTypes = {
  importantGameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default NewsSection;
