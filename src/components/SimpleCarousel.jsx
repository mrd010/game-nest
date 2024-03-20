import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
const SimpleCarousel = ({ children, className = '' }) => {
  const carousel = useRef(null);
  const { events } = useDraggable(carousel);

  return (
    <div
      ref={carousel}
      className={`grid carousel select-none items-start py-4 grid-flow-col auto-cols-max overflow-x-auto ${className}`}
      {...events}
    >
      {children}
    </div>
  );
};
SimpleCarousel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
};
export default SimpleCarousel;
