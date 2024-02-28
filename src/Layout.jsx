import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="font-Lato">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};
export default Layout;
