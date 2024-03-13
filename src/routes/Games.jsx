import { Outlet, useOutletContext } from 'react-router-dom';
import CategoriesSideNav from '../components/CategoriesSideNav';
import { useState } from 'react';
import MainContentContainer from '../components/MainContentContainer';

const Games = () => {
  // get categories from app parent
  const categories = useOutletContext();
  const [currentSubCats, setCurrentSubCats] = useState(null);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-5">
      {/* side nav categories */}
      <CategoriesSideNav
        categoryList={categories}
        subCategories={currentSubCats}
      ></CategoriesSideNav>
      {/* main content */}
      <MainContentContainer>
        <Outlet context={setCurrentSubCats}></Outlet>
      </MainContentContainer>
    </div>
  );
};
export default Games;
