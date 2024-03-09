import { Outlet, useOutletContext } from 'react-router-dom';
import CategoriesSideNav from '../components/CategoriesSideNav';

const Games = () => {
  const categories = useOutletContext();
  console.log(categories);
  return (
    <div>
      <CategoriesSideNav categoryList={categories}></CategoriesSideNav>
      <Outlet></Outlet>
    </div>
  );
};
export default Games;
