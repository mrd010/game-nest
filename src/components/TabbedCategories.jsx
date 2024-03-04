import PropTypes from 'prop-types';
import TabButton from './TabButton';
import { useState } from 'react';
import GamesListRow from './GamesListRow';
import PageNavNumbers from './PageNavNumbers';
import TabListPreviewPanel from '../components/TabListGamePreview';
const TabbedCategories = ({ categoriesData }) => {
  // tabbed list with tabs for each key in categoriesData

  // currently active tab in featured categories
  const [selectedTab, setSelectedTab] = useState('new_releases');
  // pagination for each category with number of items greater than 10
  const [pageNumber, setPageNumber] = useState(0);

  // control active game (selected by user) in featured categories (coming soon, new releases, top sellers)
  const [selectedGameInCats, setSelectedGameInCats] = useState(null);

  // number version of selected tab (1==new_releases,2===top_sellers,3==coming_soon)
  const tabIndex = selectedTab === 'new_releases' ? 0 : selectedTab === 'top_sellers' ? 1 : 2;

  // max number of pages for active category
  const numberOfPages = Math.ceil(categoriesData[selectedTab].length / 10);

  const handleTabChange = (tabName) => {
    if (tabName !== selectedTab) {
      setPageNumber(0);
      setSelectedTab(tabName);
    }
  };

  const handlePageChange = (number) => {
    setPageNumber(number);
  };

  const handleChangeActiveGameInCats = (steamId) => {
    setSelectedGameInCats(steamId);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      <div
        className={`flex relative after:content-[' '] after:h-1 after:rounded-sm after:bg-yellow-500 after:w-32 after:absolute after:bottom-0 after:transition-transform ${tabIndex === 1 ? 'after:translate-x-32' : tabIndex === 2 ? 'after:translate-x-64' : ''}`}
      >
        <TabButton
          onSelect={() => handleTabChange('new_releases')}
          isSelected={selectedTab === 'new_releases'}
        >
          New Releases
        </TabButton>
        <TabButton
          onSelect={() => handleTabChange('top_sellers')}
          isSelected={selectedTab === 'top_sellers'}
        >
          Top Sellers
        </TabButton>
        <TabButton
          onSelect={() => handleTabChange('coming_soon')}
          isSelected={selectedTab === 'coming_soon'}
        >
          Coming Soon
        </TabButton>
      </div>
      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8">
        <div className="relative">
          <div className="grid gap-2 grid-rows-10 h-[800px] content-start">
            {
              // divide items in pages and show active page items
              categoriesData[selectedTab]
                .slice(pageNumber * 10, pageNumber * 10 + 10)
                .map((gameData) => (
                  <GamesListRow
                    key={gameData.id}
                    onSelect={handleChangeActiveGameInCats}
                    isSelected={selectedGameInCats === gameData.id}
                    {...gameData}
                  ></GamesListRow>
                ))
            }
          </div>
          {
            // show page navigator only when more than one page exists
            numberOfPages > 1 && (
              <div className="my-4 absolute bottom-full right-0 opacity-80 hover:opacity-100 transition-opacity">
                <PageNavNumbers
                  currentPageNumber={pageNumber}
                  totalPageNumbers={numberOfPages}
                  onSelect={handlePageChange}
                ></PageNavNumbers>
              </div>
            )
          }
        </div>
        {selectedGameInCats && <TabListPreviewPanel id={selectedGameInCats}></TabListPreviewPanel>}
      </div>
    </div>
  );
};
TabbedCategories.propTypes = {
  categoriesData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};
export default TabbedCategories;
