import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  const categories = useLoaderData();

  return (
    <div className="font-Lato min-h-screen bg-no-repeat bg-cover bg-center bg-fixed" id="main">
      <Header categories={categories}></Header>
      {/* main content */}
      <main className="w-[1280px] mx-auto p-3">
        <Outlet context={categories}></Outlet>
      </main>
    </div>
  );
};
export default Layout;
