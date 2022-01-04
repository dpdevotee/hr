import ReactPaginate from 'react-paginate';


interface PageNumberPaginationProps {
  pageCount: number,
  onPageChange(selectedItem: { selected: number }): void,
}

function PageNumberPagination(props: PageNumberPaginationProps) {
  return (
    <ReactPaginate
      pageCount={props.pageCount}
      onPageChange={props.onPageChange}

      pageRangeDisplayed={3}
      marginPagesDisplayed={1}

      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="page-item active"
      activeLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      disabledClassName="page-item disabled"
      disabledLinkClassName="page-link"
      breakClassName="page-item disabled"
      breakLinkClassName="page-link"

      breakLabel="..."
      nextLabel="›"
      previousLabel="‹"

    />
  )
}

export default PageNumberPagination;
