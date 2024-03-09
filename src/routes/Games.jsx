import { Outlet, useOutletContext } from 'react-router-dom';
import CategoriesSideNav from '../components/CategoriesSideNav';

const Games = () => {
  // get categories from app parent
  const categories = useOutletContext();

  return (
    <div>
      {/* side nav categories */}
      <CategoriesSideNav categoryList={categories}></CategoriesSideNav>
      {/* main content */}
      <Outlet></Outlet>
    </div>
  );
};
export default Games;
