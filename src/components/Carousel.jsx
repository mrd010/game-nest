import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
const Carousel = ({ title, children }) => {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-row-2 gap-5 carousel">
      <h2 className="text-2xl font-bold border-b-[1px] pb-2 border-gray-900/50">{title}</h2>
      <div className="flex flex-row gap-2 justify-self-end self-end">
        <ActionButton>
          <span className="material-symbols-rounded">arrow_back</span>
        </ActionButton>
        <ActionButton>
          <span className="material-symbols-rounded">arrow_forward</span>
        </ActionButton>
      </div>
      {children && (
        <div className="grid grid-flow-col auto-cols-[300px] gap-4  scroll-smooth col-span-2 overflow-x-auto pb-2">
          {children}
        </div>
      )}
    </div>
  );
};
Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
};
export default Carousel;
