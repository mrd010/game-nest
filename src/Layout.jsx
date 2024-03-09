import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  const categories = useLoaderData();
  console.log(categories);
  return (
    <div className="font-Lato">
      <Header categories={categories}></Header>
      <main className="w-[1280px] mx-auto p-3">
        <Outlet context={categories}></Outlet>
      </main>
    </div>
  );
};
export default Layout;
