import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './Layout';
import Home from './routes/Home';
import Games from './routes/Games';
import { homeLoader } from './loaders/homeLoader';

import { appLoader } from './loaders/appLoader';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} loader={appLoader}>
        <Route index element={<Home />} loader={homeLoader}></Route>
        <Route path="home" element={<Home />} loader={homeLoader}></Route>
        <Route path="games" element={<Games />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default Router;
