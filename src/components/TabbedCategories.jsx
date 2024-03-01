import PropTypes from 'prop-types';
import TabButton from './TabButton';
import { useState } from 'react';
import GamesListRow from './GamesListRow';
import PageNavNumbers from './PageNavNumbers';
const TabbedCategories = ({ categoriesData }) => {
  const [selectedTab, setSelectedTab] = useState('new_releases');
  const [pageNumber, setPageNumber] = useState(0);

  const tabIndex = selectedTab === 'new_releases' ? 0 : selectedTab === 'top_sellers' ? 1 : 2;
  console.log(categoriesData);

  const handlePageChange = (number) => {
    setPageNumber(number);
  };
  return (
    <div className="grid grid-flow-row">
      <div
        className={`flex relative after:content-[' '] after:h-1 after:rounded-sm after:bg-yellow-500 after:w-32 after:absolute after:bottom-0 after:transition-transform ${tabIndex === 1 ? 'after:translate-x-32' : tabIndex === 2 ? 'after:translate-x-64' : ''}`}
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
      <div className="grid grid-flow-row gap-1 my-2">
        {categoriesData[selectedTab]
          .slice(pageNumber * 10, pageNumber * 10 + 10)
          .map((gameData) => (
            <GamesListRow key={gameData.id} {...gameData}></GamesListRow>
          ))}
      </div>
      <div className="justify-self-center">
        <PageNavNumbers
          currentPageNumber={pageNumber}
          totalPageNumbers={Math.ceil(categoriesData[selectedTab].length / 10)}
          onSelect={handlePageChange}
        ></PageNavNumbers>
      </div>
    </div>
  );
};
TabbedCategories.propTypes = {
  categoriesData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};
export default TabbedCategories;
