import PropTypes from 'prop-types';
import { useState } from 'react';
import GamesListRow from './GamesListRow';
import PageNavNumbers from './PageNavNumbers';
import TabListPreviewPanel from '../components/TabListGamePreview';
import TabMenu from './TabMenu';
import { useTabs } from '../hooks/useTabs';
import { useNavigate, useOutletContext } from 'react-router-dom';

const TabbedCategories = ({ categoriesData }) => {
  // tabbed list with tabs for each key in categoriesData

  // check if device is handheld
  const { isHandheldDevice } = useOutletContext();
  const navigate = useNavigate();

  const { selectedTabIndex, changeTab } = useTabs(() => setPageNumber(0));
  // pagination for each category with number of items greater than 10
  const [pageNumber, setPageNumber] = useState(0);

  // control active game (selected by user) in featured categories (coming soon, new releases, top sellers)
  const [selectedGameInCats, setSelectedGameInCats] = useState(null);

  // max number of pages for active category
  const categoryIds = ['new_releases', 'top_sellers', 'coming_soon'];
  const numberOfPages = Math.ceil(categoriesData[categoryIds[selectedTabIndex]].length / 10);

  const handlePageChange = (number) => {
    setPageNumber(number);
  };

  const handleChangeActiveGameInCats = (steamId) => {
    // if device is handheld don't show preview panel
    // instead navigate to game page
    if (isHandheldDevice) {
      navigate(`/games/${steamId}`);
      return;
    }
    setSelectedGameInCats(steamId);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      <TabMenu
        selectedTabIndex={selectedTabIndex}
        tabsList={['New Releases', 'Top Sellers', 'Coming Soon']}
        onTabChange={changeTab}
      ></TabMenu>
      <div className="flex flex-nowrap gap-12 w-full h-[780px]">
        <div className="relative grow">
          <div className={`flex flex-col group flex-nowrap divide-y-2 border-gray-950/50`}>
            {
              // divide items in pages and show active page items
              categoriesData[categoryIds[selectedTabIndex]]
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
              <div className="my-4 absolute grid justify-center bottom-0 left-1/2 -translate-x-1/2">
                <PageNavNumbers
                  currentPageNumber={pageNumber}
                  totalPageNumbers={numberOfPages}
                  onSelect={handlePageChange}
                ></PageNavNumbers>
              </div>
            )
          }
        </div>
        {!isHandheldDevice && (
          <div
            className={`transition-all duration-500 ${selectedGameInCats ? 'w-[500px]' : 'w-0'}`}
          >
            <TabListPreviewPanel id={selectedGameInCats}></TabListPreviewPanel>
          </div>
        )}
      </div>
    </div>
  );
};
TabbedCategories.propTypes = {
  categoriesData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};
export default TabbedCategories;
