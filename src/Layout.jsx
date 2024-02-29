import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="font-Lato">
      <Header></Header>
      <main className="w-[1280px] mx-auto p-3">
        <Outlet></Outlet>
      </main>
    </div>
  );
};
export default Layout;
