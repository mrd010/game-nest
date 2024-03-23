import { Outlet, useOutletContext } from 'react-router-dom';
import CategoriesSideNav from '../components/CategoriesSideNav';
import MainContentContainer from '../components/MainContentContainer';

const Games = () => {
  // get categories from app parent
  const { categories, isHandheldDevice } = useOutletContext();

  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 lg:grid-cols-1 lg:grid-flow-row">
      {/* side nav categories */}
      <CategoriesSideNav categoryList={categories}></CategoriesSideNav>
      {/* main content */}
      <MainContentContainer>
        <Outlet context={{ isHandheldDevice }}></Outlet>
      </MainContentContainer>
    </div>
  );
};
export default Games;
