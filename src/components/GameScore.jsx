import PropTypes, { number } from 'prop-types';
import { getMetascoreColor } from '../services/utilities';
const GameScore = ({ children }) => {
  return (
    <div className="border-b-[1px] mb-2 pb-2 grid items-center grid-cols-[minmax(0,1fr)_auto]">
      {children}
    </div>
  );
};

const GameScoreTitle = ({ children }) => {
  return <span className="uppercase text-2xl text-gray-500/80">{children}</span>;
};

const GameScoreRateMeta = ({ score }) => {
  return (
    <span
      style={{ backgroundColor: getMetascoreColor(score) }}
      className="rounded-md p-1 text-2xl size-10 text-center grid place-items-center"
    >
      {typeof score === number ? score : '?'}
    </span>
  );
};

GameScore.GameScoreTitle = GameScoreTitle;
GameScore.GameScoreRateMeta = GameScoreRateMeta;

GameScore.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

GameScoreTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
GameScoreRateMeta.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameScore;
