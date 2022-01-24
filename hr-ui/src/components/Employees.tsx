import { Component } from 'react';
import PageNumberPagination from './PageNumberPagination';
import Table from './Table';
import {baseApiURL} from "../common";


class Employees extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      dataRows: [],
      count: 0,
    };

    this.fetchPage = this.fetchPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: { selected: number }) {
    this.fetchPage(event.selected + 1);
  }

  fetchPage(page: number) {
    const link = '/api/employees/?page=' + page.toString(10);
    this.setState({ isFetching: true });
    fetch(`${baseApiURL}${link}`)
      .then(response => { return response.json() })
      .then(result => {
        this.setState({
          isFetching: false,
          dataRows: result.results,
          count: result.count,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ isFetching: false });
      })
  }

  componentDidMount() {
    this.fetchPage(1);
  }

  render() {
    return (
      <div>
        <h2>Employees</h2>
        <Table
          headers={['Employee ID', 'First name', 'Last name', 'e-mail']}
          columns={['employee_id', 'first_name', 'last_name', 'email']}
          data={this.state.dataRows}
          keyName='employee_id'
        />
        <PageNumberPagination
          pageCount={Math.ceil(this.state.count / 10)}
          onPageChange={this.handleClick}
        />
      </div>
    );
  }
}

export default Employees;
