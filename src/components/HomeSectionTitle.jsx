import PropTypes from 'prop-types';
const HomeSectionTitle = ({ children }) => {
  return <h2 className="text-2xl font-bold border-b-[1px] pb-2 border-gray-900/50">{children}</h2>;
};
HomeSectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
export default HomeSectionTitle;
