import PropTypes from 'prop-types';
import { Form } from 'react-router-dom';
const HeaderSearch = () => {
  // search nar in header of app. searches whole steam database for games and navigates to that game page in app
  // TODO
  return (
    <Form action="" className="relative text-gray-950">
      <input
        type="search"
        placeholder="Search for games"
        className="w-full rounded-lg p-2 pl-4 border-none outline-none text-lg"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 opacity-75 p-2 text-2xl scale-125 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-rounded">search</span>
      </button>
    </Form>
  );
};
HeaderSearch.propTypes = {};
export default HeaderSearch;
