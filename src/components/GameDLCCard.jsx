import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import placeholder from '../assets/img/placeH.png';
const GameDLCCard = ({ appid, name, width }) => {
  return (
    <div className="p-2 bg-transparent" style={{ width: `${width}px` }}>
      <div className="shadow-md rounded-md overflow-hidden">
        <LazyLoadImage
          src={steamHeaderImage(appid)}
          width={460}
          height={215}
          placeholder={<img src={placeholder} className="invert"></img>}
          className="w-full row-span-2"
        ></LazyLoadImage>
        <div className="grid items-center p-2 bg-gradient-to-tl from-gray-800/50 to-slate-950/70 h-16">
          <h5 className="font-bold text-sm px-2 text-pretty line-clamp-2">{name}</h5>
        </div>
      </div>
    </div>
  );
};
GameDLCCard.propTypes = {
  appid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};
export default GameDLCCard;
