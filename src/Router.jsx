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
import { gamesLoader } from './loaders/gamesLoader';
import GamesContent from './components/GamesContent';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} loader={appLoader}>
        <Route index element={<Home />} loader={homeLoader}></Route>
        <Route path="home" element={<Home />} loader={homeLoader}></Route>
        <Route path="games" element={<Games />}>
          <Route index element={<GamesContent></GamesContent>} loader={gamesLoader}></Route>
          <Route path=":catId" element={<GamesContent></GamesContent>} loader={gamesLoader}></Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default Router;
