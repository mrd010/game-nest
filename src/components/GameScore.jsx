import PropTypes from 'prop-types';
import { getMetascoreColor } from '../services/utilities';
const GameScore = ({ children }) => {
  return (
    <div className="py-2 border-t-[1px] grid items-center grid-cols-[minmax(0,1fr)_auto] relative">
      {children}
    </div>
  );
};

const GameScoreTitle = ({ children }) => {
  return <span className="uppercase text-2xl text-gray-500/80">{children}</span>;
};

const GameScoreRateMeta = ({ score, className }) => {
  return (
    <span
      style={{ backgroundColor: getMetascoreColor(score) }}
      className={`rounded-md p-1 text-2xl size-10 text-center grid place-items-center ${className ? className : ''}`}
    >
      {typeof score === 'number' ? score : '?'}
    </span>
  );
};

const GameScoreRateSteam = ({ score }) => {
  return (
    <div>
      {score ? (
        <span className="rounded-md p-1 text-2xl size-10 text-center grid place-items-center text-gray-50 bg-gradient-to-r from-[#15202c] to-[#0e141c]">
          {score}
        </span>
      ) : (
        <span>?</span>
      )}
    </div>
  );
};

GameScore.GameScoreTitle = GameScoreTitle;
GameScore.GameScoreRateMeta = GameScoreRateMeta;
GameScore.GameScoreRateSteam = GameScoreRateSteam;

GameScore.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

GameScoreTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
GameScoreRateMeta.propTypes = {
  score: PropTypes.number.isRequired,
  className: PropTypes.string,
};
GameScoreRateSteam.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameScore;
