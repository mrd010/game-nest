import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import { useEffect } from 'react';

const Layout = () => {
  const categories = useLoaderData();

  // for navigation loader
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'idle') {
      window.scrollTo(0, 0);
    }
  }, [state]);

  return (
    <div
      className="font-Lato min-h-screen bg-no-repeat bg-cover bg-center bg-fixed grid grid-rows-[auto_1fr]"
      id="main"
    >
      <Header categories={categories}></Header>
      {/* main content */}
      <div className="relative h-full">
        <main
          className={`w-[1280px] mx-auto p-3 xl:w-full ${state === 'idle' ? 'block' : 'hidden'}`}
        >
          <Outlet context={categories}></Outlet>
        </main>
        {state === 'loading' && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-50 grid place-items-center z-50">
            <div className="page-loader "></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Layout;
