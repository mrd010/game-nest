import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import { useEffect } from 'react';
import { useDevices } from './hooks/useDevices';
import PageLoadSpinner from './components/PageLoadSpinner';

const Layout = () => {
  const categories = useLoaderData();

  // for navigation loader
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'idle') {
      window.scrollTo(0, 0);
    }
  }, [state]);

  // query for check if device is handheld
  const { isHandheldDevice, isMobile, isSmallMobile } = useDevices();

  return (
    <div
      className="font-Lato min-h-screen bg-no-repeat bg-cover bg-center bg-fixed grid grid-rows-[auto_1fr] xl:overflow-x-hidden"
      id="main"
    >
      <Header
        categories={categories}
        isHandheldDevice={isHandheldDevice}
        isSmallMobile={isSmallMobile}
      ></Header>
      {/* main content */}
      <div className="relative h-full xl:overflow-x-hidden">
        <main
          className={`w-[1280px] mx-auto p-3 lg:px-0 xl:w-full ${state === 'idle' ? 'block' : 'hidden'}`}
        >
          <Outlet context={{ categories, isHandheldDevice, isMobile, isSmallMobile }}></Outlet>
        </main>
        {state === 'loading' && <PageLoadSpinner></PageLoadSpinner>}
      </div>
    </div>
  );
};
export default Layout;
