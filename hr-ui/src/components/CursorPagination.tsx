import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


interface CursorPaginationProps {
  loadPrevious(): void,
  loadNext(): void,
  
  isPreviousDisabled: boolean,
  isNextDisabled: boolean,
}

function CursorPagination(props: CursorPaginationProps) {
  return (
    <Pagination>
      <PaginationItem disabled={props.isPreviousDisabled}>
        <PaginationLink
          onClick={props.loadPrevious}
          previous />
      </PaginationItem>
      <PaginationItem disabled={props.isNextDisabled}>
        <PaginationLink
          onClick={props.loadNext}
          next />
      </PaginationItem>
    </Pagination>
  )
}

export default CursorPagination;
