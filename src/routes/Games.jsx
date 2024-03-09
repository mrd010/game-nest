import { Outlet, useOutletContext } from 'react-router-dom';
import CategoriesSideNav from '../components/CategoriesSideNav';

const Games = () => {
  // get categories from app parent
  const categories = useOutletContext();

  return (
    <div className="grid grid-cols-[auto_1fr] gap-5">
      {/* side nav categories */}
      <CategoriesSideNav categoryList={categories}></CategoriesSideNav>
      {/* main content */}
      <div className="px-10 py-20 my-2 rounded-md bg-zinc-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Games;
