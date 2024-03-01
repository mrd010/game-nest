import PropTypes from 'prop-types';
import TabButton from './TabButton';
import { useState } from 'react';
import GamesListRow from './GamesListRow';
const TabbedCategories = ({ categoriesData }) => {
  const [selectedTab, setSelectedTab] = useState('new_releases');
  const [pageNumber, setPageNumber] = useState(0);
  console.log(categoriesData);
  return (
    <div>
      <div>
        <TabButton onSelect={() => setSelectedTab('new_releases')}>New Releases</TabButton>
        <TabButton onSelect={() => setSelectedTab('top_sellers')}>Top Sellers</TabButton>
        <TabButton onSelect={() => setSelectedTab('coming_soon')}>Coming Soon</TabButton>
      </div>
      <div>
        {categoriesData[selectedTab]
          .slice(pageNumber * 10, pageNumber * 10 + 10)
          .map((gameData) => (
            <GamesListRow key={gameData.id} {...gameData}></GamesListRow>
          ))}
      </div>
    </div>
  );
};
TabbedCategories.propTypes = {
  categoriesData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};
export default TabbedCategories;
