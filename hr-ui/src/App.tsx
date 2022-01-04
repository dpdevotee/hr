import './App.css';
import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home';
import Regions from './components/Regions';
import Countries from './components/Countries';
import Employees from './components/Employees';
import Navigation from './components/Navigation'
import { Container } from 'reactstrap';


function App() {
  return (
    <div className="App">
      <Navigation/>
      <div className="App-intro">
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
