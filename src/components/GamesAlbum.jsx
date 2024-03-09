import PropTypes from 'prop-types';
import { useState } from 'react';
import PageNavNumbers from './PageNavNumbers';
const GamesAlbum = ({ gameIds, itemsPerPage = 10 }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const firstIndex = pageNumber * itemsPerPage;
  const lastIndex = (pageNumber + 1) * itemsPerPage;

  const handleChangePage = (num) => {
    setPageNumber(num);
  };

  return (
    <div>
      <div>
        {gameIds.slice(firstIndex, lastIndex).map((id) => (
          <p key={id}>{id}</p>
        ))}
      </div>
      <PageNavNumbers
        totalPageNumbers={Math.ceil(gameIds.length / itemsPerPage)}
        currentPageNumber={pageNumber}
        onSelect={handleChangePage}
      ></PageNavNumbers>
    </div>
  );
};
GamesAlbum.propTypes = {
  gameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemsPerPage: PropTypes.number,
};
export default GamesAlbum;
