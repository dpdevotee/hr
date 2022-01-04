import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


class Countries extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      countries: [],
      previous: null,
      next: null,
    };
    this.loadPrevious = this.loadPrevious.bind(this);
    this.loadNext = this.loadNext.bind(this);
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
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ isFetching: false });
      })
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
      </div>
    );
  }
}

export default Countries;
