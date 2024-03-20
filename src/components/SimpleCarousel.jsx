import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
const SimpleCarousel = ({ children }) => {
  const carousel = useRef(null);
  const { events } = useDraggable(carousel);
  console.log(events);

  return (
    <div
      ref={carousel}
      className={`grid carousel select-none py-4 items-start grid-flow-col auto-cols-max overflow-x-auto`}
      {...events}
    >
      {children}
    </div>
  );
};
SimpleCarousel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
export default SimpleCarousel;
