import { useState } from 'react';

export const useTabs = (onTabChangeCallback) => {
  // currently active tab in featured categories
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // when change tabs call callback provided
  const changeTab = (tabIndex) => {
    if (tabIndex !== selectedTabIndex) {
      if (onTabChangeCallback) {
        onTabChangeCallback();
      }
      setSelectedTabIndex(tabIndex);
    }
  };

  return { selectedTabIndex, changeTab };
};
