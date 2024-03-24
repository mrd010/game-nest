import PropTypes from 'prop-types';
const TabMenu = ({ tabsList, tabWidth, selectedTabIndex, onTabChange }) => {
  return (
    <div className={`flex flex-row flex-nowrap relative`}>
      {/* indicator */}
      <div
        className="h-1 bg-yellow-500 rounded-t-sm absolute bottom-0 left-0 transition-transform"
        style={{
          width: `${tabWidth}px`,
          transform: `translate(${tabWidth * selectedTabIndex}px,0)`,
        }}
      ></div>
      {/* tabs */}
      {tabsList.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-1 py-3  md:text-sm transition-opacity ${selectedTabIndex === index ? 'opacity-100 font-bold' : 'opacity-40'}`}
          style={{ width: `${tabWidth}px` }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
TabMenu.propTypes = {
  tabsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabWidth: PropTypes.number,
  selectedTabIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
export default TabMenu;
