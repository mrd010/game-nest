import PropTypes from 'prop-types';
import { useRef } from 'react';
const ModalOverlayContainer = ({ isOpen, onClose, children }) => {
  const outSideContainer = useRef(null);
  return (
    <div
      ref={outSideContainer}
      className={`fixed left-0 grid place-items-center top-0 bg-gray-900/90 z-50 w-full origin-left transition-transform duration-300 h-screen ${isOpen ? 'scale-x-100' : 'scale-x-0'}`}
      style={{
        margin: 0,
      }}
      onClick={(e) => {
        if (e.target === outSideContainer.current) {
          onClose();
        }
      }}
    >
      <button
        onClick={onClose}
        className="text-gray-50 grid scale-150 absolute top-5 right-5 opacity-80 hover:opacity-100"
      >
        <span className="material-symbols-rounded">close</span>
      </button>
      {isOpen && children}
    </div>
  );
};
ModalOverlayContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ModalOverlayContainer;
