import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  const categories = useLoaderData();

  // for navigation loader
  const { state } = useNavigation();

  return (
    <div className="font-Lato min-h-screen bg-no-repeat bg-cover bg-center bg-fixed" id="main">
      <Header categories={categories}></Header>
      {/* main content */}
      <main className="w-[1280px] mx-auto p-3">
        <Outlet context={categories}></Outlet>
      </main>
      {state === 'loading' && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-50 grid place-items-center z-50">
          <div className="page-loader "></div>
        </div>
      )}
    </div>
  );
};
export default Layout;
