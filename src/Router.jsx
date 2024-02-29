import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './Layout';
import Home from './routes/Home';
import Games from './routes/Games';
import Deals from './routes/Deals';
import { homeLoader } from './loaders/homeLoader';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={homeLoader}></Route>
        <Route path="home" element={<Home />} loader={homeLoader}></Route>
        <Route path="games" element={<Games />}></Route>
        <Route path="deals" element={<Deals />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};
export default Router;
