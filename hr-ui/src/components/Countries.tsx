import { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactPaginate from 'react-paginate';


interface PageNumberPaginationProps {
  count: number,
  currentPage: number,
  pageSize: number,
  loader: (page: number) => void,
}

function PageNumberPagination(props: PageNumberPaginationProps) {
  const count = props.count;
  const currentPage = props.currentPage;
  const pageSize = props.pageSize;
  const loader = props.loader;
  const lastPageNumber = Math.ceil(count / pageSize);
  let before: any = [];
  let after: any = [];
  if (currentPage - 1 >= 1) {
    before.push(
      <PaginationItem>
        <PaginationLink
          onClick={() => {loader(1)}}
          previous />
      </PaginationItem>
    )
  } 
  return (
    <Pagination>
      <PaginationItem disabled={(currentPage === 1) ? true : false}>
        <PaginationLink
          onClick={() => {loader(currentPage - 1)}}
          previous />
      </PaginationItem>
      {before}
      <PaginationItem active>
        <PaginationLink onClick={() => {loader(currentPage)}} >{currentPage}</PaginationLink>
      </PaginationItem>
      {after}
      <PaginationItem disabled={(currentPage === lastPageNumber) ? true : false}>
        <PaginationLink
          onClick={() => {loader(currentPage + 1)}}
          next />
      </PaginationItem>
    </Pagination>
  );
}


class Countries extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      countries: [],
      previous: null,
      next: null,
      count: 0,
      currentPage: 1,
    };
    this.loadPrevious = this.loadPrevious.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fetchCountries(link: string) {
    this.setState({ isFetching: true });
    fetch(link)
      .then(response => { return response.json() })
      .then(result => {
        this.setState({
          isFetching: false,
          countries: result.results,
          previous: result.previous,
          next: result.next,
          count: result.count,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ isFetching: false });
      })
  }

  handleClick(event: any) {
    console.log('event:', typeof(event), event.selected, event.keys);
    this.fetchPage(event.selected + 1);
  }

  fetchPage(page: number) {
    this.setState({currentPage: page});
    this.fetchCountries('http://localhost:8000/api/countries?page=' + page.toString(10));
  }

  componentDidMount() {
    this.fetchCountries('http://localhost:8000/api/countries/');
  }

  loadPrevious() {
    console.log('prev:', this.state.previous);
    this.fetchCountries(this.state.previous);
  }

  loadNext() {
    console.log('next:', this.state.next);
    this.fetchCountries(this.state.next);
  }

  render() {
    const tableRows = this.state.countries.map((item: any) =>
      <tr key={item.country_id}>
        <th scope="row">{item.country_id}</th>
        <td>{item.country_name}</td>
      </tr>
    )

    return (
      <div>
        <h2>Countries</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Country ID</th>
              <th scope="col">Country name</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        <PageNumberPagination
          count={this.state.count}
          pageSize={10}
          currentPage={this.state.currentPage}
          loader={this.fetchPage}
        />
        <Pagination>
          <PaginationItem disabled={this.state.previous ? false : true}>
            <PaginationLink
              onClick={this.loadPrevious}
              previous />
          </PaginationItem>
          <PaginationItem disabled={this.state.next ? false : true}>
            <PaginationLink
              onClick={this.loadNext}
              next />
          </PaginationItem>
        </Pagination>

        <ReactPaginate
          pageCount={Math.ceil(this.state.count / 10)}
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

          breakLabel="..."
          nextLabel="›"
          onPageChange={this.handleClick}
          pageRangeDisplayed={5}
          previousLabel="‹"
          
        />
      </div>
    );
  }
}

export default Countries;
