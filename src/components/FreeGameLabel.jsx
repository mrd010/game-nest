import freeLabel from '../assets/img/free-label.png';
const FreeGameLabel = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 place-items-center w-24">
      <img
        src={freeLabel}
        alt="free label"
        className="col-end-1 row-end-1 translate-x-1 translate-y-1"
      />
      <span className="uppercase select-none z-20 font-extrabold text-sm col-end-1 row-end-1 text-gray-900">
        Free
      </span>
    </div>
  );
};
export default FreeGameLabel;
