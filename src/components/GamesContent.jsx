import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
const GamesContent = (props) => {
  const data = useLoaderData();
  console.log(data);
  return <div></div>;
};
GamesContent.propTypes = {};
export default GamesContent;
