import PropTypes from 'prop-types';
import { Form } from 'react-router-dom';
const HeaderSearch = () => {
  return (
    <Form action="">
      <input type="search" />
      <button type="submit">
        <span className="material-symbols-rounded">search</span>
      </button>
    </Form>
  );
};
HeaderSearch.propTypes = {};
export default HeaderSearch;
