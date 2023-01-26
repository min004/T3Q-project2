import Pagination from 'react-js-pagination';

export const Paging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={15}
      totalItemsCount={count}
      pageRangeDisplayed={10}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};