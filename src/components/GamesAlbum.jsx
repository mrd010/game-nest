import PropTypes from 'prop-types';
import { useState } from 'react';
import PageNavNumbers from './PageNavNumbers';
import GamesAlbumList from './GamesAlbumList';
const GamesAlbum = ({ gameIds, itemsPerPage = 10 }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const numberOfPages = Math.ceil(gameIds.length / itemsPerPage);

  const handleChangePage = (num) => {
    setPageNumber(num);
  };

  return (
    <div className="flex flex-col flex-nowrap gap-4">
      {[...Array(numberOfPages)].map((v, index) => {
        const firstIndex = index * itemsPerPage;
        const lastIndex = index * itemsPerPage + itemsPerPage;
        return (
          <GamesAlbumList
            key={index}
            gamesListIds={gameIds.slice(firstIndex, lastIndex)}
            isActive={pageNumber === index}
          ></GamesAlbumList>
        );
      })}
      <div className="self-center">
        <PageNavNumbers
          totalPageNumbers={numberOfPages}
          currentPageNumber={pageNumber}
          onSelect={handleChangePage}
        ></PageNavNumbers>
      </div>
    </div>
  );
};
GamesAlbum.propTypes = {
  gameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemsPerPage: PropTypes.number,
};
export default GamesAlbum;
