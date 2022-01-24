import {Component} from 'react';
import {baseApiURL} from "../common";


class Regions extends Component <any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      regions: [],
    };
  }
  
  fetchRegions() {
    this.setState({isFetching: true});
    fetch(`${baseApiURL}/api/regions/`)
      .then(response => {return response.json()})
      .then(result => {
        this.setState({regions: result.results, isFetching: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({isFetching: false});
      })
  }

  componentDidMount() {
    this.fetchRegions();    
  }
  
  render() {
    const tableRows = this.state.regions.map((region: any) => 
      <tr key={region.region_id}>
        <th scope="row">{region.region_id}</th>
        <td>{region.region_name}</td>
      </tr>
    )

    return (
      <div>
        <h2>Regions</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Region ID</th>
              <th scope="col">Region name</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Regions;
