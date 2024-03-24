import PropTypes from 'prop-types';
const MainContentHeader = ({ title, desc }) => {
  return (
    <header>
      <h1 className="text-5xl md:text-3xl my-2 font-extrabold">{title}</h1>
      <p className="text-lg">{desc}</p>
    </header>
  );
};

MainContentHeader.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default MainContentHeader;
