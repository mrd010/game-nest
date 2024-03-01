import PropTypes from 'prop-types';
import TabButton from './TabButton';
import { useState } from 'react';
const TabbedCategories = ({ categoriesData }) => {
  const [selectedTab, setSelectedTab] = useState('new_releases');

  return (
    <div>
      <div>
        <TabButton onSelect={() => setSelectedTab('new_releases')}>New Releases</TabButton>
        <TabButton onSelect={() => setSelectedTab('top_sellers')}>Top Sellers</TabButton>
        <TabButton onSelect={() => setSelectedTab('coming_soon')}>Coming Soon</TabButton>
      </div>
      <div></div>
    </div>
  );
};
TabbedCategories.propTypes = {
  categoriesData: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        header_image: PropTypes.string,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        small_capsule_image: PropTypes.string.isRequired,
        linux_available: PropTypes.bool,
        mac_available: PropTypes.bool,
        windows_available: PropTypes.bool,
      })
    )
  ),
};
export default TabbedCategories;
