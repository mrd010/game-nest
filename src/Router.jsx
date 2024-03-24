import {
  Navigate,
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
import { genreGamesLoader } from './loaders/genreGamesLoader';
import NewReleasedGames from './routes/NewReleasedGames';
import GenreGames from './routes/GenreGames';
import { newReleasesLoader } from './loaders/newReleasesLoader';
import Trailers from './routes/Trailers';
import { trailersLoader } from './loaders/trailersLoader';
import GameDetails from './routes/GameDetails';
import { gamePageLoader } from './loaders/gamePageLoader';
import SearchResultsPage from './routes/SearchResultsPage';
import { searchLoader } from './loaders/searchLoader';
import PageLoadSpinner from './components/PageLoadSpinner';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} loader={appLoader}>
        <Route index element={<Home />} loader={homeLoader}></Route>
        <Route path="home" element={<Home />} loader={homeLoader}></Route>
        <Route path="browse" element={<Games />}>
          <Route index element={<Navigate to="new releases" replace></Navigate>}></Route>
          <Route
            path="new releases"
            element={<NewReleasedGames></NewReleasedGames>}
            loader={newReleasesLoader}
          ></Route>
          <Route
            path=":catId"
            element={<GenreGames></GenreGames>}
            loader={genreGamesLoader}
          ></Route>
        </Route>
        <Route path="videos" element={<Trailers />} loader={trailersLoader}></Route>
        <Route path="games/:gameId" element={<GameDetails />} loader={gamePageLoader}></Route>
        <Route
          path="/search"
          element={<SearchResultsPage></SearchResultsPage>}
          loader={searchLoader}
        ></Route>
      </Route>
    )
  );
  return (
    <RouterProvider
      router={router}
      fallbackElement={<PageLoadSpinner></PageLoadSpinner>}
    ></RouterProvider>
  );
};
export default Router;
