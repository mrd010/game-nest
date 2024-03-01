import PropTypes from 'prop-types';
import TabButton from './TabButton';
import { useState } from 'react';
import GamesListRow from './GamesListRow';
const TabbedCategories = ({ categoriesData }) => {
  const [selectedTab, setSelectedTab] = useState('new_releases');
  const [pageNumber, setPageNumber] = useState(0);

  const tabIndex = selectedTab === 'new_releases' ? 0 : selectedTab === 'top_sellers' ? 1 : 2;
  console.log(categoriesData);
  return (
    <div>
      <div
        className={`flex relative after:content-[' '] after:h-1 after:rounded-sm after:bg-yellow-500 after:w-36 after:absolute after:bottom-0 after:transition-transform ${tabIndex === 1 ? 'after:translate-x-36' : tabIndex === 2 ? 'after:translate-x-72' : ''}`}
      >
        <TabButton
          onSelect={() => setSelectedTab('new_releases')}
          isSelected={selectedTab === 'new_releases'}
        >
          New Releases
        </TabButton>
        <TabButton
          onSelect={() => setSelectedTab('top_sellers')}
          isSelected={selectedTab === 'top_sellers'}
        >
          Top Sellers
        </TabButton>
        <TabButton
          onSelect={() => setSelectedTab('coming_soon')}
          isSelected={selectedTab === 'coming_soon'}
        >
          Coming Soon
        </TabButton>
      </div>
      <div className="w-96 flex">
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
