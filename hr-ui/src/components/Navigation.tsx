import React, {Component} from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';


class Navigation extends Component <any, any>{
    constructor(props: any) {
      super(props);
  
      this.state = {
        isOpen: false
      };
  
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    
    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/regions">Regions</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/countries">Countries</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/employees">Employees</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

export default Navigation;
