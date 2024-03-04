import freeLabel from '../assets/img/free-label.png';
const FreeGameLabel = () => {
  return (
    <div>
      <img src={freeLabel} alt="free label" />
      <span className="uppercase font-extrabold">Free</span>
    </div>
  );
};
export default FreeGameLabel;
