import PropTypes from 'prop-types';
import { useState } from 'react';
import PageNavNumbers from './PageNavNumbers';
import GamesAlbumList from './GamesAlbumList';
const GamesAlbum = ({ gameIds, itemsPerPage = 10 }) => {
  const [pageNumber, setPageNumber] = useState(0);

  // total number of pages according to number of items
  const numberOfPages = Math.ceil(gameIds.length / itemsPerPage);

  const handleChangePage = (num) => {
    setPageNumber(num);
  };

  return (
    <div className="flex flex-col flex-nowrap gap-4">
      {
        // divide ids according to [itemsPerPage] and give each set to a different game list
        [...Array(numberOfPages)].map((v, index) => {
          // first index of slice
          const firstIndex = index * itemsPerPage;
          // last index of slice
          const lastIndex = index * itemsPerPage + itemsPerPage;
          return (
            <GamesAlbumList
              key={index}
              gamesListIds={gameIds.slice(firstIndex, lastIndex)}
              isActive={pageNumber === index}
            ></GamesAlbumList>
          );
        })
      }
      {/* bottom page numbers */}
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
